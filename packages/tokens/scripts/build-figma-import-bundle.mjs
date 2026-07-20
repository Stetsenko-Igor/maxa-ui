import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const figmaDir = path.resolve(__dirname, "../figma")
const manifestPath = path.join(figmaDir, "manifest.json")
const shadowEffectsPath = path.join(figmaDir, "effects-shadows.json")
const outputPath = path.join(figmaDir, "import-bundle.json")

const aliasDefaults = {
  Spacing: "Primitives",
  "Color modes": "Primitives",
  "Component-based": "Primitives",
  Layout: "Spacing",
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const bundle = {
  aliasDefaults,
  collections: {},
  effects: {},
}

for (const [collectionName, collectionDef] of Object.entries(manifest.collections)) {
  const modes = {}
  // Descriptions are mode-independent (a Figma variable has one description, not
  // one per mode). Collect the first non-empty $description seen for each token
  // path across all mode files, so authors only need to write it in one file
  // (conventionally the light mode source).
  const descriptions = {}

  for (const [modeName, files] of Object.entries(collectionDef.modes ?? {})) {
    const mergedTokens = {}

    for (const fileName of files) {
      const filePath = path.join(figmaDir, fileName)
      const json = JSON.parse(await readFile(filePath, "utf8"))
      flattenTokens(json, [], mergedTokens, collectionName, descriptions)
    }

    modes[modeName] = mergedTokens
  }

  bundle.collections[collectionName] =
    Object.keys(descriptions).length > 0 ? { modes, descriptions } : { modes }
}

try {
  bundle.effects.shadows = JSON.parse(await readFile(shadowEffectsPath, "utf8"))
} catch {
  delete bundle.effects
}

await mkdir(figmaDir, { recursive: true })
await writeFile(outputPath, `${JSON.stringify(bundle, null, 2)}\n`)

function flattenTokens(input, pathParts, output, collectionName, descriptions) {
  for (const [key, value] of Object.entries(input)) {
    const nextPath = [...pathParts, key]

    if (isToken(value)) {
      const tokenPath = nextPath.join("/")
      output[tokenPath] = normalizeTokenValue(value.$value, collectionName)
      if (descriptions && typeof value.$description === "string" && value.$description.trim() && !descriptions[tokenPath]) {
        descriptions[tokenPath] = value.$description.trim()
      }
      continue
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenTokens(value, nextPath, output, collectionName, descriptions)
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

  if (collectionName === "Layout" && inner.startsWith("spacing-")) {
    return `{Spacing/${inner}}`
  }

  if (collectionName === "Containers" && !inner.includes("/") && !inner.includes(".")) {
    return `{Spacing/${inner}}`
  }

  return rawValue
}
