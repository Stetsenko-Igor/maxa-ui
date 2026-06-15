---
"@maxa/cli": patch
"@maxa/ui": patch
---

Document package-readiness contracts without starting a release.

The published README files now clarify the runtime dependency contract for
`@maxa/ui` and `@maxa/cli`: UI peers on `@maxa/tokens` because apps own the
token stylesheet, UI depends on `@maxa/icons` because components import icons at
runtime, and CLI consumers should install `@maxa/mcp` alongside local `file:`
links. Repository docs now separate package readiness from release execution and
document the future release checklist.
