# MaxaLogo — Component Spec

`MaxaLogo` renders the official MAXA wordmark. Use this component anywhere the product or documentation needs the MAXA identity instead of recreating the mark with text, a raster image, or custom SVG geometry.

**Component package:** `@maxa/ui` → `MaxaLogo`

**Source geometry:** Approved four-path wordmark with `viewBox="0 0 1518 262"` and connected apexes on both `A` letterforms.

## API

```ts
interface MaxaLogoProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean
}
```

| Prop | Default | Contract |
|------|---------|----------|
| `decorative` | `false` | Hides the mark from assistive technology when adjacent content already identifies MAXA. |
| `width` | `120` | Sets the rendered width. The official aspect ratio is preserved. |
| `height` | `auto` | May be supplied for an explicit lockup size. |

The component forwards its ref and all standard SVG attributes, including `className`, `style`, `data-*`, and `aria-*` props.

## Usage

```tsx
import { MaxaLogo } from "@maxa/ui"
import "@maxa/tokens/theme.css"

<MaxaLogo />
<MaxaLogo width={112} />
<MaxaLogo decorative width={80} />
```

## Visual Contract

- The artwork is always white through the fixed `--maxa-logo-color` component token.
- Place the wordmark only on a dark surface with sufficient contrast.
- Both `A` letterforms use connected outlines. A top notch or triangular cut is incorrect.
- The approved four paths and `1518:262` aspect ratio must not be stretched, redrawn, or replaced with styled text.
- Set one dimension and allow the aspect ratio to determine the other whenever possible.
- Preserve clear space around the mark. Do not place controls or text inside its bounds.

## Accessibility

- By default the SVG has `role="img"` and the accessible name `MAXA`.
- Provide `aria-label` when the surrounding context needs a more specific name, for example `aria-label="MAXA home"`.
- Use `decorative` when the wordmark is inside a link or header that already has an accessible MAXA label. Decorative mode applies `aria-hidden="true"` and removes the image role and label.
- The SVG is never keyboard-focusable by itself. Navigation belongs on the wrapping link or button.

## Boundaries

| Need | Use |
|------|-----|
| MAXA identity on a dark surface | `<MaxaLogo />` |
| MAXA identity on a light surface | Do not recolor the mark; provide an approved dark container |
| Clickable home link | Wrap `MaxaLogo` in a semantic link |
| Adjacent text already names MAXA | `<MaxaLogo decorative />` |
| Symbol-only brand mark | Not provided; use the approved wordmark |
| Arbitrary logo color | Not supported |
| Dark or theme-adaptive logo | Not supported |
| Raster PNG/JPG logo | Not supported in product UI |
