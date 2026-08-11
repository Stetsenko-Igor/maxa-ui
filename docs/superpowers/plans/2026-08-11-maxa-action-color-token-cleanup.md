# MAXA Action Color Token Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make filled Primary, Positive, and Negative buttons keep white content in both themes, use compact interaction color steps, and make the Figma token picker clearly distinguish public semantic tokens from internal component tokens.

**Architecture:** Preserve the primitive → semantic → component alias chain and all published variable IDs. Add the missing intermediate primitives and one shared on-color text semantic, hide deprecated compatibility variables instead of deleting them, rename the existing component collection in place, then let Button v3 inherit the corrected values through its already-correct remote bindings.

**Tech Stack:** Figma Plugin API via `use_figma`, DTCG-style JSON, CSS custom properties, Node.js token generators, Vitest, React/CSS Button, Storybook/Next documentation, pnpm/Turborepo.

---

## File map

### Create

- `packages/tokens/src/action-color-contract.test.ts` — exact color, alias, deprecation, and contrast contract.
- `.changeset/clean-action-color-tokens.md` — package release note.
- `/private/tmp/design-system-state-maxa-action-cleanup-2026-08-11.json` — Figma migration state ledger; do not commit.

### Modify

- `packages/tokens/src/primitives.css` — add Blue 550, Green 650/750, and Red 550.
- `packages/tokens/src/semantic.css` — add `text-on-color` and replace filled action state ladders.
- `packages/tokens/src/component-button.css` — bind colored Button labels to `text-on-color` and remove runtime success state-text duplicates.
- `packages/ui/src/components/button/button.css` — keep Positive hover/active text on the single success text token.
- `packages/tokens/figma/primitives.json` — Figma primitive sources.
- `packages/tokens/figma/colors-semantic-light.json` — Light semantic aliases and deprecation descriptions.
- `packages/tokens/figma/colors-semantic-dark.json` — Dark semantic aliases.
- `packages/tokens/figma/component-button.json` — Button colored-content aliases and compatibility metadata.
- `packages/tokens/figma/manifest.json` — rename the component-token collection.
- `packages/tokens/scripts/build-figma-import-bundle.mjs` — canonical collection constant, contextual descriptions, hidden metadata.
- `packages/tokens/scripts/diff-figma-export.mjs` — compare hidden/public metadata.
- `packages/tokens/scripts/diff-figma-export.test.mjs` — renamed collection and metadata tests.
- `.knowledge/Figma Plugins/MAXA Token Importer/code.js` — round-trip `hiddenFromPublishing`.
- `.knowledge/Figma Plugins/MAXA Token Importer/test.mjs` — importer/exporter regression tests.
- `scripts/audit-tokens.mjs` — renamed collection alias default.
- `packages/tokens/src/index.test.ts` — renamed collection expectations and generated-bundle assertions.
- `packages/tokens/figma/README.md` — designer-facing collection and selection rules.
- `specs/components/button.md` — Button v3 token contract.
- `specs/tokens-reference.md` — regenerated; do not hand-edit.
- `apps/docs/app/docs/foundations/colors/tokens.generated.json` — regenerated; do not hand-edit.
- `packages/tokens/figma/import-bundle.json` — regenerated; do not hand-edit.

### Preserve

- Existing uncommitted Button v3/loading work in the current worktree.
- Existing Figma variable IDs and keys.
- `feedback/*` token values and names.
- Published deprecated variables until a later breaking cleanup.

## Task 1: Checkpoint the current Button v3 baseline

**Files:**

- Existing modifications listed by `git status --short`.
- `docs/figma-button-v2-snapshot-2026-08-10.json`
- `docs/figma-button-v3-canon-2026-08-10.md`

- [ ] **Step 1: Review the existing diff and ensure it contains only the already-approved Button v3/loading work**

Run:

