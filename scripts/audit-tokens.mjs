#!/usr/bin/env node
/**
 * MAXA Token Audit Script
 *
 * Checks:
 *   1. Hardcoded hex / px values in CSS where tokens should be used
 *   2. Cross-layer drift: TS token unions in base-tokens.tsx must map to
 *      defined CSS variables in semantic.css (catches the "surface-layer1"
 *      silent bug where the type referenced a CSS var that never existed)
 *   3. Legacy token names: stale references after the surface redesign
 *      (bg-default, bg-elevated, bg-primary/secondary/tertiary, bg-surface-layer*,
 *      bg-nav — these are removed or moved; this check guards against
 *      re-introducing them or finding lingering external uses)
 *   4. Figma semantic color naming consistency: group names, leaf prefixes,
 *      and background intent suffixes must stay aligned.
 *
 * Exits with code 1 if violations found — use in CI to block regressions.
 *
 * Usage: node scripts/audit-tokens.mjs
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const SCAN_DIRS = ['packages/ui/src', 'packages/tokens/src', 'apps/docs'];
const TOKEN_CSS_DIR = join(ROOT, 'packages/tokens/src');
const FIGMA_DIR = join(ROOT, 'packages/tokens/figma');

const IGNORE_PATHS = ['node_modules', 'dist', '.turbo', '.next', '.next-dev', 'out', 'audit-tokens.mjs'];

// Legacy semantic names removed in the surface redesign. Their CSS var
// is no longer defined (except bg-elevated which is a temporary alias).
// External consumers should migrate to the new names.
const LEGACY_BG_NAMES = [
  '--color-bg-elevated',
  '--color-bg-default',
  '--color-bg-primary',
  '--color-bg-secondary',
  '--color-bg-tertiary',
  '--color-bg-surface-layer1',
  '--color-bg-surface-layer2',
  '--color-bg-nav', // moved to --nav-bg in component-nav.css
];

const LEGACY_NAME_MIGRATION = {
  '--color-bg-default': '--color-bg-page',
  '--color-bg-primary': '--color-bg-page',
  '--color-bg-secondary': '--color-bg-surface',
  '--color-bg-tertiary': '--color-bg-inset',
  '--color-bg-surface-layer1': '--color-bg-surface',
  '--color-bg-surface-layer2': '--color-bg-inset',
  '--color-bg-nav': '--nav-bg (from component-nav.css)',
  '--color-bg-elevated': '--color-bg-surface',
};

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

const ALLOWED_HEX = new Set(['#00000000']);
const ALLOWED_PX = new Set([0, 1, 2]);

const FIGMA_ALIAS_DEFAULTS = {
  Spacing: 'Primitives',
  'Color modes': 'Primitives',
  'Component-based': 'Primitives',
  Layout: 'Spacing',
};

const FIGMA_COLOR_GROUP_PREFIXES = {
  text: 'text-',
  foreground: 'fg-',
  background: 'bg-',
  border: 'border-',
  action: 'action-',
};

const FIGMA_BACKGROUND_INTENTS = ['brand', 'neutral', 'info', 'success', 'warning', 'error'];
const FIGMA_BACKGROUND_INTENT_SUFFIXES = ['subtle', 'surface', 'strong', 'muted'];
const FIGMA_LEGACY_COLOR_GROUPS = new Set(['fg', 'bg']);

function collectFiles(dir, extensions) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (IGNORE_PATHS.some(p => full.includes(p))) continue;
      if (statSync(full).isDirectory()) {
        files.push(...collectFiles(full, extensions));
      } else if (extensions.includes(extname(full))) {
        files.push(full);
      }
    }
  } catch { /* dir may not exist */ }
  return files;
}

function collectCssFiles(dir) {
  return collectFiles(dir, ['.css']);
}

