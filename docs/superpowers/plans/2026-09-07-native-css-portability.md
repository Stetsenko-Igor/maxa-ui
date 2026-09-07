# Native CSS portability delivery

Approved by Igor on 2026-09-07 after the Astra architecture review. Supersedes the August 31 v1/v2 plans for this delivery.

## Recovery point

- Original main: `9f2be05`.
- Checkpoint including the four pre-existing modified/untracked files: `2d8eb49`.
- Annotated tag: `pre-native-css-portability-2026-09-07`.
- Working branch: `refactor/native-css-portability-2026-09-07`.
- Inspect the checkpoint in a separate worktree to recover it without discarding later work: `git worktree add /tmp/maxa-ui-checkpoint pre-native-css-portability-2026-09-07`.

## Scope and checklist

- [x] Save existing work before implementation.
- [x] Publish ordinary CSS variables, with no Tailwind processing needed by consumers.
- [x] Remove test-only rewriting that masked raw token failures.
- [x] Provide complete `tokens/core.css`, default `tokens/theme.css`, and `ui/styles.css` entries.
- [x] Verify installed packages in Chromium: React, CSS-only HTML, custom document theme, light/dark, popup, host reset isolation.
- [x] Document installation, actual dependencies, theme boundaries, and Concept3D migration limits.
- [x] Run unit tests, typecheck, lint, token/Figma/reference audits, builds, package smoke, visual checks.
- [x] Independently review correctness, security, and fit to the approved outcome.

## Decisions

Keep React APIs, existing component CSS, public variable names, design values, Figma files and repository visual baselines unchanged. Add scoped sizing normalization where the no-Tailwind consumer proves reset dependence. Keep Tailwind in docs temporarily as existing tooling; no adapter. Tokens already are a runtime dependency of UI; align docs rather than imposing a peer migration. Do not introduce a global reset into client pages. Export existing component styles without promising JavaScript behavior from CSS alone.

Whole-document themes are supported. Generic variable names may collide with host frameworks. Nested independent themes and portal-container propagation are not claimed. Before a Concept3D release choose a client namespace and validate its legacy CSS. A brand scale alone does not replace action colors, typography, geometry, icons or product decisions. Localist's saved React 16 setup is outside this package's React 17–19 contract; provide CSS/HTML integration first and validate the current target separately.

The Concept3D fork, namespace migration, new product surfaces, framework-specific interactive wrappers, publishing and deployment are subsequent work, not prerequisites for fixing native CSS delivery here.

## Evidence

Implementation and verification results are recorded in `docs/native-css-portability-verification-2026-09-07.md`.
