# Browser-Native Tokens and Optional Tailwind Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make MAXA tokens and React components work correctly in a browser without Tailwind, while preserving a first-class optional Tailwind integration that exposes familiar utilities backed by the exact same MAXA token values.

**Architecture:** `@maxa/tokens` remains the single source of truth and publishes browser-native CSS custom properties under `:root`. A new `@maxa/tailwind` package imports that native theme, generates Tailwind theme mappings from the canonical token sources, and adds a deliberately small set of role-safe semantic utilities. React components, token names, token values, Figma collections, and component APIs remain unchanged.

**Tech Stack:** CSS custom properties, Tailwind CSS 4.2, PostCSS, React 19, TypeScript, Vitest, Playwright/Chromium, pnpm workspaces, Turborepo, Next.js static export, Figma DTCG JSON.

---

## Decision Record

This plan fixes the current runtime defect without changing the product design contract.

- `@maxa/tokens/theme.css` must work as ordinary CSS in any modern browser.
- Tailwind remains supported, but it is optional and lives behind `@maxa/tailwind/theme.css`.
- MAXA owns its palette, typography, spacing, and radii. When the adapter is loaded, overlapping utilities such as `text-sm` and `rounded-md` intentionally use MAXA values.
- MAXA semantic decisions remain semantic: `bg-page`, `text-primary`, and `border-primary` map to role tokens rather than neutral or brand primitives.
- Token variables keep their current names. Do not add a `--maxa-*` prefix in this refactor.
- Do not rename public React props, component variants, CSS variables, Figma variables, Figma collections, or Figma node IDs.
- Do not add a component-token layer for values that already have a correct semantic owner.
- Do not build an `init`/`add` CLI, copy-owned component distribution, or CSS-only component package in this milestone. Those are separate distribution decisions after Concept3D integration provides real usage data.

## Verified Starting Point and Rollback

- Rollback tag: `pre-tailwind-token-refactor-2026-08-29`
- Rollback commit: `825c7e6`
- Remote: the tag is already pushed to `origin`.
- Current defect: foundation variables in `packages/tokens/src/primitives.css`, `themes/maxa.css`, `dimensions.css`, and `typography.css` are declared inside Tailwind-specific `@theme` blocks. A browser without Tailwind ignores those blocks, so semantic and component alias chains do not resolve.
- Current test gap: token and UI tests replace `@theme` with `:root` before injecting CSS, so they hide the browser failure.

Rollback is a Git operation, not part of normal implementation. If the completed branch fails acceptance and cannot be corrected safely, restore by creating a new branch from the tag; do not rewrite shared history.

```bash
git switch -c restore/pre-tailwind-token-refactor pre-tailwind-token-refactor-2026-08-29
```

## Definition of Done

- A page importing only `@maxa/tokens/theme.css` resolves MAXA surface, text, typography, radius, and component token chains in real Chromium without Tailwind.
- A Tailwind consumer importing `tailwindcss` and `@maxa/tailwind/theme.css` can use MAXA primitives, MAXA typography/radii, and the documented semantic utilities.
- `@maxa/tokens` contains no Tailwind-only directives.
- `@maxa/tailwind` derives its theme mappings from `@maxa/tokens`; it contains no independent token values.
- Existing component code and public component APIs do not change.
- Existing token names and values do not change.
- Existing Figma JSON, import bundle inputs, variable collections, aliases, scopes, IDs, and component nodes do not change.
- Existing visual snapshots pass without being updated.
- Package smoke tests cover both native CSS resolution and the optional Tailwind adapter.
- Documentation clearly separates the default framework-independent setup from the optional Tailwind setup.

## Reviewer Focus for Claude Fable

Please review these architectural choices before implementation:

1. Is a separate `@maxa/tailwind` package preferable to keeping Tailwind directives inside `@maxa/tokens`?
2. Is generated `@theme` output from the native token sources a sufficiently strong single-source-of-truth boundary?
3. Is plain `@theme` preferable to `@theme static` here, given that native `:root` declarations already guarantee all runtime variables and the adapter only needs to generate utilities actually used by Tailwind consumers?
4. Is the explicit semantic utility allowlist safer than exposing every semantic color through Tailwind's generic color namespace?
5. Are the Figma, package, and visual zero-diff gates strong enough to prove that this is a delivery refactor rather than a design change?
6. Does the migration note adequately cover existing Tailwind consumers that currently import `@maxa/tokens/theme.css` directly?

