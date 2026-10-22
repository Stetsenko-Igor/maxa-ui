#!/usr/bin/env node
/**
 * Compare this repository's Figma token source with the team ui-kit's copy.
 *
 *   ours   packages/tokens/figma/*.json          (this working tree)
 *   theirs packages/theme/tokens/*.json          (a ref in the gitlab remote)
 *
 * The two sides hold the same token set but write references in two notations:
 * a Figma alias ("{Color modes/action/action-primary}") and a CSS variable
 * ("var(--color-action-primary)"). A naive text diff therefore reports every
 * file as changed and hides the handful of real disagreements. This script
 * resolves both notations to the token they name, then classifies what is left:
 *
 *   notation      same token, different spelling      - safe, cosmetic
 *   retarget      both sides point at a real token, but a different one
 *   literal       different literal values
 *   unit-scale    the same number on two scales (0.5 vs 50)
 *   type          $type disagrees
 *   only-ours     key missing on their side
 *   only-theirs   key missing on our side
 *
 * Usage:
 *   node scripts/diff-ui-kit-tokens.mjs [--ref gitlab/main] [--json out.json]
 *                                       [--md out.md] [--file component-button]
 */
import { execFileSync } from "node:child_process"
import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OURS_DIR = join(ROOT, "packages/tokens/figma")
const THEIRS_DIR = "packages/theme/tokens"

const argv = process.argv.slice(2)
const argOf = (name, fallback) => {
  const i = argv.indexOf(name)
  return i === -1 ? fallback : argv[i + 1]
}
const REF = argOf("--ref", "gitlab/main")
const ONLY = argOf("--file", null)
const JSON_OUT = argOf("--json", null)
const MD_OUT = argOf("--md", null)

/** Files that are build products or inventories, not token declarations. */
const SKIP = new Set(["import-bundle.json", "manifest.json"])

function git(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf-8",
    maxBuffer: 64 * 1024 * 1024,
    // A missing path is an expected answer here ("they do not have this file"),
    // not a failure worth printing.
    stdio: ["ignore", "pipe", "ignore"],
  })
}

function theirFiles() {
  const out = git(["ls-tree", "--name-only", `${REF}:${THEIRS_DIR}`])
  return out.split("\n").filter((n) => n.endsWith(".json"))
}

function readTheirs(name) {
  try {
    return JSON.parse(git(["show", `${REF}:${THEIRS_DIR}/${name}`]))
  } catch {
    return null
  }
}

function readOurs(name) {
  try {
    return JSON.parse(readFileSync(join(OURS_DIR, name), "utf-8"))
  } catch {
    return null
  }
}

/* ── token name index ──────────────────────────────────────────────────────
 * Every declared token, by its leaf name, gathered from both sides. The index
 * is what lets a CSS variable be resolved back to the token it refers to
 * instead of being guessed at by string surgery.
 */
function collectNames(doc, into) {
  const walk = (node) => {
    if (!node || typeof node !== "object") return
    if ("$value" in node) return
    for (const [key, child] of Object.entries(node)) {
      if (child && typeof child === "object") {
        if ("$value" in child) {
          into.add(key)
          // Spacing primitives carry a px label ("2 (8px)"); index the bare step
          // too, because CSS refers to them as --spacing-2.
          const bare = key.split(" (")[0]
          if (bare !== key) into.add(bare)
        } else walk(child)
      }
    }
  }
  walk(doc)
}

/**
 * CSS prefixes the generator puts in front of a collection's tokens. Longest
 * first: --font-weight-medium names the token "medium", not "weight-medium".
 */
const PREFIXES = [
  "font-weight-",
  "font-family-",
  "font-size-",
  "line-height-",
  "breakpoint-",
  "spacing-",
  "radius-",
  "layout-",
  "color-",
  "text-",
  "font-",
]

function makeResolver(names) {
  return (cssName) => {
    if (names.has(cssName)) return cssName
    for (const p of PREFIXES) {
      if (cssName.startsWith(p)) {
        const short = cssName.slice(p.length)
        if (names.has(short)) return short
      }
    }
    // Unresolvable: keep the raw name so it still compares against itself.
    return cssName
  }
}

