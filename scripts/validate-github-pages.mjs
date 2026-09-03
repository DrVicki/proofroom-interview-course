import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docs = path.join(root, "docs");
const requiredFiles = ["index.html", "404.html", ".nojekyll", "assets/css/styles.css", "assets/js/site.js"];
const requiredCopy = [
  "Build the room before you enter it",
  "Turn experience into a proof-story bank",
  "Run one question, one answer, one follow-up",
  "Score what changed and practice it again",
  "http://34.26.38.206/",
  "proofroom-pages-module-checklist-v1",
];
const failures = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(docs, relativePath))) failures.push(`Missing required file: docs/${relativePath}`);
}

const indexPath = path.join(docs, "index.html");
const index = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : "";
const script = fs.existsSync(path.join(docs, "assets/js/site.js"))
  ? fs.readFileSync(path.join(docs, "assets/js/site.js"), "utf8")
  : "";

for (const text of requiredCopy) {
  if (!`${index}\n${script}`.includes(text)) failures.push(`Missing required page content: ${text}`);
}

if ([...index.matchAll(/(?:src|href)=["']\/(?!\/)/g)].length) {
  failures.push("Root-relative asset paths found; GitHub project pages require relative assets.");
}

const localAssetRefs = [...index.matchAll(/(?:src|href)=["'](assets\/[^"']+)/g)].map((match) => match[1]);
for (const asset of localAssetRefs) {
  if (!fs.existsSync(path.join(docs, asset))) failures.push(`Linked asset does not exist: docs/${asset}`);
}

if ((index.match(/data-module=/g) || []).length !== 4) failures.push("The public module checklist must contain exactly four modules.");

const guidePath = path.join(root, "GITHUB_PAGES.md");
if (!fs.existsSync(guidePath)) failures.push("Missing GITHUB_PAGES.md deployment guide.");
else {
  const guide = fs.readFileSync(guidePath, "utf8");
  for (const text of ["DrVicki/proofroom-interview-course", "main", "/docs", "Deploy from a branch"]) {
    if (!guide.includes(text)) failures.push(`Deployment guide is missing: ${text}`);
  }
}

if (failures.length) {
  console.error("GitHub Pages validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Proofroom GitHub Pages validation passed.");
console.log(`Checked ${requiredFiles.length} required files, ${requiredCopy.length} content markers, four checklist modules, and ${localAssetRefs.length} relative asset references.`);
