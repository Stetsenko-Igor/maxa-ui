import { cp, mkdir, readdir } from "node:fs/promises"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const packageDir = process.argv[2]

if (!packageDir) {
  console.error("Usage: node ../../scripts/copy-css-assets.mjs <package-dir>")
  process.exit(1)
}

const sourceDir = join(root, packageDir, "src")
const targetDir = join(root, packageDir, "dist")

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(path)))
      continue
    }
    if (entry.isFile() && entry.name.endsWith(".css")) {
      files.push(path)
    }
  }

  return files
}

const cssFiles = await walk(sourceDir)

await Promise.all(
  cssFiles.map(async (source) => {
    const destination = join(targetDir, relative(sourceDir, source))
    await mkdir(dirname(destination), { recursive: true })
    await cp(source, destination)
  }),
)

console.log(
  `Copied ${cssFiles.length} CSS asset${cssFiles.length === 1 ? "" : "s"} to ${relative(root, targetDir)}`,
)
