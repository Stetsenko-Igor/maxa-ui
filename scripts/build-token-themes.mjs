#!/usr/bin/env node
/** Generate opt-in namespaced core/complete-theme assets; canonical and legacy CSS stay unchanged. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sourceFiles, parseFile } from './generate-tokens-reference.mjs'
import { namespaceCss } from './lib/namespace.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(ROOT, 'packages/tokens/src')
const OUTPUT = join(ROOT, 'packages/tokens/dist/namespaced')
const ownership = JSON.parse(readFileSync(join(ROOT, 'packages/tokens/theme-ownership.json'), 'utf8'))

export function collectTokens() {
  const tokens = []
  const seen = new Set()
  for (const file of sourceFiles()) {
    const parsed = parseFile(file)
    for (const entry of parsed.lightEntries) {
      if (entry.kind !== 'token') continue
      if (seen.has(entry.name)) throw new Error(`Duplicate canonical token: ${entry.name}`)
      seen.add(entry.name)
      tokens.push({ name: entry.name, source: relative(SOURCE, file).split('\\').join('/'), light: entry.value, dark: parsed.darkValues.get(entry.name) ?? null })
    }
    for (const name of parsed.darkValues.keys()) {
      if (!parsed.lightEntries.some(entry => entry.kind === 'token' && entry.name === name)) throw new Error(`Dark-only token requires an explicit default: ${name}`)
    }
  }
  return tokens
}

function layer(token, manifest) {
  if (manifest.corePrimitiveSources.includes(token.source) || token.source === 'themes/maxa.css') return 'primitive'
  if (/^component-[^/]+\.css$/.test(token.source)) return 'component'
  if (token.source === 'semantic.css') return 'semantic'
  return 'foundation'
}

export function partitionTokens(tokens, manifest = ownership) {
  if (manifest.schemaVersion !== 1 || manifest.componentRecipes.sourcePattern !== 'component-*.css'
    || manifest.componentRecipes.valueForm !== 'single-variable-alias' || manifest.componentRecipes.requireBothModes !== true
    || manifest.componentFallbackOwner !== 'theme') throw new Error('Unsupported token ownership rules')
  const byName = new Map(tokens.map(token => [token.name, token]))
  if (byName.size !== tokens.length) throw new Error('Duplicate token ownership candidates')
  const core = []
  const theme = []
  for (const name of Object.keys(manifest.exceptions)) {
    if (!byName.has(name)) throw new Error(`Stale ownership exception: ${name}`)
  }
  for (const token of tokens) {
    let owner
    const exception = manifest.exceptions[token.name]
    if (exception) {
      if (!['core', 'theme'].includes(exception.owner) || !exception.reason?.trim()) throw new Error(`Ownership exception requires owner and reason: ${token.name}`)
      owner = exception.owner
    } else if (manifest.corePrimitiveSources.includes(token.source)) owner = 'core'
    else if (manifest.themeSources.includes(token.source)) owner = 'theme'
    else if (/^component-[^/]+\.css$/.test(token.source)) {
      const recipe = [token.light, token.dark ?? token.light].every(raw => {
        const match = raw.match(/^var\(\s*(--[\w-]+)\s*\)$/)
        const target = match && byName.get(match[1])
        return target && manifest.componentRecipes.targetLayers.includes(layer(target, manifest))
      })
      owner = recipe ? 'core' : manifest.componentFallbackOwner
    } else throw new Error(`Unclassified token source: ${token.source}`)
    ;(owner === 'core' ? core : theme).push(token)
  }
  return { core, theme }
}

function render(tokens, label) {
  const lines = [`/* Generated ${label}; logical values come from canonical token CSS. */`, ':root {']
  for (const token of tokens) lines.push(`  ${token.name}: ${token.light};`)
  lines.push('}')
  const dark = tokens.filter(token => token.dark !== null)
  if (dark.length) {
    lines.push('', '[data-theme="dark"] {')
    for (const token of dark) lines.push(`  ${token.name}: ${token.dark};`)
    lines.push('}')
  }
  return lines.join('\n') + '\n'
}

export function generateThemeOutputs() {
  const partitions = partitionTokens(collectTokens())
  const raw = { core: render(partitions.core, 'shared palette and component recipes'), theme: render(partitions.theme, 'complete MAXA theme decisions') }
  for (const [file, descriptor] of Object.entries(ownership.nonTokenStyles)) {
    const { owner, scope } = descriptor
    if (!['core', 'theme'].includes(owner) || scope !== 'maxa-components') throw new Error(`Invalid stylesheet ownership/scope: ${file}`)
    let css = readFileSync(join(SOURCE, file), 'utf8')
    // Scope the canonical universal motion guard without importing the UI package.
    // Match all HTML ASCII class separators, including multiline ERB attributes.
    const selector = String.raw`:where([class^="maxa-"], [class*=" maxa-"], [class*="\9 maxa-"], [class*="\a maxa-"], [class*="\c maxa-"], [class*="\d maxa-"])`
    const universalGuard = /\*,\s*\*::before,\s*\*::after\s*\{/g
    if ([...css.matchAll(universalGuard)].length !== 1) throw new Error(`Review changed motion guard selectors before scoping: ${file}`)
    css = css.replace(universalGuard, `${selector},\n  ${selector}::before,\n  ${selector}::after {`)
      .replace('global accessibility guard', 'component-local accessibility guard')
    raw[owner] += '\n' + css
  }
  return {
    core: namespaceCss(raw.core),
    theme: namespaceCss(raw.theme),
    bundle: '/* Complete MAXA theme with isolated CSS names. */\n@import "./core.css";\n@import "./themes/maxa.css";\n',
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const output = generateThemeOutputs()
  mkdirSync(join(OUTPUT, 'themes'), { recursive: true })
  writeFileSync(join(OUTPUT, 'core.css'), output.core)
  writeFileSync(join(OUTPUT, 'themes/maxa.css'), output.theme)
  writeFileSync(join(OUTPUT, 'theme.css'), output.bundle)
  const { core, theme } = partitionTokens(collectTokens())
  console.log(`✓ Generated namespaced token assets (${core.length} core, ${theme.length} complete MAXA theme tokens).`)
}
