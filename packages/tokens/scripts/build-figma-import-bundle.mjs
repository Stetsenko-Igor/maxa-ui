import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const figmaDir = path.resolve(__dirname, "../figma")
const manifestPath = path.join(figmaDir, "manifest.json")
const shadowEffectsPath = path.join(figmaDir, "effects-shadows.json")
const outputPath = path.join(figmaDir, "import-bundle.json")
const checkOnly = process.argv.includes("--check")

const aliasDefaults = {
  Spacing: "Primitives",
  "Color modes": "Primitives",
  "Component-based": "Primitives",
  Layout: "Spacing",
}

// ── CSS var(--x) → Figma alias conversion ───────────────────────────────────
//
// Only covers vocabularies confirmed to have a 1:1 (or resolvable) Figma
// counterpart. The final bundle rejects every CSS expression that remains, so
// new token families must add an explicit alias/literal mapping instead of being
// silently imported as STRING variables.

const SEMANTIC_COLOR_GROUPS = {
  text: "text",
  border: "border",
  action: "action",
  fg: "foreground",
  bg: "background",
  control: "control",
}

// Decorative hue families (Badge/Tag appearance) live in Color modes/utility,
// not in the semantic background/text groups. Without this, a CSS reference
// like var(--color-bg-gray-muted) lands in `background/` and duplicates the
// utility variable.
const UTILITY_HUES = new Set([
  "gray", "slate", "zinc", "stone", "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet",
  "purple", "fuchsia", "pink", "rose",
])

function utilityHueAlias(rest) {
  const m = /^(?:bg|text|fg)-([a-z]+)(?:-|$)/.exec(rest)
  return m && UTILITY_HUES.has(m[1]) ? `{Color modes/utility/${rest}}` : null
}

