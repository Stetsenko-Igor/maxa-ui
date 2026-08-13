# MAXA Button v3 Token Simplification — Delivery Record

- Date: 2026-08-11
- Status: Implemented; final repository verification tracked in the delivery commit

## Delivered

- Added Blue 550, Green 650/750, and Red 550 primitives.
- Added shared `text/text-on-color`; kept `foreground/fg-on-color` white in both themes.
- Recalibrated Primary, Positive, and Destructive action states for small theme-aware steps.
- Split Link text/icon roles from filled action backgrounds to preserve Dark-theme contrast.
- Removed unused success/destructive subtle action roles from the active source contract.
- Reduced Button component tokens to real variant differences plus shared content and focus roles.
- Consolidated size padding to one symmetric token per size.
- Added size-specific Button gap and Text-padding roles that alias Spacing, then bound the v3 masters to them.
- Reused Button height for icon-only dimensions.
- Preserved published Figma IDs as hidden `Button/legacy/*` compatibility variables.
- Rebound and validated all 336 Button v3 variants.
- Migrated runtime Button CSS, tests, specs, token bundle, and Storybook/docs.
- Decoupled Social Button padding so its visual geometry remains unchanged.

## Verification commands

```bash
pnpm --filter @maxa/tokens test
pnpm --filter @maxa/ui test -- button icon-button
pnpm audit:tokens
pnpm --filter @maxa/tokens figma:bundle:check
pnpm tokens:reference:check
pnpm typecheck
pnpm lint
pnpm build
```

The Figma library changes must be published from Figma after final visual review; repository generation cannot publish a library release on the designer's behalf.
