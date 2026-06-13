# @maxa/icons

Shared React icon package for the MAXA design system.

## Status

Implemented. The package exposes:

- `version` - package version string
- curated Phosphor system icons used by MAXA components
- `social` - full-color provider brand marks for `SocialButton` and related auth/share UI

System icons are intentionally curated instead of re-exporting the full Phosphor package. Add a new icon to `src/index.ts` only when a MAXA package needs it.

## Requirements

- React 18 or 19

## Usage inside this workspace

```jsonc
// package.json
"dependencies": { "@maxa/icons": "workspace:^" }
```

```tsx
import { CaretDown, Check, X, social } from "@maxa/icons"

<CaretDown width={16} height={16} aria-hidden="true" focusable={false} />
<social.GoogleIcon width={20} height={20} />
```

## System Icons

System icons are Phosphor Regular glyphs. They render with `currentColor`, so consumers should size and color them through component tokens or wrapper CSS. Import from `@maxa/icons`, not `@phosphor-icons/react`, so the dependency and allowed icon set stay owned by the design system.

Decorative system icons should be hidden from assistive technology:

```tsx
<X width={16} height={16} aria-hidden="true" focusable={false} />
```

Icon-only controls must put the accessible name on the control, not the icon:

```tsx
<button type="button" aria-label="Close">
  <X width={20} height={20} aria-hidden="true" focusable={false} />
</button>
```

## Social Icons

Social icons keep provider brand colors and do not use `currentColor`.

They are decorative by default (`aria-hidden`) because the accessible name usually lives on the surrounding button or link:

```tsx
<button type="button">
  <social.GoogleIcon width={20} height={20} />
  Sign in with Google
</button>
```

When a brand mark is used standalone as meaningful content, provide an accessible name:

```tsx
<social.GoogleIcon width={20} height={20} aria-label="Google" />
```

## Usage from GitHub (no npm registry)

Clone the repo, build, then link via `file:`:

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui && pnpm install && pnpm build
# in your project:
pnpm add file:../maxa-ui/packages/icons
```

See the root [README](../../README.md) for distribution options and caveats.
