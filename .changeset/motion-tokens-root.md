---
"@maxa/tokens": patch
---

Move motion, z-index, opacity, and blur tokens out of the `@theme {}` block into `:root {}` in `dimensions.css`. Tailwind v4 tree-shakes `@theme` variables that are not referenced inside its processed import graph, which silently stripped `--duration-*` and `--easing-*` from the docs app and disabled all component transitions there. These tokens are not meant to be Tailwind utilities, so `:root` is the correct home; spacing/radius/breakpoint/width tokens stay in `@theme`.