const ALIAS = /^\{([^}]+)\}$/
const VAR = /^var\(\s*--([A-Za-z0-9-]+)\s*\)$/

function canon(value, resolve) {
  if (typeof value !== "string") return { kind: "literal", value }
  const s = value.trim()
  const alias = ALIAS.exec(s)
  if (alias) {
    // "Color modes/action/action-primary" and "Colors.Neutral.700" both occur.
    const parts = alias[1].split(/[/.]/)
    return { kind: "ref", value: parts[parts.length - 1] }
  }
  const v = VAR.exec(s)
  if (v) return { kind: "ref", value: resolve(v[1]) }
  return { kind: "literal", value: s }
}

function flatten(node, path = [], out = new Map()) {
  if (!node || typeof node !== "object") return out
  if ("$value" in node) {
    out.set(path.join("/"), node)
    return out
  }
  for (const [key, child] of Object.entries(node)) flatten(child, [...path, key], out)
  return out
}

/** 0.5 vs 50, 0.65 vs 65 - the same ratio written on two scales. */
function sameOnTwoScales(a, b) {
  const na = Number(a)
  const nb = Number(b)
  if (!Number.isFinite(na) || !Number.isFinite(nb)) return false
  if (na === nb) return false
  return Math.abs(na * 100 - nb) < 1e-9 || Math.abs(nb * 100 - na) < 1e-9
}

function classify(ourTok, theirTok, resolve) {
  const findings = []
  const ourType = ourTok.$type
  const theirType = theirTok.$type
  if (ourType !== theirType) {
    findings.push({ class: "type", ours: ourType ?? null, theirs: theirType ?? null })
  }
  const a = canon(theirTok.$value, resolve)
  const b = canon(ourTok.$value, resolve)
  const rawEqual = theirTok.$value === ourTok.$value
  if (!rawEqual) {
    if (a.kind === "ref" && b.kind === "ref") {
      if (a.value === b.value) findings.push({ class: "notation", ours: ourTok.$value, theirs: theirTok.$value })
      else findings.push({ class: "retarget", ours: b.value, theirs: a.value })
    } else if (a.kind === "literal" && b.kind === "literal") {
      if (sameOnTwoScales(a.value, b.value))
        findings.push({ class: "unit-scale", ours: b.value, theirs: a.value })
      else findings.push({ class: "literal", ours: b.value, theirs: a.value })
    } else {
      findings.push({ class: "retarget", ours: ourTok.$value, theirs: theirTok.$value })
    }
  }
  return findings
}

/* ── run ─────────────────────────────────────────────────────────────────── */
const theirNames = theirFiles()
const ourNames = readdirSync(OURS_DIR).filter((n) => n.endsWith(".json"))
const everyName = [...new Set([...theirNames, ...ourNames])].filter((n) => !SKIP.has(n)).sort()
const allNames = everyName.filter((n) => (ONLY ? n.startsWith(ONLY) : true))

// The index is built from the whole token set, never from the --file subset:
// a reference in one file is almost always declared in another, and a partial
// index would report resolvable references as retargets.
const names = new Set()
for (const n of everyName) {
  const t = readTheirs(n)
  const o = readOurs(n)
  if (t) collectNames(t, names)
  if (o) collectNames(o, names)
}
const resolve = makeResolver(names)

const report = { ref: REF, generatedAt: new Date().toISOString(), files: [], totals: {} }
const bump = (k, n = 1) => (report.totals[k] = (report.totals[k] ?? 0) + n)

