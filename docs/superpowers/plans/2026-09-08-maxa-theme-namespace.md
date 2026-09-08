# MAXA Theme and Namespace Implementation Plan

**Goal:** Deliver full MAXA theme isolation and opt-in namespace-safe CSS/React packages while preserving existing consumers and Figma values.

**Architecture:** Generated theme ownership split and namespaced distribution from canonical sources; independent mode attribute; legacy entrypoints unchanged.

**Tech Stack:** Native CSS, TypeScript output, Node build scripts, existing packed-consumer Playwright checks.

- [x] Inspect source/runtime contracts and preserve checkpoint.
- [x] Build tested shared namespace transformer covering declarations, var references, dynamic JS templates, external variables and animation names.
- [x] Generate tested token ownership split and complete MAXA theme; expose namespaced entrypoints.
- [x] Generate matching React/CSS subtree and package exports with side-effect preservation.
- [x] Extend packed browser consumers for collisions, full theme parity, inline helpers and portals.
- [x] Update docs/installation instructions and retain source/Figma naming rules.
- [x] Run package/source integrity checks, browser checks, independent review and save completion.
