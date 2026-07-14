---
"@maxa/mcp": minor
---

Add three MCP tools so agents can reach all spec content, not just components and tokens: `list_specs` (foundations, patterns, and the architecture contract), `get_foundation_spec` (full markdown, fuzzy matching with a singular/plural fallback so `colors` resolves to `color.md`), and `get_pattern_spec` (e.g. `interactive-hierarchy` with the one-primary-action-per-view rule). `specs/README.md`, the auto-generated `tokens-reference.md`, and audit/gap reports are excluded by design.