```bash
git diff -- apps/docs/app/docs/components/button/page.tsx apps/docs/app/docs/components/icon-button/page.tsx packages/ui/src/components/button/button.css packages/ui/src/components/button/button.test.tsx specs/components/button.md
```

Expected: Button v3 layout/loading documentation and tests only; no action-color cleanup yet.

- [ ] **Step 2: Run the focused Button tests**

Run:

```bash
pnpm --filter @maxa/ui test -- button
```

Expected: all Button tests pass.

- [ ] **Step 3: Commit the baseline separately**

```bash
git add apps/docs/app/docs/components/button/page.tsx apps/docs/app/docs/components/icon-button/page.tsx packages/ui/src/components/button/button.css packages/ui/src/components/button/button.test.tsx specs/components/button.md docs/figma-button-v2-snapshot-2026-08-10.json docs/figma-button-v3-canon-2026-08-10.md
git commit -m "feat(button): checkpoint button v3 contract"
```

## Task 2: Add the failing action-color contract test

**Files:**

- Create: `packages/tokens/src/action-color-contract.test.ts`

- [ ] **Step 1: Create the focused contract test**

```ts
import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const src = import.meta.dirname
const repo = join(src, "../../..")
const read = (path: string) => readFileSync(join(repo, path), "utf8")
const primitives = read("packages/tokens/src/primitives.css")
const semantic = read("packages/tokens/src/semantic.css")
const componentButton = read("packages/tokens/src/component-button.css")
const uiButton = read("packages/ui/src/components/button/button.css")
const darkStart = semantic.indexOf('\n[data-theme="dark"] {')
const light = semantic.slice(0, darkStart)
const dark = semantic.slice(darkStart)

const hex = (value: string) => {
  const raw = value.replace("#", "")
  return [0, 2, 4].map(i => Number.parseInt(raw.slice(i, i + 2), 16) / 255)
}
const luminance = (value: string) => {
  const channel = (v: number) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  const [r, g, b] = hex(value).map(channel)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrastOnWhite = (value: string) => 1.05 / (luminance(value) + 0.05)

describe("filled action color contract", () => {
  it("defines the intermediate primitives", () => {
    expect(primitives).toContain("--color-blue-550: #056DC9;")
    expect(primitives).toContain("--color-green-650: #25843E;")
    expect(primitives).toContain("--color-green-750: #206D35;")
    expect(primitives).toContain("--color-red-550: #C6140F;")
  })

  it("keeps on-color text and foreground white in both themes", () => {
    for (const theme of [light, dark]) {
      expect(theme).toContain("--color-text-on-color:    var(--color-base-white);")
      expect(theme).toContain("--color-fg-on-color:      var(--color-base-white);")
    }
  })

  it("uses compact opposite-direction action ladders", () => {
    expect(light).toContain("--color-action-primary:                 var(--color-blue-500);")
    expect(light).toContain("--color-action-primary-hover:           var(--color-blue-550);")
    expect(light).toContain("--color-action-primary-active:          var(--color-blue-600);")
    expect(dark).toContain("--color-action-primary:                 var(--color-blue-600);")
    expect(dark).toContain("--color-action-primary-hover:           var(--color-blue-550);")
    expect(dark).toContain("--color-action-primary-active:          var(--color-blue-500);")
    expect(light).toContain("--color-action-success:                var(--color-green-650);")
    expect(light).toContain("--color-action-success-hover:          var(--color-green-700);")
    expect(light).toContain("--color-action-success-active:         var(--color-green-750);")
    expect(dark).toContain("--color-action-success:                var(--color-green-750);")
    expect(dark).toContain("--color-action-success-hover:          var(--color-green-700);")
    expect(dark).toContain("--color-action-success-active:         var(--color-green-650);")
    expect(light).toContain("--color-action-destructive:                var(--color-red-500);")
    expect(light).toContain("--color-action-destructive-hover:          var(--color-red-550);")
    expect(light).toContain("--color-action-destructive-active:         var(--color-red-600);")
    expect(dark).toContain("--color-action-destructive:                var(--color-red-600);")
    expect(dark).toContain("--color-action-destructive-hover:          var(--color-red-550);")
    expect(dark).toContain("--color-action-destructive-active:         var(--color-red-500);")
  })

  it("uses one on-color text token for colored buttons", () => {
    expect(componentButton).toContain("--button-primary-text:         var(--color-text-on-color);")
    expect(componentButton).toContain("--button-success-text:         var(--color-text-on-color);")
    expect(componentButton).toContain("--button-destructive-text:         var(--color-text-on-color);")
    expect(componentButton).not.toContain("--button-success-text-hover")
    expect(componentButton).not.toContain("--button-success-text-active")
    expect(uiButton).not.toContain("var(--button-success-text-hover)")
    expect(uiButton).not.toContain("var(--button-success-text-active)")
  })

  it("keeps white contrast at or above 4.5:1", () => {
    for (const color of ["#0576DA", "#056DC9", "#0564B9", "#25843E", "#227939", "#206D35", "#D31510", "#C6140F", "#B9120E"]) {
      expect(contrastOnWhite(color)).toBeGreaterThanOrEqual(4.5)
    }
  })
})
```

