import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const voyantCloudRepo = path.resolve(repoRoot, "../voyant-cloud");

const sources = [
  {
    file: path.join(voyantCloudRepo, "apps/api/src/routes/vault.ts"),
    pathPrefix: "/vault/v1",
  },
  {
    file: path.join(voyantCloudRepo, "apps/api/src/routes/sms.ts"),
    pathPrefix: "/sms/v1",
  },
  {
    file: path.join(voyantCloudRepo, "apps/api/src/routes/email.ts"),
    pathPrefix: "/email/v1",
  },
];

const manifestFile = path.join(repoRoot, "generated", "public-routes.json");

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function joinPath(prefix, suffix) {
  if (!prefix) return suffix;
  if (suffix === "/" || suffix === "") return prefix;
  return `${prefix}${suffix.startsWith("/") ? "" : "/"}${suffix}`;
}

function extractRoutes(filePath, pathPrefix) {
  const source = fs.readFileSync(filePath, "utf8");
  return [
    ...source.matchAll(/\bapp\.(get|post|patch|delete|put)\(\s*"([^"]+)"/gs),
  ].map(
    ([, method, route]) =>
      `${method.toUpperCase()} ${joinPath(pathPrefix, route)}`,
  );
}

if (!sources.every((source) => fileExists(source.file))) {
  console.error(
    "Unable to sync route manifests: sibling voyant-cloud route files were not found.",
  );
  process.exit(1);
}

const cloudRoutes = sources
  .flatMap((source) => extractRoutes(source.file, source.pathPrefix))
  .sort();

const manifest = { cloud: cloudRoutes };

fs.mkdirSync(path.dirname(manifestFile), { recursive: true });
fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  `Synced route manifest to ${path.relative(repoRoot, manifestFile)}.`,
);
