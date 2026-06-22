# MAXA UI — AI Context

> Raw: https://raw.githubusercontent.com/Stetsenko-Igor/maxa-ui/main/AGENT.md

Component library: @maxa/ui (React + TypeScript + Radix UI + Tailwind v4). Supports React 17, 18, and 19 (a `useId` ponyfill covers React 17).

**Status:** Under development — full context available in Phase 4.

Docs: https://stetsenko-igor.github.io/maxa-ui/

---

## LLM Workflow — Read Before Writing Code

MAXA uses a structured spec layer to prevent token fabrication. Every design value in this system has a named token. Your job is to use the right token, not invent values.

### Subagent usage

- Proactively use subagents when they improve speed, quality, or confidence.
- Do not wait for the user to explicitly approve subagent usage when the work benefits from parallel research, implementation slices, UI audits, verification, or review passes.
- Keep tiny, highly coupled, or direct-answer tasks local when delegation would add more coordination than value.
- When delegating code work, give each subagent bounded ownership and integrate their results before reporting completion.

### Step-by-step before writing any UI

1. **Read `specs/README.md`** — understand the directory structure
2. **Read the relevant foundation spec** (`specs/foundations/color.md`, `specs/foundations/spacing.md`, etc.)
3. **If building a known component** — read `specs/components/<name>.md`
4. **For button/action decisions** — read `specs/patterns/interactive-hierarchy.md`
5. **Look up CSS variable names** in `specs/tokens-reference.md`

### Non-negotiable rules

| Rule | Why |
|------|-----|
| No hardcoded hex colors | Every color has a semantic token |
| No hardcoded `px` values from the scale | Every spacing/radius step has a token |
| No primitive tokens in component code | Use semantic or component tokens only |
| One `primary` button per view | See interactive-hierarchy spec |
| No separate `:dark` color selectors | Dark mode is at the token level via `data-theme="dark"` |

### Audit

Before submitting code:
```bash
node scripts/audit-tokens.mjs
```

Exit code 1 = violations. Fix before committing.

### Token architecture

```
Primitives  →  Semantic tokens  →  Component tokens  →  Code
#0265DC        --color-action-primary   --button-primary-bg   background: var(--button-primary-bg)
```

---

## Current Design System Decisions

- Project documentation must be written in English.
- This includes `AGENT.md`, `.knowledge/*`, package READMEs, docs pages, and design-system memory notes.
- Conversation with the user may be in Russian, but persisted documentation and repo knowledge should stay in English.
- MAXA is design-system-first, not Tailwind-first.
- Cross-design-system research lives outside this repo in the Obsidian corpus documented at `.knowledge/Design System Research Corpus.md`.
- Before making Badge, Tag, Chip, Pill, Filter, component-token, or taxonomy decisions, consult that corpus first rather than relying only on MAXA UI implementation details.
- Current Badge/Tag direction is documented in `.knowledge/Badge and Tag Component Plan.md`.
- Do not follow the older Claude plan that merges Tag into Badge. Badge and Tag remain separate components.
- Badge is a non-removable status/count/metadata indicator with `intent`, `appearance`, `emphasis`, and sizes `sm | md | lg`.
- Tag is a data/category/removable label with `appearance`, `emphasis`, and sizes `sm | md | lg`; Tag must not expose `intent`.
- Figma token source of truth lives in `packages/tokens/figma/`.
- Figma collections currently use:
  - `Primitives`
  - `Color modes`
  - `Spacing`
  - `Radius`
  - `Typography`
  - `Layout`
  - `Breakpoints`
- `Primitives` contains:
  - `Colors/...`
  - `Spacing/...`
- Spacing primitives use readable names with px labels, for example:
  - `Spacing/4 (16px)`
  - `Spacing/0․5 (2px)`