- [ ] **Step 2: Verify the test fails for the intended missing contract**

Run:

```bash
pnpm --filter @maxa/tokens test -- action-color-contract
```

Expected: FAIL because the new primitives and `text-on-color` do not exist and old state aliases remain.

## Task 3: Make deprecation visibility round-trip through the token importer

**Files:**

- Modify: `packages/tokens/scripts/build-figma-import-bundle.mjs`
- Modify: `packages/tokens/scripts/diff-figma-export.mjs`
- Modify: `packages/tokens/scripts/diff-figma-export.test.mjs`
- Modify: `.knowledge/Figma Plugins/MAXA Token Importer/code.js`
- Modify: `.knowledge/Figma Plugins/MAXA Token Importer/test.mjs`

- [ ] **Step 1: Add failing tests for hidden metadata**

Add fixtures where a token contains:

```json
{
  "$description": "[Deprecated] Use Button/success/text.",
  "$hiddenFromPublishing": true,
  "$value": "{Color modes/text/text-on-color}",
  "$type": "color"
}
```

Assert that the bundle contains:

```js
expect(bundle.collections["Component-based"].hiddenFromPublishing["Button/success/text-hover"]).toBe(true)
```

and that the importer assigns:

```js
variable.hiddenFromPublishing = collectionDef.hiddenFromPublishing?.[tokenName] === true
```

- [ ] **Step 2: Verify importer and diff tests fail**

```bash
pnpm test:figma-importer
node --test packages/tokens/scripts/diff-figma-export.test.mjs
```

Expected: FAIL because hidden metadata is not exported, imported, or diffed.

- [ ] **Step 3: Implement mode-independent hidden metadata**

In the bundle builder, collect `$hiddenFromPublishing === true` into a per-collection map:

```js
const hiddenFromPublishing = {}
// inside flattenTokens when isToken(value)
if (value.$hiddenFromPublishing === true) hiddenFromPublishing[tokenPath] = true
```

Emit it beside `descriptions`, `types`, and `scopes`. In the plugin exporter, record every local variable's boolean value. In importer application, assign the boolean for every token so a future import can both hide and unhide deterministically.

- [ ] **Step 4: Extend the diff report**

Add `publishing` to `counts`, compare the normalized booleans, and print lines such as:

```text
~ Button/success/text-hover: hiddenFromPublishing false -> true
```

- [ ] **Step 5: Run the focused tests**

