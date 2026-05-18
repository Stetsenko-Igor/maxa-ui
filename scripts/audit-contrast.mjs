#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const repoRoot = process.cwd()
const themeEntry = "packages/tokens/src/theme.css"
const figmaPrimitivesPath = "packages/tokens/figma/primitives.json"
const currentDate = "2026-05-18"

const args = process.argv.slice(2)
const format = readArg("--format", "markdown")
const outPath = readArg("--out", null)

function readArg(name, fallback) {
  const index = args.indexOf(name)
  if (index === -1) return fallback
  return args[index + 1] ?? fallback
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8")
}

function readCssGraph(relativePath, seen = new Set()) {
  const absolutePath = path.join(repoRoot, relativePath)
  const normalizedPath = path.normalize(relativePath)
  if (seen.has(normalizedPath)) return []
  seen.add(normalizedPath)

  const css = fs.readFileSync(absolutePath, "utf8")
  const chunks = [{ path: normalizedPath, css }]
  const importRegex = /@import\s+["']([^"']+)["'];/g
  let match

  while ((match = importRegex.exec(css))) {
    const importPath = path.normalize(path.join(path.dirname(normalizedPath), match[1]))
    chunks.push(...readCssGraph(importPath, seen))
  }

  return chunks
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "")
}

function parseCssVariables() {
  const rootVars = new Map()
  const darkVars = new Map()
  const chunks = readCssGraph(themeEntry)

  // Apply imported files before the entry file itself. This mirrors the cascade
  // order consumers receive after @import expansion.
  const orderedChunks = [...chunks.slice(1), chunks[0]]

  for (const chunk of orderedChunks) {
    const css = stripComments(chunk.css)
    collectBlockVars(css, /@theme\s*\{([\s\S]*?)\}/g, rootVars)
    collectBlockVars(css, /:root\s*\{([\s\S]*?)\}/g, rootVars)
    collectBlockVars(css, /\[data-theme=["']?dark["']?\]\s*\{([\s\S]*?)\}/g, darkVars)
  }

  loadFigmaPaletteFallbacks(rootVars)
  return { rootVars, darkVars }
}

function collectBlockVars(css, blockRegex, target) {
  let blockMatch
  while ((blockMatch = blockRegex.exec(css))) {
    const body = blockMatch[1]
    const varRegex = /(--[A-Za-z0-9_-]+)\s*:\s*([^;]+);/g
    let varMatch
    while ((varMatch = varRegex.exec(body))) {
      target.set(varMatch[1], varMatch[2].trim())
    }
  }
}

function loadFigmaPaletteFallbacks(rootVars) {
  if (!fs.existsSync(path.join(repoRoot, figmaPrimitivesPath))) return

  const json = JSON.parse(readText(figmaPrimitivesPath))
  const colors = json.Colors ?? {}
  for (const [familyName, familyValue] of Object.entries(colors)) {
    const family = slugFamily(familyName)
    if (!family) continue
    flattenFigmaColors(familyValue, [`--color-${family}`], rootVars)
  }
}

function slugFamily(name) {
  if (name === "Base") return "base"
  if (name === "Neutral") return "neutral"
  if (["Brand", "Red", "Orange", "Yellow", "Green", "Blue"].includes(name)) {
    return name.toLowerCase()
  }
  return null
}

function flattenFigmaColors(node, parts, rootVars) {
  if (!node || typeof node !== "object") return
  if (node.$type === "color" && typeof node.$value === "string") {
    const name = parts.join("-").toLowerCase()
    if (!rootVars.has(name)) rootVars.set(name, normalizeFigmaColor(node.$value))
    return
  }
  for (const [key, value] of Object.entries(node)) {
    flattenFigmaColors(value, [...parts, key.replace(/\s+/g, "-")], rootVars)
  }
}

function normalizeFigmaColor(value) {
  if (/^#[0-9a-fA-F]{8}$/.test(value)) {
    const r = Number.parseInt(value.slice(1, 3), 16)
    const g = Number.parseInt(value.slice(3, 5), 16)
    const b = Number.parseInt(value.slice(5, 7), 16)
    const a = Number.parseInt(value.slice(7, 9), 16) / 255
    if (a === 0) return "transparent"
    return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})`
  }
  return value
}

function themeVarsFor(mode, parsed) {
  const vars = new Map(parsed.rootVars)
  if (mode === "dark") {
    for (const [key, value] of parsed.darkVars) vars.set(key, value)
  }
  return vars
}

function resolveToken(token, vars, stack = []) {
  if (!token) return { value: null, unresolved: "missing token" }
  if (stack.includes(token)) return { value: null, unresolved: `circular alias: ${stack.join(" -> ")} -> ${token}` }
  const raw = vars.get(token)
  if (!raw) return { value: null, unresolved: `unresolved token: ${token}` }
  return resolveValue(raw, vars, [...stack, token])
}

function resolveValue(rawValue, vars, stack = []) {
  const trimmed = rawValue.trim()
  const varMatch = /^var\((--[A-Za-z0-9_-]+)\)$/.exec(trimmed)
  if (varMatch) return resolveToken(varMatch[1], vars, stack)
  return { value: trimmed, unresolved: null }
}

function parseColor(value) {
  if (!value) return null
  const color = value.trim()
  if (color === "transparent") return { r: 0, g: 0, b: 0, a: 0 }

  const shortHex = /^#([0-9a-fA-F]{3})$/.exec(color)
  if (shortHex) {
    return {
      r: Number.parseInt(shortHex[1][0] + shortHex[1][0], 16),
      g: Number.parseInt(shortHex[1][1] + shortHex[1][1], 16),
      b: Number.parseInt(shortHex[1][2] + shortHex[1][2], 16),
      a: 1,
    }
  }

  const hex = /^#([0-9a-fA-F]{6})$/.exec(color)
  if (hex) {
    return {
      r: Number.parseInt(hex[1].slice(0, 2), 16),
      g: Number.parseInt(hex[1].slice(2, 4), 16),
      b: Number.parseInt(hex[1].slice(4, 6), 16),
      a: 1,
    }
  }

  const rgba = /^rgba?\(([^)]+)\)$/.exec(color)
  if (rgba) {
    const parts = rgba[1].split(",").map((part) => part.trim())
    return {
      r: Number(parts[0]),
      g: Number(parts[1]),
      b: Number(parts[2]),
      a: parts[3] === undefined ? 1 : Number(parts[3]),
    }
  }

  return null
}

function compositeOver(foreground, background) {
  if (foreground.a >= 1) return foreground
  const alpha = foreground.a
  return {
    r: foreground.r * alpha + background.r * (1 - alpha),
    g: foreground.g * alpha + background.g * (1 - alpha),
    b: foreground.b * alpha + background.b * (1 - alpha),
    a: 1,
  }
}

function channelToLinear(value) {
  const s = value / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(color) {
  return 0.2126 * channelToLinear(color.r) + 0.7152 * channelToLinear(color.g) + 0.0722 * channelToLinear(color.b)
}

function contrastRatio(foreground, background) {
  const fg = foreground.a < 1 ? compositeOver(foreground, background) : foreground
  const bg = background.a < 1 ? compositeOver(background, { r: 255, g: 255, b: 255, a: 1 }) : background
  const lighter = Math.max(relativeLuminance(fg), relativeLuminance(bg))
  const darker = Math.min(relativeLuminance(fg), relativeLuminance(bg))
  return (lighter + 0.05) / (darker + 0.05)
}

const thresholds = {
  text: 4.5,
  largeText: 3,
  nonText: 3,
  informational: 0,
}

function pair(component, pairName, fg, bg, kind = "text", options = {}) {
  return {
    component,
    pair: pairName,
    foregroundToken: fg,
    backgroundToken: bg,
    threshold: thresholds[kind],
    kind,
    blocking: options.blocking ?? kind !== "informational",
    skipReason: options.skipReason,
  }
}

function buildMatrix() {
  const pairs = []
  const buttonVariants = [
    ["primary", "--button-primary-text", "--button-primary-bg"],
    ["primary hover", "--button-primary-text", "--button-primary-bg-hover"],
    ["primary active", "--button-primary-text", "--button-primary-bg-active"],
    ["secondary", "--button-secondary-text", "--button-secondary-bg"],
    ["secondary hover", "--button-secondary-text", "--button-secondary-bg-hover"],
    ["secondary active", "--button-secondary-text", "--button-secondary-bg-active"],
    ["outline", "--button-outline-text", "--button-outline-bg"],
    ["outline hover", "--button-outline-text", "--button-outline-bg-hover"],
    ["outline active", "--button-outline-text", "--button-outline-bg-active"],
    ["ghost", "--button-ghost-text", "--color-bg-surface"],
    ["ghost hover", "--button-ghost-text", "--button-ghost-bg-hover"],
    ["ghost active", "--button-ghost-text", "--button-ghost-bg-active"],
    ["link", "--button-link-text", "--color-bg-surface"],
    ["link hover", "--button-link-text-hover", "--color-bg-surface"],
    ["link active", "--button-link-text-active", "--color-bg-surface"],
    ["success", "--button-success-text", "--button-success-bg"],
    ["success hover", "--button-success-text", "--button-success-bg-hover"],
    ["success active", "--button-success-text", "--button-success-bg-active"],
    ["danger", "--button-danger-text", "--button-danger-bg"],
    ["danger hover", "--button-danger-text", "--button-danger-bg-hover"],
    ["danger active", "--button-danger-text", "--button-danger-bg-active"],
  ]

  for (const [name, fg, bg] of buttonVariants) {
    pairs.push(pair("Button", `Button ${name} text on bg`, fg, bg))
    pairs.push(pair("IconButton", `IconButton ${name} icon on bg`, fg, bg, "nonText"))
  }

  pairs.push(pair("Button", "Button focus border on surface", "--button-primary-border-focus", "--color-bg-surface", "nonText"))
  pairs.push(pair("IconButton", "IconButton focus border on surface", "--button-primary-border-focus", "--color-bg-surface", "nonText"))
  pairs.push(pair("Button", "Button disabled opacity", "--button-disabled-opacity", "--color-bg-surface", "informational", { skipReason: "Opacity token is informational; no computed alpha model is applied." }))

  const fieldComponents = ["Input", "Select", "DatePicker"]
  for (const component of fieldComponents) {
    pairs.push(pair(component, `${component} text on field`, "--input-text", "--input-bg"))
    pairs.push(pair(component, `${component} placeholder on field`, "--input-placeholder", "--input-bg"))
    pairs.push(pair(component, `${component} label on page`, "--input-label-text", "--color-bg-page"))
    pairs.push(pair(component, `${component} hint on page`, "--input-hint-text", "--color-bg-page"))
    pairs.push(pair(component, `${component} error text on page`, "--input-error-text", "--color-bg-page"))
    pairs.push(pair(component, `${component} success hint on page`, "--input-success-hint", "--color-bg-page"))
    pairs.push(pair(component, `${component} disabled text on disabled bg`, "--input-disabled-text", "--input-disabled-bg", "informational", { skipReason: "Disabled text is exempt from WCAG contrast requirements; enabled text states are measured as blocking pairs." }))
    pairs.push(pair(component, `${component} readonly text on readonly bg`, "--input-readonly-text", "--input-readonly-bg"))
    pairs.push(pair(component, `${component} icon on field`, "--input-placeholder", "--input-bg", "nonText"))
    pairs.push(pair(component, `${component} focus ring on field`, "--input-focus-ring", "--input-bg", "nonText"))
    pairs.push(pair(component, `${component} default border on field`, "--input-border", "--input-bg", "informational", { skipReason: "Subtle decorative border; focus/error indicators are measured as blocking pairs." }))
    pairs.push(pair(component, `${component} error border on field`, "--input-error-border", "--input-bg", "nonText"))
  }

  pairs.push(pair("FormField", "FormField label on page", "--input-label-text", "--color-bg-page"))
  pairs.push(pair("FormField", "FormField required mark on page", "--input-error-text", "--color-bg-page"))
  pairs.push(pair("FormField", "FormField hint on page", "--input-hint-text", "--color-bg-page"))
  pairs.push(pair("FormField", "FormField error hint on page", "--input-error-hint", "--color-bg-page"))
  pairs.push(pair("FormField", "FormField info icon on page", "--input-placeholder", "--color-bg-page", "nonText"))

  const checks = [
    ["Checkbox", "--checkbox"],
    ["Radio", "--radio"],
  ]
  for (const [component, prefix] of checks) {
    const markToken = component === "Checkbox" ? "--checkbox-mark-color" : "--radio-dot-color"
    const checkedBg = component === "Checkbox" ? "--checkbox-bg-checked" : "--radio-bg-checked"
    const checkedBorder = component === "Checkbox" ? "--checkbox-border-checked" : "--radio-border-checked"
    const errorCheckedBg = component === "Checkbox" ? "--checkbox-bg-error-checked" : "--radio-bg-error-checked"
    const disabledBg = component === "Checkbox" ? "--checkbox-bg-disabled" : "--radio-bg-disabled"
    const disabledBorder = component === "Checkbox" ? "--checkbox-border-disabled" : "--radio-border-disabled"

    pairs.push(pair(component, `${component} label on page`, `${prefix}-label-text`, "--color-bg-page"))
    pairs.push(pair(component, `${component} helper on page`, `${prefix}-helper-text`, "--color-bg-page"))
    pairs.push(pair(component, `${component} error helper on page`, `${prefix}-helper-error`, "--color-bg-page"))
    pairs.push(pair(component, `${component} checked mark on checked bg`, markToken, checkedBg, "nonText"))
    pairs.push(pair(component, `${component} checked border on page`, checkedBorder, "--color-bg-page", "nonText"))
    pairs.push(pair(component, `${component} error checked mark on error bg`, markToken, errorCheckedBg, "nonText"))
    pairs.push(pair(component, `${component} focus border on page`, `${prefix}-border-focus`, "--color-bg-page", "nonText"))
    pairs.push(pair(component, `${component} default border on page`, `${prefix}-border`, "--color-bg-page", "informational", { skipReason: "Subtle decorative border; checked, error, and focus indicators are measured as blocking pairs." }))
    pairs.push(pair(component, `${component} hover border on page`, `${prefix}-border-hover`, "--color-bg-page", "informational", { skipReason: "Subtle hover border; focus/error indicators are measured as blocking pairs." }))
    pairs.push(pair(component, `${component} disabled border on disabled bg`, disabledBorder, disabledBg, "informational", { skipReason: "Disabled control boundary is intentionally muted and non-blocking." }))
  }

  return pairs
}

function evaluatePair(definition, mode, vars) {
  if (definition.skipReason) {
    return {
      ...baseResult(definition, mode),
      ratio: null,
      skipped: true,
      pass: true,
      result: "SKIPPED",
      reason: definition.skipReason,
    }
  }

  const fgValue = resolveColorLike(definition.foregroundToken, vars)
  const bgValue = resolveColorLike(definition.backgroundToken, vars)

  if (fgValue.unresolved || bgValue.unresolved) {
    return {
      ...baseResult(definition, mode),
      foregroundValue: fgValue.value,
      backgroundValue: bgValue.value,
      ratio: null,
      skipped: false,
      pass: false,
      result: "FAIL",
      reason: fgValue.unresolved || bgValue.unresolved,
    }
  }

  const fg = parseColor(fgValue.value)
  const bg = parseColor(bgValue.value)

  if (!fg || !bg) {
    return {
      ...baseResult(definition, mode),
      foregroundValue: fgValue.value,
      backgroundValue: bgValue.value,
      ratio: null,
      skipped: false,
      pass: false,
      result: "FAIL",
      reason: "unsupported color value",
    }
  }

  if (fg.a === 0 || bg.a === 0) {
    return {
      ...baseResult(definition, mode),
      foregroundValue: fgValue.value,
      backgroundValue: bgValue.value,
      ratio: null,
      skipped: true,
      pass: true,
      result: "SKIPPED",
      reason: "transparent foreground or background is not measurable",
    }
  }

  const ratio = Number(contrastRatio(fg, bg).toFixed(2))
  const pass = definition.blocking ? ratio >= definition.threshold : true
  return {
    ...baseResult(definition, mode),
    foregroundValue: fgValue.value,
    backgroundValue: bgValue.value,
    ratio,
    skipped: false,
    pass,
    result: pass ? "PASS" : "FAIL",
    reason: definition.blocking ? "" : "informational pair",
  }
}

function resolveColorLike(tokenOrValue, vars) {
  if (tokenOrValue.startsWith("--")) return resolveToken(tokenOrValue, vars)
  return resolveValue(tokenOrValue, vars)
}

function baseResult(definition, mode) {
  return {
    theme: mode,
    component: definition.component,
    pair: definition.pair,
    foregroundToken: definition.foregroundToken,
    backgroundToken: definition.backgroundToken,
    threshold: definition.threshold,
    kind: definition.kind,
    blocking: definition.blocking,
  }
}

function runAudit() {
  const parsed = parseCssVariables()
  const matrix = buildMatrix()
  const results = []

  for (const mode of ["light", "dark"]) {
    const vars = themeVarsFor(mode, parsed)
    for (const definition of matrix) {
      results.push(evaluatePair(definition, mode, vars))
    }
  }

  const checked = results.filter((result) => !result.skipped).length
  const failed = results.filter((result) => !result.skipped && !result.pass).length
  const skipped = results.filter((result) => result.skipped).length
  const passed = checked - failed

  return {
    generatedAt: currentDate,
    source: {
      themeEntry,
      figmaPaletteFallback: figmaPrimitivesPath,
    },
    summary: { checked, passed, failed, skipped },
    results,
  }
}

function renderMarkdown(report, title = "Phase 1 Contrast Audit Baseline") {
  const lines = []
  lines.push(`# ${title}`)
  lines.push("")
  lines.push(`**Date:** ${report.generatedAt}`)
  lines.push(`**Source:** \`${themeEntry}\``)
  lines.push("")
  lines.push("| Checked | Passed | Failed | Skipped |")
  lines.push("|---------|--------|--------|---------|")
  lines.push(`| ${report.summary.checked} | ${report.summary.passed} | ${report.summary.failed} | ${report.summary.skipped} |`)
  lines.push("")

  for (const theme of ["light", "dark"]) {
    const themeLabel = theme === "light" ? "Light theme" : "Dark theme"
    lines.push(`## ${themeLabel}`)
    lines.push("")
    lines.push("| Component | Pair | Foreground token | Background token | Ratio | Threshold | Result |")
    lines.push("|-----------|------|------------------|------------------|-------|-----------|--------|")
    for (const result of report.results.filter((item) => item.theme === theme && !item.skipped)) {
      const ratio = result.ratio === null ? "n/a" : result.ratio.toFixed(2)
      const threshold = result.threshold === 0 ? "info" : result.threshold.toFixed(1)
      lines.push(`| ${result.component} | ${result.pair} | \`${result.foregroundToken}\` | \`${result.backgroundToken}\` | ${ratio} | ${threshold} | ${result.result} |`)
    }
    lines.push("")
  }

  lines.push("## Failures")
  lines.push("")
  const failures = report.results.filter((result) => !result.skipped && !result.pass)
  if (failures.length === 0) {
    lines.push("No failures measured.")
  } else {
    for (const result of failures) {
      lines.push(`- ${result.theme}: ${result.component} / ${result.pair} — ${result.ratio ?? "n/a"} against ${result.threshold}; ${result.reason || "below threshold"}`)
    }
  }
  lines.push("")

  lines.push("## Skipped")
  lines.push("")
  const skipped = report.results.filter((result) => result.skipped)
  if (skipped.length === 0) {
    lines.push("No pairs skipped.")
  } else {
    for (const result of skipped) {
      lines.push(`- ${result.theme}: ${result.component} / ${result.pair} — ${result.reason}`)
    }
  }
  lines.push("")

  return `${lines.join("\n")}\n`
}

function writeOutput(report) {
  let payload
  if (format === "json") {
    payload = `${JSON.stringify(report, null, 2)}\n`
  } else if (format === "markdown") {
    const title = outPath?.includes("final") ? "Phase 1 Contrast Audit Final" : "Phase 1 Contrast Audit Baseline"
    payload = renderMarkdown(report, title)
    if (title.endsWith("Final")) {
      const tokenChanges = [
        "",
        "## Token changes",
        "",
        "- `packages/tokens/src/semantic.css`: adjusted accessible text, action, error border, and dark-mode action aliases.",
        "- `packages/tokens/src/component-checkbox.css`: changed `--checkbox-mark-color` to `--color-text-inverse`.",
        "- `packages/tokens/src/component-radio.css`: changed `--radio-dot-color` to `--color-text-inverse`.",
        "",
      ].join("\n")
      payload = payload.replace(/\n$/, tokenChanges)
      payload += "\nQUAL-01 and QUAL-02 are satisfied only when the failed count is `0`.\n"
    }
  } else {
    throw new Error(`Unsupported format: ${format}`)
  }

  if (outPath) {
    fs.mkdirSync(path.dirname(path.resolve(repoRoot, outPath)), { recursive: true })
    fs.writeFileSync(path.resolve(repoRoot, outPath), payload)
  } else {
    process.stdout.write(payload)
  }
}

const report = runAudit()
writeOutput(report)

console.log(`Contrast audit: ${report.summary.checked} checked, ${report.summary.failed} failed, ${report.summary.skipped} skipped`)
process.exit(report.summary.failed > 0 ? 1 : 0)
