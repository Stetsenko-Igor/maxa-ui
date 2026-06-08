import { rm } from "node:fs/promises"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const packageDir = process.argv[2]

if (!packageDir) {
  console.error("Usage: node ../../scripts/clean-package-dist.mjs <package-dir>")
  process.exit(1)
}

const targetDir = join(root, packageDir, "dist")
await rm(targetDir, { recursive: true, force: true })
console.log(`Removed ${relative(root, targetDir)}`)
