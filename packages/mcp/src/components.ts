import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

export interface ComponentInfo {
  /** Canonical component name (spec/directory slug, e.g. `date-picker`). */
  name: string
  /** Explicit `Status:` line from the spec, or inferred from implementation presence. */
  status: string
  /** Repo-relative spec path, or null when no spec exists. */
  specPath: string | null
  /** Whether `packages/ui/src/components/<name>/` exists. */
  hasImplementation: boolean
}

const SPECS_DIR = ["specs", "components"] as const
const UI_COMPONENTS_DIR = ["packages", "ui", "src", "components"] as const

function listDir(path: string, predicate: (name: string, isDir: boolean) => boolean): string[] {
  if (!existsSync(path)) return []
  return readdirSync(path, { withFileTypes: true })
    .filter((e) => predicate(e.name, e.isDirectory()))
    .map((e) => e.name)
}

/** Read the `Status: <value>` line from the first lines of a spec, if present. */
export function readSpecStatus(specContent: string): string | null {
  for (const line of specContent.split("\n").slice(0, 10)) {
    const m = line.match(/^Status:\s*(.+?)\s*$/i)
    if (m) return (m[1] as string).trim()
  }
  return null
}

/**
 * List all components known to the design system: the union of
 * `specs/components/*.md` and `packages/ui/src/components/<dir>` entries.
 */
export function listComponents(repoRoot: string): ComponentInfo[] {
  const specsDir = join(repoRoot, ...SPECS_DIR)
  const uiDir = join(repoRoot, ...UI_COMPONENTS_DIR)

  const specNames = listDir(specsDir, (name, isDir) => !isDir && name.endsWith(".md")).map((f) =>
    f.replace(/\.md$/, ""),
  )
  const implNames = listDir(uiDir, (_name, isDir) => isDir)
  const names = [...new Set([...specNames, ...implNames])].sort()

  return names.map((name) => {
    const hasSpec = specNames.includes(name)
    const hasImplementation = implNames.includes(name)
    const specPath = hasSpec ? `specs/components/${name}.md` : null
    let status: string | null = null
    if (hasSpec) {
      status = readSpecStatus(readFileSync(join(specsDir, `${name}.md`), "utf8"))
    }
    if (status === null) {
      status = hasImplementation ? "implemented" : "spec-only"
    }
    return { name, status, specPath, hasImplementation }
  })
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export interface SpecLookupResult {
  /** Canonical matched name, or null if nothing matched. */
  name: string | null
  /** Full markdown content when found. */
  content: string | null
  /** Repo-relative spec path when found. */
  specPath: string | null
  /** All valid spec names (for error messages). */
  validNames: string[]
}

/**
 * Find a component spec by name. Matching is case-insensitive and ignores
 * hyphens/underscores/spaces, so `DatePicker`, `date picker`, and
 * `date-picker` all resolve to `specs/components/date-picker.md`.
 */
export function getComponentSpec(repoRoot: string, name: string): SpecLookupResult {
  const specsDir = join(repoRoot, ...SPECS_DIR)
  const files = listDir(specsDir, (n, isDir) => !isDir && n.endsWith(".md"))
  const validNames = files.map((f) => f.replace(/\.md$/, "")).sort()

  const wanted = normalizeName(name)
  const matched = validNames.find((candidate) => normalizeName(candidate) === wanted)
  if (!matched) {
    return { name: null, content: null, specPath: null, validNames }
  }
  const specPath = `specs/components/${matched}.md`
  const content = readFileSync(join(specsDir, `${matched}.md`), "utf8")
  return { name: matched, content, specPath, validNames }
}
