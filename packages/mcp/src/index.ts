// @maxa/mcp — MCP stdio server exposing the MAXA design system to AI agents.

export const version = "1.0.0"

export { createServer, SERVER_NAME, SERVER_VERSION } from "./server.js"
export { resolveRepoRoot, assertRepoRoot } from "./repo.js"
export {
  parseCssTokens,
  loadTokens,
  searchTokens,
  normalizeTokenName,
  resolveChain,
  type TokenEntry,
  type TokenMap,
  type TokenSearchResult,
  type ChainStep,
} from "./tokens.js"
export {
  listComponents,
  getComponentSpec,
  readSpecStatus,
  type ComponentInfo,
  type SpecLookupResult,
} from "./components.js"
export {
  listSpecs,
  getFoundationSpec,
  getPatternSpec,
  type SpecInfo,
  type SpecKind,
} from "./specs.js"