for (const name of allNames) {
  const theirs = readTheirs(name)
  const ours = readOurs(name)
  const entry = { file: name, status: "compared", findings: [], counts: {} }

  if (!theirs && !ours) continue
  if (!theirs) {
    entry.status = "only-ours-file"
    bump("only-ours-file")
    report.files.push(entry)
    continue
  }
  if (!ours) {
    entry.status = "only-theirs-file"
    bump("only-theirs-file")
    report.files.push(entry)
    continue
  }

  const ft = flatten(theirs)
  const fo = flatten(ours)
  for (const [key, tok] of fo) {
    if (!ft.has(key)) {
      entry.findings.push({ key, class: "only-ours", ours: tok.$value ?? null })
      continue
    }
    for (const f of classify(tok, ft.get(key), resolve)) entry.findings.push({ key, ...f })
  }
  for (const [key] of ft) if (!fo.has(key)) entry.findings.push({ key, class: "only-theirs" })

  for (const f of entry.findings) {
    entry.counts[f.class] = (entry.counts[f.class] ?? 0) + 1
    bump(f.class)
  }
  if (entry.findings.length === 0) {
    entry.status = "identical"
    bump("identical-files")
  }
  report.files.push(entry)
}

/* ── output ──────────────────────────────────────────────────────────────── */
const ORDER = ["type", "retarget", "unit-scale", "literal", "only-ours", "only-theirs", "notation"]
const label = {
  type: "type mismatch",
  retarget: "points at a different token",
  "unit-scale": "same ratio, different scale",
  literal: "different literal",
  "only-ours": "only in maxa-ui",
  "only-theirs": "only in ui-kit",
  notation: "notation only",
}

const lines = []
lines.push(`# Token diff: maxa-ui vs ui-kit (${REF})`)
lines.push("")
lines.push(`Generated ${report.generatedAt} by \`scripts/diff-ui-kit-tokens.mjs\`.`)
lines.push("")
lines.push("Both sides declare the same token set in two notations. References are resolved to")
lines.push("the token they name before comparing, so `notation` differences are cosmetic and")
lines.push("everything else is a real disagreement that needs a decision.")
lines.push("")
lines.push("| Class | Count |")
lines.push("| --- | --- |")
for (const k of ORDER) if (report.totals[k]) lines.push(`| ${label[k]} | ${report.totals[k]} |`)
lines.push(`| files identical | ${report.totals["identical-files"] ?? 0} |`)
lines.push(`| files only in maxa-ui | ${report.totals["only-ours-file"] ?? 0} |`)
lines.push(`| files only in ui-kit | ${report.totals["only-theirs-file"] ?? 0} |`)
lines.push("")

const substantive = report.files.filter((f) =>
  f.findings.some((x) => x.class !== "notation"),
)
lines.push(`## Files needing a decision (${substantive.length})`)
lines.push("")
for (const f of substantive) {
  const summary = ORDER.filter((k) => f.counts[k] && k !== "notation")
    .map((k) => `${f.counts[k]} ${label[k]}`)
    .join(", ")
  lines.push(`### ${f.file}`)
  lines.push("")
  lines.push(summary + (f.counts.notation ? ` (+${f.counts.notation} notation only)` : ""))
  lines.push("")
  const shown = f.findings.filter((x) => x.class !== "notation").slice(0, 12)
  for (const x of shown) {
    const ours = x.ours === undefined ? "-" : JSON.stringify(x.ours)
    const theirs = x.theirs === undefined ? "-" : JSON.stringify(x.theirs)
    lines.push(`- \`${x.key}\` - ${label[x.class]}: ours ${ours}, ui-kit ${theirs}`)
  }
  const hidden = f.findings.filter((x) => x.class !== "notation").length - shown.length
  if (hidden > 0) lines.push(`- ...and ${hidden} more`)
  lines.push("")
}

const notationOnly = report.files.filter(
  (f) => f.findings.length > 0 && f.findings.every((x) => x.class === "notation"),
)
lines.push(`## Notation only, safe to normalise (${notationOnly.length})`)
lines.push("")
for (const f of notationOnly) lines.push(`- ${f.file} (${f.counts.notation})`)
lines.push("")

const md = lines.join("\n")
if (MD_OUT) writeFileSync(MD_OUT, md)
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 2))
if (!MD_OUT && !JSON_OUT) console.log(md)
else {
  console.log(`compared ${report.files.length} files against ${REF}`)
  for (const k of ORDER) if (report.totals[k]) console.log(`  ${label[k]}: ${report.totals[k]}`)
  if (MD_OUT) console.log(`markdown -> ${MD_OUT}`)
  if (JSON_OUT) console.log(`json     -> ${JSON_OUT}`)
}
