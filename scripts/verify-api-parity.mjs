import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const voyantCloudRepo = path.resolve(repoRoot, "../voyant-cloud");
const manifestFile = path.join(repoRoot, "generated", "public-routes.json");

const vaultRoutesFile = path.join(
  voyantCloudRepo,
  "apps/api/src/routes/vault.ts",
);
const smsRoutesFile = path.join(voyantCloudRepo, "apps/api/src/routes/sms.ts");
const emailRoutesFile = path.join(
  voyantCloudRepo,
  "apps/api/src/routes/email.ts",
);
const verifyRoutesFile = path.join(
  voyantCloudRepo,
  "apps/api/src/routes/verify.ts",
);

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function joinPath(prefix, suffix) {
  if (!prefix) return suffix;
  if (suffix === "/" || suffix === "") return prefix;
  return `${prefix}${suffix.startsWith("/") ? "" : "/"}${suffix}`;
}

function extractRoutes(filePath, pathPrefix = "") {
  const source = fs.readFileSync(filePath, "utf8");
  return new Set(
    [
      ...source.matchAll(
        /\bapp\.(get|post|patch|delete|put)\(\s*"([^"]+)"/gs,
      ),
    ].map(
      ([, method, route]) =>
        `${method.toUpperCase()} ${joinPath(pathPrefix, route)}`,
    ),
  );
}

function verifyManifest(label, actualRoutes, expectedRoutes) {
  const missingRoutes = [...actualRoutes]
    .filter((route) => !expectedRoutes.has(route))
    .sort();
  const staleRoutes = [...expectedRoutes]
    .filter((route) => !actualRoutes.has(route))
    .sort();

  assert.equal(
    missingRoutes.length,
    0,
    `${label} SDK is missing public routes from voyant-cloud:\n${missingRoutes.join("\n")}`,
  );

  assert.equal(
    staleRoutes.length,
    0,
    `${label} SDK parity manifest contains routes no longer present in voyant-cloud:\n${staleRoutes.join("\n")}`,
  );
}

const requiredFiles = [
  manifestFile,
  vaultRoutesFile,
  smsRoutesFile,
  emailRoutesFile,
  verifyRoutesFile,
];

if (!requiredFiles.every(fileExists)) {
  console.log(
    "Skipping API parity verification: sibling voyant-cloud route files not found.",
  );
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));

const actualCloudRoutes = new Set([
  ...extractRoutes(vaultRoutesFile, "/vault/v1"),
  ...extractRoutes(smsRoutesFile, "/sms/v1"),
  ...extractRoutes(emailRoutesFile, "/email/v1"),
  ...extractRoutes(verifyRoutesFile, "/verify/v1"),
]);

verifyManifest("Cloud", actualCloudRoutes, new Set(manifest.cloud));

console.log("API parity verification passed for Cloud routes.");
