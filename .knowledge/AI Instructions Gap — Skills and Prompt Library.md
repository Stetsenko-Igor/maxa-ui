# AI Instructions Gap — Skills and Prompt Library

**Captured:** 2026-05-29
**Phase target:** Phase 4 (v1.0 release prep) — closes the `skills/maxa/` stub and `AGENT.md` stub
**Priority:** High leverage — compounds across every AI-powered workflow

---

## Why This Matters

Source: Figma e-book "The New Product Playbook: AI-Powered Workflows" (2025).
Full analysis saved at: `Obsidian/Maxa/Resources/Figma - The New Product Playbook AI-Powered Workflows.md`

Key finding from the e-book: **The design system is infrastructure for AI tools.** The cleaner and more completely documented it is, the better every AI-generated prototype, code output, and design will be. Teams that document their standards are the ones getting useful output from AI tools.

The e-book cites athenahealth as a case study:
> They standardized Figma files with consistent naming/variables/auto layout, wrote documentation on how to use the MCP server, and built a prompt library of fixes for common issues. If a tool isn't applying tokens correctly, any Figma user can look up a recommended prompt to fix it.

**Current gap in this repo:**
- `.claude/CLAUDE.md` covers Claude Code well — hard rules, token architecture, specs workflow
- `AGENT.md` is a stub: "full context available in Phase 4"
- `skills/maxa/README.md` is a stub: "full skill content added in Phase 4"
- No Figma Make instructions exist
- No Figma MCP skills file exists
- No prompt library exists

---

## What Needs to Be Built

### 1. `skills/maxa/use-design-system.md`

A markdown file agents (Figma Make, Codex, Cursor) can load as a "Skill". Content:
- Which components exist and when to reach for each
- Which tokens to use for which contexts (color, spacing, radius, typography)
- Layout patterns (Stack, Inline, Container usage)
- What NOT to do (no hardcoded values, no raw primitives in components, one primary button per view)
- Step-by-step when creating a new screen or component

This is the Figma Make equivalent of `figma-use` skill referenced in the e-book.

### 2. `skills/maxa/create-screen.md`

Step-by-step instructions for AI when creating a new screen from scratch using Maxa DS:
1. Identify the screen type (form, list, detail, empty state, error state)
2. Select the appropriate layout wrapper
3. Pick surface tokens for background
4. Apply typography tokens for headings and body
5. Use existing components — don't invent new ones
6. Footer / action bar: one primary button max per view
7. Audit before completing: run `node scripts/audit-tokens.mjs`

### 3. `AGENT.md` — fill in the stub

Replace the "Under development" placeholder with:
- Full component inventory (what's available, what's not yet shipped)
- Token quick-reference (most used tokens with their CSS variable names)
- The same hard rules from `.claude/CLAUDE.md` adapted for non-Claude agents
- Link to skills files

### 4. `prompt-library/README.md` — common AI fix prompts

A collection of short, copy-paste prompts for common AI issues with the Maxa design system.

Examples:
- "You used hardcoded hex colors. Replace with: [token map]"
- "You used `gap: 16px`. Replace with `gap: var(--spacing-xl)`"
- "You added a second primary button. One primary per view — demote this to `secondary`"
- "You wrote a `:dark` selector. Maxa uses `data-theme="dark"` at the token level — remove the selector"
- "This component doesn't exist in @maxa/ui. Use [closest alternative] instead"

### 5. Figma MCP skills file

Instructions for the Figma MCP server that tell AI coding agents how to work with the Maxa Figma file:
- Which Figma library to reference
- Component naming conventions in Figma
- Token variable collection names (`Primitives`, `Color modes`, `Spacing`, `Radius`, `Typography`, `Layout`)
- How to map Figma component names to React component names

---

## Implementation Notes

- All files should be plain markdown — agents load them directly
- Keep each file focused on one job (don't try to pack everything into one file)
- Skills should be imperative ("Use X for Y", "Do not use Z") not descriptive
- Reference `specs/tokens-reference.md` for the authoritative token list — don't duplicate it, link to it
- Test each skills file by giving it to an AI agent and asking it to build a simple screen; check the output for token violations with `node scripts/audit-tokens.mjs`

---

## Suggested Directory Structure

```
skills/
  maxa/
    README.md               ← exists (stub) — update to explain skill system
    use-design-system.md    ← NEW: core rules + token usage guide for AI tools
    create-screen.md        ← NEW: step-by-step for new screen creation
    component-inventory.md  ← NEW: what components exist, when to use each

prompt-library/
  README.md                 ← NEW: index
  token-violations.md       ← NEW: prompts to fix common token errors
  component-misuse.md       ← NEW: prompts to fix wrong component choices
```

---

## Success Criteria

- Give an AI agent only `skills/maxa/use-design-system.md` + a task → generated code passes `node scripts/audit-tokens.mjs` on first pass
- Any team member can open `prompt-library/` and find a fix prompt for the most common AI output issues within 30 seconds
- `AGENT.md` is no longer a stub — it's the single document you share with any AI tool to onboard it to the Maxa design system
