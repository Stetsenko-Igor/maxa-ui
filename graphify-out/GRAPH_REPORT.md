# Graph Report - .  (2026-04-26)

## Corpus Check
- Corpus is ~6,442 words - fits in a single context window. You may not need a graph.

## Summary
- 73 nodes · 92 edges · 31 communities detected
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Button Component Tokens|Button Component Tokens]]
- [[_COMMUNITY_Token Architecture & Dark Mode|Token Architecture & Dark Mode]]
- [[_COMMUNITY_Radius & Audit Tooling|Radius & Audit Tooling]]
- [[_COMMUNITY_Spacing, Layout & Breakpoints|Spacing, Layout & Breakpoints]]
- [[_COMMUNITY_Figma Collections & Package Index|Figma Collections & Package Index]]
- [[_COMMUNITY_Typography & Fonts|Typography & Fonts]]
- [[_COMMUNITY_Docs App Layout|Docs App Layout]]
- [[_COMMUNITY_Docs App Page|Docs App Page]]
- [[_COMMUNITY_Isolated Node 8|Isolated Node 8]]
- [[_COMMUNITY_Isolated Node 9|Isolated Node 9]]
- [[_COMMUNITY_Isolated Node 10|Isolated Node 10]]
- [[_COMMUNITY_Isolated Node 11|Isolated Node 11]]
- [[_COMMUNITY_Isolated Node 12|Isolated Node 12]]
- [[_COMMUNITY_Isolated Node 13|Isolated Node 13]]
- [[_COMMUNITY_Isolated Node 14|Isolated Node 14]]
- [[_COMMUNITY_Isolated Node 15|Isolated Node 15]]
- [[_COMMUNITY_Isolated Node 16|Isolated Node 16]]
- [[_COMMUNITY_Isolated Node 17|Isolated Node 17]]
- [[_COMMUNITY_Isolated Node 18|Isolated Node 18]]
- [[_COMMUNITY_Isolated Node 19|Isolated Node 19]]
- [[_COMMUNITY_Isolated Node 20|Isolated Node 20]]
- [[_COMMUNITY_Isolated Node 21|Isolated Node 21]]
- [[_COMMUNITY_Isolated Node 22|Isolated Node 22]]
- [[_COMMUNITY_Isolated Node 23|Isolated Node 23]]
- [[_COMMUNITY_Isolated Node 24|Isolated Node 24]]
- [[_COMMUNITY_Isolated Node 25|Isolated Node 25]]
- [[_COMMUNITY_Isolated Node 26|Isolated Node 26]]
- [[_COMMUNITY_Isolated Node 27|Isolated Node 27]]
- [[_COMMUNITY_Isolated Node 28|Isolated Node 28]]
- [[_COMMUNITY_Isolated Node 29|Isolated Node 29]]
- [[_COMMUNITY_Isolated Node 30|Isolated Node 30]]

## God Nodes (most connected - your core abstractions)
1. `AGENT.md — AI Context & LLM Workflow Guide` - 17 edges
2. `Button — Component Spec` - 16 edges
3. `specs/README.md — Design System Spec Index` - 12 edges
4. `LLM-Ready Design System Layer — Implementation Plan` - 11 edges
5. `Typography Tokens — Foundation Spec` - 10 edges
6. `Color Tokens — Foundation Spec` - 9 edges
7. `Spacing Tokens — Foundation Spec` - 8 edges
8. `llms.txt — LLM-Readable Project Snapshot` - 7 edges
9. `Interactive Hierarchy Pattern Spec` - 7 edges
10. `Breakpoints — Foundation Spec` - 7 edges

## Surprising Connections (you probably didn't know these)
- `@maxa/tokens — CSS Variables & Theme` --shares_data_with--> `packages/tokens/src/dimensions.css`  [INFERRED]
  AGENT.md → specs/foundations/spacing.md
- `@maxa/tokens — CSS Variables & Theme` --shares_data_with--> `packages/tokens/src/typography.css`  [INFERRED]
  AGENT.md → specs/foundations/typography.md
- `@maxa/ui — React Component Library` --implements--> `Component Pattern: forwardRef + cva + Slot (Radix)`  [INFERRED]
  AGENT.md → specs/components/button.md
- `@maxa/tokens — CSS Variables & Theme` --shares_data_with--> `packages/tokens/src/semantic.css`  [INFERRED]
  AGENT.md → specs/foundations/color.md
- `@maxa/tokens — CSS Variables & Theme` --shares_data_with--> `packages/tokens/src/primitives.css`  [INFERRED]
  AGENT.md → specs/foundations/color.md

## Communities

