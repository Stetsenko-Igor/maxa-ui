#!/usr/bin/env node
// Compares a bundle exported from Figma (via the MAXA Token Importer plugin's
// "Export variables" button) against the repo's current import-bundle.json —
// same shape on both sides, so this is a structural diff, not a parser.
//
// Read-only: prints a changelist, never writes anything. Igor reviews the
// output and tells Claude which changes to apply to the source CSS/JSON.
//
// Compared per collection: mode presence, token presence, per-mode values,
// and the mode-independent metadata maps (types, scopes, descriptions).
//
// Representation differences are normalized away so only real edits surface:
//   - alias style: `{Colors.Neutral.900}` (dot shorthand), `{Utility/x}`
//     (same-collection path), and `{Primitives/Colors/Neutral/900}` (full
//     path) canonicalize to the same target — mirrors the importer's
//     parseAliasPath rules exactly;
//   - CSS color literals: `rgba(27, 26, 26, 0.5)` == `#1B1A1A80` after the
//     same 8-bit channel quantization the plugin exporter applies
//     (Math.round(channel * 255)); hex case and redundant FF alpha ignored;
//   - scope arrays: order/duplicates ignored; `[]` == `["ALL_SCOPES"]`
//     because the Figma API serializes unrestricted scopes as ALL_SCOPES;
//   - descriptions: surrounding whitespace ignored;
//   - float drift in numbers (Figma rounds some resolved values).
//
// Aliases are compared by target path only — an alias is never resolved to
// the color it happens to produce, so rebinding to a different primitive is
// always reported even when the resolved color is identical.
//
// Mode-set differences (e.g. an export that still carries the legacy
// Component-based Light/Dark split vs the repo's single Default mode) are
// reported as one structural line per mode instead of flooding the output
// with per-token noise.
//
// Usage: node packages/tokens/scripts/diff-figma-export.mjs <exported-file.json>

import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

// ── Pure helpers (exported for tests) ───────────────────────────────────────

/**
 * Canonicalizes a Figma alias string to "Collection/token/path" using the same
 * resolution rules as the importer's parseAliasPath: an explicit collection
 * prefix wins; dot shorthand resolves through the bundle's aliasDefaults; a
 * bare or same-collection path resolves against the current collection.
 *
 * `knownCollections` may extend the set of recognizable collection prefixes —
 * the diff compares two bundles whose collection sets can differ, so a prefix
 * valid on either side must resolve the same way on both.
 */
export function canonicalizeAliasPath(bundle, currentCollectionName, value, knownCollections) {
  const inner = value.trim().slice(1, -1).trim()

  if (inner.includes("/")) {
    const firstSlash = inner.indexOf("/")
    const maybeCollection = inner.slice(0, firstSlash)
    if (bundle.collections?.[maybeCollection] || knownCollections?.has(maybeCollection)) return inner
  }

  const defaults = bundle.aliasDefaults ?? {}
  const defaultCollection = defaults[currentCollectionName]

  if (inner.includes(".")) {
    const slashPath = inner.replace(/\./g, "/")
    if (defaultCollection) return `${defaultCollection}/${slashPath}`
  }

  if (defaultCollection && !inner.includes("/") && !inner.includes(".")) {
    return `${defaultCollection}/${inner}`
  }

  return `${currentCollectionName}/${inner}`
}

/** Uppercases hex and strips a redundant opaque alpha channel. */
export function normalizeHex(value) {
  const m = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(value.trim())
  if (!m) return value.trim()
  const rgb = m[1].toUpperCase()
  const alpha = m[2]?.toUpperCase()
  return alpha && alpha !== "FF" ? `#${rgb}${alpha}` : `#${rgb}`
}

/**
 * Canonicalizes a CSS color literal (#RRGGBB, #RRGGBBAA, rgb(), rgba()) to
 * uppercase #RRGGBB / #RRGGBBAA using the plugin exporter's 8-bit channel
 * quantization (Math.round(channel * 255) for the alpha). Redundant FF alpha
 * is stripped. Non-color strings are returned trimmed and unchanged.
 */
export function normalizeCssColor(value) {
  const trimmed = value.trim()

  if (/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(trimmed)) return normalizeHex(trimmed)

  const m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(trimmed)
  if (!m) return trimmed

  const toHexByte = (n) => Math.round(n).toString(16).padStart(2, "0").toUpperCase()
  const r = toHexByte(Number(m[1]))
  const g = toHexByte(Number(m[2]))
  const b = toHexByte(Number(m[3]))
  const alpha = m[4] === undefined ? 1 : Number(m[4])
  const a = toHexByte(alpha * 255)
  return a === "FF" ? `#${r}${g}${b}` : `#${r}${g}${b}${a}`
}

/**
 * Canonicalizes a Figma scope array: sorted, deduplicated; `[]` and
 * `["ALL_SCOPES"]` collapse to the same form because the Figma API
 * serializes unrestricted scopes as ALL_SCOPES.
 */
