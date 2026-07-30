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

// ── CSS var(--x) → Figma alias conversion ───────────────────────────────────
//
// Only covers vocabularies confirmed to have a 1:1 (or resolvable) Figma
// counterpart. Values with no known mapping are returned unconverted (still
// literal var() text) rather than guessed — see docs/color-token-naming-migration
// history and the 2026-07-30 Table bug fix for the categories intentionally left
// out (cross-component token refs, opacity/z-index/shadow — no Figma variable
// equivalent exists for those yet).

const SEMANTIC_COLOR_GROUPS = {
  text: "text",
  border: "border",
  action: "action",
  fg: "foreground",
  bg: "background",
}

const RADIUS_KEYS = new Set(["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"])

const SPACING_NAMED_KEYS = new Set([
  "none", "xxs", "xs", "sm", "md", "lg", "xl",
  "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl", "10xl", "11xl",
])

// Legacy numeric spacing scale (packages/tokens/src/dimensions.css) -> px value.
const SPACING_NUMERIC_PX = {
  1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 9: 36,
  10: 40, 11: 44, 12: 48, 14: 56, 16: 64, 20: 80, 24: 96, 32: 128,
}

// px value -> Figma named Spacing scale suffix. Not every numeric-scale value has
// a named counterpart (e.g. 28px/36px/44px/56px fall in gaps) — those are left
// unconverted on purpose.
const SPACING_PX_TO_KEY = {
  0: "none", 2: "xxs", 4: "xs", 6: "sm", 8: "md", 12: "lg", 16: "xl",
  20: "2xl", 24: "3xl", 32: "4xl", 40: "5xl", 48: "6xl", 64: "7xl",
  80: "8xl", 96: "9xl", 128: "10xl", 160: "11xl",
}

const FONT_WEIGHT_KEYS = new Set([
  "regular", "regular-italic", "medium", "medium-italic",
  "semibold", "semibold-italic", "bold", "bold-italic",
])

const FONT_FAMILY_KEYS = new Set(["body", "mono"])

const FONT_SIZE_KEYS = new Set([
  "heading-2xl", "heading-xl", "heading-lg", "heading-md", "heading-sm", "heading-xs",
  "text-lg", "text-md", "text-sm", "caption-sm", "caption-xs",
])

const BARE_TEXT_SIZE_SUFFIXES = new Set(["sm", "md", "lg"])


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

  // Component token authors sometimes write the same CSS var() reference the
  // component's own .css file uses (e.g. "var(--color-action-neutral-subtle-hover)")
  // instead of the Figma alias syntax ("{Color modes/action/action-neutral-subtle-hover}").
  // The importer's isAlias() only recognizes the {...} form, so a literal var(--x)
  // string gets created as a plain text Variable instead of a real binding — this
  // was the root cause of the Table row-bg-hover/etc. bug (2026-07-30). Convert the
  // known-mappable var() forms here so authors can use either syntax.
  const cssVarAlias = convertCssVarToAlias(rawValue)
  if (cssVarAlias) return cssVarAlias

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

/**
 * Converts a literal CSS custom-property reference, e.g. "var(--color-action-primary)",
 * into the Figma alias syntax the importer's isAlias()/parseAliasPath() expect, e.g.
 * "{Color modes/action/action-primary}". Returns null when the value isn't a var()
 * reference, or has no confirmed Figma-side counterpart (caller keeps the original text).
 */
function convertCssVarToAlias(rawValue) {
  const match = /^var\((--[a-z0-9-]+)\)$/.exec(rawValue.trim())
  if (!match) return null
  const name = match[1].slice(2) // strip leading "--"

  if (name.startsWith("color-")) {
    const rest = name.slice("color-".length)
    for (const [prefix, figmaGroup] of Object.entries(SEMANTIC_COLOR_GROUPS)) {
      if (rest === prefix || rest.startsWith(`${prefix}-`)) {
        return `{Color modes/${figmaGroup}/${rest}}`
      }
    }
    // Not a semantic group -> treat as a raw primitive palette reference, e.g.
    // "neutral-0" -> Primitives collection, "Colors/Neutral/0" (dot notation
    // resolves via aliasDefaults, matching how colors-semantic-*.json already
    // references primitives).
    const primitiveMatch = /^([a-z]+)-(.+)$/.exec(rest)
    if (!primitiveMatch) return null
    const scale = primitiveMatch[1][0].toUpperCase() + primitiveMatch[1].slice(1)
    return `{Colors.${scale}.${primitiveMatch[2]}}`
  }

  if (name.startsWith("radius-")) {
    const suffix = name.slice("radius-".length)
    return RADIUS_KEYS.has(suffix) ? `{Radius/radius-${suffix}}` : null
  }

  if (name.startsWith("spacing-")) {
    const suffix = name.slice("spacing-".length)
    if (SPACING_NAMED_KEYS.has(suffix)) return `{Spacing/spacing-${suffix}}`
    const numeric = Number(suffix)
    if (!Number.isFinite(numeric)) return null
    const px = SPACING_NUMERIC_PX[numeric]
    const namedKey = px !== undefined ? SPACING_PX_TO_KEY[px] : undefined
    return namedKey ? `{Spacing/spacing-${namedKey}}` : null
  }

  if (name.startsWith("font-weight-")) {
    const suffix = name.slice("font-weight-".length)
    return FONT_WEIGHT_KEYS.has(suffix) ? `{Typography/Font weight/${suffix}}` : null
  }

  if (name.startsWith("font-")) {
    const suffix = name.slice("font-".length)
    return FONT_FAMILY_KEYS.has(suffix) ? `{Typography/Font family/${suffix}}` : null
  }

  const lineHeightSuffix = "--line-height"
  if (name.startsWith("text-") && name.endsWith(lineHeightSuffix)) {
    const bare = name.slice("text-".length, -lineHeightSuffix.length)
    const key = BARE_TEXT_SIZE_SUFFIXES.has(bare) ? `text-${bare}` : bare
    return FONT_SIZE_KEYS.has(key) ? `{Typography/Line height/${key}}` : null
  }

  if (name.startsWith("text-")) {
    const bare = name.slice("text-".length)
    const key = BARE_TEXT_SIZE_SUFFIXES.has(bare) ? `text-${bare}` : bare
    return FONT_SIZE_KEYS.has(key) ? `{Typography/Font size/${key}}` : null
  }

  return null
}