---

### Task 1: Lock the Native CSS Contract with Failing Tests

**Files:**

- Modify: `packages/tokens/src/index.test.ts`
- Modify: `packages/ui/src/base-tokens.test.tsx`
- Create: `packages/tokens/e2e/native-runtime.spec.ts`
- Create: `packages/tokens/playwright.config.ts`
- Modify: `packages/tokens/package.json`
- Modify: `package.json`

- [ ] Add a structural test proving that the native token source contains no Tailwind-only `@theme` directives.

```ts
const nativeFoundationFiles = [
  "primitives.css",
  "themes/maxa.css",
  "dimensions.css",
  "typography.css",
]

it.each(nativeFoundationFiles)("%s uses browser-native declarations", (file) => {
  const css = readFileSync(join(src, file), "utf-8")
  expect(css).not.toMatch(/@theme\b/)
  expect(css).toMatch(/:root\s*\{/)
})
```

- [ ] Remove the test-only conversion from `packages/tokens/src/index.test.ts` so the test injects the actual source contract.

```ts
function readThemeCSS() {
  return readFileSync(join(src, "theme.css"), "utf-8").replace(/@import\s+["'][^"']+["'];/g, "")
}
```

- [ ] Remove `.replace(/@theme\s*\{/g, ":root {")` from `injectThemeCSS()` in `packages/ui/src/base-tokens.test.tsx`.

- [ ] Add a real Chromium test against the built `@maxa/tokens` CSS package. The fixture must import only `/theme.css`; it must not load Tailwind or any MAXA JavaScript.

```ts
import { readFile } from "node:fs/promises"
import path from "node:path"
import { expect, test } from "@playwright/test"

const packageRoot = path.resolve(import.meta.dirname, "..")
const distRoot = path.join(packageRoot, "dist")

test("the built theme resolves without Tailwind", async ({ page }) => {
  await page.route("http://maxa-tokens.local/**", async (route) => {
    const pathname = new URL(route.request().url()).pathname

    if (pathname === "/") {
      await route.fulfill({
        contentType: "text/html",
        body: `<!doctype html>
          <html>
            <head>
              <link rel="stylesheet" href="/theme.css" />
              <style>
                body {
                  background: var(--color-bg-page);
                  color: var(--color-text-primary);
                }
                button {
                  background: var(--button-primary-bg);
                  color: var(--button-primary-text);
                  border-radius: var(--button-size-md-radius);
                  font-size: var(--button-size-md-text);
                }
              </style>
            </head>
            <body><button type="button">Continue</button></body>
          </html>`,
      })
      return
    }

    const relativePath = pathname.replace(/^\/+/, "")
    const absolutePath = path.resolve(distRoot, relativePath)
    if (!absolutePath.startsWith(`${distRoot}${path.sep}`)) {
      await route.fulfill({ status: 403, body: "Forbidden" })
      return
    }

    try {
      await route.fulfill({
        contentType: "text/css",
        body: await readFile(absolutePath, "utf-8"),
      })
    } catch {
      await route.fulfill({ status: 404, body: "Not found" })
    }
  })

  await page.goto("http://maxa-tokens.local/")

  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(245, 246, 250)")
  await expect(page.locator("body")).toHaveCSS("color", "rgb(26, 25, 25)")
  await expect(page.getByRole("button")).toHaveCSS("background-color", "rgb(5, 118, 218)")
  await expect(page.getByRole("button")).toHaveCSS("color", "rgb(255, 255, 255)")
  await expect(page.getByRole("button")).toHaveCSS("border-radius", "4px")
  await expect(page.getByRole("button")).toHaveCSS("font-size", "12px")
})
```

- [ ] Configure the token package browser test to run Chromium without a web server.

```ts
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 0,
  use: {
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure",
  },
})
```

- [ ] Add `@playwright/test` to `packages/tokens` dev dependencies and add a `test:browser` script that runs `playwright test`.