### Community 0 - "Button Component Tokens"
Cohesion: 0.25
Nodes (11): packages/tokens/figma/component-button-dark.json, packages/tokens/figma/component-button-light.json, Button Sizes (sm, md, lg), Button Variants (primary, secondary, outline, ghost, link, success, danger), Component-based Tokens Collection, One Primary Button Per View Rule, Component Pattern: forwardRef + cva + Slot (Radix), @maxa/ui — React Component Library (+3 more)

### Community 1 - "Token Architecture & Dark Mode"
Cohesion: 0.36
Nodes (9): AGENT.md — AI Context & LLM Workflow Guide, Semantic Color Token Groups (text, bg, border, action), Dark Mode via data-theme="dark", Token Architecture — Primitives → Semantic → Component → Code, packages/tokens/figma/import-bundle.json — Figma Import Bundle, @maxa/tokens — CSS Variables & Theme, Color Tokens — Foundation Spec, packages/tokens/src/primitives.css (+1 more)

### Community 2 - "Radius & Audit Tooling"
Cohesion: 0.43
Nodes (7): Radius Scale (none, xxs…4xl, full), packages/tokens/figma/radius.json, LLM-Ready Design System Layer — Implementation Plan, scripts/audit-tokens.mjs — Token Hardcode Audit Script, Radius Tokens — Foundation Spec, specs/README.md — Design System Spec Index, specs/tokens-reference.md — Master CSS Variable Index

### Community 3 - "Spacing, Layout & Breakpoints"
Cohesion: 0.29
Nodes (7): Breakpoints (mobile 375px … max 1920px), Layout Tokens (Stack, Inline, Container, Grid), Semantic Spacing Scale (none, xxs…11xl), packages/tokens/figma/breakpoints.json, Breakpoints — Foundation Spec, Spacing Tokens — Foundation Spec, packages/tokens/src/dimensions.css

### Community 4 - "Figma Collections & Package Index"
Cohesion: 0.33
Nodes (6): Figma Token Collections (Primitives, Color modes, Spacing, Radius, Typography, Layout, Breakpoints), llms.txt — LLM-Readable Project Snapshot, @maxa/cli — CLI Tool, @maxa/hooks — Reusable React Hooks, @maxa/icons — SVG Icon Components, @maxa/mcp — MCP Server for AI Integration

### Community 5 - "Typography & Fonts"
Cohesion: 0.33
Nodes (6): Typography Roles (heading-2xl…xs, text-lg…sm, caption-sm/xs), packages/tokens/figma/typography.json, Font: Bebas Neue (mono/display), Font: Montserrat (body), Typography Tokens — Foundation Spec, packages/tokens/src/typography.css

### Community 6 - "Docs App Layout"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Docs App Page"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Isolated Node 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Isolated Node 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Isolated Node 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Isolated Node 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Isolated Node 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Isolated Node 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Isolated Node 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Isolated Node 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Isolated Node 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Isolated Node 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Isolated Node 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Isolated Node 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Isolated Node 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Isolated Node 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Isolated Node 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Isolated Node 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Isolated Node 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Isolated Node 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Isolated Node 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Isolated Node 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Isolated Node 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Isolated Node 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Isolated Node 30"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **15 isolated node(s):** `maxa/ui Skill README`, `@maxa/icons — SVG Icon Components`, `@maxa/hooks — Reusable React Hooks`, `@maxa/cli — CLI Tool`, `@maxa/mcp — MCP Server for AI Integration` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Docs App Layout`** (2 nodes): `layout.tsx`, `RootLayout()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Docs App Page`** (2 nodes): `page.tsx`, `Home()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 8`** (1 nodes): `vitest.workspace.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 9`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 10`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 11`** (1 nodes): `test-setup.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 12`** (1 nodes): `index.test.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 13`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 14`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 15`** (1 nodes): `index.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 16`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 17`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 18`** (1 nodes): `index.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 19`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 20`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 21`** (1 nodes): `index.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 22`** (1 nodes): `test-setup.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 23`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 24`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 25`** (1 nodes): `index.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 26`** (1 nodes): `test-setup.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 27`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 28`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 29`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Isolated Node 30`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AGENT.md — AI Context & LLM Workflow Guide` connect `Token Architecture & Dark Mode` to `Button Component Tokens`, `Radius & Audit Tooling`, `Spacing, Layout & Breakpoints`, `Figma Collections & Package Index`, `Typography & Fonts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `Button — Component Spec` connect `Button Component Tokens` to `Token Architecture & Dark Mode`, `Radius & Audit Tooling`, `Spacing, Layout & Breakpoints`, `Typography & Fonts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `llms.txt — LLM-Readable Project Snapshot` connect `Figma Collections & Package Index` to `Button Component Tokens`, `Token Architecture & Dark Mode`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `maxa/ui Skill README`, `@maxa/icons — SVG Icon Components`, `@maxa/hooks — Reusable React Hooks` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._