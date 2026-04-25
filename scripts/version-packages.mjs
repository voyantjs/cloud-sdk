import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const changesetDir = path.join(repoRoot, ".changeset");
const workspaceFile = path.join(repoRoot, "pnpm-workspace.yaml");

function readPublishablePackagesAtZeroMajor() {
  const workspace = fs.readFileSync(workspaceFile, "utf8");
  const globs = [...workspace.matchAll(/^\s*-\s+"([^"]+)"/gm)].map(
    (match) => match[1],
  );
  const packagesDirs = globs.flatMap((glob) => {
    if (!glob.endsWith("/*")) return [];
    const baseDir = path.join(repoRoot, glob.slice(0, -2));
    if (!fs.existsSync(baseDir)) return [];
    return fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(baseDir, entry.name));
  });

  const names = new Set();
  for (const dir of packagesDirs) {
    const manifestPath = path.join(dir, "package.json");
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.private) continue;
    const major = Number((manifest.version ?? "").split(".")[0]);
    if (major === 0) names.add(manifest.name);
  }
  return names;
}

function demoteMajorBumps(zeroMajorPackages) {
  if (zeroMajorPackages.size === 0) return;
  const files = fs
    .readdirSync(changesetDir)
    .filter((file) => file.endsWith(".md") && file !== "README.md");

  for (const file of files) {
    const filepath = path.join(changesetDir, file);
    const content = fs.readFileSync(filepath, "utf8");
    const match = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) continue;

    const frontmatter = match[1];
    const updatedFrontmatter = frontmatter.replace(
      /^("[^"]+"):\s*major$/gm,
      (line, quotedName) => {
        const name = quotedName.slice(1, -1);
        if (zeroMajorPackages.has(name)) {
          console.log(
            `version-packages: demoting major→minor for ${name} in ${file} (still in 0.x)`,
          );
          return `${quotedName}: minor`;
        }
        return line;
      },
    );

    if (updatedFrontmatter !== frontmatter) {
      const updated = content.replace(
        /^---\n[\s\S]*?\n---\n/,
        `---\n${updatedFrontmatter}\n---\n`,
      );
      fs.writeFileSync(filepath, updated);
    }
  }
}

demoteMajorBumps(readPublishablePackagesAtZeroMajor());

execSync("changeset version", { stdio: "inherit", cwd: repoRoot });
