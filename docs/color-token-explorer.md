# Color Token Browser

Open `/docs/foundations/colors#tokens`. The old `#explore` link also opens Tokens.

## For reviewers

- **Overview** combines the color model, usage guidance and complete reference tables.
- **Tokens** places search and layer/group filters on the left, with selected-token
  details on the right. On mobile, search comes first.
- Each token shows both source theme values. List swatches and dependencies follow
  the site's theme switch; there is no separate preview theme or color editor.
- Follow an upstream source or dependent token to trace its recipe.
- **Used by** links to components whose library CSS references the token or its
  dependents. It is not a production-screen inventory.

Only layers with color tokens appear. Currently these are Semantic (242), Component
(478) and Primitive (237). Foundation contains no color tokens. Switching layers
clears search and group filters so the new layer is not hidden by a stale query.

## Maintenance

Run `pnpm tokens:reference` after token or component CSS changes. The generator
`scripts/generate-color-explorer.mjs` produces `explorer.generated.json` beside the
Colors page. Do not edit that file manually. It includes raw values, resolved aliases,
mode-specific references and source CSS consumers. Unsupported expressions retain
raw values with null resolution; missing aliases and cycles are handled explicitly.

Readable role descriptions are curated in `color-explorer.tsx`; relationships come
from generated source data. Theme synchronization observes the document theme without
writing it. Token browsing does not persist selections, edit files or publish themes.

## Design decision from user review

The first version's interactive trial canvas made the page harder to use, especially
when its independent light theme appeared inside dark documentation. Keep this page
focused on reference and traceable usage: left-side search, source values, dependencies
and Used by. Do not reintroduce a color editor or independently themed component
preview without a new explicit request. Keep overview and reference together.

## Local verification

```sh
pnpm tokens:reference:check
pnpm test:css-contract
pnpm --filter @maxa/docs typecheck
pnpm --filter @maxa/docs lint
pnpm audit:tokens
EXPLORER_DEV=1 pnpm --filter @maxa/docs test:explorer
```

The last command expects local docs on port 3000. To test static export, run
`pnpm --filter @maxa/docs build:netlify` then omit `EXPLORER_DEV=1`.
The build command does not deploy. Existing visual baselines must be deliberately
refreshed on Linux before publication, not replaced with macOS screenshots.
