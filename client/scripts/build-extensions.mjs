/**
 * Gera ZIPs das extensões Aurora Meta e MidJourney com JavaScript ofuscado.
 * Saída: public/extension/*.zip (apenas os arquivos para download no site).
 */
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import JavaScriptObfuscator from "javascript-obfuscator";
import archiver from "archiver";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AURORA_ROOT = path.resolve(__dirname, "../../..");
const META_SRC = path.join(AURORA_ROOT, "Aurora Meta");
const MJ_SRC = path.join(AURORA_ROOT, "Aurora MidJourney");
const OUT_ZIP_DIR = path.join(__dirname, "../public/extension");

const OBFUSCATOR_OPTIONS = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  reservedNames: ["^chrome$", "^browser$"],
  rotateStringArray: true,
  selfDefending: false,
  stringArray: true,
  stringArrayEncoding: ["base64"],
  stringArrayThreshold: 0.75,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  target: "browser",
};

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walkFiles(full, acc);
    else acc.push(full);
  }
  return acc;
}

function copyTree(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

function obfuscateAllJs(rootDir) {
  const files = walkFiles(rootDir).filter((f) => f.endsWith(".js"));
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const out = JavaScriptObfuscator.obfuscate(source, OBFUSCATOR_OPTIONS).getObfuscatedCode();
    fs.writeFileSync(file, out, "utf8");
  }
  return files.length;
}

function zipFolder(sourceDir, outZipPath, folderNameInArchive) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(outZipPath), { recursive: true });
    const output = createWriteStream(outZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => {
      console.log(`  ZIP: ${path.basename(outZipPath)} (${archive.pointer()} bytes)`);
      resolve();
    });
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(sourceDir, folderNameInArchive);
    archive.finalize();
  });
}

async function buildOne({ id, srcDir, folderInZip }) {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Origem não encontrada: ${srcDir}`);
  }
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), `aurora-${id}-`));
  const workDir = path.join(tmpRoot, "pkg");
  try {
    copyTree(srcDir, workDir);
    const n = obfuscateAllJs(workDir);
    console.log(`  ${id}: ofuscados ${n} .js`);
    const zipPath = path.join(OUT_ZIP_DIR, `${id}.zip`);
    await zipFolder(workDir, zipPath, folderInZip);
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
}

function sourcesAvailable() {
  return fs.existsSync(META_SRC) && fs.existsSync(MJ_SRC);
}

async function main() {
  if (!sourcesAvailable()) {
    console.warn(
      "Pastas de origem das extensões não encontradas (ex.: Aurora Meta / Aurora MidJourney ao lado do repo).",
    );
    console.warn("Pulando geração de ZIP — normal em CI (Netlify). O site será buildado sem reempacotar extensões.");
    fs.mkdirSync(OUT_ZIP_DIR, { recursive: true });
    process.exit(0);
  }

  console.log("Build extensions (somente ZIP) →", OUT_ZIP_DIR);
  fs.mkdirSync(OUT_ZIP_DIR, { recursive: true });
  for (const name of fs.readdirSync(OUT_ZIP_DIR)) {
    const p = path.join(OUT_ZIP_DIR, name);
    fs.rmSync(p, { recursive: true, force: true });
  }

  await buildOne({
    id: "aurora-meta",
    srcDir: META_SRC,
    folderInZip: "aurora-meta",
  });

  await buildOne({
    id: "aurora-midjourney",
    srcDir: MJ_SRC,
    folderInZip: "aurora-midjourney",
  });

  console.log("Concluído.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
