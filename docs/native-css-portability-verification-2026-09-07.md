# Native CSS portability verification — 2026-09-07

## Recovery and scope

- Original main: `9f2be05`.
- Checkpoint: `2d8eb49`, annotated tag `pre-native-css-portability-2026-09-07`. Includes the pre-existing audit change and three untracked plans.
- Delivery branch: `refactor/native-css-portability-2026-09-07`.
- No package publication, push, merge, deployment, or Concept3D copy was performed.

## Delivered contract

- `@maxa/tokens/theme.css` is browser-native CSS. `core.css` provides all foundation/component tokens without the MAXA brand scale. Explicit CSS exports include motion and all component token files.
- `@maxa/ui/styles.css` delivers existing component CSS independently of React. React's normal entry still imports component styles. Both paths include scoped border-box sizing without resetting host elements. HTML whitespace in class attributes is supported.
- The UI barrel is explicitly side-effectful so bundlers retain normalization when selecting named component imports. Omitting this metadata caused the real Vite browser check to fail.
- Whole-document theming is documented. A brand scale is not a complete rebrand. Generic variable namespace collisions, scoped theme/portal limitations, and React 16 incompatibility remain explicit integration boundaries.
- Tailwind remains docs tooling only. No adapter was introduced.
- The token reference generator now follows nested relative CSS imports and preserves multiple declarations on a line. Tests reject cycles and missing imports.
- Browser consumer verification is available as `pnpm pack:smoke:browser` and wired into GitHub/GitLab CI. The usual package smoke remains usable without a browser installation.

## Verification results

| Check | Result |
| --- | --- |
| `pnpm verify` | Passed: typecheck, lint, token audit, CSS delivery tests, Figma bundle, generated reference, Figma plugin checks, package tests, build, installed package smoke |
| Workspace Vitest suites | 788 tests passed across 62 files |
| `pnpm test:css-contract` | 4 tests passed: CSS inventory/entry and token reference generator |
| `pnpm --filter @maxa/ui test:coverage` | 556 tests passed; statements 91.35%, branches 84.65%, functions 92.12%, lines 94.02%; all existing thresholds met |
| `pnpm pack:smoke:browser` | Passed against packed and installed artifacts: React 19, HTML without JavaScript, custom root theme, brand semantic alias, action color, font/radius overrides, light/dark input/button/popover, input outer geometry, focus, actual portal, untouched host heading/list, no browser or asset errors |
| README installation recipe | Four packages packed using the documented filter command and installed into a separate consumer with the documented local overrides; React 19 provided by that app |
| Docs static export | Passed using `build:netlify`; 56 HTML files use the correct `/_next/` asset prefix |
| Same-machine visual comparison | 22/22 passed with `maxDiffPixels: 0` against a fresh checkpoint build; no repository screenshot baselines changed |
| Figma, TypeScript token constants, generated colors JSON | Byte-for-byte unchanged against checkpoint |
| Token source inventory | All 1740 token names, light values, and dark overrides match checkpoint |
| Independent correctness/plan-fit/security review | No blocking findings after follow-up fixes |

## Reproduced defects and corrections

1. The new native-CSS assertion failed on the old `@theme` definitions before conversion. Runtime tests no longer rewrite those definitions into `:root`.
2. The installed browser consumer initially measured Input at 38px despite its 36px token. Component-local normalization fixed this. A second failure showed the barrel's CSS import was tree-shaken; explicit side-effect metadata fixed delivery.
3. A production docs build failed with `createContext is not a function`. Reproduced on the checkpoint independently of token changes. Breadcrumb's new Phosphor icons require a client boundary; Breadcrumb now has `use client`, and the long-path example renders inside a client preview. React APIs, CSS and rendered design are unchanged.
4. The checkpoint's generated token reference omitted three breadcrumb tokens already present in its CSS. Regeneration adds those three names, moves the brand section to match the new import order, and places line-height entries next to font sizes. No design values were introduced or changed.

## Visual comparison method and limits

The pre-existing exported docs failed all 22 repository screenshot comparisons on this Mac. Those stored baselines are Linux-generated; the old local output was not used as a regression oracle.

An isolated worktree from the checkpoint was installed and freshly built. Only the same required Breadcrumb client-boundary correction was applied there so the original version could build. Its unchanged old token pipeline produced temporary screenshots under `/tmp/maxa-native-css-baselines`. The delivery build was compared with those screenshots on the same Chromium/macOS environment, using a zero-pixel tolerance. All 22 scenarios matched. The committed Linux baseline files remain unchanged; remote CI has not been run.

## Remaining integration boundaries

- No registry release yet. The documented packed-tarball recipe is the tested external installation path; source-directory `file:` links are not presented as verified.
- Localist's saved React 16/ERB/Liquid stack requires a separate current-stack check and CSS/HTML-first integration. CSS does not supply interaction, keyboard handling or focus management.
- Choose a Concept3D namespace and validate its legacy styles before client release. This delivery deliberately preserves MAXA public token names.
- Fonts are loaded by the host. The scoped sizing baseline is not a full global reset or a promise that every arbitrary host stylesheet is compatible.
- `core.css` retains MAXA defaults beyond the excluded brand scale. Review semantic actions, typography, geometry, icons and product-specific components when creating a client theme.

## Local evidence logs

`/tmp/maxa-native-css-verify-delivery.log`, `/tmp/maxa-native-css-consumer-final.log`, `/tmp/maxa-native-css-coverage.log`, `/tmp/maxa-native-css-static-delivery.log`, `/tmp/maxa-native-css-local-parity.log`. Temporary evidence may be cleared by the OS; this report preserves the conclusions and method.