// CSS component custom properties that already have a canonical variable in
// the Component-based collection. Figma does not evaluate CSS var() calls, so
// cross-component references must be emitted as real Figma aliases.
const COMPONENT_CSS_VAR_ALIASES = {
  "button-outline-bg": "Button/outline/bg",
  "button-size-lg-height": "Button/size/lg/height",
  "button-size-lg-line-height": "Button/size/lg/line-height",
  "button-size-lg-padding-x": "Button/size/lg/padding-x",
  "button-size-lg-text": "Button/size/lg/text",
  "button-size-md-line-height": "Button/size/md/line-height",
  "button-size-md-padding-x": "Button/size/md/padding-x",
  "button-size-md-text": "Button/size/md/text",
  "button-size-md-weight": "Button/size/md/weight",
  "button-size-sm-line-height": "Button/size/sm/line-height",
  "button-size-sm-padding-x": "Button/size/sm/padding-x",
  "button-size-sm-text": "Button/size/sm/text",
  "dialog-overlay-bg": "Dialog/overlay-bg",
  "dropdown-menu-bg": "Dropdown Menu/surface/bg",
  "dropdown-menu-border": "Dropdown Menu/surface/border",
  "dropdown-menu-font-family": "Dropdown Menu/typography/font-family",
  "dropdown-menu-font-size": "Dropdown Menu/typography/font-size",
  "dropdown-menu-item-bg-active": "Dropdown Menu/item/bg-active",
  "dropdown-menu-item-bg-hover": "Dropdown Menu/item/bg-hover",
  "dropdown-menu-item-gap": "Dropdown Menu/layout/item-gap",
  "dropdown-menu-item-height": "Dropdown Menu/layout/item-height",
  "dropdown-menu-item-padding-x": "Dropdown Menu/layout/item-padding-x",
  "dropdown-menu-item-text": "Dropdown Menu/item/text",
  "dropdown-menu-item-text-active": "Dropdown Menu/item/text",
  "dropdown-menu-item-text-destructive": "Dropdown Menu/item/text-destructive",
  "dropdown-menu-item-text-disabled": "Dropdown Menu/item/text-disabled",
  "dropdown-menu-item-text-hover": "Dropdown Menu/item/text",
  "dropdown-menu-label-text": "Dropdown Menu/support/label-text",
  "dropdown-menu-line-height": "Dropdown Menu/typography/line-height",
  "dropdown-menu-min-width": "Dropdown Menu/layout/min-width",
  "dropdown-menu-padding-y": "Dropdown Menu/layout/padding-y",
  "dropdown-menu-radius": "Dropdown Menu/layout/radius",
  "dropdown-menu-separator": "Dropdown Menu/support/separator",
  "dropdown-menu-shortcut-text": "Dropdown Menu/support/shortcut-text",
  "input-bg": "Input/bg",
  "input-border": "Input/border",
  "input-border-focus": "Input/border-focus",
  "input-border-hover": "Input/border-hover",
  "input-disabled-bg": "Input/disabled/bg",
  "input-disabled-opacity": "Input/disabled/opacity",
  "input-disabled-text": "Input/disabled/text",
  "input-error-border": "Input/error/border",
  "input-focus-ring": "Input/focus-ring",
  "input-focus-ring-offset": "Input/focus-ring-offset",
  "input-focus-ring-width": "Input/focus-ring-width",
  "input-font-family": "Input/font-family",
  "input-font-weight": "Input/font-weight",
  "input-icon-lg-size": "Input/size/lg/icon-size",
  "input-icon-md-size": "Input/size/md/icon-size",
  "input-icon-sm-size": "Input/size/sm/icon-size",
  "input-placeholder": "Input/placeholder",
  "input-size-lg-gap": "Input/size/lg/gap",
  "input-size-lg-height": "Input/size/lg/height",
  "input-size-lg-padding-x": "Input/size/lg/padding-x",
  "input-size-lg-radius": "Input/size/lg/radius",
  "input-size-lg-text": "Input/size/lg/text",
  "input-size-md-gap": "Input/size/md/gap",
  "input-size-md-height": "Input/size/md/height",
  "input-size-md-padding-x": "Input/size/md/padding-x",
  "input-size-md-radius": "Input/size/md/radius",
  "input-size-md-text": "Input/size/md/text",
  "input-size-sm-gap": "Input/size/sm/gap",
  "input-size-sm-height": "Input/size/sm/height",
  "input-size-sm-padding-x": "Input/size/sm/padding-x",
  "input-size-sm-radius": "Input/size/sm/radius",
  "input-size-sm-text": "Input/size/sm/text",
  "input-text": "Input/text",
  "spinner-primary-color": "Spinner/primary-color",
}

const CSS_VAR_LITERAL_VALUES = {
  "opacity-disabled": 0.5,
  "spacing-9": 36,
  "touch-target-size": 44,
  "z-dropdown": 1000,
  "z-modal": 1400,
  "z-popover": 1500,
}

// Shadows are represented by Effect Styles in Figma. Keeping component shadow
// custom properties as STRING variables makes them look bindable even though
// Figma cannot bind a variable to an effect stack.
const COMPONENT_EFFECT_TOKEN_PATHS = new Set([
  "Calendar/shadow",
  "Context Menu/shadow",
  "Date Picker/range-shadow",
  "Dialog/content-shadow",
  "Drawer/content-shadow",
  "Select/listbox-shadow",
  "Slider/thumb-shadow",
  "Slider/thumb-shadow-hover",
  "Social Button/shadow",
  "Social Button/shadow-hover",
  "Social Button/shadow-focus",
  "Toast/shadow",
])

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
const componentModes = manifest.collections?.["Component-based"]?.modes ?? {}
if (JSON.stringify(Object.keys(componentModes)) !== JSON.stringify(["Default"])) {
  throw new Error('Component-based must have exactly one mode named "Default". Put every Light/Dark value in Color modes.')
}
const legacyComponentFiles = Object.values(componentModes).flat().filter((fileName) => /-(?:light|dark)\.json$/.test(fileName))
if (legacyComponentFiles.length > 0) {
  throw new Error(`Component-based uses legacy theme-specific files: ${legacyComponentFiles.join(", ")}`)
}
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
  const declaredTypes = {}

  for (const [modeName, files] of Object.entries(collectionDef.modes ?? {})) {
    const mergedTokens = {}

    for (const fileName of files) {
      const filePath = path.join(figmaDir, fileName)
      const json = JSON.parse(await readFile(filePath, "utf8"))
      flattenTokens(json, [], mergedTokens, collectionName, descriptions, declaredTypes)
    }

    modes[modeName] = mergedTokens
  }

  bundle.collections[collectionName] = Object.keys(descriptions).length > 0
    ? { modes, descriptions, declaredTypes }
    : { modes, declaredTypes }
}

