import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { generateExplorer, resolveToken, extractConsumers } from './generate-color-explorer.mjs'

test('aliases resolve transitively using the selected mode and missing/cyclic expressions stay unresolved', () => {
  const light = new Map([
    ['--primitive', '#112233'], ['--semantic', 'var(--primitive)'], ['--component', 'var(--semantic)'],
    ['--cycle-a', 'var(--cycle-b)'], ['--cycle-b', 'var(--cycle-a)'],
    ['--missing', 'var(--absent)'], ['--expression', 'color-mix(in srgb, var(--primitive), white)'],
  ])
  assert.equal(resolveToken('--component', light), '#112233')
  const dark = new Map([...light, ['--primitive', '#445566']])
  assert.equal(resolveToken('--component', dark), '#445566')
  for (const name of ['--cycle-a', '--missing', '--expression', '--absent']) {
    assert.equal(resolveToken(name, light), null, name)
  }
})

test('consumer extraction preserves selectors, declarations, media rules and keyframes without reading comments or strings', () => {
  const consumers = extractConsumers(`
/* .fake { color: var(--comment); } */
.button, .button:focus { color: var(--text); background: var(--background); content: "var(--quoted);{}"; }
@media (forced-colors: active) { .button:hover { outline: 2px solid var(--focus); } }
@keyframes enter { to { transform: translateX(var(--offset)); } }
`, 'button')
  assert.deepEqual(consumers, [
    { name: '--text', component: 'button', selector: '.button, .button:focus', property: 'color' },
    { name: '--background', component: 'button', selector: '.button, .button:focus', property: 'background' },
    { name: '--focus', component: 'button', selector: '.button:hover', property: 'outline' },
    { name: '--offset', component: 'button', selector: '@keyframes enter → to', property: 'transform' },
  ])
})

test('generated source graph covers the complete inventory and real button/color-mode contracts', () => {
  const data = generateExplorer()
  const token = name => data.tokens.find(item => item.name === name)
  assert.equal(data.tokens.length, 1748)
  assert.equal(new Set(data.tokens.map(item => item.name)).size, data.tokens.length)
  assert.equal(token('--button-primary-bg').layer, 'component')
  assert.equal(token('--button-primary-bg').group, 'button')
  assert.deepEqual(token('--button-primary-bg').light.references, ['--color-action-primary'])
  assert.equal(token('--button-primary-bg').light.resolved, '#0576da')
  assert.equal(token('--button-primary-bg').dark.resolved, '#0564b9')
  assert.ok(token('--button-primary-bg').consumers.some(item => item.component === 'button' && item.selector === '.maxa-button--primary' && item.property === 'background-color'))
  assert.equal(token('--color-blue-500').layer, 'primitive')
  assert.equal(token('--color-blue-500').color, true)
  assert.equal(token('--color-bg-page').group, 'background')
  assert.equal(token('--font-body').color, false)
  assert.equal(token('--spacing-1').color, false)
  assert.equal(token('--button-size-md-height').color, false)
  assert.equal(token('--color-action-primary').source, 'packages/tokens/src/semantic.css')
  assert.deepEqual(JSON.parse(readFileSync('apps/docs/app/docs/foundations/colors/explorer.generated.json', 'utf8')), data)
})
