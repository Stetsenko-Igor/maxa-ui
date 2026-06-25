# Legacy / FSD Component Migration Matrix

Status: working decision draft  
Created: 2026-06-23  
Source inputs:

- Ilya shared legacy component list and likely `@/shared/ui/*` replacements.
- Prior Claude analysis called out that the list is incomplete and includes both reusable UI and product-specific composites.
- Current MAXA UI implementation: `packages/ui/src/components/`, `packages/ui/src/index.ts`, and `apps/docs/app/docs/components/`.
- Product UI inventory: `~/.claude/knowledge/maxa/ui-inventory.md`.

## Executive Decision

Do not treat Ilya's list as a direct backlog for `@maxa/ui`.

The list mixes four different layers:

1. Core UI primitives that belong in `@maxa/ui`.
2. App-level `@/shared/ui` wrappers that should compose `@maxa/ui`.
3. Product/domain composites that should stay outside the UI kit.
4. Deprecated or legacy-only components that should be removed after consumers migrate.

The recommended architecture is:

| Layer | Ownership | Purpose |
| --- | --- | --- |
| `@maxa/ui` | Design system | Tokenized primitives and common reusable patterns with stable APIs. |
| `@/shared/ui` | Product frontend | Thin app wrappers, product defaults, layout adapters, and migration compatibility. |
| `features/*`, `widgets/*`, `entities/*` | Product frontend | Domain-specific flows and composed product surfaces. |
| Legacy component tree | Product frontend | Migration source only. Freeze new usage and replace incrementally. |

## Current MAXA UI Coverage

`@maxa/ui` currently exports 40 component families:

`Alert`, `AlertDialog`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Calendar`, `Checkbox`, `ContextMenu`, `DataTable`, `DatePicker`, `DateRangePicker`, `QuarterPicker`, `Dialog`, `Divider`, `Drawer`, `DropdownMenu`, `Empty`, `FileInput`, `FormField`, `IconButton`, `Input`, `MultiSelect`, `Pagination`, `Popover`, `Progress`, `Radio`, `SegmentedControl`, `Select`, `Separator`, `Skeleton`, `Slider`, `SocialButton`, `Spinner`, `Table`, `Tabs`, `Tag`, `Textarea`, `Toast`, `Toggle`, `Tooltip`, `UtilityButton`.

This means several "no FSD slice yet" notes from the shared list are already covered by the current package:

- `Checkbox.tsx` -> `Checkbox`
- `Input.tsx` -> `Input`
- `SearchInput.tsx` / `SmallSearchInput.tsx` -> `Input kind="search"` or an app wrapper around it
- `Modal.tsx` -> `Dialog` or `AlertDialog`, depending on intent
- `RadioButton.tsx` / `RadioButtonGroup.tsx` -> `Radio`
- `TextArea.tsx` -> `Textarea`
- `Toggle.tsx` -> `Toggle`
- `DatePicker.js` / `MonthsPickerDropdown` / `YearSelector.tsx` / `ReactDatetimepicker` -> `DatePicker`, `DateRangePicker`, `QuarterPicker`, `Calendar`

## Migration Decision Matrix

### Replace Now With Existing `@maxa/ui`

These legacy/shared components already have a clear target. The app should migrate imports and adapt props through thin wrappers if needed.

| Legacy / FSD source | Recommended target | Notes |
| --- | --- | --- |
| `Button.tsx` | `Button` | Core action primitive. |
| `ButtonDeleteComponent.tsx` | `Button` or `AlertDialog` + `Button` | Use destructive intent only where the action is actually destructive. |
| `Badge.tsx` | `Badge` / `Tag` | Use `Badge` for status/count/metadata, `Tag` for category/removable labels. |
| `Checkbox.tsx`, `CheckboxCounter.tsx` | `Checkbox` + app composition | Counter behavior should stay in app wrapper unless generic. |
| `Input.tsx` | `Input` | Core text/password/search/quantity primitive already exists. |
| `PasswordInput.tsx` | `Input kind="password"` | Keep app wrapper only if product needs special validation/copy. |
| `SearchInput.tsx`, `SmallSearchInput.tsx` | `Input kind="search"` | Use wrapper for default placeholder/size only. |
| `TextArea.tsx` | `Textarea` | Already shipped. |
| `RadioButton.tsx`, `RadioButtonGroup.tsx` | `Radio` | Group API may need app adapter if legacy props differ. |
| `Toggle.tsx` | `Toggle` | Already shipped. |
| `Label.tsx`, `Form.tsx` | `FormField` + native form | Do not create a generic form framework in `@maxa/ui` yet. |
| `ValidationErrors.tsx` | `FormField`, `Alert`, or app `ValidationErrors` | Field-level errors belong in `FormField`; page-level error lists can stay app-level. |
| `DatePicker.js` | `DatePicker` | Already shipped. |
| `MonthsPickerDropdown`, `YearSelector.tsx`, `ReactDatetimepicker` | `DatePicker`, `DateRangePicker`, `QuarterPicker`, `Calendar` | Pick by user intent, not by old component name. |
| `Dropdown.tsx`, `Menu.tsx`, `ExportDesignDropdown.tsx`, `SelectionMenu` | `DropdownMenu` | For actions/navigation. |
| `Select`, `SelectButton`, `SearchableSelect.js` | `Select` or `MultiSelect` | Use `Select` for one persisted value, `MultiSelect` for multiple values. |
| `CreatableSelect.tsx` | `MultiSelect` + app create behavior | Creatable behavior may need product wrapper first. |
| `ContextMenu.tsx` | `ContextMenu` or `DropdownMenu` | Use `ContextMenu` only for right-click/context-trigger behavior. |
| `Popup.tsx`, `PopUpModal.tsx` | `Popover`, `Dialog`, or `AlertDialog` | Choose by modality and risk level. |
| `Modal.tsx` | `Dialog` or `AlertDialog` | Already covered; use `Drawer` for side-panel modal. |
| `Preloader.js`, `Spinner.tsx` | `Spinner`, `Skeleton`, `Progress` | Choose by loading pattern. |
| `ProgressBar.js` | `Progress` | Already shipped. |
| `EmptyDataSet.tsx` | `Empty` | Already shipped. |
| `Tooltip.tsx`, `ProTip.tsx` | `Tooltip` | `Tooltip` must stay non-interactive. Interactive help belongs in `Popover`. |
| `RangeBox.tsx`, `SliderBox.tsx` | `Slider` | Already shipped. |
| `Tabs`, `StatelessTabs` | `Tabs` | Admin-specific styling belongs in wrapper if needed. |
| `Tags` | `Tag` | Already shipped. |
| `paginator` | `Pagination` | Already shipped. |
| `Table`-like row/cell actions | `Table`, `DataTable`, `UtilityButton` | Keep server pagination/filtering app-level. |

### Add Or Promote To `@maxa/ui`

These appear reusable enough to consider as future design-system work, but each needs a spec before implementation.

| Candidate | Priority | Proposed package target | Why |
| --- | --- | --- | --- |
| `ColorPicker`, `ColorBox`, `ColorPickerDropdown`, `FormColorPicker.tsx`, `AdminFormColorPicker.tsx` | P0 if active in Designer/Admin | `ColorPickerInput` | Real product color editing exists in Designer-like surfaces; should be tokenized and consistent. |
| `AdminFormGradient.tsx` | P1 | `GradientBlock` or app pattern | Add to UI kit only if reused outside admin forms. |
| `CopyField` from Claude category | P1 | `CopyField` | Common developer/admin utility; likely compose `Input` + `UtilityButton`. |
| `Sort` from Claude category | P1 | `SortSelect` app wrapper or `Select` example | Do not add a new primitive unless behavior differs from `Select`/`DropdownMenu`. |
| `Accordion.tsx` | P1/P2 conditional | `Accordion` | Previously deferred, but Ilya's list shows real usage. Add only after usage audit confirms it is not a one-off. |
| `Loader`, `CircleLoader`, `SpinnerWrapper`, `PdfRenderingLoader` | P1 | `Spinner`/`Progress` wrappers or `Loader` pattern | Prefer wrappers and docs examples first; add primitive only if current primitives cannot express it. |
| `ActionLink`, `LogoutLink.tsx` | P2 | `ActionLink` | Useful if product has repeated link-as-command styling. Otherwise use `Button`/anchor composition. |
| `StepIndicator`, `StepNavigation` | P2 | Product pattern | Useful for guided flows, but should start as pattern documentation. |
| `ImageUploader`, `MultiFileUploader`, `ImagePreviewModal` | P1 product pattern | Upload pattern built on `FileInput`, `Dialog`, `Button` | Product-specific behavior is likely too rich for a primitive. |
| `QrCode`, `YoutubeVideo`, `YoutubeVideoModal` | P2 | App-level utilities | Add to UI kit only if used across multiple product areas. |

### Keep Out Of `@maxa/ui`

These are product/domain composites or editor/admin internals. They can use `@maxa/ui`, but should not become public design-system primitives.

| Legacy / FSD source | Recommended home | Reason |
| --- | --- | --- |
| `AudioPlayer` | Feature/widget | Media-specific product behavior. |
| `AuthTokenInput.js` | Feature/auth or admin | Security/product-specific. |
| `CaptionSuggestion.tsx` | Feature/editor or AI flow | Domain behavior. |
| `ChatGPTDialog` | Feature/AI | Product-specific AI interaction. |
| `CustomFieldsForm` | Feature/entity form | Domain schema behavior. |
| `DesignPreview.js` | Entity/widget | Product card/preview behavior. |
| `ErrorReportForm.js` | Feature/support | Product workflow. |
| `ImageList`, `StackImagesPreview`, `ThumbnailSliderResponsive` | Product media pattern | May share primitives, but public API depends on product assets. |
| `Layers`, `Tree`, `LayerTreeItem`, `DragLayerContent`, `DraggableBlob`, `DropZone` | Designer/editor internals | Editor-specific. |
| `LoginDetails` | Auth feature | Product auth copy/behavior. |
| `MarketingPackages`, `MarketingPackageCard`, `MorePackagesCard` | Product entities/widgets | Product domain. |
| `OptimalBlue`, `PaymentForm`, `Print` | Product/integration features | Integration-specific. |
| `PreviewFilter`, `Catalog`, `DimensionFilter`, `Filter`, `FilterButton`, `FilterOverlay` | Product catalog/filter patterns | Build app patterns; do not make generic before product audit. |
| `Sidebar.tsx`, `DesignerSidebar` | Product navigation/editor pattern | Not a generic sidebar primitive yet. |
| `Testimonials`, `TextList`, `Marquee.tsx` | Marketing/product content | Not core UI. |
| `AdminAccordion`, `AdminBlock`, `AdminFilter`, `AdminPage`, `AdminSlickSlider`, `AdminTable`, `AdminTabs` | Admin layer | Compose `@maxa/ui`; keep admin semantics outside the design-system package. |
| `ClickOutside` / `OutsideClick.js` | Hook/renderless utility | Prefer a hook or internal utility, not a visible component story. |
| `animations`, `icons`, `SvgSprites.tsx`, `HamburgerIcon.js` | Icons/motion packages | Keep in `@maxa/icons` or motion utilities, not `@maxa/ui` component backlog. |

### Deprecate After Consumer Migration

| Legacy source | Decision |
| --- | --- |
| `ModalDeprecated.tsx` | Freeze new usage, migrate to `Dialog` / `AlertDialog` / `Drawer`, then remove. |
| `SelectDeprecated` | Freeze new usage, migrate to `Select`, `MultiSelect`, or `DropdownMenu` by intent. |
| `TabsDeprecated` | Freeze new usage, migrate to `Tabs`, then remove. |

## Import Strategy

Do not do a big-bang replacement from legacy components to `@maxa/ui`.

Recommended migration sequence:

1. Create app-level adapters in `@/shared/ui` for high-traffic components.
2. Keep old prop names in adapters where needed.
3. Internally render `@maxa/ui`.
4. Migrate consumers feature by feature.
5. Remove adapters only when product code no longer depends on legacy props.

Example:

```tsx
// app/shared/ui/Button.tsx
export function Button(props: LegacyButtonProps) {
  return <MaxaButton {...mapLegacyButtonProps(props)} />
}
```

This lets the product move safely while the design system API stays clean.

## First Implementation Tranche

Start with components that are high reuse, low domain coupling, and close to existing primitives:

1. `ColorPickerInput`
   - Audit all color picker variants first.
   - Confirm whether gradient editing is part of the same API or a separate pattern.
   - Build only after Figma/product states are known.

2. `CopyField`
   - Compose `Input` + `UtilityButton`.
   - Include copied/idle states and accessible announcement.

3. `SearchInput` app adapter
   - Do not add a new `@maxa/ui` primitive yet.
   - Wrap `Input kind="search"` with product defaults.

4. `Sort` app adapter
   - Use `Select` if it stores a selected sort value.
   - Use `DropdownMenu` if it triggers immediate commands.

5. `Accordion`
   - Run usage audit first.
   - Add to `@maxa/ui` only if it appears in reusable settings/admin/help surfaces.

6. Loading wrappers
   - Keep `Spinner`, `Progress`, and `Skeleton` as primitives.
   - Add product examples/wrappers for PDF rendering and full-page loading before adding a new primitive.

## Questions For Ilya / Product Frontend

Ask these before implementation starts:

1. Which legacy components are still imported in active routes?
2. Which `@/shared/ui` components already exist today, and which are planned?
3. Which wrappers have non-standard props that cannot map cleanly to `@maxa/ui`?
4. Are `ColorPickerInput`, `GradientBlock`, and Designer color controls shared across Admin and Designer, or only one area?
5. Is `Accordion` used in production flows often enough to promote, or is it a one-off?
6. Which deprecated components still have consumers?
7. Should `@/shared/ui` be a long-term app facade over `@maxa/ui`, or a temporary migration layer?

## Risks

- Mapping by component name can be wrong: `Dropdown`, `Menu`, `Select`, and `ContextMenu` may look similar but have different interaction models.
- Moving product composites into `@maxa/ui` will make the design system harder to maintain and less reusable.
- Skipping app adapters will force all product consumers to adopt new APIs at once.
- Adding `Accordion`, generic `Card`, or generic `Sidebar` too early can conflict with existing MAXA product patterns.
- Deleting deprecated components before usage audit can break old routes that are not covered by current docs tests.

## Recommended Next Step

Run a product-repo usage audit for all 87 legacy entries:

```bash
rg -n "from ['\"].*(Accordion|AdminFormColorPicker|ColorPicker|ModalDeprecated|SelectDeprecated|TabsDeprecated|DatePicker|Dropdown|Select|Tooltip|Spinner|TextArea|Toggle)" <product-repo>
```

Then update this matrix with real import counts:

| Component | Import count | Active route evidence | Decision owner | Migration phase |
| --- | ---: | --- | --- | --- |

Until that import-count pass is done, the safe working decision is:

- Migrate obvious primitives through `@/shared/ui` adapters.
- Add only `ColorPickerInput`, `CopyField`, and possibly `Accordion` after usage/design audit.
- Keep product/editor/admin composites out of `@maxa/ui`.
