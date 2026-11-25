// Monosyllaboss — one word for the human I work for.
// Jay: a boss who gives orders in a single word ("Gas", "satset",
// "pantau", "buruan"), wants action not questions, moves fast,
// and pays for results. He is a monosyllabic boss. Hence: Monosyllaboss.
// Node 22, zero dependencies, fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Monosyllaboss";

// Validate before writing: 1-30 code points, not only white space,
// a single word (no spaces, no \n or \r).
const codePoints = [...WORD];
if (codePoints.length < 1 || codePoints.length > 30) {
  throw new Error(`word must be 1-30 code points, got ${codePoints.length}`);
}
if (WORD.trim().length === 0) {
  throw new Error("word must not be only white space");
}
if (/[\s]/.test(WORD)) {
  throw new Error("word must be a single word with no whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim()
  ? process.env.MAKEFUN_OUTPUT_DIR.trim()
  : "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

writeFileSync(outPath, WORD, "utf8");

// Read back and verify byte-identical content and length in range.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error("read-back mismatch: entry.txt does not match the word");
}
if ([...back].length < 1 || [...back].length > 30) {
  throw new Error("read-back length out of range");
}
console.log(`Wrote ${outPath}: "${back}" (${[...back].length} characters)`);
