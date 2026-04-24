# LLM-Ready Design System Layer — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a structured LLM-readable layer on top of MAXA design system — spec files, a token audit script, and updated agent instructions — so that AI agents (Claude, Codex, Cursor) use correct tokens instead of fabricating values.

**Architecture:** A `specs/` directory at repo root contains markdown specs organized by tier (foundations → components → patterns). An audit script scans source files for hardcoded values and reports violations by file/line. Both `.claude/CLAUDE.md` and `AGENT.md` are updated to instruct agents to read specs before writing code.

**Tech Stack:** Markdown specs, Node.js ESM audit script, existing CSS variable system in `@maxa/tokens`

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `specs/README.md` | Index — what specs exist and how to use them |
| Create | `specs/tokens-reference.md` | Master CSS variable reference |
| Create | `specs/foundations/color.md` | Semantic color tokens + usage rules |
| Create | `specs/foundations/spacing.md` | Spacing scale + layout tokens |
| Create | `specs/foundations/typography.md` | Type scale + font usage |
| Create | `specs/foundations/radius.md` | Radius scale + when to use each |
| Create | `specs/foundations/breakpoints.md` | Breakpoint values + responsive strategy |
| Create | `specs/components/button.md` | Button variants, sizes, states, intent guide |
| Create | `specs/patterns/interactive-hierarchy.md` | Which button variant for which context |
| Create | `scripts/audit-tokens.mjs` | CI-ready hardcoded value scanner |
| Modify | `.claude/CLAUDE.md` | Add spec reading instructions for Claude |
| Modify | `AGENT.md` | Add LLM workflow section with enforcement rules |

---

### Task 1: specs/README.md

**Files:**
- Create: `specs/README.md`

- [ ] Create specs directory index

### Task 2: Foundation specs (color, spacing, typography, radius, breakpoints)

**Files:**
- Create: `specs/foundations/color.md`
- Create: `specs/foundations/spacing.md`
- Create: `specs/foundations/typography.md`
- Create: `specs/foundations/radius.md`
- Create: `specs/foundations/breakpoints.md`

### Task 3: Component spec — Button

**Files:**
- Create: `specs/components/button.md`

### Task 4: Patterns + Token Reference

**Files:**
- Create: `specs/patterns/interactive-hierarchy.md`
- Create: `specs/tokens-reference.md`

### Task 5: Audit script

**Files:**
- Create: `scripts/audit-tokens.mjs`

Run: `node scripts/audit-tokens.mjs`
Expected: report of any hardcoded hex colors or px values not using CSS variables.

### Task 6: Update agent instructions

**Files:**
- Modify: `.claude/CLAUDE.md`
- Modify: `AGENT.md`

### Task 7: Commit

```bash
git add specs/ scripts/audit-tokens.mjs .claude/CLAUDE.md AGENT.md docs/
git commit -m "feat: add LLM-ready design system spec layer with audit script"
```
