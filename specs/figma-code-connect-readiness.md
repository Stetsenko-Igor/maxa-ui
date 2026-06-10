# Figma Code Connect Readiness

Status: planned optional adapter

This project does not depend on Figma Code Connect. The canonical runtime design system remains:

```
packages/tokens/src/*.css
    -> @maxa/tokens
    -> @maxa/ui
    -> product apps and docs
```

Code Connect, if enabled later, should be treated as an adapter that maps published Figma library
components to the existing React API. It must not become the source of truth for component behavior,
token names, or package ownership.

## Current Decision

- Keep the code/tokens repository as the source of truth.
- Sync tokens from code to Figma, not from Figma to production, unless Figma Variables API access is
  explicitly available and governed through CI.
- Do not add `.figma.js` or `.figma.tsx` mappings until real published Figma component URLs and
  component properties are available.
- Do not block component work, docs, MCP, CLI, or product adoption on Code Connect availability.

## Why Not Add Templates Yet

Code Connect templates need real Figma component metadata:

- File key and `node-id`
- Published component or component set
- Exact property names
- Variant values
- Boolean flags
- Text properties
- Instance swap slots

Creating templates without that metadata would create speculative mappings that are likely to drift
from the Figma library and the React API.

## Future Setup Checklist

1. Confirm Figma plan/access supports Code Connect.
2. Publish the Maxa components to a Figma team library.
3. Add `figma.config.json` with React/TypeScript settings and include paths.
4. Start with a pilot set:
   - `Button`
   - `Input`
   - `Badge`
   - `Checkbox`
   - `Dialog` or `Select`
5. For each component, map Figma properties to React props.
6. Validate generated examples against `@maxa/ui` source and docs examples.
7. Add CI validation only after templates exist and the workflow is stable.

## Mapping Contract

Figma naming should remain close to React props, but designer-facing labels may use title case.

| Concept | Figma property example | React prop example |
| --- | --- | --- |
| Visual emphasis | `Variant: Primary` | `variant="primary"` |
| Size | `Size: Medium` | `size="md"` |
| Disabled state | `Disabled: true` | `disabled` |
| Text content | `Label: Save` | children or `label` |
| Icon slot | `Icon` instance swap | `icon={...}` |
| Destructive intent | `Variant: Danger` | `variant="danger"` |

When a Figma property does not map cleanly to a React prop, prefer updating the spec first. Do not
silently invent prop names in Code Connect templates.

## Token Sync Policy

Production colors, spacing, radius, typography, motion, and component styling must come from repo
tokens. Figma should consume generated token artifacts from this repo.

Allowed flow today:

```
repo token change
    -> token audit / tests / docs
    -> product CSS variables
    -> Figma import bundle
```

Deferred flow, only if API access and governance are available:

```
Figma variable change
    -> automated export
    -> pull request
    -> token audit / tests / docs
    -> product CSS variables
```

Direct Figma-to-production updates are not allowed. Every token change must pass through version
control and CI.

## First Template Shape

When real Figma metadata is available, a Button mapping should look roughly like this:

```js
const figma = require("figma")
const instance = figma.selectedInstance

const label = instance.getString("Label")
const variant = instance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost",
  Danger: "danger",
})
const size = instance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
})
const disabled = instance.getBoolean("Disabled")

export default {
  example: figma.tsx`
    <Button
      variant="${variant}"
      size="${size}"
      ${disabled ? "disabled" : ""}
    >
      ${label}
    </Button>
  `,
  imports: ['import { Button } from "@maxa/ui"'],
  id: "button",
  metadata: { nestable: true },
}
```

This is an example only. The final template must use the exact property names returned by the
published Figma component.
