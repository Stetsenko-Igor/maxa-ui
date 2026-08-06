# Table Token Architecture Plan

## Decisions

- Remove the generic `Table/text` component token. It is only a root fallback and does not represent a visible Table content role.
- Keep `Table/cell-text` as the primary text color for body cells, cell titles, and cell icons.
- Keep text roles explicit: `header-text`, `cell-text`, `cell-subtitle-text`, `footer-text`, and `caption-text`.
- Use `caption-text` only for the caption of the whole table.
- Use `cell-subtitle-text` for supporting copy inside a cell. Do not introduce the ambiguous `text-caption` name.
- Follow the repository-wide path grammar documented in `packages/tokens/figma/README.md`: retain stable code-facing prefixes in base semantic families, and use concise property leaves inside contextual and component namespaces.

## Planned row background model

Move base and state backgrounds to the row level so striping and interaction states share one owner:

| Component token | Semantic alias | Purpose |
| --- | --- | --- |
| `Table/row-bg` | `background/bg-surface` | Default row at rest |
| `Table/row-bg-striped` | `background/bg-neutral-surface` | Even/striped row at rest |
| `Table/row-bg-hover` | `action/action-neutral-subtle-hover` | Hovered row |
| `Table/row-bg-selected` | `action/action-primary-subtle` | Selected row |
| `Table/row-bg-selected-hover` | `action/action-primary-subtle-hover` | Selected row on hover |
| `Table/row-bg-subdued` | `background/bg-muted` | Subdued row |

`row-bg-striped` is a resting background. Hover, selected, selected-hover, and subdued states override it.

The intended `background/bg-neutral-surface` mapping for striped rows is `Neutral/50` in Light and `Neutral/925` in Dark. This semantic mapping must be synchronized separately before release if the repository still resolves Dark to another primitive.

Cells should remain transparent when the row owns its background. Retain `Table/cell-bg` only if a real independent cell background is needed, such as a sticky column or an editable cell; otherwise deprecate it after consumers migrate to `Table/row-bg`.

## Figma and repository synchronization

1. Repository: remove `Table/text` from the Table token source and generated import bundle.
2. Figma: remove `Table/text` manually and keep/rebind body content to `Table/cell-text`.
3. Figma: use a local Table Row component as the owner of row backgrounds; keep cell layers transparent.
4. Add the row background tokens only when the row component is ready to consume them.
5. Export Figma variables and run the repository diff before publishing Foundation.
