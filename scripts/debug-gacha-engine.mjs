import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const outDir = path.join("output", "gacha-engine-debug");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const compile = spawnSync(
  process.execPath,
  [
    path.join("node_modules", "typescript", "bin", "tsc"),
    "src/engine/gacha/debugGachaEngineEntry.ts",
    "--outDir",
    outDir,
    "--rootDir",
    "src",
    "--module",
    "commonjs",
    "--target",
    "ES2020",
    "--moduleResolution",
    "node",
    "--skipLibCheck",
    "--esModuleInterop",
    "--strict",
  ],
  { stdio: "inherit" },
);

if (compile.status !== 0) {
  rmSync(outDir, { recursive: true, force: true });
  process.exit(compile.status ?? 1);
}

const entry = path.join(outDir, "engine", "gacha", "debugGachaEngineEntry.js");
const run = spawnSync(process.execPath, [entry], { stdio: "inherit" });
rmSync(outDir, { recursive: true, force: true });
process.exit(run.status ?? 1);