- [ ] Run the new tests before changing CSS and confirm the intended failure.

```bash
pnpm --filter @maxa/tokens test
pnpm --filter @maxa/ui test -- base-tokens
pnpm --filter @maxa/tokens build
pnpm --filter @maxa/tokens test:browser
```

Expected result: structural/native runtime tests fail because `@theme` is still present and the browser reports unresolved computed styles.

- [ ] Commit the red tests.

```bash
git add packages/tokens/src/index.test.ts packages/ui/src/base-tokens.test.tsx packages/tokens/e2e/native-runtime.spec.ts packages/tokens/playwright.config.ts packages/tokens/package.json package.json pnpm-lock.yaml
git commit -m "test(tokens): expose Tailwind runtime dependency"
```

---

### Task 2: Convert the Canonical Token CSS to Browser-Native CSS

**Files:**

- Modify: `packages/tokens/src/primitives.css`
- Modify: `packages/tokens/src/themes/maxa.css`
- Modify: `packages/tokens/src/dimensions.css`
- Modify: `packages/tokens/src/typography.css`
- Test: `packages/tokens/src/index.test.ts`
- Test: `packages/ui/src/base-tokens.test.tsx`
- Test: `packages/tokens/e2e/native-runtime.spec.ts`

- [ ] Replace the top-level `@theme` wrapper with `:root` in `primitives.css` and `themes/maxa.css`.

- [ ] Replace the `@theme` wrapper with `:root` in `dimensions.css` and merge its second adjacent `:root` block into the first block without changing declarations, values, names, or ordering within each token group.

- [ ] Replace the `@theme` wrapper with `:root` in `typography.css` and delete the now-redundant duplicate `:root` declarations. Keep every `--text-*--line-height` pairing and every font weight exactly as it is today.

- [ ] Update only the wrapper-related comments. The native source must describe tokens as browser custom properties, not as Tailwind utility definitions.

- [ ] Verify that the refactor changed wrappers and comments only. This command must show no changed custom-property declaration lines after ignoring wrapper/comment changes:

```bash
git diff --word-diff=porcelain -- packages/tokens/src/primitives.css packages/tokens/src/themes/maxa.css packages/tokens/src/dimensions.css packages/tokens/src/typography.css
```

- [ ] Run native token, UI cross-layer, and browser tests.

```bash
pnpm --filter @maxa/tokens test
pnpm --filter @maxa/ui test -- base-tokens
pnpm --filter @maxa/tokens build
pnpm --filter @maxa/tokens test:browser
```

Expected result: all commands pass; Chromium computes `#F5F6FA`, the primary text color, button colors, 4 px radius, and 12 px typography without Tailwind.

- [ ] Confirm that canonical generated artifacts did not change.

```bash
pnpm audit:tokens
pnpm --filter @maxa/tokens figma:bundle:check
pnpm tokens:reference:check
git diff --exit-code -- packages/tokens/figma specs/tokens-reference.md
```

Expected result: all checks pass and the final `git diff` is empty.

- [ ] Commit the native CSS refactor.

```bash
git add packages/tokens/src/primitives.css packages/tokens/src/themes/maxa.css packages/tokens/src/dimensions.css packages/tokens/src/typography.css
git commit -m "refactor(tokens): publish browser-native CSS variables"
```

---

### Task 3: Add a Guard Against Tailwind Directives in Native Tokens

**Files:**

- Modify: `scripts/audit-tokens.mjs`
- Create: `scripts/lib/audit-native-css-directives.mjs`
- Create: `scripts/lib/audit-native-css-directives.test.mjs`
- Test: `packages/tokens/src/index.test.ts`
- Modify: `package.json`

- [ ] Add an audit rule that recursively scans `packages/tokens/src/**/*.css` and reports every `@theme` or `@utility` directive as a contract violation. Tailwind directives are allowed only inside `packages/tailwind`.

```js
function auditNativeCssDirectives(files) {
  const violations = []

  for (const file of files) {
    const css = readFileSync(file, "utf-8")
    for (const match of css.matchAll(/@(theme|utility)\b/g)) {
      violations.push(`${relative(repoRoot, file)} contains Tailwind-only @${match[1]}`)
    }
  }

  return violations
}
```

