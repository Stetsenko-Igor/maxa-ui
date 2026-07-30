---
"@maxa/tokens": patch
---

Fix `Utility/bg-{hue}-strong` Figma variables showing as literal white in Dark mode. Root cause: `component-utility-dark.json` never defined these 18 keys — the CSS source correctly leaves them undeclared in dark (the value is unchanged across themes, so it falls through the `:root` cascade), but Figma variables have no such cascade, so the unset Dark mode value defaulted to white. Added the 18 missing keys (matching light mode exactly, since the color genuinely doesn't change between themes) and a regression test asserting light/dark key parity for the Utility collection.