try {
  bundle.effects.shadows = JSON.parse(await readFile(shadowEffectsPath, "utf8"))
} catch {
  delete bundle.effects
}

finalizeBundle(bundle)

await mkdir(figmaDir, { recursive: true })
const serializedBundle = `${JSON.stringify(bundle, null, 2)}\n`
if (checkOnly) {
  const currentBundle = await readFile(outputPath, "utf8").catch(() => "")
  if (currentBundle !== serializedBundle) {
    throw new Error("packages/tokens/figma/import-bundle.json is stale. Run pnpm figma:bundle.")
  }
} else {
  await writeFile(outputPath, serializedBundle)
}

function flattenTokens(input, pathParts, output, collectionName, descriptions, declaredTypes) {
  for (const [key, value] of Object.entries(input)) {
    const nextPath = [...pathParts, key]

    if (isToken(value)) {
      const tokenPath = nextPath.join("/")
      if (collectionName === "Component-based" && COMPONENT_EFFECT_TOKEN_PATHS.has(tokenPath)) continue
      output[tokenPath] = normalizeTokenValue(value.$value, collectionName)
      if (!declaredTypes[tokenPath]) declaredTypes[tokenPath] = value.$type
      if (descriptions && typeof value.$description === "string" && value.$description.trim() && !descriptions[tokenPath]) {
        descriptions[tokenPath] = value.$description.trim()
      }
      continue
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenTokens(value, nextPath, output, collectionName, descriptions, declaredTypes)
    }
  }
}

function isToken(value) {
  return Boolean(value && typeof value === "object" && "$value" in value && "$type" in value)
}