- [ ] Put the pure helper in `scripts/lib/audit-native-css-directives.mjs`, export it, and integrate its returned violations into the existing `audit-tokens.mjs` result.

- [ ] Add `scripts/lib/audit-native-css-directives.test.mjs`. The test must pass an in-memory CSS sample containing `@theme` to the exported helper and expect a violation; a plain `:root` sample must return no violations.

- [ ] Add a root `test:audit-native-css` script using Node's built-in test runner and include it in `verify` immediately after `audit:tokens`.

- [ ] Run the audit and token tests.

```bash
pnpm audit:tokens
pnpm test:audit-native-css
pnpm --filter @maxa/tokens test
```

Expected result: both pass with the native CSS source and would fail if `@theme` were reintroduced under `packages/tokens/src`.

- [ ] Commit the guard.

```bash
git add scripts/audit-tokens.mjs scripts/lib/audit-native-css-directives.mjs scripts/lib/audit-native-css-directives.test.mjs packages/tokens/src/index.test.ts package.json
git commit -m "test(tokens): guard the browser-native CSS boundary"
```

---

### Task 4: Create the Optional `@maxa/tailwind` Adapter

**Files:**

- Create: `packages/tailwind/package.json`
- Create: `packages/tailwind/README.md`
- Create: `packages/tailwind/src/theme.css`
- Create: `packages/tailwind/src/generated-theme.css`
- Create: `packages/tailwind/src/semantic-utilities.css`
- Create: `packages/tailwind/scripts/generate-theme.mjs`
- Create: `packages/tailwind/src/theme.test.ts`
- Create: `packages/tailwind/vitest.config.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] Create a public CSS package with `@maxa/tokens` as a runtime dependency and Tailwind as a peer dependency.

```json
{
  "name": "@maxa/tailwind",
  "version": "0.0.0",
  "private": false,
  "type": "module",
  "exports": {
    ".": "./dist/theme.css",
    "./theme.css": "./dist/theme.css"
  },
  "files": ["dist", "README.md", "package.json"],
  "publishConfig": { "access": "public" },
  "sideEffects": ["**/*.css"],
  "scripts": {
    "build": "node ./scripts/generate-theme.mjs --check && node ../../scripts/clean-package-dist.mjs packages/tailwind && node ../../scripts/copy-css-assets.mjs packages/tailwind",
    "generate:theme": "node ./scripts/generate-theme.mjs",
    "generate:theme:check": "node ./scripts/generate-theme.mjs --check",
    "test": "vitest run"
  },
  "dependencies": {
    "@maxa/tokens": "workspace:^"
  },
  "peerDependencies": {
    "tailwindcss": "^4.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.3",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.2.3",
    "vitest": "*"
  }
}
```

- [ ] Add a hand-authored package entry point. It must load native tokens first, then generated Tailwind theme mappings, then role-safe semantic utilities.

```css
@import "@maxa/tokens/theme.css";
@import "./generated-theme.css";
@import "./semantic-utilities.css";
```

- [ ] Write a generator that reads the canonical native files and emits `generated-theme.css`. It must accept only these Tailwind namespaces:

```js
const namespacePattern = /^--(?:color|breakpoint|spacing|radius|font|text)-/
```

Source files:

```js
const sourceFiles = [
  "packages/tokens/src/primitives.css",
  "packages/tokens/src/themes/maxa.css",
  "packages/tokens/src/dimensions.css",
  "packages/tokens/src/typography.css",
]
```

Generated shape:

```css
/* Generated from @maxa/tokens. Do not edit directly. */
@theme {
  --color-base-white: #ffffff;
  --color-brand-500: #31e5c2;
  --spacing-1: 4px;
  --radius-md: 8px;
  --font-body: "Montserrat", ui-sans-serif, system-ui, sans-serif;
  --text-sm: 12px;
  --text-sm--line-height: 18px;
}
```

The full generated file must contain every matching declaration from the four source files. The snippet above illustrates format; it is not the complete output.

- [ ] Make the generator deterministic, reject conflicting duplicate names, preserve canonical values, end the output with one newline, and implement `--check` without writing.

- [ ] Use plain `@theme`, not `@theme static`. Native `:root` CSS already guarantees all variables; the adapter should generate only the utility CSS a Tailwind consumer actually uses.

- [ ] Add explicit semantic utilities instead of placing all semantic roles in Tailwind's generic `--color-*` namespace. This prevents invalid combinations such as `bg-text-primary` and `text-bg-page`.

```css
@utility bg-page {
  background-color: var(--color-bg-page);
}
@utility bg-surface {
  background-color: var(--color-bg-surface);
}
@utility bg-float {
  background-color: var(--color-bg-float);
}
@utility bg-muted {
  background-color: var(--color-bg-muted);
}
@utility bg-inverse {
  background-color: var(--color-bg-inverse);
}
@utility bg-disabled {
  background-color: var(--color-bg-disabled);
}

