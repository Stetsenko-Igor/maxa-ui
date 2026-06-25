---
"@maxa/ui": patch
"@maxa/tokens": patch
"@maxa/icons": patch
"@maxa/hooks": patch
"@maxa/cli": patch
"@maxa/mcp": patch
---

Add `publishConfig: { access: "public" }` to every publishable package so scoped packages
can be published publicly. The publish **registry is intentionally not hardcoded** — it is
selected at publish time via `.npmrc`, keeping both the GitLab Package Registry and public
npm open. See the new `RELEASING.md` and `.npmrc.example`.

Move `@maxa/tokens` from `@maxa/ui`'s `peerDependencies` to `dependencies`. Tokens are
global CSS custom properties (`:root`), so a peer constraint was not required, and a peer
range change forced an unwanted major bump of `@maxa/ui` on every tokens release. As a
regular dependency it follows `updateInternalDependencies: patch`, keeping `@maxa/ui` on
0.x until an explicit 1.0.
