import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { namespaceCss, namespaceJs } from './lib/namespace.mjs'

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? files(join(dir, entry.name)) : [join(dir, entry.name)])
}
test('all current UI CSS owned properties project consistently; vendor references remain', () => {
  for (const path of files('packages/ui/src').filter(path => path.endsWith('.css'))) {
    const source = readFileSync(path, 'utf8')
    const projected = namespaceCss(source)
    const code = projected.replace(/\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '')
    const vars = [...code.matchAll(/(?<![\w-])--[\w-]+/g)].map(match => match[0])
    assert.ok(vars.every(name => name.startsWith('--maxa-') || name.startsWith('--radix-')), path)
    for (const [vendor] of source.matchAll(/--radix-[\w-]+/g)) assert.ok(projected.includes(vendor), `${path}: ${vendor}`)
    assert.equal((projected.match(/var\(/g) ?? []).length, (source.match(/var\(/g) ?? []).length, path)
  }
})
test('runtime sources have no owned unprefixed var() references after projection', () => {
  for (const path of files('packages/ui/src').filter(path => /\.tsx?$/.test(path) && !path.includes('.test.'))) {
    const projected = namespaceJs(readFileSync(path, 'utf8'))
    for (const [, name] of projected.matchAll(/var\(\s*(--[\w-]+)/g)) {
      assert.ok(name.startsWith('--maxa-') || name.startsWith('--radix-'), `${path}: ${name}`)
    }
  }
})
