import type { Metadata } from "next"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag,
  UtilityButton,
} from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Table - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#states", label: "States" },
  { href: "#cells", label: "Cells" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  { name: "Table", type: "table", default: undefined, description: "Responsive wrapper and semantic table element." },
  { name: "density", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Controls row height and vertical cell padding." },
  { name: "TableRow", type: "tr", default: undefined, description: "Semantic row part. Use selected, subdued, and interactive for row state styling." },
  { name: "selected", type: "boolean", default: "false", description: "Applies selected row background." },
  { name: "subdued", type: "boolean", default: "false", description: "Applies subdued row background." },
  { name: "interactive", type: "boolean", default: "false", description: "Enables hover styling for clickable rows." },
  { name: "TableHead", type: "th", default: undefined, description: "Header cell. Use align and sort for numeric or sortable columns." },
  { name: "sort", type: "'ascending' | 'descending' | 'none'", default: undefined, description: "Displays a sort indicator and sets aria-sort." },
  { name: "TableCell", type: "td", default: undefined, description: "Body/footer cell. Compose with Badge, Tag, Avatar, Button, Checkbox, or Spinner as needed." },
  { name: "align", type: "'left' | 'center' | 'right'", default: "'left'", description: "Aligns header or cell content." },
]

function DotsIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path fill="currentColor" d="M5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  )
}

function ExampleTable() {
  return (
    <Table style={{ minWidth: "560px" }}>
      <TableCaption>Recent design orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Design</TableHead>
          <TableHead scope="col">Owner</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col" align="right" sort="descending">Total</TableHead>
          <TableHead scope="col" align="center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive selected>
          <TableCell>Lunch & Learn postcard</TableCell>
          <TableCell>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Avatar size="sm"><AvatarFallback>IS</AvatarFallback></Avatar>
              Igor Stetsenko
            </span>
          </TableCell>
          <TableCell><Badge intent="success">Approved</Badge></TableCell>
          <TableCell align="right">$148.00</TableCell>
          <TableCell align="center"><UtilityButton aria-label="Open row actions" icon={<DotsIcon />} /></TableCell>
        </TableRow>
        <TableRow interactive>
          <TableCell>Market report flyer</TableCell>
          <TableCell>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Avatar size="sm"><AvatarFallback>AV</AvatarFallback></Avatar>
              Ava Wilson
            </span>
          </TableCell>
          <TableCell><Badge intent="warning">Review</Badge></TableCell>
          <TableCell align="right">$72.00</TableCell>
          <TableCell align="center"><UtilityButton aria-label="Open row actions" icon={<DotsIcon />} /></TableCell>
        </TableRow>
        <TableRow interactive subdued>
          <TableCell>Open house social post</TableCell>
          <TableCell>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Avatar size="sm"><AvatarFallback>MC</AvatarFallback></Avatar>
              Mia Chen
            </span>
          </TableCell>
          <TableCell><Badge>Draft</Badge></TableCell>
          <TableCell align="right">$32.00</TableCell>
          <TableCell align="center"><UtilityButton aria-label="Open row actions" icon={<DotsIcon />} /></TableCell>
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
          <ComponentPreview code={`<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Design</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead align="right" sort="descending">Total</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow interactive selected>\n      <TableCell>Lunch & Learn postcard</TableCell>\n      <TableCell><Badge intent="success">Approved</Badge></TableCell>\n      <TableCell align="right">$148.00</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`}>
            <div className="docs-table-example">
              <ExampleTable />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Design</TableHead>\n      <TableHead>Status</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow interactive>\n      <TableCell>Lunch & Learn postcard</TableCell>\n      <TableCell>Approved</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`}
        />
      </DocsSection>

      <DocsSection id="states" title="States">
        <DocsExample title="Subdued, selected, interactive">
          <ComponentPreview code={`<TableRow interactive>Default</TableRow>\n<TableRow interactive selected>Selected</TableRow>\n<TableRow interactive subdued>Subdued</TableRow>`}>
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
        <DocsExample title="Composable cell content">
          <ComponentPreview code={`<TableCell><Checkbox aria-label="Select row" /></TableCell>\n<TableCell><Tag>VIP</Tag></TableCell>\n<TableCell><Button size="sm">Open</Button></TableCell>\n<TableCell><Spinner size="sm" label="Loading" /></TableCell>`}>
            <div className="docs-table-example">
              <Table density="lg" style={{ minWidth: "420px" }}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Checkbox</TableHead>
                    <TableHead>Tag</TableHead>
                    <TableHead>Button</TableHead>
                    <TableHead align="center">Loader</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell><Checkbox aria-label="Select row" /></TableCell>
                    <TableCell><Tag>VIP</Tag></TableCell>
                    <TableCell><Button size="sm" variant="outline">Open</Button></TableCell>
                    <TableCell align="center"><Spinner size="sm" label="Loading" /></TableCell>
                  </TableRow>
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
