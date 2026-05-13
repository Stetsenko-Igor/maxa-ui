#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { basename, extname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..")

const TOKEN_DIR = "packages/tokens/src"
const USAGE_DIRS = ["packages/ui/src", "apps/docs"]
const USAGE_EXTENSIONS = new Set([".css", ".ts", ".tsx"])
const IGNORE_PATH_PARTS = new Set([
  "node_modules",
  "dist",
  ".turbo",
  ".next",
  ".next-dev",
  "coverage",
])

const TOKEN_DEFINITION_RE = /^\s*(--[\w-]+)\s*:/gm
const TOKEN_USAGE_RE = /var\(\s*(--[\w-]+)/g

function collectFiles(root, dirs, extensions) {
  const files = []

  function visit(dir) {
    if (!existsSync(dir)) return

    for (const entry of readdirSync(dir)) {
      if (IGNORE_PATH_PARTS.has(entry)) continue

      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        visit(fullPath)
      } else if (extensions.has(extname(fullPath))) {
        files.push(fullPath)
      }
    }
  }

  for (const dir of dirs) {
    visit(join(root, dir))
  }

  return files.sort()
}

function getCssBlockContext(line, currentContext) {
  if (line.includes("}")) return null
  if (line.includes("[data-theme=\"dark\"]") || line.includes("[data-theme='dark']")) {
    return "dark"
  }
  if (line.includes(":root")) return "root"
  if (line.includes("@theme")) return "theme"
  return currentContext
}

function normalizeTokenName(token) {
  return token.startsWith("--") ? token.slice(2) : token
}

function addMapSet(map, key, value) {
  const values = map.get(key) ?? new Set()
  values.add(value)
  map.set(key, values)
}

function collectDefinedTokens(root) {
  const tokenFiles = collectFiles(root, [TOKEN_DIR], new Set([".css"]))
  const tokens = new Map()
  const byFile = new Map()
  const rootTokens = new Set()
  const darkOverrides = new Set()

  for (const filePath of tokenFiles) {
    const relativePath = relative(root, filePath)
    const fileName = basename(filePath)
    const fileTokens = new Set()
    let context = null

    for (const line of readFileSync(filePath, "utf8").split("\n")) {
      context = getCssBlockContext(line, context)

      const matches = line.matchAll(TOKEN_DEFINITION_RE)
      for (const match of matches) {
        const name = normalizeTokenName(match[1])
        fileTokens.add(name)

        if (!tokens.has(name)) {
          tokens.set(name, {
            file: fileName,
            path: relativePath,
            contexts: new Set(),
            name,
          })
        }

        tokens.get(name).contexts.add(context ?? "unknown")

        if (context === "root") rootTokens.add(name)
        if (context === "dark") darkOverrides.add(name)
      }
    }

    byFile.set(fileName, fileTokens)
  }

  return { byFile, darkOverrides, rootTokens, tokens }
}

function collectUsedTokens(root) {
  const usageFiles = collectFiles(root, USAGE_DIRS, USAGE_EXTENSIONS)
  const tokens = new Map()
  const byFile = new Map()

  for (const filePath of usageFiles) {
    const relativePath = relative(root, filePath)
    const fileName = basename(filePath)
    const fileTokens = new Set()
    const contents = readFileSync(filePath, "utf8")

    for (const match of contents.matchAll(TOKEN_USAGE_RE)) {
      const name = normalizeTokenName(match[1])
      fileTokens.add(name)
      addMapSet(tokens, name, relativePath)
    }

    if (fileTokens.size > 0) {
      byFile.set(relativePath, {
        file: fileName,
        path: relativePath,
        tokens: fileTokens,
      })
    }
  }

  return { byFile, tokens }
}

function percent(part, total) {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}

function sortTokenObjects(tokens) {
  return [...tokens].sort((a, b) => a.name.localeCompare(b.name))
}