function collectSourceFiles(dir) {
  return collectFiles(dir, ['.css', '.tsx', '.ts']);
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

function scanLegacyNames(filePath) {
  const violations = [];
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    for (const legacy of LEGACY_BG_NAMES) {
      const re = new RegExp(`${legacy.replace(/-/g, '\\-')}\\b`);
      const m = line.match(re);
      if (!m) continue;
      // Skip the audit script's own migration map and any line that's defining
      // the deprecated alias (intentional in semantic.css for one release).
      if (filePath.endsWith('audit-tokens.mjs')) continue;
      if (line.includes(`${legacy}:`)) continue; // token DEFINITION (not reference)
      violations.push({
        file: relative(ROOT, filePath),
        line: lineNum,
        type: 'legacy-token-name',
        value: legacy,
        hint: `Migrate to ${LEGACY_NAME_MIGRATION[legacy]}`,
      });
    }
  }
  return violations;
}

function extractTsUnionMembers(source, unionName) {
  // Match e.g.  export type FooToken =\n  | "a"\n  | "b"\n
  const re = new RegExp(`export type ${unionName}[^=]*=\\s*([\\s\\S]*?)(?=\\n(?:export|\\}|$))`, 'm');
  const m = source.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((mm) => mm[1]);
}

function scanCrossLayerDrift() {
  const violations = [];

  const baseTokensPath = join(ROOT, 'packages/ui/src/base-tokens.tsx');
  let baseTokensSource;
  try {
    baseTokensSource = readFileSync(baseTokensPath, 'utf8');
  } catch {
    return violations; // file doesn't exist — skip
  }

  const semanticPath = join(ROOT, 'packages/tokens/src/semantic.css');
  const semanticCss = readFileSync(semanticPath, 'utf8');

  const checks = [
    { union: 'BackgroundColorToken', prefix: '--color-bg-' },
    { union: 'BorderColorToken', prefix: '--color-border-' },
    { union: 'TextColorToken', prefix: '--color-text-' },
    { union: 'ForegroundColorToken', prefix: '--color-fg-' },
  ];

  for (const { union, prefix } of checks) {
    const members = extractTsUnionMembers(baseTokensSource, union);
    if (members.length === 0) continue;
    for (const member of members) {
      const varName = `${prefix}${member}`;
      if (!semanticCss.includes(`${varName}:`)) {
        violations.push({
          file: relative(ROOT, baseTokensPath),
          line: 0,
          type: 'cross-layer-drift',
          value: `${union} has "${member}" but ${varName} is not defined in semantic.css`,
          hint: `Add ${varName} to semantic.css, or remove "${member}" from ${union}`,
        });
      }
    }
  }

  return violations;
}

function stripCssComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, '');
}

function scanCssVarResolution() {
  const violations = [];
  const files = collectCssFiles(TOKEN_CSS_DIR);
  const defined = new Set();

  for (const filePath of files) {
    const content = stripCssComments(readFileSync(filePath, 'utf8'));
    for (const match of content.matchAll(/(--[\w-]+)\s*:/g)) {
      defined.add(match[1]);
    }
  }

  for (const filePath of files) {
    const content = stripCssComments(readFileSync(filePath, 'utf8'));
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      for (const match of lines[i].matchAll(/var\(\s*(--[\w-]+)/g)) {
        const varName = match[1];
        if (!defined.has(varName)) {
          violations.push({
            file: relative(ROOT, filePath),
            line: i + 1,
            type: 'unresolved-css-var',
            value: varName,
            hint: `Define ${varName} in packages/tokens/src, or replace the reference with an existing token`,
          });
        }
      }
    }
  }

  return violations;
}

function flattenJsonTokens(input, pathParts = [], output = new Set()) {
  for (const [key, value] of Object.entries(input)) {
    const nextPath = [...pathParts, key];
    if (value && typeof value === 'object' && !Array.isArray(value) && '$value' in value && '$type' in value) {
      output.add(nextPath.join('/'));
      continue;
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenJsonTokens(value, nextPath, output);
    }
  }
  return output;
}

