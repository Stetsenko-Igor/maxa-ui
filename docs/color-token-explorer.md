# Color Token Explorer

The local documentation page `/docs/foundations/colors#explore` explains how colors
move from palette values to named roles and component recipes.

## For reviewers

1. Open **Explore** in Foundations → Colors. **Overview** introduces the model;
   **Reference** retains the detailed color tables.
2. Search by token name or readable role. Filter by layer and group. The inspector
   sits on the right on desktop and above the preview on narrow screens.
3. Select a token to see its source values in both themes. Follow its upstream
   source or dependent tokens to trace the recipe.
4. Change **Trial color** or switch the local **Light / Dark** preview. Real Button,
   Input, and Alert components show the effect. Select a labeled component part
   to inspect its token. Highlighting covers the listed parts, not every internal
   state of a component.
5. **Reset** restores the source value. Changing token or preview theme also clears
   the trial. Nothing is persisted or exported.

**Used by** lists references in library CSS, including indirect token dependencies.
It does not claim to inventory production screens. Hover, active, and focus can
have separate recipes. A six-digit hex trial replaces only the selected token;
it does not generate a complete accessible palette or all interaction states.

## Maintaining the data

Run `pnpm tokens:reference` after token or component CSS changes. The build-time
`scripts/generate-color-explorer.mjs` produces `explorer.generated.json` beside the
Colors page. It reuses the reference generator's source parser and records raw
values, resolved aliases, mode-specific references, and source CSS consumers.
Do not edit the generated file manually. Unsupported expressions retain their
raw form with a null resolved value; cycles and missing aliases do not recurse forever.

The preview redeclares the entire token inventory within its own element before
applying a trial override. This lets nested CSS aliases resolve against the local
trial rather than a value already inherited from the document root. New preview
recipes must stay inside this boundary; portalled content requires separate scope
handling. Human-readable descriptions and illustrated component parts are curated
in `color-explorer.tsx`; token relationships come from generated source data.

## Local verification

```sh
pnpm tokens:reference:check
pnpm test:css-contract
pnpm --filter @maxa/docs typecheck
pnpm --filter @maxa/docs lint
pnpm audit:tokens
pnpm --filter @maxa/docs build:netlify
pnpm --filter @maxa/docs test:explorer
```

`build:netlify` only creates and checks a local static export; it does not deploy.
With the development server already on port 3000, run browser tests using
`EXPLORER_DEV=1 pnpm --filter @maxa/docs test:explorer` instead.
Existing visual baselines are Linux-based. Refresh the changed Colors overview
baseline deliberately on that platform before publishing; do not replace the
full screenshot set with macOS captures.