@utility text-primary {
  color: var(--color-text-primary);
}
@utility text-secondary {
  color: var(--color-text-secondary);
}
@utility text-tertiary {
  color: var(--color-text-tertiary);
}
@utility text-disabled {
  color: var(--color-text-disabled);
}
@utility text-inverse {
  color: var(--color-text-inverse);
}
@utility text-brand {
  color: var(--color-text-brand);
}
@utility text-link {
  color: var(--color-text-link);
}
@utility text-info {
  color: var(--color-text-info);
}
@utility text-success {
  color: var(--color-text-success);
}
@utility text-error {
  color: var(--color-text-error);
}
@utility text-warning {
  color: var(--color-text-warning);
}

@utility border-primary {
  border-color: var(--color-border-primary);
}
@utility border-secondary {
  border-color: var(--color-border-secondary);
}
@utility border-tertiary {
  border-color: var(--color-border-tertiary);
}
@utility border-brand {
  border-color: var(--color-border-brand);
}
```

- [ ] Write generator tests before producing the committed generated file. Tests must prove:
  - The entry point imports `@maxa/tokens/theme.css`.
  - The generated file is fresh.
  - Representative palette, typography, spacing, breakpoint, and radius values match native sources.
  - Semantic and component variables are absent from `generated-theme.css`.
  - Semantic utilities reference semantic variables and do not duplicate raw color values.

- [ ] Add a real Tailwind/PostCSS compilation test.

```ts
import { readFileSync } from "node:fs"
import path from "node:path"
import postcss from "postcss"
import tailwindcss from "@tailwindcss/postcss"
import { describe, expect, it } from "vitest"

