# MAXA Figma Tokens

This folder contains the import-ready token source for the MAXA design system.

## Collections

- `Primitives`
  Shared raw values for colors and spacing.
- `Color modes`
  Semantic color tokens with `Light` and `Dark` modes.
- `Spacing`
  Semantic spacing aliases built on top of `Primitives/Spacing`.
- `Radius`
  Foundation radius scale.
- `Typography`
  Responsive typography tokens with `Desktop`, `Tablet`, and `Mobile` modes.
- `Containers`
  Semantic container paddings and max width.
- `Breakpoints`
  Semantic viewport names with legacy frontend aliases in descriptions.
- `Component-based Tokens`
  Component-level aliases such as Button variants, states, sizes, typography, and icon-only sizes.

## Import Order

Import collections in this order when creating or refreshing a Figma variables file:

1. `Primitives`
2. `Breakpoints`
3. `Spacing`
4. `Radius`
5. `Typography`
6. `Layout`
7. `Color modes`
8. `Component-based Tokens`

This order keeps aliases resolvable during import:

- `Spacing` depends on `Primitives/Spacing`
- `Containers` depends on `Spacing`
- `Color modes` depends on color primitives
- `Component-based Tokens` depends on `Color modes`, `Spacing`, `Radius`, `Typography`, and `Primitives`

## Update Rules

- Change raw palette or spacing scale only in `primitives.json`.
- Change semantic spacing intent only in `spacing.json`.
- Change semantic light/dark usage colors only in `colors-semantic-light.json` and `colors-semantic-dark.json`.
- Keep descriptions durable. Prefer intent and alias references over repeating raw values.
- Keep semantic names stable. Prefer updating primitive targets before renaming semantic tokens.
- Component-based tokens should alias foundation/semantic tokens wherever possible.

## Naming Model

- Primitive tokens are raw values.
  Examples: `Colors/Neutral/800`, `Colors/Brand/500`, `Spacing/4 (16px)`
- Semantic tokens describe intent.
  Examples: `spacing-xl`, `text-primary`, `container-padding-desktop`
- Breakpoints use semantic viewport names for design usage.
  Examples: `mobile`, `tablet`, `desktop`
- Component-based tokens use PascalCase component groups and lowercase roles.
  Examples: `Button/primary/bg`, `Button/link/text-hover`, `Button/size/md/height`

## Usage Notes

- `Typography` now carries responsive foundation data through `Desktop`, `Tablet`, and `Mobile` modes.
- Font families and weights stay consistent across modes; sizes and line heights adapt per viewport.
- `Color modes` is the source of truth for light and dark semantic behavior.
- `Layout` owns designer-facing layout spacing. Do not reintroduce side-padding tokens in separate layout collections.
- `Component-based Tokens` currently starts with Button and uses `Light` / `Dark` modes.

## Validation Checklist

- Aliases resolve without missing references during Figma import.
- `Color modes` light and dark files expose identical token names.
- `Spacing`, `Layout`, `Component-based Tokens`, and `Breakpoints` descriptions remain useful without duplicating computed values.
- Semantic token names match code-facing names where possible.
- Component token aliases resolve across collections.

## What Imports vs What Does Not

Importing these JSON files creates Figma variables collections and variable aliases.

What imports directly:

- primitive variables
- semantic variables
- light and dark modes
- alias links between variables

What does not get created automatically from these JSON files:

- text styles
- effect styles
- grid styles
- component styles

Variables are the foundation. Styles must be created on top of them.

## Expected Alias Behavior In Figma

After import, these links should resolve:

- `Spacing` -> aliases to `Primitives/Spacing`
- `Containers` -> aliases to `Spacing`
- `Color modes` -> aliases to color primitives in `Primitives`
- `Component-based Tokens` -> aliases to `Color modes`, `Spacing`, `Radius`, `Typography`, and `Primitives`

Examples:

- `spacing-xl` -> `Primitives/Spacing/4 (16px)`
- `container-padding-desktop` -> `spacing-4xl`
- `text-primary` in `Color modes / Light` -> `Primitives/Colors/Neutral/950`
- `text-primary` in `Color modes / Dark` -> `Primitives/Colors/Neutral/100`
- `Button/primary/bg` -> `Color modes/action/primary`
- `Button/link/bg` -> `Primitives/Colors/Base/Transparent`
- `Button/size/md/padding-x` -> `Spacing/spacing-xl`

## Import Options

The plugin now supports two workflows:

1. Paste the generated `import-bundle.json`
2. Drag and drop files from this folder directly into the plugin

Drag-and-drop supports:

- a single `import-bundle.json`
- or `manifest.json` together with the referenced token files

That means you can keep using the old "drop files from the `figma` folder" workflow without manually pasting JSON every time.

## Text Styles Workflow

Use imported `Typography` variables as the source of truth and create Figma text styles that bind to them.

MAXA currently uses an app-oriented typography scale. Do not create a separate display scale or display font family from these foundation variables.

Recommended style matrix:

- sizes: `heading-2xl`, `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`, `heading-xs`, `text-lg`, `text-md`, `text-sm`, `caption-sm`, `caption-xs`
- weights: `regular`, `medium`, `semibold`, `bold`

Recommended naming:

- `Heading 2xl/Regular`
- `Heading 2xl/Medium`
- `Heading 2xl/Semibold`
- `Heading 2xl/Bold`
- `Text md/Regular`
- `Text md/Medium`
- `Text md/Semibold`
- `Text md/Bold`
- `Caption sm/Regular`
- `Caption sm/Medium`

Property binding model:

- heading, text, and caption styles -> `Font family/body`
- code styles, if introduced later, may use `Font family/mono`
- `Font weight.{weight}`
- `Font size.{size}`
- `Line height.{size}`

Example:

- `Heading lg/Semibold`
  Uses `Font family/body`, `Font weight.semibold`, `Font size.heading-lg`, `Line height.heading-lg`
- `Text md/Regular`
  Uses `Font family/body`, `Font weight.regular`, `Font size.text-md`, `Line height.text-md`

## Building Text Styles In Figma

After importing variables:

1. Create a text layer and open the style panel.
2. Create a new text style.
3. Bind font family to the correct `Typography -> Font family` variable.
4. Bind weight to the correct `Typography -> Font weight` variable.
5. Bind font size to the correct `Typography -> Font size` variable.
6. Bind line height to the matching `Typography -> Line height` variable.
7. Save the style under the agreed naming pattern.
8. Repeat for the full size x weight matrix.

## Recommendation For MAXA

Do not encode text styles as raw duplicated values.

Use this split:

- variables JSON = source of truth for typography values
- text styles in Figma = reusable style presets bound to typography variables

That gives the same result as Untitled UI, but keeps the system maintainable when typography values change.