- Semantic spacing aliases point to primitive spacing tokens.
- MAXA Figma methodology for spacing/layout is now:
  - `Primitives -> Spacing -> Layout`
  - `Primitives` = raw values
  - `Spacing` = universal semantic spacing aliases
  - `Layout` = designer-facing usage layer for Auto layout decisions
- `Layout` uses grouped variable names so Figma shows separate groups:
  - `Stack/*`
  - `Inline/*`
  - `Container/*`
  - `Grid/*`
- Current `Layout` values use responsive modes:
  - `Desktop`
  - `Tablet`
  - `Mobile`
- `Layout` and `Typography` intentionally remain separate Figma collections for now, even though both use `Desktop / Tablet / Mobile` modes.
- Designers may need to switch both `Layout` and `Typography` modes manually on a frame/page; this is accepted as a reasonable two-click tradeoff.
- Do not merge them into a single `Responsive` collection yet. That option remains a future possibility only if the team finds manual mode switching painful.
- Reason for keeping them separate: cleaner token architecture, better code sync, and easier developer readability.
- Current `Layout` tokens include:
  - `Stack/tight`, `Stack/text`, `Stack/default`, `Stack/group`, `Stack/section`
  - `Inline/tight`, `Inline/default`, `Inline/group`
  - `Container/padding`, `Container/max-width`
  - `Grid/gutter`, `Grid/margin`
- `Grid/margin` intentionally stays separate from `Container/padding` by name, even when it aliases it, because the semantics are different.
- Color semantic tokens point to primitive color tokens in `Primitives/Colors/...`.
- Typography foundation is currently app-oriented, not marketing-oriented.
- Typography uses:
  - `Font family/body = Montserrat`
  - `Font family/mono = Roboto Mono`
- Display font family tokens are intentionally not used for now.
- Current typography roles are:
  - `heading-2xl`, `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`, `heading-xs`
  - `text-lg`, `text-md`, `text-sm`
  - `caption-sm`, `caption-xs`
- Current typography sizes are:
  - `heading-2xl = 40`
  - `heading-xl = 32`
  - `heading-lg = 26`
  - `heading-md = 22`
  - `heading-sm = 18`
  - `heading-xs = 16`
  - `text-lg = 16`
  - `text-md = 14`
  - `text-sm = 12`
  - `caption-sm = 10`
  - `caption-xs = 8`
- Current line heights are:
  - `48, 40, 34, 30, 26, 24, 24, 20, 18, 16, 12`
- Figma plugins live under `.knowledge/Figma Plugins/`.
- Figma import is handled by the local dev plugin in `.knowledge/Figma Plugins/MAXA Token Importer/`.
- Current plugin status:
  - plugin version is `MAXA Token Importer v6`
  - supports loading latest `import-bundle.json` from GitHub Raw with the `Load latest from GitHub` button
  - supports paste of `import-bundle.json`
  - supports drag-and-drop of `manifest.json` plus token files
  - shows import progress with autoscroll
  - can remove stale variables from imported collections during re-import when the cleanup checkbox is enabled
- Button migration work should use `.knowledge/Figma Plugins/MAXA Button Migration/`.
- The plugin cannot read local repo files directly from disk. The no-copy-paste workflow fetches:
  - `https://raw.githubusercontent.com/Stetsenko-Igor/maxa-ui/main/packages/tokens/figma/import-bundle.json`
- `packages/tokens/figma/import-bundle.json` must be regenerated before import when token files change.
- Command to regenerate bundle from repo root:
  - `pnpm figma:bundle`
- Current next working focus for a new chat:
  - continue from **Component-based Tokens / Button**
  - define exact Button variants, sizes, states, and aliases before implementation
  - keep Figma variables, React components, Tailwind tokens, documentation, and AI-agent instructions aligned
  - reduce the design/code gap by giving developers approved components instead of recreated interpretations