function collectFigmaCollections() {
  const manifestPath = join(FIGMA_DIR, 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const collections = {};

  for (const [collectionName, collectionDef] of Object.entries(manifest.collections ?? {})) {
    const paths = new Set();
    for (const files of Object.values(collectionDef.modes ?? {})) {
      for (const fileName of files) {
        const json = JSON.parse(readFileSync(join(FIGMA_DIR, fileName), 'utf8'));
        flattenJsonTokens(json, [], paths);
      }
    }
    collections[collectionName] = paths;
  }

  return { manifest, collections };
}

function resolveFigmaAlias(inner, collectionName, collections) {
  const normalizedInner = inner.replace(/\./g, '/');
  const collectionNames = Object.keys(collections).sort((a, b) => b.length - a.length);

  for (const candidate of collectionNames) {
    const prefix = `${candidate}/`;
    if (normalizedInner.startsWith(prefix)) {
      const tokenPath = normalizedInner.slice(prefix.length);
      return collections[candidate]?.has(tokenPath) ? null : `${candidate}/${tokenPath}`;
    }
  }

  if (collections[collectionName]?.has(normalizedInner)) return null;

  const defaultCollection = FIGMA_ALIAS_DEFAULTS[collectionName];
  if (defaultCollection && collections[defaultCollection]?.has(normalizedInner)) return null;

  return `${defaultCollection ?? collectionName}/${normalizedInner}`;
}

function scanFigmaAliasResolution() {
  const violations = [];
  let manifest;
  let collections;

  try {
    ({ manifest, collections } = collectFigmaCollections());
  } catch {
    return violations;
  }

  for (const [collectionName, collectionDef] of Object.entries(manifest.collections ?? {})) {
    for (const files of Object.values(collectionDef.modes ?? {})) {
      for (const fileName of files) {
        const filePath = join(FIGMA_DIR, fileName);
        const content = readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
          for (const match of lines[i].matchAll(/"\$value"\s*:\s*"\{([^}]+)\}"/g)) {
            const missing = resolveFigmaAlias(match[1].trim(), collectionName, collections);
            if (missing) {
              violations.push({
                file: relative(ROOT, filePath),
                line: i + 1,
                type: 'unresolved-figma-alias',
                value: `{${match[1].trim()}}`,
                hint: `Alias target ${missing} is not defined in the Figma token manifest`,
              });
            }
          }
        }
      }
    }
  }

  return violations;
}

