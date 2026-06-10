#!/usr/bin/env node
import {
  assertRepoRoot,
  listComponents,
  loadTokens,
  normalizeTokenName,
  resolveChain,
  resolveRepoRoot,
  searchTokens,
  type ComponentInfo,
  type TokenEntry,
} from "@maxa/mcp"
import { pathToFileURL } from "node:url"

export const version = "0.0.1"

export interface CliIO {
  stdout?: (message: string) => void
  stderr?: (message: string) => void
  env?: NodeJS.ProcessEnv
}

interface ParsedArgs {
  args: string[]
  json: boolean
  mode: "light" | "dark"
}

function helpText(): string {
  return [
    "maxa-ui (experimental)",
    "",
    "Usage:",
    "  maxa-ui --help",
    "  maxa-ui --version",
    "  maxa-ui components list [--json]",
    "  maxa-ui tokens search <query> [--json]",
    "  maxa-ui tokens get <token> [--mode light|dark] [--json]",
    "",
    "Environment:",
    "  MAXA_REPO_ROOT  Override the repository root when running outside the workspace.",
    "",
    "Scope:",
    "  Read-only introspection commands only. Component generators are intentionally not implemented.",
  ].join("\n")
}

function parseArgs(argv: string[]): ParsedArgs {
  const args: string[] = []
  let json = false
  let mode: "light" | "dark" = "light"

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined) continue
    if (arg === "--json") {
      json = true
      continue
    }
    if (arg === "--mode") {
      const next = argv[i + 1]
      if (next !== "light" && next !== "dark") {
        throw new Error("--mode must be either light or dark")
      }
      mode = next
      i++
      continue
    }
    args.push(arg)
  }

  return { args, json, mode }
}

function formatComponents(components: ComponentInfo[]): string {
  return components
    .map((component) => {
      const implementation = component.hasImplementation ? "implemented" : "spec-only"
      return `${component.name}\t${component.status}\t${implementation}`
    })
    .join("\n")
}

function formatToken(token: TokenEntry, mode: "light" | "dark", chain: ReturnType<typeof resolveChain>): string {
  const value = mode === "dark" ? (token.dark ?? token.light) : token.light
  const lines = [
    `${token.name}`,
    `value: ${value ?? "(no value)"}`,
    `source: ${token.sourceFile}`,
  ]
  if (mode === "dark" && token.dark !== undefined) {
    lines.push(`light: ${token.light ?? "(no light value)"}`)
  }
  if (chain.length > 0) {
    lines.push("chain:")
    lines.push(...chain.map((step) => `  ${step.name}: ${step.value}`))
  }
  return lines.join("\n")
}

function printJson(stdout: (message: string) => void, value: unknown): void {
  stdout(JSON.stringify(value, null, 2))
}

export function runCli(argv: string[], io: CliIO = {}): number {
  const stdout = io.stdout ?? console.log
  const stderr = io.stderr ?? console.error

  try {
    const { args, json, mode } = parseArgs(argv)
    const [group, command, ...rest] = args

    if (!group || group === "--help" || group === "-h") {
      stdout(helpText())
      return 0
    }

    if (group === "--version" || group === "-v") {
      stdout(version)
      return 0
    }

    const repoRoot = resolveRepoRoot(io.env)
    assertRepoRoot(repoRoot)

    if (group === "components" && command === "list") {
      const components = listComponents(repoRoot)
      if (json) printJson(stdout, components)
      else stdout(formatComponents(components))
      return 0
    }

    if (group === "tokens" && command === "search") {
      const query = rest.join(" ").trim()
      if (!query) throw new Error("tokens search requires a query")
      const result = searchTokens(loadTokens(repoRoot), query)
      if (json) printJson(stdout, result)
      else stdout(result.matches.map((token) => `${token.name}\t${token.light ?? token.dark ?? ""}`).join("\n"))
      return 0
    }

    if (group === "tokens" && command === "get") {
      const requested = rest[0]
      if (!requested) throw new Error("tokens get requires a token name")
      const tokens = loadTokens(repoRoot)
      const name = normalizeTokenName(requested)
      const token = tokens.get(name)
      if (!token) throw new Error(`Token not found: ${name}`)
      const value = mode === "dark" ? (token.dark ?? token.light) : token.light
      const chain = resolveChain(tokens, value, mode)
      if (json) printJson(stdout, { ...token, mode, value, chain })
      else stdout(formatToken(token, mode, chain))
      return 0
    }

    throw new Error(`Unknown command: ${args.join(" ")}`)
  } catch (error) {
    stderr(error instanceof Error ? error.message : String(error))
    return 1
  }
}

const invokedPath = process.argv[1]
if (invokedPath && import.meta.url === pathToFileURL(invokedPath).href) {
  process.exitCode = runCli(process.argv.slice(2))
}
