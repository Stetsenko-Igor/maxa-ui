#!/usr/bin/env node
/**
 * Generates specs/tokens-reference.md from the token source CSS in
 * packages/tokens/src. The reference is the master index of every CSS
 * variable in the design system — it must never be hand-maintained.
 *
 * Usage:
 *   node scripts/generate-tokens-reference.mjs          # write the file
 *   node scripts/generate-tokens-reference.mjs --check  # exit 1 if stale
 *
 * Parsing rules:
 * - Tokens are collected from `:root` and `@theme` blocks (light mode).
 * - `[data-theme="dark"]` blocks mark tokens as having a dark override;
 *   the dark value is appended to the token's comment.
 * - Section comments of the form `/* ── Name ── *​/` inside a block are
 *   preserved as subsection separators.
 * - File order follows the `@import` order in theme.css so the reference
 *   reads in the same cascade order consumers load.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_DIR = join(ROOT, 'packages/tokens/src');
const THEME_CSS = join(TOKENS_DIR, 'theme.css');
const OUTPUT = join(ROOT, 'specs/tokens-reference.md');
const COLORS_DOC_OUTPUT = join(ROOT, 'apps/docs/app/docs/foundations/colors/tokens.generated.json');

const CHECK_MODE = process.argv.includes('--check');

/** Resolve the ordered list of source files from theme.css imports. */
function sourceFiles() {
  const theme = readFileSync(THEME_CSS, 'utf8');
  const files = [];
  for (const m of theme.matchAll(/@import\s+"\.\/(.+?)";/g)) {
    const path = join(TOKENS_DIR, m[1]);
    if (existsSync(path)) files.push(path);
  }
  return files;
}

/**
 * Parse one CSS file into { lightEntries, darkValues }.
 * lightEntries: array of { kind: 'token'|'section', ... } in source order.
 * darkValues: Map<tokenName, darkValue>.
 */