function scanFigmaTokenTypeSanity() {
  const violations = [];
  const figmaFiles = collectFiles(FIGMA_DIR, ['.json']).filter((file) => {
    return /\/component-[^/]+-(light|dark)\.json$/.test(file);
  });
  const numericValueRe = /^var\(--(spacing|radius|opacity|z|input-size|input-icon|input-focus-ring-(offset|width)|button-size|dropdown-menu-(padding|item-height|item-padding|item-gap|min-width)|multi-select-)/;
  const stringValueRe = /^var\(--shadow/;

  function visit(value, pathParts, file, content) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return;

    if ('$value' in value && '$type' in value) {
      const tokenPath = pathParts.join('/');
      const tokenValue = value.$value;
      const type = value.$type;
      const line = lineOf(content, `"${pathParts[pathParts.length - 1]}"`);

      let expected;
      if (typeof tokenValue === 'number' && type === 'color') expected = 'number';
      else if (typeof tokenValue === 'string') {
        if (type === 'color' && numericValueRe.test(tokenValue)) expected = 'number';
        if (type === 'color' && stringValueRe.test(tokenValue)) expected = 'string';
      }

      if (expected && type !== expected) {
        violations.push({
          file: relative(ROOT, file),
          line,
          type: 'figma-token-type',
          value: `${tokenPath} uses $type "${type}" for ${JSON.stringify(tokenValue)}`,
          hint: `Use $type "${expected}" so Figma imports this token into the correct variable type`,
        });
      }
      return;
    }

    for (const [childName, childValue] of Object.entries(value)) {
      visit(childValue, [...pathParts, childName], file, content);
    }
  }

  for (const filePath of figmaFiles) {
    let json;
    let content;
    try {
      content = readFileSync(filePath, 'utf8');
      json = JSON.parse(content);
    } catch {
      continue;
    }
    visit(json, [], filePath, content);
  }

  return violations;
}

function lineOf(content, needle) {
  const index = content.indexOf(needle);
  if (index === -1) return 0;
  return content.slice(0, index).split('\n').length;
}

function scanFigmaSemanticColorNaming() {
  const violations = [];
  const files = [
    join(FIGMA_DIR, 'colors-semantic-light.json'),
    join(FIGMA_DIR, 'colors-semantic-dark.json'),
  ];

  for (const filePath of files) {
    let json;
    let content;
    try {
      content = readFileSync(filePath, 'utf8');
      json = JSON.parse(content);
    } catch {
      continue;
    }

    for (const legacyGroup of FIGMA_LEGACY_COLOR_GROUPS) {
      if (json[legacyGroup]) {
        violations.push({
          file: relative(ROOT, filePath),
          line: lineOf(content, `"${legacyGroup}"`),
          type: 'figma-semantic-color-group',
          value: legacyGroup,
          hint: legacyGroup === 'fg'
            ? 'Rename the Figma color group to "foreground"; keep leaf names as fg-*'
            : 'Rename the Figma color group to "background"; keep leaf names as bg-*',
        });
      }
    }

    for (const [groupName, prefix] of Object.entries(FIGMA_COLOR_GROUP_PREFIXES)) {
      const group = json[groupName];
      if (!group || typeof group !== 'object' || Array.isArray(group)) {
        violations.push({
          file: relative(ROOT, filePath),
          line: 0,
          type: 'figma-semantic-color-group',
          value: groupName,
          hint: `Define the "${groupName}" color group in colors-semantic files`,
        });
        continue;
      }

      for (const tokenName of Object.keys(group)) {
        if (!tokenName.startsWith(prefix)) {
          violations.push({
            file: relative(ROOT, filePath),
            line: lineOf(content, `"${tokenName}"`),
            type: 'figma-semantic-color-prefix',
            value: `${groupName}/${tokenName}`,
            hint: `Leaf token names in "${groupName}" must start with "${prefix}"`,
          });
        }
      }
    }

    const background = json.background || {};
    for (const intent of FIGMA_BACKGROUND_INTENTS) {
      const expected = new Set(
        FIGMA_BACKGROUND_INTENT_SUFFIXES.map((suffix) => `bg-${intent}-${suffix}`),
      );
      const actual = Object.keys(background).filter((tokenName) => {
        return tokenName === `bg-${intent}` || tokenName.startsWith(`bg-${intent}-`);
      });

      for (const tokenName of actual) {
        if (!expected.has(tokenName)) {
          violations.push({
            file: relative(ROOT, filePath),
            line: lineOf(content, `"${tokenName}"`),
            type: 'figma-background-intent-name',
            value: `background/${tokenName}`,
            hint: `Use only bg-${intent}-subtle, bg-${intent}-surface, and bg-${intent}-strong`,
          });
        }
      }

      for (const tokenName of expected) {
        if (!background[tokenName]) {
          violations.push({
            file: relative(ROOT, filePath),
            line: 0,
            type: 'figma-background-intent-missing',
            value: `background/${tokenName}`,
            hint: `Background intent "${intent}" must include subtle, surface, and strong tokens`,
          });
        }
      }
    }
  }

  const figmaFiles = collectFiles(FIGMA_DIR, ['.json']);
  for (const filePath of figmaFiles) {
    const content = readFileSync(filePath, 'utf8');
    const legacyAliasRe = /\{Color modes\/(fg|bg)\//g;
    let match;
    while ((match = legacyAliasRe.exec(content)) !== null) {
      violations.push({
        file: relative(ROOT, filePath),
        line: lineOf(content, match[0]),
        type: 'figma-legacy-color-alias',
        value: match[0],
        hint: match[1] === 'fg'
          ? 'Use {Color modes/foreground/fg-*}'
          : 'Use {Color modes/background/bg-*}',
      });
    }
  }

  return violations;
}

// ── Run all checks ──────────────────────────────────────────────────────────
const cssFiles = SCAN_DIRS.flatMap(d => collectCssFiles(join(ROOT, d)));
const sourceFiles = SCAN_DIRS.flatMap(d => collectSourceFiles(join(ROOT, d)));

const violations = [
  ...cssFiles.flatMap(f => scanFile(f)),
  ...sourceFiles.flatMap(f => scanLegacyNames(f)),
  ...scanCrossLayerDrift(),
  ...scanCssVarResolution(),
  ...scanFigmaAliasResolution(),
  ...scanFigmaTokenTypeSanity(),
  ...scanFigmaSemanticColorNaming(),
];

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