- Component-based Tokens are the next approved direction.
- Layer order is foundation tokens -> Component-based Tokens -> Figma components -> React components -> documentation/catalog.
- Do not create React components or docs/catalog pages until Component-based Tokens are approved.
- First Component-based Tokens scope:
  - `Button`
  - `Input`
  - `Badge`
  - `Alert`
- `Card` is intentionally excluded because MAXA does not currently have an approved Card component.
- Component-based Tokens naming:
  - Figma collection: `Component-based Tokens`
  - slash grouping in Figma, for example `Button/primary/bg-hover`
  - PascalCase component group names, for example `Button`
  - lowercase token roles, for example `primary`, `bg`, `text`, `border`, `size`, `md`
  - hyphens inside one segment for state or axis, for example `bg-hover`, `padding-x`
  - no `default` suffix for default state
  - CSS projection uses lowercase hyphenated names, for example `--button-primary-bg-hover`
- Current Button token direction:
  - variants: `primary`, `secondary`, `outline`, `ghost`, `link`, `success`, `danger`
  - sizes: `sm`, `md`, `lg`
  - states: default, `hover`, `active`, `disabled`, `focus`
  - `primary` follows blue `action/primary`, not teal `action/brand`
  - `secondary` is a filled neutral button using `action/neutral`; do not render it as a white outlined button
  - `outline` is the bordered neutral button using `bg/secondary` and `border/primary`
  - `success` follows `action/positive`
  - `danger` follows `action/negative`
  - Button disabled uses `Button/disabled/opacity = 50`
  - composite form controls may use explicit disabled surface/text/border tokens instead of opacity
  - focus starts with `border-focus`; effect/ring tokens are deferred until an Effects layer exists
  - `ghost` uses transparent base/border and neutral subtle hover/active
  - `link` stays transparent and uses `action/primary` for text
  - Button sizes include text, line-height, weight, icon-size, and icon-only square size tokens
  - source files: `component-button-light.json`, `component-button-dark.json`
- Deferred Button decisions:
  - dedicated foreground tokens for filled status buttons, such as `text/on-primary`, `text/on-success`, `text/on-danger`
  - future Effects collection for focus ring/elevation
  - additional variants after real Figma component usage
- Current Input architecture:
  - split field primitives from form-level components
  - current React scope includes `Input`, `TextArea`, and `FileInput`
  - `Input` kinds are `text`, `password`, `search`, and `quantity`
  - `readonly` maps to the Figma `Not-Editable` state and is distinct from `disabled`
  - `Input Form Universal` is a composition example, not the target public API shape
  - future `Input Form / Dropdown` and `Input Form / Date Picker` should be separate components, not more `Input.kind` variants
  - read `specs/components/input.md` before changing input fields or docs
- Current Select / Dropdown architecture:
  - Figma may use `Input Form / Dropdown` as the visual/pattern name
  - React exports this form control as `Select`, because it selects from known options
  - `Select` is visually an input-like field with a right chevron
  - action menus or navigation dropdowns should become a separate menu component later
  - read `specs/components/select.md` before changing select/dropdown fields or docs
- Current Date Picker architecture:
  - `DatePicker` and `DateRangePicker` are separate form-level components
  - they reuse the label/helper/error composition model through `FormField`
  - they are not `Input.kind` variants
  - read `specs/components/date-picker.md` before changing date picker fields or docs
- Basic Tokens components are still draft / not approved yet.
- `packages/ui/src/base-tokens.tsx` currently contains an exploratory React implementation.
- Do not build or run Basic Tokens docs preview pages until the component direction is decided.
- When the docs catalog is approved, it may closely follow the structure and visual language of references such as Untitled UI and shadcn/ui, adapted to MAXA components, tokens, and design decisions.
- Current draft `@maxa/ui` exports:
  - `Box`
  - `Stack`
  - `Inline`
  - `Text`
  - `Heading`
  - `Surface`
  - `TokenSwatch`
- `apps/docs/app/page.tsx` imports `@maxa/ui` and acts as a temporary review surface.