function parseFile(filePath) {
  const css = readFileSync(filePath, 'utf8');
  const lines = css.split('\n');

  const lightEntries = [];
  const darkValues = new Map();
  const seen = new Set();

  let mode = null; // 'light' | 'dark' | null
  let depth = 0;
  let pending = null; // multi-line declaration accumulator

  for (const rawLine of lines) {
    const line = rawLine;
    const trimmed = line.trim();

    if (mode === null) {
      if (/^:root\b/.test(trimmed) || /^@theme\b/.test(trimmed)) mode = 'light';
      else if (/\[data-theme="dark"\]/.test(trimmed)) mode = 'dark';
      if (mode !== null) {
        depth = (trimmed.match(/{/g) ?? []).length - (trimmed.match(/}/g) ?? []).length;
        if (depth <= 0) mode = null;
        continue;
      }
      continue;
    }

    depth += (trimmed.match(/{/g) ?? []).length - (trimmed.match(/}/g) ?? []).length;
    if (depth <= 0) {
      mode = null;
      pending = null;
      continue;
    }

    if (pending) {
      pending.value += ' ' + trimmed.replace(/;.*$/, '').trim();
      if (trimmed.includes(';')) {
        commit(pending);
        pending = null;
      }
      continue;
    }

    const section = trimmed.match(/^\/\*\s*[─-]{1,2}\s*(.+?)\s*[─-]*\s*\*\/$/);
    if (section && /[─]/.test(trimmed)) {
      if (mode === 'light') lightEntries.push({ kind: 'section', title: section[1].replace(/[─]+/g, '').trim() });
      continue;
    }

    const decl = trimmed.match(/^(--[\w-]+)\s*:\s*(.*)$/);
    if (!decl) continue;

    const name = decl[1];
    let rest = decl[2];
    if (!rest.includes(';')) {
      pending = { name, value: rest.trim(), comment: '' };
      continue;
    }

    const comment = rest.match(/\/\*\s*(.+?)\s*\*\//)?.[1] ?? '';
    const value = rest.replace(/;.*$/, '').trim();
    commit({ name, value, comment });
  }

  function commit({ name, value, comment }) {
    if (mode === 'dark') {
      darkValues.set(name, value);
      return;
    }
    if (seen.has(name)) return;
    seen.add(name);
    lightEntries.push({ kind: 'token', name, value, comment });
  }

  return { lightEntries, darkValues };
}

function fileTitle(filePath) {
  const name = basename(filePath, '.css');
  if (name.startsWith('component-')) {
    const component = name
      .slice('component-'.length)
      .split('-')
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join(' ');
    return `${component} Component Tokens`;
  }
  const titles = {
    primitives: 'Primitives',
    maxa: 'Brand Theme (Maxa)',
    semantic: 'Semantic Colors',
    dimensions: 'Dimensions (Spacing, Radius, Z-index, Breakpoints)',
    typography: 'Typography',
    shadows: 'Shadows',
    motion: 'Motion',
  };
  return titles[name] ?? name[0].toUpperCase() + name.slice(1);
}

function renderFile(filePath, { lightEntries, darkValues }) {
  if (!lightEntries.some((e) => e.kind === 'token')) return '';

  const rel = relative(ROOT, filePath);
  const out = [`## ${fileTitle(filePath)}`, '', `Source: \`${rel}\``, '', '```css'];

  const pad = Math.min(
    40,
    Math.max(...lightEntries.filter((e) => e.kind === 'token').map((e) => `${e.name}: ${e.value};`.length)) + 2,
  );

  let first = true;
  for (const entry of lightEntries) {
    if (entry.kind === 'section') {
      if (!first) out.push('');
      out.push(`/* ── ${entry.title} ── */`);
      first = false;
      continue;
    }
    const notes = [];
    if (entry.comment) notes.push(entry.comment);
    if (darkValues.has(entry.name)) notes.push(`dark: ${darkValues.get(entry.name)}`);
    const decl = `${entry.name}: ${entry.value};`;
    out.push(notes.length ? `${decl.padEnd(pad)}/* ${notes.join(' | ')} */` : decl);
    first = false;
  }

  out.push('```', '');
  return out.join('\n');
}

function generate() {
  const files = sourceFiles();
  const sections = [];
  let total = 0;

  for (const file of files) {
    const parsed = parseFile(file);
    total += parsed.lightEntries.filter((e) => e.kind === 'token').length;
    const rendered = renderFile(file, parsed);
    if (rendered) sections.push(rendered);
  }

  const header = [
    '# Token Reference — Master CSS Variable Index',
    '',
    '<!-- AUTO-GENERATED FILE — DO NOT EDIT BY HAND. -->',
    '<!-- Regenerate with: node scripts/generate-tokens-reference.mjs -->',
    '',
    'Complete index of every CSS variable in the design system, generated',
    'from `packages/tokens/src`. Values shown are light mode; tokens with a',
    '`[data-theme="dark"]` override carry a `dark:` note. For usage rules,',
    'see the foundation specs in `specs/foundations/` and component specs',
    'in `specs/components/`.',
    '',
    `Total tokens: ${total}`,
    '',
    '',
  ].join('\n');

  return header + sections.join('\n');
}

/**
 * Generates apps/docs .../colors/tokens.generated.json — the data behind the
 * docs Colors page. The page renders from this file instead of hand-written
 * arrays, so its coverage and values cannot drift from the CSS source.
 *
 * Shape: { neutralScale: Item[], groups: { text, foreground, border,
 * background, action, control, feedback }: Item[] }, where Item =
 * { name, lightValue, darkValue|null, lightHex, darkHex } (hex resolved
 * through the full var() chain; non-hex leaves like rgba()/transparent are
 * passed through as-is).
 */
function generateColorsDocData() {
  const light = new Map();
  const dark = new Map();
  for (const file of sourceFiles()) {
    const parsed = parseFile(file);
    for (const entry of parsed.lightEntries) {
      if (entry.kind === 'token' && !light.has(entry.name)) light.set(entry.name, entry.value);
    }
    for (const [name, value] of parsed.darkValues) {
      if (!dark.has(name)) dark.set(name, value);
    }
  }

  function resolve(value, map, fallback) {
    let current = value;
    for (let i = 0; i < 16 && typeof current === 'string'; i++) {
      const ref = current.match(/^var\((--[\w-]+)\)$/);
      if (!ref) return current;
      current = map.get(ref[1]) ?? fallback?.get(ref[1]);
      if (current === undefined) return value;
    }
    return current;
  }

  const item = (name) => ({
    name,
    lightValue: light.get(name),
    darkValue: dark.get(name) ?? null,
    lightHex: resolve(light.get(name), light),
    darkHex: resolve(dark.get(name) ?? light.get(name), dark, light),
  });

  const names = [...light.keys()];
  const group = (re) => names.filter((n) => re.test(n)).map(item);

  const neutralOrder = ['--color-base-white', '--color-base-ink', '--color-base-black'];
  const neutralScale = [
    ...neutralOrder.filter((n) => light.has(n)).map(item),
    ...names
      .filter((n) => /^--color-neutral-\d+$/.test(n))
      .sort((a, b) => Number(a.match(/\d+$/)[0]) - Number(b.match(/\d+$/)[0]))
      .map(item),
  ];

  return JSON.stringify(
    {
      $comment: 'AUTO-GENERATED by scripts/generate-tokens-reference.mjs — do not edit.',
      neutralScale,
      groups: {
        text: group(/^--color-text-(?!gray|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)/),
        foreground: group(/^--color-fg-/),
        border: group(/^--color-border-/),
        background: group(/^--color-bg-(?!gray|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)/),
        action: group(/^--color-action-/),
        control: group(/^--color-control-/),
        feedback: group(/^--color-feedback-/),
      },
    },
    null,
    2,
  ) + '\n';
}

const content = generate();
const colorsDocContent = generateColorsDocData();

if (CHECK_MODE) {
  const current = existsSync(OUTPUT) ? readFileSync(OUTPUT, 'utf8') : '';
  const currentColors = existsSync(COLORS_DOC_OUTPUT) ? readFileSync(COLORS_DOC_OUTPUT, 'utf8') : '';
  if (current !== content) {
    console.error('✗ specs/tokens-reference.md is stale.');
    console.error('  Run: node scripts/generate-tokens-reference.mjs');
    process.exit(1);
  }
  if (currentColors !== colorsDocContent) {
    console.error('✗ apps/docs .../colors/tokens.generated.json is stale.');
    console.error('  Run: node scripts/generate-tokens-reference.mjs');
    process.exit(1);
  }
  console.log('✓ specs/tokens-reference.md is up to date.');
  console.log('✓ docs colors data is up to date.');
} else {
  writeFileSync(OUTPUT, content);
  writeFileSync(COLORS_DOC_OUTPUT, colorsDocContent);
  const count = content.match(/Total tokens: (\d+)/)?.[1];
  console.log(`✓ Wrote specs/tokens-reference.md (${count} tokens).`);
  console.log('✓ Wrote apps/docs .../colors/tokens.generated.json.');
}
