#!/usr/bin/env node
// Compares a bundle exported from Figma (via the MAXA Token Importer plugin's
// "Export variables" button) against the repo's current import-bundle.json —
// same shape on both sides, so this is a structural diff, not a parser.
//
// Read-only: prints a changelist, never writes anything. Igor reviews the
// output and tells Claude which changes to apply to the source CSS/JSON.
//
// Representation differences are normalized away so only real edits surface:
//   - alias style: `{Colors.Neutral.900}` (dot shorthand), `{Utility/x}`
//     (same-collection path), and `{Primitives/Colors/Neutral/900}` (full
//     path) canonicalize to the same target — mirrors the importer's
//     parseAliasPath rules exactly;
//   - hex case and redundant alpha: `#2d2d2e` == `#2D2D2E` == `#2D2D2EFF`;
//   - float drift in numbers (Figma rounds some resolved values).
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

function isAlias(value) {
  return typeof value === "string" && /^\{[^}]+\}$/.test(value.trim())
}

function isHex(value) {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value.trim())
}

/**
 * Reduces a raw token value to a comparison key. Each side normalizes against
 * its own bundle (aliasDefaults may differ between export and repo).
 */
export function normalizeValue(bundle, collectionName, value, knownCollections) {
  if (isAlias(value)) return `alias:${canonicalizeAliasPath(bundle, collectionName, value, knownCollections)}`
  if (isHex(value)) return `hex:${normalizeHex(value)}`
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
 * { collections: [{ name, modeNotes: [..], lines: [..] }], totalChanges }
 * Modes present on only one side become a single structural note; token-level
 * comparison runs only over modes both sides share.
 */
export function diffBundles(exported, current) {
  const collectionNames = new Set([
    ...Object.keys(exported.collections ?? {}),
    ...Object.keys(current.collections ?? {}),
  ])
  // Union of both sides' collection names, so an explicit alias prefix that is
  // valid on either side canonicalizes identically on both.
  const knownCollections = collectionNames

  const report = { collections: [], totalChanges: 0 }

  for (const collectionName of [...collectionNames].sort()) {
    const exportedCollection = exported.collections?.[collectionName]
    const currentCollection = current.collections?.[collectionName]

    if (!currentCollection) {
      report.collections.push({
        name: collectionName,
        modeNotes: ["new collection in Figma — not in the repo"],
        lines: [],
      })
      report.totalChanges += 1
      continue
    }
    if (!exportedCollection) continue // not present in the export, skip

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

    if (lines.length > 0 || modeNotes.length > 0) {
      report.collections.push({ name: collectionName, modeNotes, lines })
      report.totalChanges += lines.length + modeNotes.length
    }
  }

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

  for (const { name, modeNotes, lines } of report.collections) {
    console.log(`\n## ${name} (${modeNotes.length + lines.length} change(s))`)
    for (const note of modeNotes) console.log(`  ! ${note}`)
    if (lines.length > 0) console.log(lines.join("\n"))
  }

  console.log(`\n${report.totalChanges} total change(s).`)
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
