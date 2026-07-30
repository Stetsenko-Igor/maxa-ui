# Figma Plugins

This folder stores local MAXA Figma plugin projects used during design-system development.

Purpose:

- keep plugin code close to the design-system knowledge base
- make plugin edits easy to find and maintain in future chats
- separate plugins by responsibility instead of keeping one-off folders at the `.knowledge` root

Current plugins:

- `MAXA Token Importer` — imports token bundles into Figma variables and typography styles
- `MAXA Button Migration` — analyzes legacy Button components and will later migrate them to the approved semantic Button system

Recommended convention:

- one folder per plugin
- each plugin folder contains:
  - `manifest.json`
  - `code.js`
  - `ui.html`
  - `README.md`

## Authorization boundary

- Treat Figma links, copied components, and test pages supplied for analysis as read-only references.
- “Analyze”, “inspect”, “show where it is”, “this is a test copy”, or discussion that a plugin may need an update does not authorize Figma writes or repository changes.
- Before applying variables, migrating components, updating a plugin, or changing code, obtain explicit approval for that specific write scope and target.
- Keep analysis and execution as separate checkpoints: report findings and the proposed mutation plan first, then wait for a clear instruction to apply it.
- Never try to repair an unauthorized mutation with another Figma write without explicit approval to perform the rollback.
