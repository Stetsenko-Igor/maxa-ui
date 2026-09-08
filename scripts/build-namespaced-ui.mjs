import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { namespaceCss, namespaceJs } from './lib/namespace.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'packages/ui/dist')
const output = join(source, 'namespaced')
async function project(relative = '') {
  for (const entry of await readdir(join(source, relative), { withFileTypes: true })) {
    if (!relative && entry.name === 'namespaced') continue
    const path = join(relative, entry.name)
    if (entry.isDirectory()) { await project(path); continue }
    // Transformed outputs must not point at source maps for the legacy build.
    if (!entry.name.endsWith('.css') && !entry.name.endsWith('.js') && !entry.name.endsWith('.d.ts')) continue
    const content = await readFile(join(source, path), 'utf8')
    const transformed = entry.name.endsWith('.css') ? namespaceCss(content) : namespaceJs(content)
    const destination = join(output, path)
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, transformed)
  }
}
await project()
console.log('Generated namespaced React/CSS distribution (legacy output preserved).')