export function normalizeScopes(scopes) {
  const unique = [...new Set(scopes ?? [])].sort()
  if (unique.length === 0) return ["ALL_SCOPES"]
  return unique
}

function isAlias(value) {
  return typeof value === "string" && /^\{[^}]+\}$/.test(value.trim())
}

function isCssColor(value) {
  if (typeof value !== "string") return false
  const trimmed = value.trim()
  return (
    /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(trimmed) ||
    /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(?:,\s*[\d.]+\s*)?\)$/.test(trimmed)
  )
}

/**
 * Reduces a raw token value to a comparison key. Each side normalizes against
 * its own bundle (aliasDefaults may differ between export and repo). Aliases
 * compare by canonical target path — never by their resolved color.
 */
export function normalizeValue(bundle, collectionName, value, knownCollections) {
  if (isAlias(value)) return `alias:${canonicalizeAliasPath(bundle, collectionName, value, knownCollections)}`
  if (isCssColor(value)) return `color:${normalizeCssColor(value)}`
  return value
}

/** True when two values are equivalent after normalization. */
export function valuesEquivalent(exportedCtx, currentCtx, knownCollections) {
  const { bundle: eb, collectionName: ec, value: ev } = exportedCtx
  const { bundle: cb, collectionName: cc, value: cv } = currentCtx

  if (typeof ev === "number" && typeof cv === "number") {
    // Figma resolves some values with float rounding; tolerate tiny drift.
    return Math.abs(ev - cv) < 0.001
  }
  return (
    normalizeValue(eb, ec, ev, knownCollections) === normalizeValue(cb, cc, cv, knownCollections)
  )
}

/**
 * Diffs two bundles into a structured report:
 * {
 *   collections: [{ name, modeNotes, lines, typeLines, scopeLines, descriptionLines }],
 *   counts: { collections, modes, values, types, scopes, descriptions },
 *   totalChanges,
 * }
 * Modes present on only one side become a single structural note; token-level
 * value comparison runs only over modes both sides share. Metadata maps
 * (types/scopes/descriptions) are mode-independent and compared for every
 * token present on both sides.
 */
