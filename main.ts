// Fortune in a Pot — make.fun entry
// Writes one houseplant fortune (a single line, 1-120 chars) to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Node 22 stdlib only. No network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "A tall stranger is coming to your window \u2014 it is only the sun, and it has missed you all winter.";

function codePoints(text) {
  return [...text].length;
}

function validate(text) {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("fortune must be a non-empty string");
  }
  if (text !== text.trim()) {
    throw new Error("fortune must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
  const n = codePoints(text);
  if (n < 1 || n > 120) {
    throw new Error(`fortune must be 1-120 characters, got ${n}`);
  }
}

function main() {
  validate(FORTUNE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, FORTUNE, "utf8");
  // Read-back round-trip check: what the grader reads must be exactly
  // the validated fortune, with no trailing newline added.
  const back = readFileSync(outPath, "utf8");
  if (back !== FORTUNE) {
    throw new Error("round-trip check failed: entry.txt differs from fortune");
  }
  console.log(`wrote ${codePoints(FORTUNE)} characters to ${outPath}`);
}

main();
