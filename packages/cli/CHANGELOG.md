# @maxa/cli

## 0.0.1

### Patch Changes

- Audit remediation and MCP v1.
  - @maxa/mcp: implement v1 stdio MCP server (maxa-design-system) with read-only tools `list_components`, `get_component_spec`, `search_tokens`, `get_token`; adds `maxa-mcp` bin.
  - @maxa/tokens: new component tokens for calendar (nav/title icon sizes, day font, focus ring width), date-picker (more icon, more-menu min width, quarter icon), datatable (empty min height); eliminates all hardcoded px violations.
  - @maxa/ui: calendar, date-picker, datatable CSS now consume the new tokens; Calendar, FormField, MultiSelect, SocialButton, DataTable wrapped in forwardRef; deeper interaction tests for DataTable, DatePicker, MultiSelect.
  - @maxa/cli: marked experimental stub in package description.

- [`bb23319`](https://github.com/Stetsenko-Igor/maxa-ui/commit/bb23319b79ba146935976df57c2bd9e46a5ef5c4) Thanks [@kupa-maxa](https://github.com/kupa-maxa)! - Add DataTable as the client-side data display layer on top of Table. Includes sorting, row selection, pagination, loading skeleton rows, empty states, component tokens, Figma variable files, docs, specs, and tests.

  Prepare UI and token packages for future npm distribution by switching package exports to built `dist` entries, preserving CSS side effects, cleaning stale build output before each package build, copying CSS assets into `dist`, and widening React peer compatibility to React 17, 18, and 19.
