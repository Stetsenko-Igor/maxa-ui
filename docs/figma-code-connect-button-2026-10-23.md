# Code Connect for Button v3 - what it is and what it gave us

Date: 2026-10-23. First Code Connect template in this repository.

## The problem it solves

Open `🟢 Button v3` in Figma Dev Mode today and Figma shows generated CSS: a
div with padding, a background colour, a border radius. Accurate, and useless -
nobody writing a MAXA screen should hand-write that. The real answer is one
line of React, and until now the only way to know it was to ask a person.

Code Connect replaces Figma's guess with our answer. It is a small template,
checked into this repository next to the component, that says: *when a designer
selects this Figma component, show them this code, with these props filled in
from the variant they actually selected.*

The same mapping is what the Figma MCP server hands to a coding agent. Without
it, an agent reading a Figma frame invents a plausible component. With it, the
agent is told the real one.

## What it does, concretely

A designer selects a `🟢 Button v3` instance set to Type `Primary`,
📐 Size `md - 36`, State `Loading`, with `⬅️ Icon Left` on and the left icon
swapped to `Acorn`.

**Before** - Figma Dev Mode shows generated CSS:

```css
display: flex;
height: 36px;
padding: 0 14px;
gap: 6px;
border-radius: 6px;
background: #0265dc;
```

**After** - Dev Mode shows:

```tsx
import { Button } from "@maxa/ui"

<Button variant="primary" size="md" loading iconLeading={<Acorn />}>
  Button text
</Button>
```

Switch the Figma variant to `Destructive` / `xs - 24` / `Disabled` and the
snippet updates itself - `variant="destructive" size="xs" disabled` - because
the template reads the live variant, it is not a fixed screenshot of one state.

## How it is wired

Three files, all in this repository:

| File | Role |
| --- | --- |
| `figma.config.json` | Tells the Code Connect CLI where templates live and that this is a React project |
| `packages/ui/src/components/button/button.figma.ts` | The template itself |
| `packages/ui/src/components/button/button.figma.test.ts` | Keeps the template honest |

The template maps each Figma property onto a real prop:

| Figma property | Type | Maps to |
| --- | --- | --- |
| `✏️ Text` | TEXT | `children` |
| `Type` | VARIANT (7) | `variant` |
| `📐 Size` | VARIANT (`lg - 40` …) | `size` (`lg`, `md`, `sm`, `xs`) |
| `State` | VARIANT (6) | `loading` / `disabled`, or nothing |
| `Icon Only` | VARIANT | `iconOnly` |
| `Has Background` | BOOLEAN | `hasBackground` |
| `⬅️ Icon Left` + `🔀 Icon Left Swap` | BOOLEAN + INSTANCE_SWAP | `iconLeading` |
| `➡️ Icon Right` + `🔀 Icon Right Swap` | BOOLEAN + INSTANCE_SWAP | `iconTrailing` |
| `🔀 Icon Only Swap` | INSTANCE_SWAP | `children` when icon-only |

Two mappings are judgement calls worth knowing about:

- **`State` is not one prop.** Figma models `Hover`, `Active` and `Focus` as
  variants because it has to draw them. In code the browser owns them, so they
  map to the default rendering and emit no prop at all. Only `Loading` and
  `Disabled` become props. Emitting `state="hover"` would have produced code
  that does not compile.
- **Size labels carry pixels.** Figma says `lg - 40`, code says `lg`. The
  template strips the label rather than inventing a `40` size.

## What keeps it from rotting

A Code Connect template is a promise to designers, and nothing in Figma or in
TypeScript checks it against the real component. It can drift silently: rename
a variant in code, and Dev Mode keeps confidently serving a snippet that no
longer compiles.

`button.figma.test.ts` closes that. Nine assertions, run by the normal test
suite, comparing the template against the actual `cva` definition in
`button.tsx` and against the Figma property list read on 2026-10-23:

- every Figma `Type`, `📐 Size` and `State` option is mapped - an unmapped
  option silently renders `variant="undefined"`
- every variant and size the template emits exists in `button.tsx`
- the template emits no prop that is not in `ButtonProps`
- `Hover`, `Active` and `Focus` stay propless
- **every code variant without a Figma counterpart is listed explicitly**

That last one is the useful one. It currently pins exactly one gap, and it
fails the moment a new variant is added on either side.

`pnpm figma:connect:parse` is also wired into `pnpm verify`, so a malformed
template fails the same gate as a broken test.

## What it found immediately

Writing the mapping surfaced three divergences between our code and Button v3
in Figma, none of which anyone had noticed:

1. **`destructive-outline` does not exist in Figma.** We added it on 2026-10-16
   and shipped tokens for it. Figma's `Type` has seven options and that is not
   one of them.
2. **`colorScheme: inverse` does not exist in Figma either** - also ours, also
   from October.
3. **`fullWidth` has no Figma counterpart.** This one is probably fine: full
   width is a layout decision, and Figma expresses it by resizing the instance.

The first two mean a designer cannot currently produce the buttons our code can
render. That is a real design-system gap, not a mapping problem.

## Publishing

Not done. `figma connect publish` writes the mapping into the Figma file, which
is an outward action and needs explicit sign-off, plus a Figma auth token in
the environment. The template is validated and ready:

```
$ npx figma connect parse
Config file found, parsing /Users/igorstetsenko/Projects/maxa-ui
packages/ui/src/components/button/button.figma.ts
  figmaNode: .../9M6ulX7a6bDlmctFdClAzu?node-id=11020-118515
  component: Button   isParserless: true
```

One caveat to check before publishing: the Code Connect skill states Code
Connect requires an Organization or Enterprise plan, while our Figma account is
Professional. The read-side tools worked fine on Professional - that is how
this template was built - but publishing was not attempted, so the plan
requirement is unconfirmed either way.

## If it works, the next ones are cheap

The expensive part was the setup and the conventions. A second component is one
file and a test. Worth doing for the components the product actually consumes
rather than all 43 at once.
