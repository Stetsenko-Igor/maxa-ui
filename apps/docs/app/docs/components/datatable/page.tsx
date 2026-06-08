import type { Metadata } from "next"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import {
  DefaultDataTableDemo,
  EmptyDataTableDemo,
  LoadingDataTableDemo,
  PaginationDataTableDemo,
  SelectableDataTableDemo,
  SortableDataTableDemo,
} from "./_demos"

export const metadata: Metadata = { title: "DataTable - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sortable", label: "Sortable" },
  { href: "#selectable", label: "Selectable" },
  { href: "#pagination", label: "Pagination" },
  { href: "#loading", label: "Loading" },
  { href: "#empty", label: "Empty" },
  { href: "#api-reference", label: "API reference" },
]

const DATATABLE_PROPS = [
  {
    name: "columns",
    type: "ColumnDef<T>[]",
    default: undefined,
    description: "Column definitions for headers, optional cell renderers, sorting, and widths.",
  },
  { name: "data", type: "T[]", default: undefined, description: "Client-side row data." },
  { name: "caption", type: "string", default: undefined, description: "Accessible table caption." },
  {
    name: "density",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Passes row density to the Table primitive.",
  },
  {
    name: "defaultSort",
    type: "{ key: string; direction: 'ascending' | 'descending' }",
    default: undefined,
    description: "Initial client-side sort state.",
  },
  {
    name: "selectable",
    type: "boolean",
    default: "false",
    description: "Adds a checkbox column and select-all header control.",
  },
  {
    name: "onSelectionChange",
    type: "(ids: string[]) => void",
    default: undefined,
    description: "Called when selected row IDs change.",
  },
  {
    name: "rowId",
    type: "(row: T, index: number) => string",
    default: "index",
    description: "Stable row identity function.",
  },
  {
    name: "pageSize",
    type: "number",
    default: undefined,
    description: "Enables client-side pagination.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Replaces body rows with skeleton rows.",
  },
  {
    name: "emptyState",
    type: "ReactNode",
    default: "Empty",
    description: "Custom empty state content.",
  },
]

const COLUMN_PROPS = [
  { name: "key", type: "string", default: undefined, description: "Field key on the row object." },
  { name: "header", type: "ReactNode", default: undefined, description: "Column header label." },
  {
    name: "cell",
    type: "(row: T, index: number) => ReactNode",
    default: undefined,
    description: "Optional custom cell renderer.",
  },
  {
    name: "sortable",
    type: "boolean",
    default: "false",
    description: "Enables header sort interaction.",
  },
  {
    name: "width",
    type: "string",
    default: undefined,
    description: "Optional CSS width for the column.",
  },
]

export default function DataTablePage() {
  return (
    <ComponentPage
      title="DataTable"
      lead="A client-side data display layer built on top of Table. DataTable adds sorting, selection, pagination, loading rows, and empty states while keeping Table as the semantic primitive."
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/datatable"
      toc={TOC}
      previous={{ href: "/docs/components/context-menu", label: "Context Menu" }}
      next={{ href: "/docs/components/date-picker", label: "Date Picker" }}
    >
      <DocsSection id="preview" title="Default">
        <ComponentPreview
          layout="block"
          code={`<DataTable
  columns={columns}
  data={data}
  rowId={(row) => row.id}
  caption="Recent design orders"
/>`}
        >
          <DefaultDataTableDemo />
        </ComponentPreview>
      </DocsSection>

      <InstallationBlock
        command="pnpm add @maxa/ui @maxa/tokens"
        imports={`import { DataTable, type ColumnDef } from "@maxa/ui"
import "@maxa/tokens/theme.css"`}
        usage={`const columns: ColumnDef<Row>[] = [
  { key: "design", header: "Design", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
  { key: "status", header: "Status", cell: (row) => <Badge>{row.status}</Badge> },
]

<DataTable columns={columns} data={rows} rowId={(row) => row.id} />`}
      />

      <DocsSection
        id="sortable"
        title="Sortable"
        description="Sortable columns toggle ascending and descending order. One column is active at a time."
      >
        <DocsExample title="Default sort">
          <ComponentPreview
            layout="block"
            code={`<DataTable
  columns={columns}
  data={data}
  defaultSort={{ key: "due", direction: "ascending" }}
/>`}
          >
            <SortableDataTableDemo />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="selectable"
        title="Selectable"
        description="Selectable tables prepend a checkbox column and expose selected row IDs through onSelectionChange."
      >
        <DocsExample title="Rows with checkboxes">
          <ComponentPreview
            layout="block"
            code={`<DataTable
  columns={columns}
  data={data}
  selectable
  onSelectionChange={setSelectedIds}
/>`}
          >
            <SelectableDataTableDemo />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="pagination"
        title="Pagination"
        description="Set pageSize to enable client-side pagination for small in-memory datasets."
      >
        <DocsExample title="Client-side pages">
          <ComponentPreview
            layout="block"
            code={`<DataTable
  columns={columns}
  data={data}
  pageSize={3}
/>`}
          >
            <PaginationDataTableDemo />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="loading"
        title="Loading"
        description="Loading state keeps the header visible and replaces rows with skeleton cells."
      >
        <DocsExample title="Skeleton rows">
          <ComponentPreview
            layout="block"
            code={`<DataTable columns={columns} data={[]} loading />`}
          >
            <LoadingDataTableDemo />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="empty"
        title="Empty"
        description="Empty state appears when data is empty and loading is false."
      >
        <DocsExample title="No results">
          <ComponentPreview layout="block" code={`<DataTable columns={columns} data={[]} />`}>
            <EmptyDataTableDemo />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <DocsExample title="DataTable">
          <PropsTable props={DATATABLE_PROPS} />
        </DocsExample>
        <DocsExample title="ColumnDef">
          <PropsTable props={COLUMN_PROPS} />
        </DocsExample>
      </DocsSection>
    </ComponentPage>
  )
}
