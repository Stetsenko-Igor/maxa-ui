# Design System Research Corpus

Status: external reference corpus  
Last located: 2026-05-30

## Location

Primary Obsidian corpus:

`/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/Obsidian/Maxa/MAXA UI/Design System Research`

Related project research notes:

`/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/Obsidian/Maxa/Projects/Design System`

Historical execution plan:

`/Users/igorstetsenko/.claude/plans/steady-percolating-snail.md`

## Purpose

Use this corpus before making component taxonomy, token architecture, naming, or API decisions that should be based on cross-design-system precedent rather than the current MAXA implementation alone.

This corpus is independent from MAXA UI. It should inform MAXA decisions, but the conclusions should not be treated as MAXA-specific defaults until accepted into the local specs.

## Current Contents

The corpus currently contains:

- `89` normalized design-system profiles in `systems/`
- synthesis documents in `synthesis/`
- explicit MAXA decision notes for token architecture and component taxonomy
- evidence metadata per profile: Confirmed, Partially confirmed, Inferred, or Speculative

Key synthesis files:

- `README.md` — corpus index and status
- `synthesis/research-methodology.md` — source priority, evidence levels, normalization rules
- `synthesis/coverage.md` — completed systems and coverage status
- `synthesis/maxa-current-decisions.md` — decisions already made in MAXA UI
- `synthesis/component-taxonomy.md` — Badge, Tag, FilterChip, Pill, Tabs, Toggle, Tooltip, Avatar
- `synthesis/maxa-recommendations.md` — actionable recommendations for MAXA UI

## Query Patterns

Useful local search commands:

```bash
rg -n "Badge|Tag|Chip|Pill|Filter" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/Obsidian/Maxa/MAXA UI/Design System Research"
rg -n "Badge / Tag / Chip Taxonomy|Evidence level|Take / Skip / Score" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/Obsidian/Maxa/MAXA UI/Design System Research/systems"
rg -n "component tokens|token architecture|foundation tokens" "/Users/igorstetsenko/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/Obsidian/Maxa/MAXA UI/Design System Research/synthesis"
```

## Current Cross-System Finding

For compact label-like components, the corpus recommendation is to separate components by semantics and behavior, not by visual similarity:

- `Badge` — compact, usually non-interactive indicator for status, count, quality, or metadata.
- `Tag` — compact data label or category attached to an entity; may be removable in editing contexts.
- `FilterChip` — interactive query/control chip that changes a result set or saved view.
- `Pill` — visual shape or product-specific selected-entity pattern; avoid as a vague catch-all component name.
- `Chip` — ambiguous source-system term; classify by behavior before mapping it to MAXA.

Recommended next MAXA component-token order from the corpus:

1. `Avatar`
2. `Badge`
3. `Tag`
4. `FilterChip`
5. `Tabs`
6. `Toggle`
7. `Tooltip`

Reason: `Avatar` and `Badge` are simple enough to validate the next component-token workflow. `FilterChip` should wait until Badge/Tag semantics are stable because it depends on them but adds query behavior.
