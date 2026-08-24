import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(scriptsDir, "../out")
const basePath = process.argv[2] ?? ""
const expectedAssetPrefix = `${basePath}/_next/`

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return collectHtmlFiles(entryPath)
      return entry.name.endsWith(".html") ? [entryPath] : []
    }),
  )

  return files.flat()
}

if (basePath && (!basePath.startsWith("/") || basePath.endsWith("/"))) {
  throw new Error(`Invalid static export base path: ${basePath}`)
}

const htmlFiles = await collectHtmlFiles(outDir)
const invalidReferences = []

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8")
  const assetReferences = Array.from(
    html.matchAll(/(?:href|src)="([^\"]*\/_next\/[^\"]*)"/g),
    (match) => match[1],
  )

  if (assetReferences.length === 0) {
    invalidReferences.push(`${path.relative(outDir, file)}: no Next.js asset references`)
    continue
  }

  for (const reference of assetReferences) {
    if (!reference.startsWith(expectedAssetPrefix)) {
      invalidReferences.push(`${path.relative(outDir, file)}: ${reference}`)
    }
  }
}

if (invalidReferences.length > 0) {
  throw new Error(
    `Static export contains references outside ${expectedAssetPrefix}:\n${invalidReferences.join("\n")}`,
  )
}

console.log(
  `Verified ${htmlFiles.length} static HTML files with asset prefix ${expectedAssetPrefix}.`,
)
