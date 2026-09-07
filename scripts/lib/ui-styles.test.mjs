import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import test from 'node:test'

const root = fileURLToPath(new URL('../../', import.meta.url))
test('CSS-only entry includes every component stylesheet exactly once without global reset', async () => {
  const src = join(root, 'packages/ui/src')
  const expected = []
  async function walk(dir) {
    for (const entry of await readdir(join(src, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`
      if (entry.isDirectory()) await walk(path)
      else if (entry.name.endsWith('.css')) expected.push(`./${path}`)
    }
  }
  await walk('components')
  const css = await readFile(join(src, 'styles.css'), 'utf8')
  const imports = [...css.matchAll(/@import "([^"]+)";/g)].map(match => match[1])
  assert.deepEqual(imports, ["./normalize.css", ...expected.sort()])
  assert.equal(css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@import "[^"]+";/g, '').trim(), '')
  const manifest = JSON.parse(await readFile(join(root, 'packages/ui/package.json'), 'utf8'))
  assert.equal(manifest.exports['./styles.css'], './dist/styles.css')
})
