"use client"

import {
  Badge,
  Button,
  DataTable,
  Empty,
  type ColumnDef,
} from "@maxa/ui"
import { TableRowActions } from "../_table-row-actions"

type DesignRow = {
  id: string
  design: string
  format: string
  owner: string
  status: "Approved" | "Review" | "Draft" | "Archived"
  due: string
  total: string
}

const DATA: DesignRow[] = [
  {
    id: "1",
    design: "Lunch & Learn postcard",
    format: "Direct mail",
    owner: "Igor Stetsenko",
    status: "Approved",
    due: "Jun 12, 2026",
    total: "$148.00",
  },
  {
    id: "2",
    design: "Market report flyer",
    format: "Flyer",
    owner: "Ava Wilson",
    status: "Review",
    due: "Jun 18, 2026",
    total: "$72.00",
  },
  {
    id: "3",
    design: "Open house social post",
    format: "Social post",
    owner: "Mia Chen",
    status: "Draft",
    due: "Jun 22, 2026",
    total: "$32.00",
  },
  {
    id: "4",
    design: "Listing presentation",
    format: "Presentation",
    owner: "James Wu",
    status: "Approved",
    due: "Jun 24, 2026",
    total: "$210.00",
  },
  {
    id: "5",
    design: "Direct mail campaign",
    format: "Campaign",
    owner: "Nora Lee",
    status: "Archived",
    due: "May 30, 2026",
    total: "$540.00",
  },
  {
    id: "6",
    design: "Seller guide brochure",
    format: "Brochure",
    owner: "Mia Chen",
    status: "Review",
    due: "Jul 01, 2026",
    total: "$184.00",
  },
  {
    id: "7",
    design: "Neighborhood postcard",
    format: "Direct mail",
    owner: "Ava Wilson",
    status: "Draft",
    due: "Jul 04, 2026",
    total: "$96.00",
  },
  {
    id: "8",
    design: "Brand refresh kit",
    format: "Brand kit",
    owner: "Igor Stetsenko",
    status: "Approved",
    due: "Jul 09, 2026",
    total: "$320.00",
  },
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

function AudienceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6.5-5.5h5m-5 4h5m-5 4h5M3.5 19a5.5 5.5 0 0 1 11 0"
      />
    </svg>
  )
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
  {
    key: "design",
    header: "Design",
    sortable: true,
    cellType: "thumbnail",
    cell: (row) => <PreviewCell row={row} />,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    cellType: "badge",
    width: "120px",
  },
  {
    key: "total",
    header: "Total",
    sortable: true,
    align: "right",
    cellType: "numeric",
    width: "96px",
  },
  {
    key: "actions",
    header: "",
    headerType: "empty",
    cellType: "icon-button",
    align: "right",
    cell: () => <TableRowActions menu />,
    width: "112px",
  },
]

const ROW_ID = (row: DesignRow) => row.id
function DemoFrame({ children }: { children: React.ReactNode }) {
  return <div className="docs-datatable-demo">{children}</div>
}

export function DefaultDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={COLUMNS}
        data={DATA.slice(0, 4)}
        rowId={ROW_ID}
        selectable
        caption="Recent design orders"
      />
    </DemoFrame>
  )
}

export function SortableDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={COLUMNS}
        data={DATA.slice(0, 5)}
        rowId={ROW_ID}
        defaultSort={{ key: "design", direction: "ascending" }}
        caption="Sortable design orders"
      />
    </DemoFrame>
  )
}

export function SelectableDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={COLUMNS}
        data={DATA.slice(0, 5)}
        rowId={ROW_ID}
        selectable
        caption="Selectable design orders"
      />
    </DemoFrame>
  )
}

export function PaginationDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowId={ROW_ID}
        pageSize={3}
        caption="Paginated design orders"
      />
    </DemoFrame>
  )
}

export function CellTypesDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={[
          {
            key: "design",
            header: "Thumbnail",
            cellType: "thumbnail",
            cell: (row) => <PreviewCell row={row} />,
            width: "280px",
          },
          {
            key: "status",
            header: "Badge",
            cellType: "badge",
            cell: (row) => <StatusBadge status={row.status} />,
            width: "130px",
          },
          {
            key: "open",
            header: "Button",
            cellType: "button",
            cell: () => (
              <Button size="xs" variant="primary">
                Open
              </Button>
            ),
            width: "96px",
          },
          {
            key: "actions",
            header: "",
            headerType: "empty",
            cellType: "icon-button",
            align: "right",
            cell: () => <TableRowActions menu />,
            width: "112px",
          },
        ]}
        data={DATA.slice(0, 2)}
        rowId={ROW_ID}
        caption="Table cell types"
        density="lg"
      />
    </DemoFrame>
  )
}

export function LoadingDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable columns={COLUMNS} data={[]} loading selectable caption="Loading design orders" />
    </DemoFrame>
  )
}

export function EmptyDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={COLUMNS}
        data={[]}
        emptyState={
          <Empty
            icon={<AudienceIcon />}
            title="You Don't Have Any Mailing List Yet"
            description="Create a new mailing list to unlock MAXA Direct Mail full potential."
            action={
              <Button size="sm" variant="outline">
                Create Mailing List
              </Button>
            }
          />
        }
      />
    </DemoFrame>
  )
}