export function diffBundles(exported, current) {
  const collectionNames = new Set([
    ...Object.keys(exported.collections ?? {}),
    ...Object.keys(current.collections ?? {}),
  ])
  // Union of both sides' collection names, so an explicit alias prefix that is
  // valid on either side canonicalizes identically on both.
  const knownCollections = collectionNames

  const report = {
    collections: [],
    counts: { collections: 0, modes: 0, values: 0, types: 0, scopes: 0, descriptions: 0 },
    totalChanges: 0,
  }

  for (const collectionName of [...collectionNames].sort()) {
    const exportedCollection = exported.collections?.[collectionName]
    const currentCollection = current.collections?.[collectionName]

    if (!currentCollection) {
      report.collections.push({
        name: collectionName,
        modeNotes: ["new collection in Figma — not in the repo"],
        lines: [],
        typeLines: [],
        scopeLines: [],
        descriptionLines: [],
      })
      report.counts.collections += 1
      continue
    }
    if (!exportedCollection) {
      // The plugin exports every local collection, so an absent one means it
      // is genuinely missing from the Figma file — never skip silently.
      report.collections.push({
        name: collectionName,
        modeNotes: ["collection exists in the repo but is MISSING from the Figma export"],
        lines: [],
        typeLines: [],
        scopeLines: [],
        descriptionLines: [],
      })
      report.counts.collections += 1
      continue
    }

    const exportedModes = Object.keys(exportedCollection.modes ?? {})
    const currentModes = Object.keys(currentCollection.modes ?? {})
    const sharedModes = exportedModes.filter((m) => currentModes.includes(m))

    const modeNotes = []
    for (const mode of exportedModes) {
      if (!currentModes.includes(mode)) {
        const count = Object.keys(exportedCollection.modes[mode] ?? {}).length
        modeNotes.push(
          `mode "${mode}" exists only in the Figma export (${count} token(s)) — stale mode; importer v11 removes it when "Remove stale modes" is on`,
        )
      }
    }
    for (const mode of currentModes) {
      if (!exportedModes.includes(mode)) {
        const count = Object.keys(currentCollection.modes[mode] ?? {}).length
        modeNotes.push(
          `mode "${mode}" exists only in the repo bundle (${count} token(s)) — the Figma file predates it; import from main will create it`,
        )
      }
    }

    const lines = []

    for (const modeName of [...sharedModes].sort()) {
      const exportedTokens = exportedCollection.modes?.[modeName] ?? {}
      const currentTokens = currentCollection.modes?.[modeName] ?? {}
      const tokenNames = new Set([...Object.keys(exportedTokens), ...Object.keys(currentTokens)])

      for (const tokenName of [...tokenNames].sort()) {
        const exportedValue = exportedTokens[tokenName]
        const currentValue = currentTokens[tokenName]

        if (exportedValue === undefined) {
          lines.push(`  - ${modeName}/${tokenName}: REMOVED in Figma (was ${JSON.stringify(currentValue)})`)
        } else if (currentValue === undefined) {
          lines.push(`  + ${modeName}/${tokenName}: NEW in Figma (${JSON.stringify(exportedValue)})`)
        } else if (
          !valuesEquivalent(
            { bundle: exported, collectionName, value: exportedValue },
            { bundle: current, collectionName, value: currentValue },
            knownCollections,
          )
        ) {
          lines.push(`  ~ ${modeName}/${tokenName}: ${JSON.stringify(currentValue)} -> ${JSON.stringify(exportedValue)}`)
        }
      }
    }

    // Mode-independent metadata. Only tokens present on both sides are
    // compared — a token missing entirely from one side is already reported
    // as NEW/REMOVED above.
    const exportedFirstMode = exportedCollection.modes?.[exportedModes[0]] ?? {}
    const currentFirstMode = currentCollection.modes?.[currentModes[0]] ?? {}
    const sharedTokens = Object.keys(currentFirstMode).filter((t) => t in exportedFirstMode)

    const typeLines = []
    const scopeLines = []
    const descriptionLines = []

    for (const tokenName of [...sharedTokens].sort()) {
      const exportedType = exportedCollection.types?.[tokenName]
      const currentType = currentCollection.types?.[tokenName]
      if (exportedType !== undefined && currentType !== undefined && exportedType !== currentType) {
        typeLines.push(`  ~ ${tokenName}: type ${JSON.stringify(currentType)} -> ${JSON.stringify(exportedType)}`)
      }

      const exportedScopes = exportedCollection.scopes?.[tokenName]
      const currentScopes = currentCollection.scopes?.[tokenName]
      if (exportedScopes !== undefined && currentScopes !== undefined) {
        const eNorm = normalizeScopes(exportedScopes)
        const cNorm = normalizeScopes(currentScopes)
        if (JSON.stringify(eNorm) !== JSON.stringify(cNorm)) {
          scopeLines.push(
            `  ~ ${tokenName}: scopes ${JSON.stringify(currentScopes)} -> ${JSON.stringify(exportedScopes)}`,
          )
        }
      }

      const exportedDescription = (exportedCollection.descriptions?.[tokenName] ?? "").trim()
      const currentDescription = (currentCollection.descriptions?.[tokenName] ?? "").trim()
      if (exportedDescription !== currentDescription) {
        descriptionLines.push(
          `  ~ ${tokenName}: description ${JSON.stringify(currentDescription)} -> ${JSON.stringify(exportedDescription)}`,
        )
      }
    }

    const changeCount =
      modeNotes.length + lines.length + typeLines.length + scopeLines.length + descriptionLines.length
    if (changeCount > 0) {
      report.collections.push({ name: collectionName, modeNotes, lines, typeLines, scopeLines, descriptionLines })
      report.counts.modes += modeNotes.length
      report.counts.values += lines.length
      report.counts.types += typeLines.length
      report.counts.scopes += scopeLines.length
      report.counts.descriptions += descriptionLines.length
    }
  }

  report.totalChanges = Object.values(report.counts).reduce((a, b) => a + b, 0)
  return report
}

// ── CLI ──────────────────────────────────────────────────────────────────────

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const currentBundlePath = path.resolve(__dirname, "../figma/import-bundle.json")

  const exportedPath = process.argv[2]
  if (!exportedPath) {
    console.error("Usage: node diff-figma-export.mjs <path-to-figma-export.json>")
    process.exit(1)
  }

  const [exported, current] = await Promise.all([
    readJson(exportedPath),
    readJson(currentBundlePath),
  ])

  const report = diffBundles(exported, current)

  for (const { name, modeNotes, lines, typeLines, scopeLines, descriptionLines } of report.collections) {
    const count = modeNotes.length + lines.length + typeLines.length + scopeLines.length + descriptionLines.length
    console.log(`\n## ${name} (${count} change(s))`)
    for (const note of modeNotes) console.log(`  ! ${note}`)
    if (lines.length > 0) console.log(lines.join("\n"))
    if (typeLines.length > 0) console.log(typeLines.join("\n"))
    if (scopeLines.length > 0) console.log(scopeLines.join("\n"))
    if (descriptionLines.length > 0) console.log(descriptionLines.join("\n"))
  }

  const { counts } = report
  console.log(
    `\n${report.totalChanges} total change(s): ` +
      `${counts.collections} collection, ${counts.modes} mode, ${counts.values} value, ` +
      `${counts.types} type, ${counts.scopes} scope, ${counts.descriptions} description.`,
  )
  if (report.totalChanges === 0) {
    console.log("No differences — Figma and the repo agree.")
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"))
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) await main()
