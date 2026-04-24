#!/usr/bin/env node
/**
 * MAXA Token Audit Script
 * Scans CSS source files for hardcoded values that should use design tokens.
 * Exits with code 1 if violations found — use in CI to block regressions.
 *
 * Usage: node scripts/audit-tokens.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const SCAN_DIRS = ['packages/ui/src', 'packages/tokens/src', 'apps/docs'];

const IGNORE_PATHS = ['node_modules', 'dist', '.turbo', '.next', 'primitives.css', 'audit-tokens.mjs'];

const SPACING_TOKENS = {
  2: '--spacing-xxs', 4: '--spacing-xs', 6: '--spacing-sm',
  8: '--spacing-md', 12: '--spacing-lg', 16: '--spacing-xl',
  20: '--spacing-2xl', 24: '--spacing-3xl', 32: '--spacing-4xl',
  40: '--spacing-5xl', 48: '--spacing-6xl', 64: '--spacing-7xl',
  80: '--spacing-8xl', 96: '--spacing-9xl', 128: '--spacing-10xl', 160: '--spacing-11xl',
};

const RADIUS_TOKENS = {
  4: '--radius-xs', 6: '--radius-sm', 8: '--radius-md',
  10: '--radius-lg', 12: '--radius-xl', 16: '--radius-2xl',
  20: '--radius-3xl', 24: '--radius-4xl', 9999: '--radius-full',
};

const ALLOWED_HEX = new Set(['#1b1a1a', '#00000000']);
const ALLOWED_PX = new Set([0, 1, 2]);

function collectCssFiles(dir) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (IGNORE_PATHS.some(p => full.includes(p))) continue;
      if (statSync(full).isDirectory()) {
        files.push(...collectCssFiles(full));
      } else if (extname(full) === '.css') {
        files.push(full);
      }
    }
  } catch { /* dir may not exist */ }
  return files;
}

function isTokenDef(line, idx) {
  const before = line.slice(0, idx);
  if (before.includes('/*') && !before.includes('*/')) return true;
  if (/--[\w-]+\s*:/.test(before)) return true;
  return false;
}

function scanFile(filePath) {
  const violations = [];
  const lines = readFileSync(filePath, 'utf8').split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue;

    // Hex color check
    const hexRe = /#([0-9a-fA-F]{3,8})\b/g;
    let m;
    while ((m = hexRe.exec(line)) !== null) {
      if (ALLOWED_HEX.has(m[0].toLowerCase())) continue;
      if (isTokenDef(line, m.index)) continue;
      violations.push({
        file: relative(ROOT, filePath), line: lineNum,
        type: 'hardcoded-color', value: m[0],
        hint: 'Use a semantic token: var(--color-*)',
      });
    }

    // Hardcoded px check
    const pxRe = /(?<![a-zA-Z-])(\d+)px/g;
    while ((m = pxRe.exec(line)) !== null) {
      const px = parseInt(m[1], 10);
      if (ALLOWED_PX.has(px)) continue;
      if (isTokenDef(line, m.index)) continue;
      const hint = SPACING_TOKENS[px]
        ? `Use var(${SPACING_TOKENS[px]})`
        : RADIUS_TOKENS[px]
        ? `Use var(${RADIUS_TOKENS[px]})`
        : 'Use a token from the spacing or radius scale (see specs/tokens-reference.md)';
      violations.push({
        file: relative(ROOT, filePath), line: lineNum,
        type: 'hardcoded-px', value: `${px}px`, hint,
      });
    }
  }

  return violations;
}

const allFiles = SCAN_DIRS.flatMap(d => collectCssFiles(join(ROOT, d)));
const violations = allFiles.flatMap(f => scanFile(f));

if (violations.length === 0) {
  console.log('✓ No token violations found.');
  process.exit(0);
}

console.log(`\n✗ ${violations.length} token violation(s):\n`);
const byFile = violations.reduce((acc, v) => {
  (acc[v.file] ??= []).push(v);
  return acc;
}, {});

for (const [file, vs] of Object.entries(byFile)) {
  console.log(`  ${file}`);
  for (const v of vs) {
    console.log(`    line ${v.line}: [${v.type}] ${v.value}`);
    console.log(`      → ${v.hint}`);
  }
  console.log('');
}

console.log('Reference: specs/tokens-reference.md\n');
process.exit(1);
