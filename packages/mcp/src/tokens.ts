import { readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

export interface TokenEntry {
  /** Token name including the leading `--`. */
  name: string
  /** Light-mode (default) value, if declared. */
  light?: string
  /** Dark-mode value from a `[data-theme="dark"]` block, if declared. */
  dark?: string
  /** Repo-relative path of the file declaring the light value (or dark, if light is absent). */
  sourceFile: string
}

export type TokenMap = Map<string, TokenEntry>

const DARK_SELECTOR = 'data-theme="dark"'

/**
 * Parse CSS custom property declarations out of a stylesheet.
 *
 * Intentionally small: strips comments, walks `{`/`}` blocks while tracking
 * whether the current selector stack contains `[data-theme="dark"]`, and
 * collects `--name: value;` declarations. No external CSS parser needed.
 */
export function parseCssTokens(css: string, sourceFile: string): TokenEntry[] {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "")
  const entries = new Map<string, TokenEntry>()
  const selectorStack: string[] = []
  let buffer = ""

  const collect = (block: string, dark: boolean) => {
    for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
      const name = m[1] as string
      const value = (m[2] as string).trim().replace(/\s+/g, " ")
      const existing = entries.get(name)
      if (existing) {
        if (dark) existing.dark = value
        else existing.light = value
      } else {
        const entry: TokenEntry = { name, sourceFile }
        if (dark) entry.dark = value
        else entry.light = value
        entries.set(name, entry)
      }
    }
  }

  for (const ch of noComments) {
    if (ch === "{") {
      selectorStack.push(buffer.trim())
      buffer = ""
    } else if (ch === "}") {
      const dark = selectorStack.some((s) => s.includes(DARK_SELECTOR))
      collect(buffer, dark)
      buffer = ""
      selectorStack.pop()
    } else {
      buffer += ch
    }
  }

  return [...entries.values()]
}

function listCssFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listCssFiles(full))
    else if (entry.isFile() && entry.name.endsWith(".css")) out.push(full)
  }
  return out
}

/** Load every token declared under `packages/tokens/src/**∕*.css` into one map. */
export function loadTokens(repoRoot: string): TokenMap {
  const srcDir = join(repoRoot, "packages", "tokens", "src")
  const map: TokenMap = new Map()
  for (const file of listCssFiles(srcDir)) {
    const rel = relative(repoRoot, file)
    for (const parsed of parseCssTokens(readFileSync(file, "utf8"), rel)) {
      const existing = map.get(parsed.name)
      if (!existing) {
        map.set(parsed.name, parsed)
        continue
      }
      // Later declarations win, mirroring the CSS cascade.
      if (parsed.light !== undefined) {
        existing.light = parsed.light
        existing.sourceFile = rel
      }
      if (parsed.dark !== undefined) existing.dark = parsed.dark
    }
  }
  return map
}

export interface TokenSearchResult {
  total: number
  matches: TokenEntry[]
}

/** Case-insensitive substring search over token names, capped at `limit` results. */
export function searchTokens(tokens: TokenMap, query: string, limit = 50): TokenSearchResult {
  const q = query.toLowerCase()
  const all = [...tokens.values()].filter((t) => t.name.toLowerCase().includes(q))
  return { total: all.length, matches: all.slice(0, limit) }
}

export function normalizeTokenName(name: string): string {
  const trimmed = name.trim()
  return trimmed.startsWith("--") ? trimmed : `--${trimmed}`
}

export interface ChainStep {
  name: string
  value: string
}

const VAR_RE = /var\(\s*(--[\w-]+)/

/**
 * Follow `var(--x)` references starting from `value`, up to `maxDepth` hops.
 * `mode` picks dark values when present, falling back to light.
 */
export function resolveChain(
  tokens: TokenMap,
  value: string | undefined,
  mode: "light" | "dark",
  maxDepth = 5,
): ChainStep[] {
  const chain: ChainStep[] = []
  const seen = new Set<string>()
  let current = value
  for (let depth = 0; depth < maxDepth; depth++) {
    if (current === undefined) break
    const m = current.match(VAR_RE)
    if (!m) break
    const ref = m[1] as string
    if (seen.has(ref)) break // cycle guard
    seen.add(ref)
    const target = tokens.get(ref)
    if (!target) {
      chain.push({ name: ref, value: "(not found)" })
      break
    }
    const next = mode === "dark" ? (target.dark ?? target.light) : target.light
    chain.push({ name: ref, value: next ?? "(no value)" })
    current = next
  }
  return chain
}
