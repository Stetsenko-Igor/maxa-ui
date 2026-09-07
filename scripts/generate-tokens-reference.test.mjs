import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sourceFiles, parseFile } from './generate-tokens-reference.mjs';

function fixture(run) {
  const directory = mkdtempSync(join(tmpdir(), 'maxa-token-reference-'));
  try { run(directory); } finally { rmSync(directory, { recursive: true, force: true }); }
}

test('nested imports resolve relative to their own bundle and preserve cascade order', () => fixture((directory) => {
  mkdirSync(join(directory, 'nested'));
  writeFileSync(join(directory, 'theme.css'), '@import "./nested/core.css";\n@import "./brand.css";');
  writeFileSync(join(directory, 'nested/core.css'), "@import '../foundation.css';");
  writeFileSync(join(directory, 'foundation.css'), ':root { --space: 4px; }');
  writeFileSync(join(directory, 'brand.css'), ':root { --brand: blue; }');
  assert.deepEqual(sourceFiles(join(directory, 'theme.css')), [
    'foundation.css', 'nested/core.css', 'brand.css', 'theme.css',
  ].map((file) => join(directory, file)));
}));

test('multiple declarations and multiline values retain every token and dark override', () => fixture((directory) => {
  const file = join(directory, 'tokens.css');
  writeFileSync(file, `:root {
  --size: 14px; --line-height: 20px;
  --shadow: 0 1px 2px black,
    0 2px 4px gray; --weight: 400;
}
[data-theme="dark"] {
  --size: 16px; --line-height: 24px;
}
`);
  const parsed = parseFile(file);
  assert.deepEqual(parsed.lightEntries.map(({ name, value }) => [name, value]), [
    ['--size', '14px'], ['--line-height', '20px'],
    ['--shadow', '0 1px 2px black, 0 2px 4px gray'], ['--weight', '400'],
  ]);
  assert.deepEqual([...parsed.darkValues], [['--size', '16px'], ['--line-height', '24px']]);
}));

test('cycles and missing imports fail visibly', () => fixture((directory) => {
  const file = join(directory, 'theme.css');
  writeFileSync(file, '@import "./theme.css";');
  assert.throws(() => sourceFiles(file), /Circular CSS import/);
  writeFileSync(file, '@import "./missing.css";');
  assert.throws(() => sourceFiles(file), /ENOENT/);
}));
