# @maxa/ui

## 0.1.0

### Minor Changes

- Audit remediation and MCP v1.
  - @maxa/mcp: implement v1 stdio MCP server (maxa-design-system) with read-only tools `list_components`, `get_component_spec`, `search_tokens`, `get_token`; adds `maxa-mcp` bin.
  - @maxa/tokens: new component tokens for calendar (nav/title icon sizes, day font, focus ring width), date-picker (more icon, more-menu min width, quarter icon), datatable (empty min height); eliminates all hardcoded px violations.
  - @maxa/ui: calendar, date-picker, datatable CSS now consume the new tokens; Calendar, FormField, MultiSelect, SocialButton, DataTable wrapped in forwardRef; deeper interaction tests for DataTable, DatePicker, MultiSelect.
  - @maxa/cli: marked experimental stub in package description.

- [`7497e40`](https://github.com/Stetsenko-Igor/maxa-ui/commit/7497e4087b1dd8105c2ac29e63a143cbcfe6e433) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add Popover component with Radix-backed compound API, component tokens, docs, tests, and Figma bundle entries.

- [`74d5909`](https://github.com/Stetsenko-Igor/maxa-ui/commit/74d590999064462c05375454d7c0c29d860cd652) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add foreground color tokens, status color primitives, shadow token exports, and token graph validation for CSS and Figma aliases.

  Expose `foreground` on base token primitives for icon and non-text foreground color use cases.

- [`bb23319`](https://github.com/Stetsenko-Igor/maxa-ui/commit/bb23319b79ba146935976df57c2bd9e46a5ef5c4) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add DataTable as the client-side data display layer on top of Table. Includes sorting, row selection, pagination, loading skeleton rows, empty states, component tokens, Figma variable files, docs, specs, and tests.

  Prepare UI and token packages for future npm distribution by switching package exports to built `dist` entries, preserving CSS side effects, cleaning stale build output before each package build, copying CSS assets into `dist`, and widening React peer compatibility to React 17, 18, and 19.

- [`e417b28`](https://github.com/Stetsenko-Igor/maxa-ui/commit/e417b28b3866ee7cd373f34ae00b454c88bbc26c) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add DropdownMenu and Avatar primitives with component tokens, docs, and Figma variable files. Add the first benchmark-parity bulk pack: Spinner, Skeleton, Progress, Tabs, Breadcrumb, Pagination, and Empty with component tokens, specs, docs, and accessibility tests.

- [`4188e8a`](https://github.com/Stetsenko-Igor/maxa-ui/commit/4188e8afb0ed76182dc27ae97dfea23b4b7c6ff4) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add Badge component with intent × emphasis × size matrix; add muted intent-bg tier

- [`19a0f50`](https://github.com/Stetsenko-Igor/maxa-ui/commit/19a0f509ebff3ac8f7ca432a935ca7e3f603a286) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add Alert, Divider, Toggle, and Tooltip components with matching component tokens and Figma bundle entries.

- [`9c31898`](https://github.com/Stetsenko-Igor/maxa-ui/commit/9c3189857dd3ca7acad9edf006e60188326fe32b) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Align Radio and Checkbox with the Figma label anatomy: top label, side label, helper description, one md visual size, Figma-matching disabled/error colors, and component token bundle entries.

- [`5ee6502`](https://github.com/Stetsenko-Igor/maxa-ui/commit/5ee6502d0f7c8685b09233ef2c006bbb45d5a817) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add Toast component built on @radix-ui/react-toast. Includes ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastAction, ToastClose, Toaster, and useToast hook. Five intent variants (neutral/info/success/warning/error) with left accent stripe, auto-dismiss, pause-on-hover, swipe-to-dismiss, and full accessibility via Radix.

- [#1](https://github.com/Stetsenko-Igor/maxa-ui/pull/1) [`c89a07a`](https://github.com/Stetsenko-Igor/maxa-ui/commit/c89a07ae8cb0655614fe466a6a285cad84755b8a) Thanks [@Stetsenko-Igor](https://github.com/Stetsenko-Igor)! - Add Tag component — removable data label with 14-color appearance palette

- [`e75f057`](https://github.com/Stetsenko-Igor/maxa-ui/commit/e75f0571b37617c2658d6f3529e328c5a1f1e802) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Rename Switch to Toggle, keep a single md visual size, and align Toggle with the Figma label anatomy: top label, side label, helper description, disabled colors, and matching component token bundle entries.

### Patch Changes

- [`63dd91d`](https://github.com/Stetsenko-Igor/maxa-ui/commit/63dd91de596cf0c1245041370394a6184c04b98c) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Align Alert visuals and Figma component tokens with the reusable Alert component design.

- [`b95f5dc`](https://github.com/Stetsenko-Igor/maxa-ui/commit/b95f5dc29a69e7b6d1d66cf4465fcbfe552c88d9) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Post-stabilization quality fixes: Figma token type sanity (number vs string), CSS token corrections for checkbox, radio, multi-select, utility-button, dialog, date-picker, select. Token audit script enhanced with Figma type validation.

- Updated dependencies [[`7497e40`](https://github.com/Stetsenko-Igor/maxa-ui/commit/7497e4087b1dd8105c2ac29e63a143cbcfe6e433), [`74d5909`](https://github.com/Stetsenko-Igor/maxa-ui/commit/74d590999064462c05375454d7c0c29d860cd652), [`63dd91d`](https://github.com/Stetsenko-Igor/maxa-ui/commit/63dd91de596cf0c1245041370394a6184c04b98c), [`bb23319`](https://github.com/Stetsenko-Igor/maxa-ui/commit/bb23319b79ba146935976df57c2bd9e46a5ef5c4), [`e417b28`](https://github.com/Stetsenko-Igor/maxa-ui/commit/e417b28b3866ee7cd373f34ae00b454c88bbc26c), [`4188e8a`](https://github.com/Stetsenko-Igor/maxa-ui/commit/4188e8afb0ed76182dc27ae97dfea23b4b7c6ff4), [`b95f5dc`](https://github.com/Stetsenko-Igor/maxa-ui/commit/b95f5dc29a69e7b6d1d66cf4465fcbfe552c88d9), [`19a0f50`](https://github.com/Stetsenko-Igor/maxa-ui/commit/19a0f509ebff3ac8f7ca432a935ca7e3f603a286), [`9c31898`](https://github.com/Stetsenko-Igor/maxa-ui/commit/9c3189857dd3ca7acad9edf006e60188326fe32b), [`3cd1c5b`](https://github.com/Stetsenko-Igor/maxa-ui/commit/3cd1c5bc1c9f0913f7c8cc32226ec02ca2e05f70), [`5ee6502`](https://github.com/Stetsenko-Igor/maxa-ui/commit/5ee6502d0f7c8685b09233ef2c006bbb45d5a817), [`c89a07a`](https://github.com/Stetsenko-Igor/maxa-ui/commit/c89a07ae8cb0655614fe466a6a285cad84755b8a), [`e75f057`](https://github.com/Stetsenko-Igor/maxa-ui/commit/e75f0571b37617c2658d6f3529e328c5a1f1e802)]:
  - @maxa/tokens@0.1.0
