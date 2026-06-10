#!/usr/bin/env node
// Starts the MAXA design system MCP server on stdio.

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { createServer } from "./server.js"

async function main(): Promise<void> {
  const server = createServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
  // Log to stderr only — stdout is reserved for the JSON-RPC stream.
  console.error("maxa-design-system MCP server running on stdio")
}

main().catch((error: unknown) => {
  console.error("maxa-design-system MCP server failed to start:", error)
  process.exit(1)
})