function groupUnusedTokens(unusedTokens) {
  const groups = new Map()

  for (const token of unusedTokens) {
    const group =
      token.name.match(/^(button-[^-]+)-/)?.[1] ??
      token.name.match(/^(input-[^-]+)-/)?.[1] ??
      token.name.match(/^(color-[^-]+)-/)?.[1] ??
      token.name.match(/^(spacing)-/)?.[1] ??
      token.name.match(/^(radius)-/)?.[1] ??
      token.name.match(/^(text)-/)?.[1] ??
      token.name.match(/^(font-[^-]+)-/)?.[1] ??
      "other"

    addMapSet(groups, group, token.name)
  }

  return [...groups.entries()]
    .map(([name, tokens]) => ({ count: tokens.size, name, tokens: [...tokens].sort() }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function collectTokenStats(root = ROOT) {
  const defined = collectDefinedTokens(root)
  const used = collectUsedTokens(root)

  const definedNames = new Set(defined.tokens.keys())
  const usedDefinedNames = [...used.tokens.keys()].filter((name) =>
    definedNames.has(name),
  )
  const unusedTokens = [...defined.tokens.values()].filter(
    (token) => !used.tokens.has(token.name),
  )

  const byCollection = [...defined.byFile.entries()]
    .map(([file, tokens]) => {
      const usedCount = [...tokens].filter((token) => used.tokens.has(token)).length
      return {
        defined: tokens.size,
        file,
        used: usedCount,
        usedPercent: percent(usedCount, tokens.size),
      }
    })
    .sort((a, b) => a.file.localeCompare(b.file))

  const byComponent = [...used.byFile.values()]
    .filter((entry) => entry.path.startsWith("packages/ui/src/") && entry.file.endsWith(".css"))
    .map((entry) => ({
      file: entry.file,
      used: [...entry.tokens].filter((token) => definedNames.has(token)).length,
    }))
    .sort((a, b) => a.file.localeCompare(b.file))

  const docsUsage = [...used.byFile.values()]
    .filter((entry) => entry.path.startsWith("apps/docs/"))
    .reduce((tokens, entry) => {
      for (const token of entry.tokens) {
        if (definedNames.has(token)) tokens.add(token)
      }
      return tokens
    }, new Set())

  const missingDarkOverrides = [...defined.rootTokens].filter(
    (token) => !defined.darkOverrides.has(token),
  )

  return {
    byCollection,
    byComponent,
    docsUsage: {
      total: docsUsage.size,
    },
    darkMode: {
      missing: missingDarkOverrides.sort(),
      overridden: [...defined.rootTokens].filter((token) =>
        defined.darkOverrides.has(token),
      ).length,
      rootTokens: defined.rootTokens.size,
    },
    defined: {
      tokens: sortTokenObjects(defined.tokens.values()),
      total: defined.tokens.size,
    },
    unused: {
      groups: groupUnusedTokens(unusedTokens),
      tokens: sortTokenObjects(unusedTokens),
      total: unusedTokens.length,
    },
    used: {
      total: usedDefinedNames.length,
      tokens: usedDefinedNames.sort(),
    },
  }
}

function padRight(value, width) {
  return String(value).padEnd(width, " ")
}

function padLeft(value, width) {
  return String(value).padStart(width, " ")
}

export function formatTokenStats(stats) {
  const lines = []
  const usedPercent = percent(stats.used.total, stats.defined.total)
  const unusedPercent = percent(stats.unused.total, stats.defined.total)

  lines.push("MAXA UI - Token Statistics")
  lines.push("========================================")
  lines.push("")
  lines.push(`Defined tokens        ${stats.defined.total}`)
  lines.push(`Used tokens           ${stats.used.total}   (${usedPercent}%)`)
  lines.push(`Unused                ${stats.unused.total}   (${unusedPercent}%)`)
  lines.push("")
  lines.push("By collection:")

  for (const collection of stats.byCollection) {
    lines.push(
      `  ${padRight(collection.file, 24)} ${padLeft(collection.defined, 4)} defined ${padLeft(collection.used, 4)} used  (${collection.usedPercent}%)`,
    )
  }

  lines.push("")
  lines.push("By component:")

  if (stats.byComponent.length === 0) {
    lines.push("  No token usage found in CSS files.")
  } else {
    for (const component of stats.byComponent) {
      lines.push(`  ${padRight(component.file, 24)} ${padLeft(component.used, 4)} vars used`)
    }
  }

  lines.push("")
  lines.push(`Docs usage             ${stats.docsUsage.total} unique vars used`)

  lines.push("")
  lines.push("Dark mode coverage:")
  lines.push(
    `  Root tokens with dark override: ${stats.darkMode.overridden}/${stats.darkMode.rootTokens} (${percent(stats.darkMode.overridden, stats.darkMode.rootTokens)}%)`,
  )

  if (stats.darkMode.missing.length > 0) {
    lines.push(
      `  Missing dark overrides: ${stats.darkMode.missing.slice(0, 12).map((token) => `--${token}`).join(", ")}`,
    )
    if (stats.darkMode.missing.length > 12) {
      lines.push(`  ...and ${stats.darkMode.missing.length - 12} more`)
    }
  }

  lines.push("")
  lines.push("Unused token groups:")

  for (const group of stats.unused.groups.slice(0, 10)) {
    lines.push(`  --${padRight(group.name, 18)} ${padLeft(group.count, 4)} tokens`)
  }

  return `${lines.join("\n")}\n`
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(formatTokenStats(collectTokenStats()))
}
