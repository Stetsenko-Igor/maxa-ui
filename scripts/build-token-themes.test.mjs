import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { collectTokens, partitionTokens, generateThemeOutputs } from './build-token-themes.mjs'

const canonical = collectTokens()

test('ownership partitions all 1762 tokens exactly once without losing either mode', () => {
  const { core, theme } = partitionTokens(canonical)
  assert.equal(core.length + theme.length, 1762)
  assert.equal(new Set([...core, ...theme].map(token => token.name)).size, 1762)
  const combined = [...core, ...theme].sort((a, b) => a.name.localeCompare(b.name))
  assert.deepEqual(combined, [...canonical].sort((a, b) => a.name.localeCompare(b.name)))
  assert.ok(core.some(token => token.name === '--color-blue-500'))
  assert.ok(core.some(token => token.name === '--button-primary-bg'))
  for (const name of ['--color-brand-500', '--color-action-primary', '--font-body', '--radius-md', '--button-size-md-height', '--nav-bg', '--toast-viewport-width']) {
    assert.ok(theme.some(token => token.name === name), `${name} must be an explicit theme choice`)
  }
})

test('core contains only shared primitives and component single-alias recipes in both modes', () => {
  const { core } = partitionTokens(canonical)
  const primitives = new Set(canonical.filter(token => token.source === 'primitives.css').map(token => token.name))
  for (const token of core.filter(token => token.source !== 'primitives.css')) {
    for (const raw of [token.light, token.dark ?? token.light]) {
      const alias = raw.match(/^var\((--[\w-]+)\)$/)
      assert.ok(alias, token.name)
      assert.ok(!primitives.has(alias[1]), `${token.name} directly chooses a palette value`)
    }
  }
})

test('all recipe dependencies are satisfied by the full theme composition', () => {
  const { core, theme } = partitionTokens(canonical)
  const defined = new Set([...core, ...theme].map(token => token.name))
  for (const token of [...core, ...theme]) {
    for (const raw of [token.light, token.dark ?? token.light]) {
      for (const match of raw.matchAll(/var\(\s*(--[\w-]+)/g)) assert.ok(defined.has(match[1]), `${token.name} → ${match[1]}`)
    }
  }
})

test('generated CSS reconstructs every raw light and dark value after removing its namespace', () => {
  const { core, theme, bundle } = generateThemeOutputs()
  const combined = `${core}\n${theme}`.replaceAll('--maxa-', '--')
  const actual = new Map()
  for (const match of combined.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    const values = actual.get(match[1]) ?? []
    values.push(match[2].trim())
    actual.set(match[1], values)
  }
  assert.equal(actual.size, canonical.length)
  for (const token of canonical) assert.deepEqual(actual.get(token.name), token.dark === null ? [token.light] : [token.light, token.dark], token.name)
  assert.match(theme, /\[data-maxa-theme="dark"\]/)
  assert.doesNotMatch(core + theme, /\[data-theme=/)
  assert.match(theme, /prefers-reduced-motion/)
  assert.equal(bundle, '/* Complete MAXA theme with isolated CSS names. */\n@import "./core.css";\n@import "./themes/maxa.css";\n')
})

test('legacy entrypoints remain available alongside explicit namespaced exports', () => {
  const manifest = JSON.parse(readFileSync(new URL('../packages/tokens/package.json', import.meta.url), 'utf8'))
  assert.equal(manifest.exports['./core.css'], './dist/core.css')
  assert.equal(manifest.exports['./themes/maxa.css'], './dist/themes/maxa.css')
  for (const file of ['core.css', 'theme.css', 'themes/maxa.css']) assert.equal(manifest.exports[`./namespaced/${file}`], `./dist/namespaced/${file}`)
})

test('namespaced reduced-motion guard targets only MAXA classes across HTML whitespace', () => {
  const { theme } = generateThemeOutputs()
  const motion = theme.slice(theme.indexOf('@media (prefers-reduced-motion: reduce)'))
  assert.ok(motion.startsWith('@media'))
  assert.doesNotMatch(motion, /(?:^|[\n,])\s*\*(?:::before|::after)?\s*[,\{]/)
  for (const selector of ['[class^="maxa-"]', '[class*=" maxa-"]', '[class*="\\9 maxa-"]', '[class*="\\a maxa-"]', '[class*="\\c maxa-"]', '[class*="\\d maxa-"]']) {
    assert.ok(motion.includes(selector), selector)
  }
  assert.match(motion, /\)::before/)
  assert.match(motion, /\)::after/)
  assert.match(motion, /animation-duration: 0\.01ms !important;/)
  const legacy = readFileSync(new URL('../packages/tokens/src/motion.css', import.meta.url), 'utf8')
  assert.match(legacy, /\*,\s*\*::before,\s*\*::after/)
})
