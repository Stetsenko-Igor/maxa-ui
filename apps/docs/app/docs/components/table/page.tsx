import type { Metadata } from "next"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  Input,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
} from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { TableRowActions } from "../_table-row-actions"

export const metadata: Metadata = { title: "Table - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#cells", label: "Cells" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  {
    name: "Table",
    type: "table",
    default: undefined,
    description: "Responsive wrapper and semantic table element.",
  },
  {
    name: "density",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "Controls row height and vertical cell padding.",
  },
  {
    name: "TableRow",
    type: "tr",
    default: undefined,
    description: "Semantic row part. Use selected, subdued, and interactive for row state styling.",
  },
  {
    name: "selected",
    type: "boolean",
    default: "false",
    description: "Applies selected row background.",
  },
  {
    name: "subdued",
    type: "boolean",
    default: "false",
    description: "Applies subdued row background.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    description: "Enables hover styling for clickable rows.",
  },
  {
    name: "TableHead",
    type: "th",
    default: undefined,
    description: "Header cell. Use align and sort for numeric or sortable columns.",
  },
  {
    name: "headerType",
    type: "'empty' | 'heading' | 'sort' | 'numeric' | 'checkbox'",
    default: "derived",
    description: "Header semantic variant from the Figma table header cell set.",
  },
  {
    name: "sort",
    type: "'ascending' | 'descending' | 'none'",
    default: undefined,
    description: "Displays a sort indicator and sets aria-sort.",
  },
  {
    name: "TableCell",
    type: "td",
    default: undefined,
    description:
      "Body/footer cell. Compose with Badge, Tag, Avatar, Button, Checkbox, or Spinner as needed.",
  },
  {
    name: "cellType",
    type: "'checkbox' | 'text' | 'numeric' | 'thumbnail' | 'badge' | 'tag' | 'link' | 'button' | 'icon-button' | 'icon' | 'avatar' | 'input' | 'input-field' | 'loader'",
    default: "'text'",
    description: "Cell semantic variant from the Figma table cell set.",
  },
  {
    name: "cellSize",
    type: "'sm' | 'lg'",
    default: "density",
    description: "Overrides the cell height to the Figma small (40px) or large (64px) size.",
  },
  {
    name: "align",
    type: "'left' | 'center' | 'right'",
    default: "'left'",
    description: "Aligns header or cell content.",
  },
]

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 2.25 11.8 7.2l4.95 1.8-4.95 1.8L10 15.75 8.2 10.8 3.25 9l4.95-1.8L10 2.25Z"
      />
    </svg>
  )
}

function renderCellVariant(
  type:
    | "checkbox"
    | "text"
    | "numeric"
    | "thumbnail"
    | "tag"
    | "link"
    | "button"
    | "icon-button"
    | "icon"
    | "avatar"
    | "input-field"
    | "loader",
) {
  switch (type) {
    case "checkbox":
      return <Checkbox aria-label="Select example row" />
    case "text":
      return (
        <span className="maxa-table__cell-stack">
          <span className="maxa-table__cell-title">Content</span>
          <span className="maxa-table__cell-subtitle">Sub content</span>
        </span>
      )
    case "numeric":
      return "$148.00"
    case "thumbnail":
      return (
        <span className="maxa-table__cell-content">
          <span className="maxa-table__thumbnail" aria-hidden="true" />
          <span className="maxa-table__cell-title">Preview</span>
        </span>
      )
    case "tag":
      return <Tag>VIP</Tag>
    case "link":
      return <a href="#api-reference">View details</a>
    case "button":
      return (
        <Button size="sm" variant="outline">
          Open
        </Button>
      )
    case "icon-button":
      return <TableRowActions />
    case "icon":
      return (
        <span className="maxa-table__cell-icon" aria-hidden="true">
          <SparkIcon />
        </span>
      )
    case "avatar":
      return (
        <span className="maxa-table__cell-content">
          <Avatar size="sm">
            <AvatarFallback>IS</AvatarFallback>
          </Avatar>
          <span className="maxa-table__cell-title">Igor</span>
        </span>
      )
    case "input-field":
      return <Input size="sm" placeholder="Any" aria-label="Example input" wrapperClassName="docs-table-input" />
    case "loader":
      return <span className="maxa-table__loader" />
  }
}

const CELL_VARIANTS = [
  { label: "Checkbox", cellType: "checkbox" },
  { label: "Text", cellType: "text" },
  { label: "Numeric text", cellType: "numeric" },
  { label: "Thumbnail / Preview", cellType: "thumbnail" },
  { label: "Tag / Badge", cellType: "tag" },
  { label: "Link", cellType: "link" },
  { label: "Button", cellType: "button" },
  { label: "Icon Button", cellType: "icon-button" },
  { label: "Icon", cellType: "icon" },
  { label: "Avatar", cellType: "avatar" },
  { label: "Input Field", cellType: "input-field" },
  { label: "Loader", cellType: "loader" },
] as const

