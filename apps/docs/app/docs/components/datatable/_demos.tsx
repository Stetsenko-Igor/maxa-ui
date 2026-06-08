"use client"

import { Badge, DataTable, type ColumnDef } from "@maxa/ui"

type DesignRow = {
  id: string
  design: string
  owner: string
  status: "Approved" | "Review" | "Draft" | "Archived"
  due: string
  total: string
}

const DATA: DesignRow[] = [
  {
    id: "1",
    design: "Lunch & Learn postcard",
    owner: "Igor Stetsenko",
    status: "Approved",
    due: "Jun 12, 2026",
    total: "$148.00",
  },
  {
    id: "2",
    design: "Market report flyer",
    owner: "Ava Wilson",
    status: "Review",
    due: "Jun 18, 2026",
    total: "$72.00",
  },
  {
    id: "3",
    design: "Open house social post",
    owner: "Mia Chen",
    status: "Draft",
    due: "Jun 22, 2026",
    total: "$32.00",
  },
  {
    id: "4",
    design: "Listing presentation",
    owner: "James Wu",
    status: "Approved",
    due: "Jun 24, 2026",
    total: "$210.00",
  },
  {
    id: "5",
    design: "Direct mail campaign",
    owner: "Nora Lee",
    status: "Archived",
    due: "May 30, 2026",
    total: "$540.00",
  },
  {
    id: "6",
    design: "Seller guide brochure",
    owner: "Mia Chen",
    status: "Review",
    due: "Jul 01, 2026",
    total: "$184.00",
  },
  {
    id: "7",
    design: "Neighborhood postcard",
    owner: "Ava Wilson",
    status: "Draft",
    due: "Jul 04, 2026",
    total: "$96.00",
  },
  {
    id: "8",
    design: "Brand refresh kit",
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

const COLUMNS: ColumnDef<DesignRow>[] = [
  { key: "design", header: "Design", sortable: true, width: "240px" },
  { key: "owner", header: "Owner", sortable: true, width: "180px" },
  {
    key: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    width: "130px",
  },
  { key: "due", header: "Due", sortable: true, width: "140px" },
  { key: "total", header: "Total", sortable: true, width: "120px" },
]

const ROW_ID = (row: DesignRow) => row.id

function DemoFrame({ children }: { children: React.ReactNode }) {
  return <div style={{ width: "100%", maxWidth: "860px", overflowX: "auto" }}>{children}</div>
}

export function DefaultDataTableDemo() {
  return (
    <DemoFrame>
      <DataTable
        columns={COLUMNS}
        data={DATA.slice(0, 4)}
        rowId={ROW_ID}
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
        defaultSort={{ key: "due", direction: "ascending" }}
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
      <DataTable columns={COLUMNS} data={[]} caption="Empty design orders" />
    </DemoFrame>
  )
}
