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
