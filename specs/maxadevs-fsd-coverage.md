# Coverage: @maxa/ui (kit) vs MaxaDevs FSD `@/shared/ui`

This document compares the MAXA UI kit (`@maxa/ui`) against the MaxaDevs product
FSD component inventory (`@/shared/ui/*`) and states the development direction for the
kit. It is a different lens from [core-gap-audit.md](./core-gap-audit.md), which
compares core gaps against generic product *patterns*; this doc compares against the
*actual FSD component set* MaxaDevs maintains.

Operating model: the kit owns tokens and reusable primitives; the FSD layer owns
product-specific and composite components and consumes the kit via npm.

Source of truth for our side: [../packages/ui/src/index.ts](../packages/ui/src/index.ts).
Component capabilities verified in `packages/ui/src/components/*`.

## Our kit today (40 exports)

avatar, spinner, skeleton, progress, slider (range), tabs, segmented-control, table,
breadcrumb, pagination, empty, badge, tag, button, checkbox, icon-button, radio,
date-picker (+ DateRangePicker + QuarterPicker), form-field, file-input, input,
textarea, select, toggle, divider, separator, alert, tooltip, popover, dropdown-menu,
dialog, drawer, alert-dialog, context-menu, calendar, multi-select, social-button,
utility-button, toast, datatable. No orphan (unexported) components.

## A. Covered — FSD can consume the kit directly

| MaxaDevs FSD | Kit equivalent |
|---|---|
| Alert | alert |
| DatePicker / DateRangePicker / MonthsPicker / YearSelector | date-picker (+ DateRangePicker + QuarterPicker) |
| Dropdown / Menu / Select / ContextMenu / SelectionMenu | dropdown-menu, select, context-menu |
| MultiSelectDropdown / CreatableSelect / SearchableSelect | multi-select |
| EmptyData | empty |
| ProgressBar | progress |
| Spinner / Loader / CircleLoader / Preloader | spinner (+ skeleton) |
| Tag / Tags | tag |
| Breadcrumbs | breadcrumb |
| Tooltip / ProTip | tooltip |
| Popup / PopUpModal | popover / dialog |
| Tabs / StatelessTabs / AdminTabs | tabs |
| AdminTable | table / datatable |
| paginator | pagination |
| Checkbox / RadioButton / Toggle | checkbox / radio / toggle |
| ConfirmExitModal / OverwriteConfirmationModal / PropertiesWarnings… | dialog + alert-dialog (instances, not new primitives) |
| Label | form-field (label) |
| Icon / icons / SvgSprites / HamburgerIcon | @maxa/icons (separate package) + icon-button |

## B. Covered with caveats — resolve before adoption

- **Slider — naming clash (critical).** Ours is a numeric range input (Radix). Their
  media `Slider` / `SharedSlider` / `ThumbnailSliderResponsive` is a **carousel**. Same
  name, different component. Decide naming before any FSD code imports `Slider`: either
  keep ours as `Slider` and add a separate `Carousel`, or rename ours `RangeSlider`.
- **Badge consolidation opportunity.** They maintain ~6 badges: CornerBadge, SquareBadge,
  NewBadge, MarkerNew, PartnerBadge (plus RatingStars). Our `Badge` is rich on color
  (18 appearances, intent, emphasis, size) but **pill-only** — no shape/position
  (corner/dot/square) variants (deferred in the badge spec). Adding shape + position
  lets one Badge replace their six.
- **FileInput partial.** Ours is a single-file generic picker — no multi-file, no image
  preview, no drag-and-drop. Their ImageUploader / MultiFileUploader / DropZone need more.
- **ActionLink / LogoutLink** → approximated by button `variant="link"`; a true
  text-link primitive would be a small addition if wanted.
- **ValidationErrorsAlt** → partly covered by alert + form-field errors; no dedicated
  multi-error list component.

## C. Real primitive gaps — kit roadmap

Legitimate design-system primitives the kit lacks and the FSD actively uses:

1. **Card** — no generic Card at all. They have CardMore / PreviewCard / Module /
   marketing cards. Highest value, broadly reusable.
2. **Accordion** — absent (they have Accordion + AdminAccordion).
3. **Carousel** — absent (see Slider clash). Media slider / thumbnails.
4. **Stepper** — StepIndicator + StepNavigation absent.
5. **RatingStars** — absent.
6. **ColorPickerInput** — absent. Heavy in designer flows (ColorPicker, ColorBox,
   FormColorPicker, AdminFormColorPicker, GradientBlock). High demand but borderline
   product-specific — scope decision needed.
7. **CopyField** — absent in the kit (only a docs-internal CopyIconButton exists).
   Cheap to promote to the kit.
8. **TextExpander** (show more / less) — absent. Small.
9. **Filter (generic)** — absent. Their Filter / FilterButton / FilterOverlay /
   PreviewFilter are mostly product, but a generic Filter control could be a primitive.
10. **LayoutSwitcher** — absent; buildable on the existing segmented-control.

## D. Out of kit scope — stays in FSD

Product, composite, and app-shell components remain in the FSD layer:

- Designer / editor internals: DesignerSidebar, DragLayerContent, DraggableBlob,
  DropZone, LayerTreeItem, ContentLibrary, InteractiveTutorial, Tutorials, Landing,
  SortIcon.
- Admin shells: AdminBlock, AdminPage, AdminFilter, AdminSlickSlider.
- Catalog + DimensionFilter.
- Marketing: MarketingPackageCard, MorePackagesCard, Marks, LimitStatus,
  ShareDropdownButton.
- Media embeds: YoutubeVideo (+ Modal), QrCode, ImagePreviewModal, ImageList, Animation.
- App shell: Page, PageHeader, GlowScrollContainer.
- Product wrappers: PdfRenderingLoader, SpinnerWrapper.
- ClickOutside → belongs in `@maxa/hooks`, not `@maxa/ui`.

## What the kit adds beyond the FSD list

Net upgrades the FSD gains by adopting the kit: avatar, skeleton, segmented-control,
toast (unified notifications), alert-dialog, popover, drawer, datatable, social-button,
utility-button, separator + divider, form-field (composition primitive).

## Recommended development direction

1. **Resolve the Slider naming clash** before any FSD imports `Slider`.
2. **Prioritize broad primitives:** Card → Accordion → Stepper → Carousel. These unlock
   the most FSD/product surfaces and are clearly in scope.
3. **Extend Badge** with shape + position to consolidate their six badge variants.
4. **Cheap wins:** promote CopyField to the kit; add RatingStars, TextExpander.
5. **Scope decision needed:** ColorPickerInput + GradientBlock + Filter — primitive in
   the kit, or product in the FSD? (designer-heavy, borderline.)
6. Keep category D in the FSD; do not pull product / app-shell components into the kit.
