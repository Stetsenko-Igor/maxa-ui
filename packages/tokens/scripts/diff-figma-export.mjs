#!/usr/bin/env node
// Compares a bundle exported from Figma (via the MAXA Token Importer plugin's
// "Export variables" button) against the repo's current import-bundle.json —
// same shape on both sides, so this is a plain structural diff, not a parser.
//
// Read-only: prints a changelist, never writes anything. Igor reviews the
// output and tells Claude which changes to apply to the source CSS/JSON.
//
// Usage: node packages/tokens/scripts/diff-figma-export.mjs <exported-file.json>

import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

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

const collectionNames = new Set([
  ...Object.keys(exported.collections ?? {}),
  ...Object.keys(current.collections ?? {}),
])

let totalChanges = 0

for (const collectionName of [...collectionNames].sort()) {
  const exportedCollection = exported.collections?.[collectionName]
  const currentCollection = current.collections?.[collectionName]

  if (!currentCollection) {
    console.log(`\n## ${collectionName} (new collection in Figma — not in the repo)`)
    continue
  }
  if (!exportedCollection) continue // collection not touched in Figma export, skip

  const modeNames = new Set([
    ...Object.keys(exportedCollection.modes ?? {}),
    ...Object.keys(currentCollection.modes ?? {}),
  ])

  const collectionLines = []

  for (const modeName of [...modeNames].sort()) {
    const exportedTokens = exportedCollection.modes?.[modeName] ?? {}
    const currentTokens = currentCollection.modes?.[modeName] ?? {}
    const tokenNames = new Set([...Object.keys(exportedTokens), ...Object.keys(currentTokens)])

    for (const tokenName of [...tokenNames].sort()) {
      const exportedValue = exportedTokens[tokenName]
      const currentValue = currentTokens[tokenName]

      if (exportedValue === undefined) {
        collectionLines.push(`  - ${modeName}/${tokenName}: REMOVED in Figma (was ${JSON.stringify(currentValue)})`)
      } else if (currentValue === undefined) {
        collectionLines.push(`  + ${modeName}/${tokenName}: NEW in Figma (${JSON.stringify(exportedValue)})`)
      } else if (!valuesEqual(exportedValue, currentValue)) {
        collectionLines.push(`  ~ ${modeName}/${tokenName}: ${JSON.stringify(currentValue)} -> ${JSON.stringify(exportedValue)}`)
      }
    }
  }

  if (collectionLines.length > 0) {
    console.log(`\n## ${collectionName} (${collectionLines.length} change(s))`)
    console.log(collectionLines.join("\n"))
    totalChanges += collectionLines.length
  }
}

console.log(`\n${totalChanges} total change(s).`)
if (totalChanges === 0) {
  console.log("No differences — Figma and the repo agree.")
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"))
}

function valuesEqual(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    // Figma resolves some values (e.g. colors) with float rounding; tolerate
    // tiny drift instead of flagging it as a real change.
    return Math.abs(a - b) < 0.001
  }
  return a === b
}