describe("@maxa/tailwind", () => {
  it("compiles primitive and semantic utilities", async () => {
    const inputPath = path.join(import.meta.dirname, "adapter-test.css")
    const input = `
      @import "tailwindcss";
      @import "./theme.css";
      @source inline("bg-brand-500 text-sm rounded-md bg-page text-primary border-primary");
    `
    const result = await postcss([tailwindcss()]).process(input, { from: inputPath })

    expect(result.css).toContain(".bg-brand-500")
    expect(result.css).toContain(".text-sm")
    expect(result.css).toContain(".rounded-md")
    expect(result.css).toContain(".bg-page")
    expect(result.css).toContain(".text-primary")
    expect(result.css).toContain(".border-primary")
    expect(result.css).toContain("var(--color-bg-page)")
    expect(result.css).toContain("var(--color-text-primary)")
    expect(result.css).toContain("var(--color-border-primary)")
  })

  it("keeps the generated file in sync", () => {
    const generated = readFileSync(path.join(import.meta.dirname, "generated-theme.css"), "utf-8")
    expect(generated).toContain("--color-brand-500: #31E5C2;")
    expect(generated).toContain("--text-sm: 12px;")
    expect(generated).toContain("--radius-md: 8px;")
    expect(generated).not.toContain("--color-bg-page:")
    expect(generated).not.toContain("--button-primary-bg:")
  })
})
```

- [ ] Generate the adapter, install workspace dependencies, and run its tests.

```bash
pnpm install
pnpm --filter @maxa/tailwind generate:theme
pnpm --filter @maxa/tailwind generate:theme:check
pnpm --filter @maxa/tailwind test
pnpm --filter @maxa/tailwind build
```

Expected result: all commands pass and `packages/tailwind/dist/theme.css` plus its imported CSS files exist.

- [ ] Add `tailwind:theme:check` to the root scripts and include it in `verify` before unit tests.

- [ ] Commit the adapter.

```bash
git add packages/tailwind package.json pnpm-lock.yaml
git commit -m "feat(tailwind): add optional MAXA theme adapter"
```

---

### Task 5: Move the Documentation App onto the Public Adapter Contract

**Files:**

- Modify: `apps/docs/package.json`
- Modify: `apps/docs/app/globals.css`
- Modify: `apps/docs/next.config.ts`
- Test: `packages/tailwind/src/theme.test.ts`

- [ ] Add `@maxa/tailwind` as a workspace dependency of `@maxa/docs`.

- [ ] Replace the direct token theme import in the Tailwind docs app.

```css
@import "tailwindcss";
@import "@maxa/tailwind/theme.css";
```

The adapter imports `@maxa/tokens/theme.css`; do not import the native theme twice.

- [ ] Add a development alias for `@maxa/tailwind/theme.css` in `apps/docs/next.config.ts`, parallel to the existing source alias for `@maxa/tokens/theme.css`. This keeps local Next.js development independent of stale package builds.

- [ ] Build the docs app from a clean package state.

```bash
pnpm --filter @maxa/tokens build
pnpm --filter @maxa/tailwind build
pnpm --filter @maxa/docs build
```

Expected result: the Next.js static export succeeds and Tailwind resolves both generated primitives and semantic utilities through the public adapter import.

- [ ] Run existing visual regression without updating snapshots.

```bash
pnpm --filter @maxa/docs test:visual
```

Expected result: all existing screenshots pass. Any visual diff is a regression because this refactor does not authorize design changes.

- [ ] Commit the docs app integration.

```bash
git add apps/docs/package.json apps/docs/app/globals.css apps/docs/next.config.ts pnpm-lock.yaml
git commit -m "refactor(docs): consume the public Tailwind adapter"
```

---

### Task 6: Update Package Smoke Coverage for Both Consumer Types

**Files:**

- Modify: `scripts/smoke-package-entrypoints.mjs`
- Test: `scripts/smoke-package-entrypoints.mjs`

- [ ] Keep the existing temporary Vite consumer that imports `@maxa/tokens/theme.css` and renders `@maxa/ui`. This is the package-level non-Tailwind contract.

- [ ] Add explicit export resolution for the adapter inside the installed temporary consumer.

```js
const tailwindThemeUrl = await import.meta.resolve("@maxa/tailwind/theme.css")
if (!tailwindThemeUrl.endsWith("/dist/theme.css")) {
  throw new Error(`Unexpected @maxa/tailwind theme export: ${tailwindThemeUrl}`)
}
```

- [ ] Assert that the packed `@maxa/tailwind` manifest contains a released range for `@maxa/tokens` and does not leak `workspace:`.

- [ ] Assert that every relative CSS import in the packed adapter resolves inside the installed consumer, including `generated-theme.css` and `semantic-utilities.css`.

- [ ] Keep Tailwind compilation verification in the adapter package test and use the docs build as the full application integration test. Do not add a second redundant Vite/PostCSS fixture.

- [ ] Run the package smoke test.

```bash
pnpm build
pnpm pack:smoke
```

Expected result: all public tarballs install, native tokens resolve, React components build without Tailwind, the adapter CSS export resolves, and no `workspace:` ranges leak.

- [ ] Commit package verification.

```bash
git add scripts/smoke-package-entrypoints.mjs
git commit -m "test(packages): cover native and Tailwind consumers"
```

---

### Task 7: Document the Framework-Independent Core and Tailwind Option

**Files:**

- Modify: `README.md`
- Modify: `packages/tokens/README.md`
- Modify: `packages/ui/README.md`
- Modify: `docs/package-contracts.md`
- Modify: `specs/architecture.md`
- Modify: `apps/docs/app/docs/introduction/page.tsx`
- Modify: `apps/docs/app/docs/installation/page.tsx`
- Create: `.changeset/browser-native-tokens.md`

- [ ] Make the default installation path framework-independent.

```bash
pnpm add @maxa/ui @maxa/tokens
```

```tsx
import "@maxa/tokens/theme.css"
import { Button } from "@maxa/ui"
```

- [ ] Document Tailwind as an optional adapter, not a requirement of MAXA UI.

```bash
pnpm add @maxa/ui @maxa/tokens @maxa/tailwind tailwindcss
```

```css
@import "tailwindcss";
@import "@maxa/tailwind/theme.css";
```

- [ ] State the ownership rule exactly:
  - `@maxa/tokens` owns native primitives, semantic roles, and component tokens.
  - `@maxa/ui` consumes those variables and works without Tailwind.
  - `@maxa/tailwind` mirrors eligible foundations into Tailwind and exposes an allowlisted set of role-safe semantic utilities.
  - MAXA values intentionally govern overlapping Tailwind utilities when the adapter is loaded.
  - Standard utilities remain familiar in syntax, but their theme values are MAXA values: `text-sm` is 12 px and `rounded-md` is 8 px.
  - Semantic product decisions are expressed as `bg-page`, `text-primary`, and `border-primary`.

- [ ] Document the migration for existing Tailwind consumers:

```diff
 @import "tailwindcss";
