import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const figmaDir = path.resolve(__dirname, "../figma")
const manifestPath = path.join(figmaDir, "manifest.json")
const outputPath = path.join(figmaDir, "import-bundle.json")

const aliasDefaults = {
  Spacing: "Primitives",
  "Color modes": "Primitives",
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const bundle = {
  aliasDefaults,
  collections: {},
}

for (const [collectionName, collectionDef] of Object.entries(manifest.collections)) {
  const modes = {}

  for (const [modeName, files] of Object.entries(collectionDef.modes ?? {})) {
    const mergedTokens = {}

    for (const fileName of files) {
      const filePath = path.join(figmaDir, fileName)
      const json = JSON.parse(await readFile(filePath, "utf8"))
      flattenTokens(json, [], mergedTokens, collectionName)
    }

    modes[modeName] = mergedTokens
  }

  bundle.collections[collectionName] = { modes }
}

await mkdir(figmaDir, { recursive: true })
await writeFile(outputPath, `${JSON.stringify(bundle, null, 2)}\n`)

function flattenTokens(input, pathParts, output, collectionName) {
  for (const [key, value] of Object.entries(input)) {
    const nextPath = [...pathParts, key]

    if (isToken(value)) {
      output[nextPath.join("/")] = normalizeTokenValue(value.$value, collectionName)
      continue
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenTokens(value, nextPath, output, collectionName)
    }
  }
}

function isToken(value) {
  return Boolean(value && typeof value === "object" && "$value" in value && "$type" in value)
}

function normalizeTokenValue(rawValue, collectionName) {
  if (typeof rawValue !== "string") return rawValue
  if (!rawValue.startsWith("{") || !rawValue.endsWith("}")) return rawValue

  const inner = rawValue.slice(1, -1).trim()

  if (collectionName === "Containers" && !inner.includes("/") && !inner.includes(".")) {
    return `{Spacing/${inner}}`
  }

  return rawValue
}
