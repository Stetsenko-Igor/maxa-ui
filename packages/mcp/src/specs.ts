import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import type { SpecLookupResult } from "./components.js"

/**
 * Foundations, patterns, and architecture specs exposed to agents.
 *
 * Deliberately NOT exposed: `specs/README.md` (human workflow doc),
 * `specs/tokens-reference.md` (huge auto-generated index — the token tools
 * cover the same data), audit/gap reports (`core-gap-audit.md`,
 * `figma-code-connect-readiness.md`, `maxadevs-fsd-coverage.md`), and
 * `specs/_archive/`. Component specs have their own tools.
 */

export type SpecKind = "foundation" | "pattern" | "architecture"

export interface SpecInfo {
  /** Canonical spec name (file slug, e.g. `color` or `interactive-hierarchy`). */
  name: string
  kind: SpecKind
  /** Repo-relative spec path. */
  specPath: string
  /** First `#` heading of the spec, as a one-line description. */
  title: string
}

const FOUNDATIONS_DIR = ["specs", "foundations"] as const
const PATTERNS_DIR = ["specs", "patterns"] as const
const ARCHITECTURE_PATH = ["specs", "architecture.md"] as const

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function readTitle(content: string): string | null {
  for (const line of content.split("\n").slice(0, 10)) {
    const m = line.match(/^#\s+(.+?)\s*$/)
    if (m) return (m[1] as string).trim()
  }
  return null
}

function listMarkdown(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.isDirectory() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""))
    .sort()
}

/** List all foundation, pattern, and architecture specs. */
export function listSpecs(repoRoot: string): SpecInfo[] {
  const entries: SpecInfo[] = []

  const foundationsDir = join(repoRoot, ...FOUNDATIONS_DIR)
  for (const name of listMarkdown(foundationsDir)) {
    const content = readFileSync(join(foundationsDir, `${name}.md`), "utf8")
    entries.push({
      name,
      kind: "foundation",
      specPath: `specs/foundations/${name}.md`,
      title: readTitle(content) ?? name,
    })
  }

  const patternsDir = join(repoRoot, ...PATTERNS_DIR)
  for (const name of listMarkdown(patternsDir)) {
    const content = readFileSync(join(patternsDir, `${name}.md`), "utf8")
    entries.push({
      name,
      kind: "pattern",
      specPath: `specs/patterns/${name}.md`,
      title: readTitle(content) ?? name,
    })
  }

  const architecturePath = join(repoRoot, ...ARCHITECTURE_PATH)
  if (existsSync(architecturePath)) {
    const content = readFileSync(architecturePath, "utf8")
    entries.push({
      name: "architecture",
      kind: "architecture",
      specPath: "specs/architecture.md",
      title: readTitle(content) ?? "architecture",
    })
  }

  return entries
}

function lookupSpec(dir: string, pathPrefix: string, name: string): SpecLookupResult {
  const validNames = listMarkdown(dir)
  const wanted = normalizeName(name)

  // Fuzzy match like get_component_spec, plus a singular/plural fallback so
  // "colors" resolves to color.md (the docs route is /foundations/colors while
  // the spec file is color.md).
  const matched =
    validNames.find((candidate) => normalizeName(candidate) === wanted) ??
    // plural input, singular file: "colors" -> color.md
    validNames.find((candidate) => normalizeName(candidate) === wanted.replace(/s$/, "")) ??
    // singular input, plural file: "shadow" -> shadows.md
    validNames.find((candidate) => normalizeName(candidate) === `${wanted}s`)

  if (!matched) {
    return { name: null, content: null, specPath: null, validNames }
  }
  const content = readFileSync(join(dir, `${matched}.md`), "utf8")
  return { name: matched, content, specPath: `${pathPrefix}/${matched}.md`, validNames }
}

/**
 * Find a foundation spec by name. Matching is case/hyphen-insensitive with a
 * singular/plural fallback ("colors" matches `color.md`).
 */
export function getFoundationSpec(repoRoot: string, name: string): SpecLookupResult {
  return lookupSpec(join(repoRoot, ...FOUNDATIONS_DIR), "specs/foundations", name)
}

/**
 * Find a pattern spec by name. Matching is case/hyphen-insensitive with a
 * singular/plural fallback.
 */
export function getPatternSpec(repoRoot: string, name: string): SpecLookupResult {
  return lookupSpec(join(repoRoot, ...PATTERNS_DIR), "specs/patterns", name)
}