function normalizeTokenValue(rawValue, collectionName) {
  if (typeof rawValue !== "string") return rawValue

  if (rawValue === "color-mix(in srgb, var(--color-neutral-0) 45%, transparent)") {
    return "#FFFFFF73"
  }

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

  if (inner === "Colors.Neutral.0") return "{Colors.Base.White}"

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

  if (COMPONENT_CSS_VAR_ALIASES[name]) {
    return `{Component-based/${COMPONENT_CSS_VAR_ALIASES[name]}}`
  }

  if (CSS_VAR_LITERAL_VALUES[name] !== undefined) return CSS_VAR_LITERAL_VALUES[name]

  if (name.startsWith("color-")) {
    const rest = name.slice("color-".length)
    for (const [prefix, figmaGroup] of Object.entries(SEMANTIC_COLOR_GROUPS)) {
      if (rest === prefix || rest.startsWith(`${prefix}-`)) {
        return utilityHueAlias(rest) ?? `{Color modes/${figmaGroup}/${rest}}`
      }
    }
    // Not a semantic group -> treat as a raw primitive palette reference, e.g.
    // "neutral-0" -> Primitives collection, "Colors/Neutral/0" (dot notation
    // resolves via aliasDefaults, matching how colors-semantic-*.json already
    // references primitives). Assumes a single-word scale name (matches every
    // primitive actually referenced this way today: neutral-0, neutral-950).
    // Multi-word scale groups in primitives.json (e.g. "Neutral (alpha)") are
    // NOT reachable from a CSS var() name and would need a lookup table if a
    // component ever needs to alias one directly.
    const primitiveMatch = /^([a-z]+)-(.+)$/.exec(rest)
    if (!primitiveMatch) return null
    const scale = primitiveMatch[1][0].toUpperCase() + primitiveMatch[1].slice(1)
    if (scale === "Neutral" && primitiveMatch[2] === "0") return "{Colors.Base.White}"
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

function finalizeBundle(outputBundle) {
  for (const [collectionName, collection] of Object.entries(outputBundle.collections)) {
    const modeEntries = Object.entries(collection.modes)
    if (modeEntries.length === 0) throw new Error(`Collection "${collectionName}" has no modes.`)

    const expectedNames = Object.keys(modeEntries[0][1]).sort()
    for (const [modeName, tokens] of modeEntries.slice(1)) {
      const actualNames = Object.keys(tokens).sort()
      if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
        throw new Error(`Collection "${collectionName}" mode "${modeName}" has a different token set.`)
      }
    }
  }

  const typeCache = new Map()
  const resolving = new Set()
  const resolveType = (collectionName, tokenName) => {
    const fullPath = `${collectionName}/${tokenName}`
    if (typeCache.has(fullPath)) return typeCache.get(fullPath)
    if (resolving.has(fullPath)) throw new Error(`Circular Figma alias detected at "${fullPath}".`)

    const collection = outputBundle.collections[collectionName]
    if (!collection) throw new Error(`Alias collection not found: "${collectionName}".`)
    const values = Object.values(collection.modes).map((tokens) => tokens[tokenName])
    if (values.some((value) => value === undefined)) throw new Error(`Token is missing from a mode: "${fullPath}".`)

    resolving.add(fullPath)
    const modeTypes = values.map((value) => {
      if (isAliasValue(value)) {
        const target = parseBundleAlias(outputBundle, collectionName, value)
        return resolveType(target.collectionName, target.tokenName)
      }
      return toFigmaType(collection.declaredTypes[tokenName], value)
    })
    resolving.delete(fullPath)

    if (modeTypes.some((type) => !type)) throw new Error(`Unsupported Figma variable type at "${fullPath}".`)
    if (new Set(modeTypes).size !== 1) throw new Error(`Figma variable type differs by mode at "${fullPath}".`)
    typeCache.set(fullPath, modeTypes[0])
    return modeTypes[0]
  }

  for (const [collectionName, collection] of Object.entries(outputBundle.collections)) {
    const tokenNames = Object.keys(Object.values(collection.modes)[0])
    collection.types = Object.fromEntries(tokenNames.map((tokenName) => [tokenName, resolveType(collectionName, tokenName)]))
    collection.scopes = Object.fromEntries(
      tokenNames.map((tokenName) => [tokenName, inferVariableScopes(collectionName, tokenName, collection.types[tokenName])]),
    )
    delete collection.declaredTypes
  }

  const componentCollection = outputBundle.collections["Component-based"]
  const componentTokens = componentCollection?.modes?.Default ?? {}
  const rawComponentColors = Object.entries(componentTokens)
    .filter(([tokenName, value]) => componentCollection.types[tokenName] === "COLOR" && !isAliasValue(value))
    .map(([tokenName]) => tokenName)
  if (rawComponentColors.length > 0) {
    throw new Error(
      `Component-based COLOR variables must alias Primitives or Color modes; found literals at:\n${rawComponentColors.join("\n")}`,
    )
  }

  const colorModesCollection = outputBundle.collections["Color modes"]
  const duplicateComponentRoles = Object.keys(colorModesCollection?.modes?.Light ?? {})
    .filter((tokenName) => tokenName.startsWith("component/"))
  if (duplicateComponentRoles.length > 0) {
    throw new Error(
      `Color modes must contain semantic roles, not a duplicate component namespace; found:\n${duplicateComponentRoles.join("\n")}`,
    )
  }

  // Every COLOR value in Color modes — all groups, not only feedback — must
  // be a real alias. A raw literal here bypasses the Primitives layer and
  // silently reintroduces the drift this architecture exists to prevent.
  const rawColorModeColors = []
  for (const [modeName, tokens] of Object.entries(colorModesCollection?.modes ?? {})) {
    for (const [tokenName, value] of Object.entries(tokens)) {
      if (colorModesCollection.types[tokenName] === "COLOR" && !isAliasValue(value)) {
        rawColorModeColors.push(`${tokenName} [${modeName}] = ${JSON.stringify(value)}`)
      }
    }
  }
  if (rawColorModeColors.length > 0) {
    throw new Error(
      `Color modes COLOR variables must alias Primitives (or another semantic role); found literals at:\n${rawColorModeColors.join("\n")}`,
    )
  }

  const indirectFeedbackAliases = []
  for (const [modeName, tokens] of Object.entries(colorModesCollection?.modes ?? {})) {
    for (const [tokenName, value] of Object.entries(tokens)) {
      if (!tokenName.startsWith("feedback/") || !isAliasValue(value)) continue
      const target = parseBundleAlias(outputBundle, "Color modes", value)
      const isSharedFeedbackText =
        tokenName === "feedback/text" &&
        target.collectionName === "Color modes" &&
        target.tokenName === "text/text-primary"
      if (target.collectionName !== "Primitives" && !isSharedFeedbackText) {
        indirectFeedbackAliases.push(`${tokenName} [${modeName}] -> ${target.collectionName}/${target.tokenName}`)
      }
    }
  }
  if (indirectFeedbackAliases.length > 0) {
    throw new Error(
      `Color modes feedback colors must alias Primitives directly, except feedback/text -> text/text-primary; found semantic-to-semantic chains at:\n${indirectFeedbackAliases.join("\n")}`,
    )
  }

  const invalidValues = []
  for (const [collectionName, collection] of Object.entries(outputBundle.collections)) {
    for (const [modeName, tokens] of Object.entries(collection.modes)) {
      for (const [tokenName, value] of Object.entries(tokens)) {
        if (typeof value === "string" && /(?:var\(--|color-mix\(|\b(?:px|rem)\b)/.test(value)) {
          invalidValues.push(`${collectionName}/${tokenName} [${modeName}] = ${value}`)
        }
      }
    }
  }
  if (invalidValues.length) {
    throw new Error(`CSS expressions cannot be imported as Figma variables:\n${invalidValues.join("\n")}`)
  }
}

function isAliasValue(value) {
  return typeof value === "string" && /^\{[^}]+\}$/.test(value.trim())
}

function parseBundleAlias(outputBundle, currentCollectionName, value) {
  const inner = value.trim().slice(1, -1).trim()
  const slashIndex = inner.indexOf("/")
  if (slashIndex !== -1) {
    const maybeCollection = inner.slice(0, slashIndex)
    if (outputBundle.collections[maybeCollection]) {
      return { collectionName: maybeCollection, tokenName: inner.slice(slashIndex + 1) }
    }
    return { collectionName: currentCollectionName, tokenName: inner }
  }

  const defaultCollection = outputBundle.aliasDefaults[currentCollectionName]
  if (inner.includes(".")) {
    return { collectionName: defaultCollection, tokenName: inner.replace(/\./g, "/") }
  }
  if (defaultCollection) return { collectionName: defaultCollection, tokenName: inner }
  return { collectionName: currentCollectionName, tokenName: inner }
}

function toFigmaType(declaredType, value) {
  if (typeof value === "number") return "FLOAT"
  if (typeof value === "boolean") return "BOOLEAN"
  if (declaredType === "color") return "COLOR"
  if (declaredType === "number" || declaredType === "dimension") return "FLOAT"
  if (declaredType === "boolean") return "BOOLEAN"
  if (declaredType === "string") return "STRING"
  if (typeof value === "string" && /^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) return "COLOR"
  if (typeof value === "string") return "STRING"
  return null
}

function inferVariableScopes(collectionName, tokenName, type) {
  const lower = tokenName.toLowerCase()

  if (collectionName === "Primitives" || collectionName === "Breakpoints") return []
  if (collectionName === "Spacing") return ["GAP"]
  if (collectionName === "Radius") return ["CORNER_RADIUS"]

  if (collectionName === "Typography") {
    if (lower.startsWith("font family/")) return ["FONT_FAMILY"]
    if (lower.startsWith("font weight/")) return ["FONT_STYLE"]
    if (lower.startsWith("font size/")) return ["FONT_SIZE"]
    if (lower.startsWith("line height/")) return ["LINE_HEIGHT"]
    if (lower.startsWith("letter spacing/")) return ["LETTER_SPACING"]
    return []
  }

  if (collectionName === "Color modes") {
    const group = lower.split("/")[0]
    if (group === "text") return ["TEXT_FILL"]
    if (group === "border") return ["STROKE_COLOR"]
    if (group === "action" || group === "control") return ["ALL_FILLS", "STROKE_COLOR"]
    if (group === "feedback") {
      if (lower === "feedback/text") return ["TEXT_FILL"]
      if (lower.endsWith("/text")) return ["TEXT_FILL"]
      if (lower.endsWith("/border")) return ["STROKE_COLOR"]
      if (lower.endsWith("/accent")) return ["SHAPE_FILL"]
      return ["ALL_FILLS"]
    }
    if (group === "foreground") {
      // Matches live Figma usage: this role decorates non-text shapes on
      // inverse surfaces. Exact rule only — other foreground roles keep
      // ALL_FILLS until repository usage proves a narrower scope.
      if (lower === "foreground/fg-on-inverse-muted") return ["SHAPE_FILL"]
      return ["ALL_FILLS"]
    }
    if (group === "utility") {
      if (/^utility\/text-/.test(lower)) return ["TEXT_FILL"]
      if (/^utility\/fg-/.test(lower)) return ["SHAPE_FILL"]
      return ["ALL_FILLS"]
    }
    return ["ALL_FILLS"]
  }

  if (collectionName === "Layout") {
    if (/(padding|gap|gutter|margin|stack)/.test(lower)) return ["GAP"]
    return ["WIDTH_HEIGHT"]
  }

  if (type === "COLOR") {
    if (/(^|\/)(border|separator)(\/|$)|border-|focus-ring/.test(lower)) return ["STROKE_COLOR"]
    if (/(text|label|title|description|placeholder|caption|shortcut)/.test(lower)) return ["TEXT_FILL"]
    if (/(icon|mark|dot|fg|foreground)/.test(lower)) return ["SHAPE_FILL"]
    return ["ALL_FILLS"]
  }

  if (type === "FLOAT") {
    if (/(^|\/)(z|duration)(\/|$)/.test(lower)) return []
    if (/opacity/.test(lower)) return ["OPACITY"]
    if (/radius/.test(lower)) return ["CORNER_RADIUS"]
    if (/line-height/.test(lower)) return ["LINE_HEIGHT"]
    if (/font-size|(^|\/)(text|caption)(\/|$)|size-(sm|md|lg)-text/.test(lower)) return ["FONT_SIZE"]
    if (/font-weight|(^|\/)weight$/.test(lower)) return ["FONT_WEIGHT"]
    if (/border-width|stroke-width/.test(lower)) return ["STROKE_FLOAT"]
    if (/(padding|gap|spacing|margin)/.test(lower)) return ["GAP"]
    return ["WIDTH_HEIGHT"]
  }

  if (type === "STRING") {
    if (/font-family/.test(lower)) return ["FONT_FAMILY"]
    if (/font-weight|(^|\/)weight$/.test(lower)) return ["FONT_STYLE"]
    return []
  }

  return []
}