```bash
pnpm test:figma-importer
node --test packages/tokens/scripts/diff-figma-export.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit the importer capability separately**

```bash
git add packages/tokens/scripts/build-figma-import-bundle.mjs packages/tokens/scripts/diff-figma-export.mjs packages/tokens/scripts/diff-figma-export.test.mjs '.knowledge/Figma Plugins/MAXA Token Importer/code.js' '.knowledge/Figma Plugins/MAXA Token Importer/test.mjs'
git commit -m "feat(figma): preserve hidden token metadata"
```

## Task 4: Implement the local color and token-picker contract

**Files:**

- Modify: `packages/tokens/src/primitives.css`
- Modify: `packages/tokens/src/semantic.css`
- Modify: `packages/tokens/src/component-button.css`
- Modify: `packages/ui/src/components/button/button.css`
- Modify: `packages/tokens/figma/primitives.json`
- Modify: `packages/tokens/figma/colors-semantic-light.json`
- Modify: `packages/tokens/figma/colors-semantic-dark.json`
- Modify: `packages/tokens/figma/component-button.json`

- [ ] **Step 1: Add the four primitive steps in CSS and JSON**

```css
--color-blue-550: #056DC9;
--color-green-650: #25843E;
--color-green-750: #206D35;
--color-red-550: #C6140F;
```

- [ ] **Step 2: Add the shared on-color text semantic**

In both Light and Dark CSS blocks:

```css
--color-text-on-color:    var(--color-base-white);
```

In both semantic JSON modes:

```json
"text-on-color": {
  "$description": "Text on saturated or brand-colored backgrounds in both themes.",
  "$value": "{Colors.Base.White}",
  "$type": "color"
}
```

- [ ] **Step 3: Replace the action ladders with the approved aliases**

Use exactly:

```text
Light: Primary 500→550→600, Success 650→700→750, Destructive 500→550→600
Dark:  Primary 600→550→500, Success 750→700→650, Destructive 600→550→500
```

- [ ] **Step 4: Consolidate colored Button text at runtime**

Bind `--button-primary-text`, `--button-success-text`, and `--button-destructive-text` to `--color-text-on-color`. Remove `--button-success-text-hover` and `--button-success-text-active`; remove their two usages from `packages/ui/src/components/button/button.css` so the base text color persists through hover and active.

- [ ] **Step 5: Preserve but deprecate published compatibility variables**

In Figma JSON, keep these tokens with their IDs preserved by the live migration, add `[Deprecated]` descriptions, and set `$hiddenFromPublishing: true`:

```text
text/text-on-success
text/text-on-destructive
action/action-success-subtle
action/action-success-subtle-hover
action/action-success-subtle-active
action/action-destructive-subtle
action/action-destructive-subtle-hover
action/action-destructive-subtle-active
Button/success/text-hover
Button/success/text-active
```

Do not delete them in this release.

- [ ] **Step 6: Bind component JSON to the shared semantic**

```json
"$value": "{Color modes/text/text-on-color}"
```

Apply it to `Button/primary/text`, `Button/success/text`, and `Button/destructive/text`. Keep each `fg` alias on `Color modes/foreground/fg-on-color`.

- [ ] **Step 7: Run the focused contract test**

```bash
pnpm --filter @maxa/tokens test -- action-color-contract
```

Expected: PASS.

## Task 5: Rename and explain the component-token boundary

**Files:**

- Modify: `packages/tokens/figma/manifest.json`
- Modify: `packages/tokens/scripts/build-figma-import-bundle.mjs`
- Modify: `packages/tokens/scripts/diff-figma-export.test.mjs`
- Modify: `scripts/audit-tokens.mjs`
- Modify: `packages/tokens/src/index.test.ts`
- Modify: `packages/tokens/figma/README.md`

- [ ] **Step 1: Introduce one canonical collection constant**

```js
const COMPONENT_COLLECTION = "Component tokens · Internal"
```

Use it for manifest lookup, alias defaults, component alias creation, type checks, and error messages. Replace active test fixtures and expectations; do not rewrite historical incident documents or Graphify outputs.

- [ ] **Step 2: Decorate descriptions during bundle generation**

```js
function contextualDescription(collectionName, tokenPath, description) {
  if (collectionName === COMPONENT_COLLECTION) {
    return `Internal component token. Do not apply in product layouts. ${description}`
  }
  if (collectionName === "Color modes" && tokenPath.startsWith("action/")) {
    return `Interactive controls and custom action surfaces. ${description}`
  }
  if (collectionName === "Color modes" && tokenPath.startsWith("feedback/")) {
    return `Feedback and status surfaces only. ${description}`
  }
  return description
}
```

Preserve a leading `[Deprecated]` marker ahead of the contextual prefix.

- [ ] **Step 3: Document the designer decision rule**

Add this exact rule to `packages/tokens/figma/README.md`:

```text
Need a button → use the Button component; do not choose a color token.
Custom interactive surface → use action/*.
Status or feedback surface → use feedback/*.
Component tokens · Internal/* → component maintainers only.
```

- [ ] **Step 4: Run collection and audit tests**

```bash
pnpm --filter @maxa/tokens test
pnpm audit:tokens
```

Expected: PASS with one `Default` mode in `Component tokens · Internal` and no raw component colors.

## Task 6: Regenerate artifacts and add release documentation

**Files:**

- Modify: `packages/tokens/figma/import-bundle.json`
- Modify: `specs/tokens-reference.md`
- Modify: `apps/docs/app/docs/foundations/colors/tokens.generated.json`
- Modify: `specs/components/button.md`
- Create: `.changeset/clean-action-color-tokens.md`

- [ ] **Step 1: Regenerate Figma and documentation outputs**

```bash
pnpm figma:bundle
pnpm tokens:reference
```

Expected: both commands write updated deterministic artifacts.

- [ ] **Step 2: Add the changeset**

```md
---
"@maxa/tokens": minor
"@maxa/ui": patch
---

Add compact theme-aware filled action states, shared white on-color content tokens, and a clearer internal component-token contract.
```

- [ ] **Step 3: Verify generated files are current**

```bash
pnpm --filter @maxa/tokens figma:bundle:check
pnpm tokens:reference:check
git diff --check
```

Expected: PASS with no stale output or whitespace errors.

- [ ] **Step 4: Commit the local token refactor**

```bash
git add packages/tokens packages/ui/src/components/button/button.css scripts/audit-tokens.mjs specs/components/button.md specs/tokens-reference.md apps/docs/app/docs/foundations/colors/tokens.generated.json .changeset/clean-action-color-tokens.md
git commit -m "refactor(tokens): clarify action color ownership"
```

## Task 7: Apply the Foundation migration in place

**Files:**

- Figma: `🟠 MAXA Foundation`, file `ODH3pmxkKyP8pAslgDb15s`
- State ledger: `/private/tmp/design-system-state-maxa-action-cleanup-2026-08-11.json`

- [ ] **Step 1: Save a Figma version checkpoint and record existing IDs**

Use `saveVersionHistoryAsync("Before action color token cleanup")`, then write the collection and selected variable IDs returned by the discovery script to the state ledger.

- [ ] **Step 2: Create only the four missing primitives**

Check by exact name within collection `VariableCollectionId:1:23`; create only absent variables. Set `scopes = []`, WEB code syntax, exact values, and return all new IDs.

- [ ] **Step 3: Create `text/text-on-color`**

Create it in `Color modes` only if absent. Alias Light and Dark to the existing White primitive, set `TEXT_FILL`, and set `var(--color-text-on-color)`.

- [ ] **Step 4: Update `foreground/fg-on-color` and action aliases**

Preserve IDs. Set both `fg-on-color` modes to White and rebind the nine primary/success/destructive action mode values to the approved primitive aliases. Set their exact WEB syntaxes (`var(--color-fg-on-color)` and `var(--color-action-...)`) without changing scopes.

- [ ] **Step 5: Rebind the three Button text tokens**

Preserve IDs for `Button/primary/text`, `Button/success/text`, and `Button/destructive/text`; set their Default value to the new `text/text-on-color` alias and set the matching `var(--button-...-text)` WEB syntaxes.

- [ ] **Step 6: Rename the component collection in place**

Change collection `VariableCollectionId:14:421` from `Component-based` to `Component tokens · Internal`. Do not create a new collection.

- [ ] **Step 7: Apply descriptions and hide deprecated variables**

Set the contextual descriptions and `hiddenFromPublishing = true` for the ten compatibility variables listed in Task 4. Do not call `remove()`.

- [ ] **Step 8: Validate the live Foundation**

Return and verify:

```text
8 collections; same collection IDs; component collection still 1050 variables;
new primitives 4; new semantic 1; broken aliases 0;
all three colored state ladders match the plan;
all colored Button text/fg resolve to White in Light and Dark;
10 deprecated variables hidden from publishing.
```

## Task 8: Publish Foundation and validate Button v3 propagation

**Files:**

- Figma Foundation file `ODH3pmxkKyP8pAslgDb15s`
- Figma component file `9M6ulX7a6bDlmctFdClAzu`
- Button v3 node `11020:118515`

- [ ] **Step 1: User publishes the Foundation library update**

Figma Plugin API cannot publish team-library changes. Pause at this single manual checkpoint and ask Igor to press Publish in Foundation.

- [ ] **Step 2: Accept the library update in the component file if Figma requests it**

This may also require one manual Figma action. Do not detach instances or replace remote variables.

- [ ] **Step 3: Reinspect Button v3**

Verify all 336 variants remain, the variant/property API is unchanged, Loading opacity is 1, Disabled opacity is 0.5, and colored label/icon nodes still bind to the same component variable keys.

- [ ] **Step 4: Capture Light and Dark screenshots**

Check Primary, Positive, and Negative Default/Hover/Active states. Expected: white label/icons in both themes and visibly smaller state shifts. No component reconstruction is expected because current bindings are already correct.

## Task 9: Full repository and Storybook verification

**Files:**

- Existing token, Button, docs, and generated outputs.

- [ ] **Step 1: Run focused checks**

```bash
pnpm --filter @maxa/tokens test
pnpm --filter @maxa/ui test -- button
pnpm test:figma-importer
pnpm test:button-migration
pnpm audit:tokens
```

Expected: PASS.

- [ ] **Step 2: Run the full verification pipeline**

```bash
pnpm verify
```

Expected: typecheck, lint, audits, generated checks, tests, builds, and package smoke tests all pass.

- [ ] **Step 3: Inspect Storybook/docs in Light and Dark**

Run:

```bash
pnpm dev
```

Verify the Button documentation page at `/docs/components/button`: Primary, Positive, Negative; Default, Hover, Active, Loading, Disabled; Light and Dark.

- [ ] **Step 4: Run final reference scans**

```bash
rg -n "button-success-text-(hover|active)|Component-based|text-on-(success|destructive)" packages scripts specs apps .knowledge/Figma\ Plugins/MAXA\ Token\ Importer
```

Expected: old component collection name absent from active implementation; deprecated text names only in compatibility JSON/tests/documentation.

## Task 10: Final commit and GitHub update

- [ ] **Step 1: Review the complete diff**

```bash
git status --short
git diff --check
git log --oneline -5
```

Expected: only intentional files changed; no generated drift.

- [ ] **Step 2: Confirm the worktree contains no uncommitted implementation changes**

Run:

```bash
git status --short
```

Expected: empty output. Any verification fix must be committed with the exact files owned by the task that introduced it before continuing; never use `git add .`.

- [ ] **Step 3: Push the verified branch**

```bash
git push origin main
```

Expected: GitHub receives the baseline, importer, token refactor, and documentation commits. Report any separate Storybook deployment URL or deployment limitation rather than claiming publication without evidence.
