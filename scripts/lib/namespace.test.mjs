import assert from 'node:assert/strict'
import test from 'node:test'
import { namespaceCss, namespaceJs } from './namespace.mjs'

test('CSS projection covers owned variables, theme selectors and animations without touching vendors or text', () => {
  const css = `/* --color-example */
:root { --color-action: #0576da; --text-md--line-height: 20px; }
[data-theme="dark"] .maxa-button--primary {
  --_local: var(--color-action); color: var(--_local);
  width: var(--radix-popover-trigger-width); content: "--color-action data-theme";
  animation: toast-in 100ms ease;
}
@keyframes toast-in { to { opacity: 1; } }
@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }`
  const result = namespaceCss(css)
  assert.match(result, /--maxa-text-md--line-height: 20px/)
  assert.match(result, /\[data-maxa-theme="dark"\] \.maxa-button--primary/)
  assert.match(result, /--maxa-_local: var\(--maxa-color-action\)/)
  assert.match(result, /var\(--radix-popover-trigger-width\)/)
  assert.match(result, /content: "--color-action data-theme"/)
  assert.match(result, /animation: maxa-toast-in/)
  assert.match(result, /@keyframes maxa-toast-in/)
  assert.match(result, /@property --maxa-angle/)
  assert.match(result, /\/\* --color-example \*\//)
})

test('runtime JS projection includes dynamic helper and inline sizing expressions', () => {
  const result = namespaceJs('const v = `var(--spacing-${token})`; const w = "var(--table-checkbox-cell-width)"; const r="var(--radix-width)";\n//# sourceMappingURL=old.js.map')
  assert.ok(result.includes('`var(--maxa-spacing-${token})`'))
  assert.ok(result.includes('"var(--maxa-table-checkbox-cell-width)"'))
  assert.ok(result.includes('"var(--radix-width)"'))
  assert.ok(!result.includes('sourceMappingURL'))
})