-@import "@maxa/tokens/theme.css";
+@import "@maxa/tailwind/theme.css";
```

Consumers without Tailwind keep importing `@maxa/tokens/theme.css` and require no migration.

- [ ] Explain why variables are not prefixed with `--maxa-*`: current names are already the public contract, package/style import boundaries provide ownership, and a mass rename would create risk without solving the runtime problem.

- [ ] Update `specs/architecture.md` so `@maxa/tailwind` is an implemented optional adapter rather than a future package. Keep `@maxa/cli` described as read-only introspection; do not advertise scaffolding that does not exist.

- [ ] Update `docs/package-contracts.md` with the adapter dependency contract and smoke coverage.

- [ ] Add a changeset that describes the native CSS behavior and the new optional adapter. The adapter starts at `0.0.0`; this minor changeset produces its first `0.1.0` release. Do not describe token or visual changes because none are authorized.

```md
---
"@maxa/tokens": minor
"@maxa/tailwind": minor
---

Make the MAXA token theme browser-native and add an optional Tailwind CSS adapter generated from the same token source.
```

- [ ] Run documentation and architecture checks.

```bash
pnpm --filter @maxa/docs typecheck
pnpm --filter @maxa/docs lint
pnpm --filter @maxa/docs build
pnpm tokens:reference:check
```

Expected result: all pass; installation docs answer both “Do I need Tailwind?” and “How do I use MAXA with Tailwind?” without contradiction.

- [ ] Commit documentation.

```bash
git add README.md packages/tokens/README.md packages/ui/README.md docs/package-contracts.md specs/architecture.md apps/docs/app/docs/introduction/page.tsx apps/docs/app/docs/installation/page.tsx .changeset/browser-native-tokens.md
git commit -m "docs: define native and Tailwind integration contracts"
```

---

### Task 8: Prove Figma, Token, API, and Visual Parity

**Files:**

- Verify unchanged: `packages/tokens/figma/**`
- Verify unchanged: `specs/tokens-reference.md`
- Verify unchanged: `packages/ui/src/components/**`
- Verify unchanged: `apps/docs/e2e/__screenshots__/**`

- [ ] Prove that no Figma artifact changed relative to the rollback tag.

```bash
git diff --exit-code pre-tailwind-token-refactor-2026-08-29 -- packages/tokens/figma
```

Expected result: exit code 0 and no output.

- [ ] Prove that token names and values still generate the same canonical reference.

```bash
pnpm --filter @maxa/tokens figma:bundle:check
pnpm tokens:reference:check
git diff --exit-code pre-tailwind-token-refactor-2026-08-29 -- specs/tokens-reference.md
```

Expected result: all commands pass and no reference diff appears.

- [ ] Prove that no React component implementation or API changed.

```bash
git diff --exit-code pre-tailwind-token-refactor-2026-08-29 -- packages/ui/src/components packages/ui/src/index.ts
```

Expected result: exit code 0 and no output. Changes to cross-layer test files outside `components` are expected.

- [ ] Prove that visual baselines were not rewritten.

```bash
git diff --exit-code pre-tailwind-token-refactor-2026-08-29 -- apps/docs/e2e/__screenshots__
pnpm --filter @maxa/docs test:visual
```

Expected result: no snapshot diff and all visual tests pass.

- [ ] Run the full repository verification.

```bash
pnpm verify
pnpm --filter @maxa/tokens test:browser
pnpm --filter @maxa/tailwind generate:theme:check
pnpm --filter @maxa/tailwind test
pnpm --filter @maxa/docs test:visual
git diff --check
```

Expected result: every command exits 0.

- [ ] Manually inspect the built docs in light and dark modes. Confirm that page background, surfaces, text, borders, buttons, avatar borders/radii, and Avatar Label states match the existing screenshots.

- [ ] Record the exact verification commands and results in the pull request description. Do not update screenshots or Figma data to make a failed check pass.

---

### Task 9: Independent Review, Publish, and Live Verification

**Files:**

- Review: entire branch diff
- Verify: GitHub Actions workflows
- Verify: `https://maxa-ui.netlify.app`

- [ ] Run an independent code review focused on CSS import order, package export resolution, generator drift, Tailwind output, and accidental value changes.

- [ ] Run a security review focused on the new package generator and browser route fixture. Confirm path traversal is rejected and no external network or secrets are introduced.

- [ ] Run a plan-fit review against the Definition of Done. Passing commands alone is insufficient if native CSS still depends on Tailwind or if the adapter owns copied values manually.

- [ ] Push the completed feature branch and open a pull request against `main`.

```bash
git push -u origin HEAD
```

- [ ] Wait for typecheck, lint, tests, token audits, package smoke, docs build, and visual workflows to pass.

- [ ] Merge only after the independent review and all zero-diff gates pass.

- [ ] Deploy the existing static docs output through the current Netlify workflow; do not create a second site.

- [ ] Verify live documentation:
  - The home page renders at `https://maxa-ui.netlify.app`.
  - Installation clearly shows native and Tailwind setups.
  - Component pages render with unchanged visuals.
  - Browser console has no unresolved CSS import or custom-property errors.

- [ ] Add the final merge commit and deployment URL to the implementation handoff.

---

## Acceptance Matrix

| Consumer           | Imports                                               |         Tailwind required | Expected contract                                             |
| ------------------ | ----------------------------------------------------- | ------------------------: | ------------------------------------------------------------- |
| React app          | `@maxa/tokens/theme.css`, `@maxa/ui`                  |                        No | Components and all token chains render correctly              |
| Plain HTML/CSS     | `@maxa/tokens/theme.css`                              |                        No | Native custom properties resolve in the browser               |
| Tailwind app       | `tailwindcss`, `@maxa/tailwind/theme.css`, `@maxa/ui` |   Yes, by consumer choice | MAXA-powered Tailwind primitives plus safe semantic utilities |
| Figma library      | Existing DTCG JSON/import bundle                      |                        No | No token, binding, collection, or component change            |
| Existing MAXA docs | Public adapter import                                 | Yes, internal docs choice | Same UI and screenshots as before                             |

## Out of Scope

- Renaming CSS variables to `--maxa-*`.
- Rebuilding the primitive scales.
- Changing `#F5F6FA`, Neutral/75, typography, border, or radius values.
- Adding new Figma variables or changing existing aliases/scopes.
- Adding or changing React components.
- Copy-owned component delivery comparable to the Untitled UI CLI.
- A general-purpose MAXA `init` or `add` command.
- Supporting Tailwind v3.
- Publishing packages to a registry before the existing release policy authorizes it.

## Final Handoff Format

The implementer must report:

1. Native browser test result.
2. Tailwind compilation test result.
3. Full `pnpm verify` result.
4. Figma zero-diff result.
5. Token-reference zero-diff result.
6. React component/API zero-diff result.
7. Visual baseline zero-diff result.
8. Git commit/PR and live Netlify URL.
