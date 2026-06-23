"use client"

import { Badge, DataTable, type ColumnDef } from "@maxa/ui"
import { TableRowActions } from "../_table-row-actions"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type DesignRow = {
  id: string
  design: string
  format: string
  status: "Approved" | "Review" | "Draft" | "Archived"
  total: string
}

const DATA: DesignRow[] = [
  { id: "1", design: "Lunch & Learn postcard", format: "Direct mail", status: "Approved", total: "$148.00" },
  { id: "2", design: "Market report flyer", format: "Flyer", status: "Review", total: "$72.00" },
  { id: "3", design: "Open house social post", format: "Social post", status: "Draft", total: "$32.00" },
  { id: "4", design: "Listing presentation", format: "Presentation", status: "Approved", total: "$210.00" },
  { id: "5", design: "Direct mail campaign", format: "Campaign", status: "Archived", total: "$540.00" },
  { id: "6", design: "Seller guide brochure", format: "Brochure", status: "Review", total: "$184.00" },
]

function StatusBadge({ status }: { status: DesignRow["status"] }) {
  const intent =
    status === "Approved"
      ? "success"
      : status === "Review"
        ? "warning"
        : status === "Archived"
          ? "neutral"
          : "info"
  return <Badge intent={intent}>{status}</Badge>
}

function PreviewCell({ row }: { row: DesignRow }) {
  return (
    <span className="maxa-table__cell-content">
      <span className="maxa-table__thumbnail" aria-hidden="true" />
      <span className="maxa-table__cell-stack">
        <span className="maxa-table__cell-title">{row.design}</span>
        <span className="maxa-table__cell-subtitle">{row.format}</span>
      </span>
    </span>
  )
}

const COLUMNS: ColumnDef<DesignRow>[] = [
  { key: "design", header: "Design", sortable: true, cellType: "thumbnail", cell: (row) => <PreviewCell row={row} /> },
  { key: "status", header: "Status", cellType: "badge", width: "120px", cell: (row) => <StatusBadge status={row.status} /> },
  { key: "total", header: "Total", sortable: true, align: "right", cellType: "numeric", width: "96px" },
  {
    key: "actions",
    header: "",
    headerType: "empty",
    cellType: "icon-button",
    align: "right",
    width: "112px",
    cell: () => <TableRowActions menu />,
  },
]

const ROW_ID = (row: DesignRow) => row.id

type Density = "sm" | "md" | "lg"

const DATATABLE_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "density",
      options: [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
      ],
      default: "md",
    },
    { type: "boolean", name: "selectable", default: true },
    { type: "boolean", name: "sortable", label: "default sort", default: false },
    { type: "boolean", name: "paginate", label: "paginate (3/page)", default: false },
    { type: "boolean", name: "loading", default: false },
  ],
  render: (v: PlaygroundValues) => {
    const paginate = v.paginate as boolean
    return (
      <div className="docs-datatable-demo" style={{ width: "100%", maxWidth: "640px" }}>
        <DataTable
          columns={COLUMNS}
          data={v.loading ? [] : DATA}
          rowId={ROW_ID}
          caption="Recent design orders"
          density={v.density as Density}
          selectable={v.selectable as boolean}
          loading={v.loading as boolean}
          {...(v.sortable ? { defaultSort: { key: "design", direction: "ascending" as const } } : {})}
          {...(paginate ? { pageSize: 3 } : {})}
        />
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`columns={columns}`, v.loading ? `data={[]}` : `data={data}`, `rowId={(row) => row.id}`]
    attrs.push(`density="${v.density}"`)
    if (v.selectable) attrs.push("selectable")
    if (v.sortable) attrs.push(`defaultSort={{ key: "design", direction: "ascending" }}`)
    if (v.paginate) attrs.push("pageSize={3}")
    if (v.loading) attrs.push("loading")
    return `<DataTable\n  ${attrs.join("\n  ")}\n/>`
  },
}

export function DataTableDefaultPreview() {
  return (
    <ComponentPreview
      layout="block"
      code={`<DataTable
  columns={columns}
  data={data}
  rowId={(row) => row.id}
  caption="Recent design orders"
/>`}
      playground={DATATABLE_PLAYGROUND}
    >
      <div className="docs-datatable-demo">
        <DataTable
          columns={COLUMNS}
          data={DATA.slice(0, 4)}
          rowId={ROW_ID}
          selectable
          caption="Recent design orders"
        />
      </div>
    </ComponentPreview>
  )
}