function ExampleTable() {
  return (
    <Table className="docs-product-table-example" style={{ minWidth: 0 }}>
      <colgroup>
        <col style={{ width: "44px" }} />
        <col />
        <col style={{ width: "120px" }} />
        <col style={{ width: "96px" }} />
        <col style={{ width: "112px" }} />
      </colgroup>
      <TableCaption>Recent design orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col" headerType="checkbox">
            <Checkbox aria-label="Select all design orders" />
          </TableHead>
          <TableHead scope="col">Design</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col" align="right" headerType="numeric" sort="descending">
            Total
          </TableHead>
          <TableHead scope="col" headerType="empty" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell cellType="checkbox">
            <Checkbox aria-label="Select Lunch & Learn postcard" />
          </TableCell>
          <TableCell cellType="thumbnail">
            <span className="maxa-table__cell-content">
              <span className="maxa-table__thumbnail" aria-hidden="true" />
              <span className="maxa-table__cell-stack">
                <span className="maxa-table__cell-title">Lunch & Learn postcard</span>
                <span className="maxa-table__cell-subtitle">Direct mail</span>
              </span>
            </span>
          </TableCell>
          <TableCell cellType="badge">
            <Badge intent="success">Approved</Badge>
          </TableCell>
          <TableCell align="right" cellType="numeric">
            $148.00
          </TableCell>
          <TableCell cellType="icon-button">
            <TableRowActions />
          </TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell cellType="checkbox">
            <Checkbox aria-label="Select Market report flyer" />
          </TableCell>
          <TableCell cellType="thumbnail">
            <span className="maxa-table__cell-content">
              <span className="maxa-table__thumbnail" aria-hidden="true" />
              <span className="maxa-table__cell-stack">
                <span className="maxa-table__cell-title">Market report flyer</span>
                <span className="maxa-table__cell-subtitle">Flyer</span>
              </span>
            </span>
          </TableCell>
          <TableCell cellType="badge">
            <Badge intent="warning">Review</Badge>
          </TableCell>
          <TableCell align="right" cellType="numeric">
            $72.00
          </TableCell>
          <TableCell cellType="icon-button">
            <TableRowActions />
          </TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell cellType="checkbox">
            <Checkbox aria-label="Select Open house social post" />
          </TableCell>
          <TableCell cellType="thumbnail">
            <span className="maxa-table__cell-content">
              <span className="maxa-table__thumbnail" aria-hidden="true" />
              <span className="maxa-table__cell-stack">
                <span className="maxa-table__cell-title">Open house social post</span>
                <span className="maxa-table__cell-subtitle">Social post</span>
              </span>
            </span>
          </TableCell>
          <TableCell cellType="badge">
            <Badge>Draft</Badge>
          </TableCell>
          <TableCell align="right" cellType="numeric">
            $32.00
          </TableCell>
          <TableCell cellType="icon-button">
            <TableRowActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default function TablePage() {
  return (
    <ComponentPage
      title="Table"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/table"
      markdown=""
      previous={{ href: "/docs/components/tabs", label: "Tabs" }}
      next={{ href: "/docs/components/tag", label: "Tag" }}
      lead="Semantic table primitives for dense product records. Rows are public semantic parts; data-table behavior belongs to a future DataTable layer."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview
            layout="block"
            code={`<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead headerType="checkbox"><Checkbox aria-label="Select all" /></TableHead>\n      <TableHead>Design</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead align="right" sort="descending">Total</TableHead>\n      <TableHead headerType="empty" />\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow interactive>\n      <TableCell cellType="checkbox"><Checkbox aria-label="Select row" /></TableCell>\n      <TableCell>Lunch & Learn postcard</TableCell>\n      <TableCell><Badge intent="success">Approved</Badge></TableCell>\n      <TableCell align="right" cellType="numeric">$148.00</TableCell>\n      <TableCell cellType="icon-button"><RowActions /></TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`}
          >
            <div className="docs-table-example docs-table-example--full">
              <ExampleTable />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n  UtilityButton,\n} from "@maxa/ui"\nimport { Copy, DotsThreeVertical, PencilSimple } from "@maxa/icons"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead headerType="checkbox"><Checkbox aria-label="Select all" /></TableHead>\n      <TableHead>Design</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead headerType="empty" />\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow interactive>\n      <TableCell cellType="checkbox"><Checkbox aria-label="Select row" /></TableCell>\n      <TableCell>Lunch & Learn postcard</TableCell>\n      <TableCell>Approved</TableCell>\n      <TableCell cellType="icon-button"><RowActions /></TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`}
        />
      </DocsSection>

      <DocsSection id="states" title="States">
        <DocsExample title="Subdued, selected, interactive">
          <ComponentPreview
            layout="block"
            code={`<TableRow interactive>Default</TableRow>\n<TableRow interactive selected>Selected</TableRow>\n<TableRow interactive subdued>Subdued</TableRow>`}
          >
            <div className="docs-table-example">
              <Table density="sm" style={{ minWidth: "360px" }}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row state</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow interactive>
                    <TableCell>Default</TableCell>
                    <TableCell>Standard row with hover behavior.</TableCell>
                  </TableRow>
                  <TableRow interactive selected>
                    <TableCell>Selected</TableCell>
                    <TableCell>Selected row state for checked or active records.</TableCell>
                  </TableRow>
                  <TableRow interactive subdued>
                    <TableCell>Subdued</TableCell>
                    <TableCell>Muted row state for secondary or grouped records.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="cells" title="Cells">
        <DocsExample title="Figma content type variants">
          <ComponentPreview
            code={`<TableCell cellType="checkbox"><Checkbox aria-label="Select row" /></TableCell>\n<TableCell cellType="text"><span className="maxa-table__cell-title">Content</span></TableCell>\n<TableCell cellType="numeric" align="right">$148.00</TableCell>\n<TableCell cellType="input-field"><Input size="sm" placeholder="Any" /></TableCell>`}
          >
            <div className="docs-table-example docs-table-example--cells">
              <Table className="docs-cell-variant-table" style={{ minWidth: 0 }}>
                <colgroup>
                  <col style={{ width: "11rem" }} />
                  <col />
                </colgroup>
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Content type</TableHead>
                    <TableHead scope="col">Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CELL_VARIANTS.map(({ label, cellType }) => (
                    <TableRow key={cellType}>
                      <TableCell cellType="text">
                        <span className="maxa-table__cell-title">{label}</span>
                      </TableCell>
                      <TableCell cellType={cellType}>
                        {renderCellVariant(cellType)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
