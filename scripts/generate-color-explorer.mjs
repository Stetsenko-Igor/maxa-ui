#!/usr/bin/env node
/** Build the read-only color explorer graph from native token and component CSS. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sourceFiles, parseFile } from './generate-tokens-reference.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUTPUT = join(ROOT, 'apps/docs/app/docs/foundations/colors/explorer.generated.json')

// Leave quoted strings intact when stripping comments, and ignore quoted var() text.
const quotedOrComment = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\*[\s\S]*?\*\//g
const stripComments = value => value.replace(quotedOrComment, part => part.startsWith('/*') ? ' ' : part)
const references = value => [...new Set([...stripComments(value)
  .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '')
  .matchAll(/\bvar\(\s*(--[\w-]+)/g)].map(match => match[1]))]

/** Resolve exact aliases; preserve supported literal leaves, never fabricate an evaluated expression. */
export function resolveToken(name, values, active = new Set()) {
  if (active.has(name) || !values.has(name)) return null
  const raw = values.get(name).trim()
  const alias = raw.match(/^var\(\s*(--[\w-]+)\s*\)$/)
  if (alias) return resolveToken(alias[1], values, new Set([...active, name]))
  if (references(raw).length) return null
  // These leaves do not need expression evaluation. Everything else with a function stays unresolved.
  if (raw.includes('(') && !/^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\([\d\s.,%+/-]+\)$/i.test(raw)) return null
  return raw || null
}

function isColor(value) {
  return value !== null && (/^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(value)
    || /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/i.test(value)
    || /^(?:transparent|currentcolor|white|black)$/i.test(value))
}

/** Read direct CSS references with a delimiter scanner that respects strings/functions. */
export function extractConsumers(input, component) {
  const css = stripComments(input)
  const stack = []
  const consumers = []
  let start = 0
  let quote = null
  let parentheses = 0
  const declaration = end => {
    const text = css.slice(start, end).trim()
    const match = text.match(/^([\w-]+)\s*:\s*([\s\S]*)$/)
    if (!match || !stack.length) return
    const rules = stack.filter(rule => !rule.startsWith('@') || /^@(?:-webkit-)?keyframes\b/.test(rule))
    const selector = rules.join(' → ')
    if (!selector) return
    for (const name of references(match[2])) consumers.push({ name, component, selector, property: match[1] })
  }
  for (let index = 0; index < css.length; index++) {
    const char = css[index]
    if (quote) {
      if (char === '\\') index++
      else if (char === quote) quote = null
      continue
    }
    if (char === '"' || char === "'") { quote = char; continue }
    if (char === '(' || char === '[') { parentheses++; continue }
    if (char === ')' || char === ']') { parentheses--; continue }
    if (parentheses) continue
    if (char === '{') {
      stack.push(css.slice(start, index).trim().replace(/\s+/g, ' '))
      start = index + 1
    } else if (char === ';') {
      declaration(index)
      start = index + 1
    } else if (char === '}') {
      declaration(index)
      stack.pop()
      start = index + 1
    }
  }
  return consumers
}

function cssFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en')).flatMap(entry => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? cssFiles(path) : entry.name.endsWith('.css') ? [path] : []
  })
}

function classification(file, name) {
  const stem = basename(file, '.css')
  if (stem === 'primitives' || stem === 'maxa') return { layer: 'primitive', group: name.replace(/^--color-/, '').split('-')[0] }
  if (stem.startsWith('component-')) return { layer: 'component', group: stem.slice('component-'.length) }
  if (stem === 'semantic') {
    const role = name.replace(/^--color-/, '').split('-')[0]
    return { layer: 'semantic', group: name.startsWith('--color-focus-ring') ? 'focus-rings' : ({ bg: 'background', fg: 'foreground' }[role] ?? role) }
  }
  return { layer: 'foundation', group: stem }
}

export function generateExplorer() {
  const entries = new Map()
  const light = new Map()
  const darkOverrides = new Map()
  for (const file of sourceFiles()) {
    const parsed = parseFile(file)
    for (const entry of parsed.lightEntries) {
      if (entry.kind !== 'token') continue
      entries.set(entry.name, { ...classification(file, entry.name), source: relative(ROOT, file).split('\\').join('/') })
      light.set(entry.name, entry.value)
    }
    for (const [name, value] of parsed.darkValues) darkOverrides.set(name, value)
  }
  const dark = new Map([...light, ...darkOverrides])
  const usage = new Map()
  for (const file of cssFiles(join(ROOT, 'packages/ui/src/components'))) {
    const component = relative(join(ROOT, 'packages/ui/src/components'), file).split(/[\\/]/)[0]
    for (const { name, ...consumer } of extractConsumers(readFileSync(file, 'utf8'), component)) {
      const consumers = usage.get(name) ?? []
      if (!consumers.some(item => item.component === consumer.component && item.selector === consumer.selector && item.property === consumer.property)) consumers.push(consumer)
      usage.set(name, consumers)
    }
  }
  return { tokens: [...entries].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([name, metadata]) => {
    const mode = values => ({ raw: values.get(name), resolved: resolveToken(name, values), references: references(values.get(name)) })
    const lightValue = mode(light)
    const darkValue = mode(dark)
    return {
      name, ...metadata,
      color: name.startsWith('--color-') || isColor(lightValue.resolved) || isColor(darkValue.resolved),
      light: lightValue, dark: darkValue, consumers: usage.get(name) ?? [],
    }
  }) }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const content = JSON.stringify(generateExplorer(), null, 2) + '\n'
  if (process.argv.includes('--check')) {
    let existing = ''
    try { existing = readFileSync(OUTPUT, 'utf8') } catch (error) { if (error.code !== 'ENOENT') throw error }
    if (existing !== content) {
      console.error('Color explorer data is stale. Run: node scripts/generate-color-explorer.mjs')
      process.exitCode = 1
    } else console.log('✓ Color explorer data is up to date.')
  } else {
    writeFileSync(OUTPUT, content)
    console.log(`✓ Generated color explorer data (${JSON.parse(content).tokens.length} tokens).`)
  }
}
