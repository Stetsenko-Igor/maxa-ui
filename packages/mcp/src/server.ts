import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

import { getComponentSpec, listComponents } from "./components.js"
import { assertRepoRoot, resolveRepoRoot } from "./repo.js"
import {
  loadTokens,
  normalizeTokenName,
  resolveChain,
  searchTokens,
  type TokenEntry,
  type TokenMap,
} from "./tokens.js"

export const SERVER_NAME = "maxa-design-system"
export const SERVER_VERSION = "1.0.0"

const READ_ONLY = { readOnlyHint: true } as const

function textResult(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }] }
}

function errorResult(message: string) {
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true as const,
  }
}

function publicToken(t: TokenEntry) {
  return {
    name: t.name,
    light: t.light ?? null,
    dark: t.dark ?? null,
    sourceFile: t.sourceFile,
  }
}

/**
 * Create the MAXA design system MCP server. All design system data is loaded
 * from the repository at startup; tools are read-only.
 */
export function createServer(repoRoot: string = resolveRepoRoot()): McpServer {
  assertRepoRoot(repoRoot)
  const tokens: TokenMap = loadTokens(repoRoot)

  const server = new McpServer({ name: SERVER_NAME, version: SERVER_VERSION })

  server.registerTool(
    "list_components",
    {
      title: "List MAXA components",
      description:
        "List all MAXA design system components with their status (from the spec's Status line " +
        "or inferred from the implementation), spec path, and whether an implementation exists " +
        "in @maxa/ui.",
      annotations: READ_ONLY,
    },
    async () => textResult({ components: listComponents(repoRoot) }),
  )

  server.registerTool(
    "get_component_spec",
    {
      title: "Get component spec",
      description:
        "Return the full markdown spec for a component from specs/components/. Name matching is " +
        'fuzzy: case-insensitive and hyphen-insensitive ("DatePicker" matches "date-picker").',
      inputSchema: { name: z.string().describe("Component name, e.g. 'button' or 'DatePicker'") },
      annotations: READ_ONLY,
    },
    async ({ name }) => {
      const result = getComponentSpec(repoRoot, name)
      if (result.content === null) {
        return errorResult(
          `No spec found for "${name}". Valid names: ${result.validNames.join(", ")}`,
        )
      }
      return textResult({ name: result.name, specPath: result.specPath, content: result.content })
    },
  )

  server.registerTool(
    "search_tokens",
    {
      title: "Search design tokens",
      description:
        "Case-insensitive substring search over all CSS custom properties defined in " +
        "packages/tokens/src/. Returns token name, light value, dark value (if overridden in a " +
        '[data-theme="dark"] block), and source file. Capped at 50 results.',
      inputSchema: { query: z.string().describe("Substring to match, e.g. 'button-primary'") },
      annotations: READ_ONLY,
    },
    async ({ query }) => {
      const { total, matches } = searchTokens(tokens, query)
      return textResult({
        query,
        total,
        returned: matches.length,
        matches: matches.map(publicToken),
      })
    },
  )

  server.registerTool(
    "get_token",
    {
      title: "Get a design token",
      description:
        "Exact lookup of a single CSS custom property (with or without the leading --). Returns " +
        "light/dark values, source file, and the resolved var() reference chain (up to 5 hops).",
      inputSchema: {
        name: z.string().describe("Token name, e.g. '--button-primary-bg' or 'button-primary-bg'"),
      },
      annotations: READ_ONLY,
    },
    async ({ name }) => {
      const tokenName = normalizeTokenName(name)
      const token = tokens.get(tokenName)
      if (!token) {
        const { matches } = searchTokens(tokens, tokenName.replace(/^--/, ""), 5)
        const hint =
          matches.length > 0
            ? ` Similar tokens: ${matches.map((m) => m.name).join(", ")}`
            : " Use search_tokens to discover token names."
        return errorResult(`Token "${tokenName}" not found.${hint}`)
      }
      return textResult({
        ...publicToken(token),
        resolution: {
          light: resolveChain(tokens, token.light, "light"),
          dark: resolveChain(tokens, token.dark ?? token.light, "dark"),
        },
      })
    },
  )

  return server
}
