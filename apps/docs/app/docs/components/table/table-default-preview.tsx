"use client"

import {
  Badge,
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type DemoRow = {
  design: string
  format: string
  status: "Approved" | "Review" | "Draft"
  intent: "success" | "warning" | "neutral"
  total: string
}

const ROWS: DemoRow[] = [
  { design: "Lunch & Learn postcard", format: "Direct mail", status: "Approved", intent: "success", total: "$148.00" },
  { design: "Market report flyer", format: "Flyer", status: "Review", intent: "warning", total: "$72.00" },
  { design: "Open house social post", format: "Social post", status: "Draft", intent: "neutral", total: "$32.00" },
]

type Density = "sm" | "md" | "lg"
type SortDir = "none" | "ascending" | "descending"

const TABLE_PLAYGROUND: PlaygroundConfig = {
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
    {
      type: "select",
      name: "sort",
      label: "total sort",
      options: [
        { label: "none", value: "none" },
        { label: "ascending", value: "ascending" },
        { label: "descending", value: "descending" },
      ],
      default: "descending",
    },
    { type: "boolean", name: "interactive", default: true },
    { type: "boolean", name: "selectFirst", label: "select first row", default: false },
    { type: "boolean", name: "showCheckbox", label: "checkbox column", default: true },
  ],
  render: (v: PlaygroundValues) => {
    const density = v.density as Density
    const sort = v.sort as SortDir
    const interactive = v.interactive as boolean
    const selectFirst = v.selectFirst as boolean
    const showCheckbox = v.showCheckbox as boolean
    return (
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <Table density={density} style={{ minWidth: 0 }}>
          <TableCaption>Recent design orders</TableCaption>
          <TableHeader>
            <TableRow>
              {showCheckbox && (
                <TableHead headerType="checkbox">
                  <Checkbox aria-label="Select all rows" />
                </TableHead>
              )}
              <TableHead>Design</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right" {...(sort === "none" ? {} : { sort })}>
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((row, index) => (
              <TableRow
                key={row.design}
                interactive={interactive}
                selected={selectFirst && index === 0}
              >
                {showCheckbox && (
                  <TableCell cellType="checkbox">
                    <Checkbox
                      aria-label={`Select ${row.design}`}
                      checked={selectFirst && index === 0}
                    />
                  </TableCell>
                )}
                <TableCell cellType="thumbnail">
                  <span className="maxa-table__cell-content">
                    <span className="maxa-table__thumbnail" aria-hidden="true" />
                    <span className="maxa-table__cell-stack">
                      <span className="maxa-table__cell-title">{row.design}</span>
                      <span className="maxa-table__cell-subtitle">{row.format}</span>
                    </span>
                  </span>
                </TableCell>
                <TableCell cellType="badge">
                  <Badge intent={row.intent}>{row.status}</Badge>
                </TableCell>
                <TableCell align="right" cellType="numeric">
                  {row.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const rowAttrs = ["interactive"]
    if (v.interactive === false) rowAttrs.length = 0
    const sortAttr = v.sort === "none" ? "" : ` sort="${v.sort}"`
    const checkboxHead = v.showCheckbox
      ? `\n      <TableHead headerType="checkbox"><Checkbox aria-label="Select all" /></TableHead>`
      : ""
    const checkboxCell = v.showCheckbox
      ? `\n      <TableCell cellType="checkbox"><Checkbox /></TableCell>`
      : ""
    const rowProps = [
      v.interactive ? "interactive" : null,
      v.selectFirst ? "selected" : null,
    ]
      .filter(Boolean)
      .join(" ")
    return `<Table density="${v.density}">
  <TableHeader>
    <TableRow>${checkboxHead}
      <TableHead>Design</TableHead>
      <TableHead>Status</TableHead>
      <TableHead align="right"${sortAttr}>Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow${rowProps ? ` ${rowProps}` : ""}>${checkboxCell}
      <TableCell cellType="thumbnail">Lunch & Learn postcard</TableCell>
      <TableCell cellType="badge"><Badge intent="success">Approved</Badge></TableCell>
      <TableCell align="right" cellType="numeric">$148.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`
  },
}

export function TableDefaultPreview() {
  return (
    <ComponentPreview
      layout="block"
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead headerType="checkbox"><Checkbox aria-label="Select all" /></TableHead>
      <TableHead>Design</TableHead>
      <TableHead>Status</TableHead>
      <TableHead align="right" sort="descending">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow interactive>
      <TableCell cellType="checkbox"><Checkbox aria-label="Select row" /></TableCell>
      <TableCell>Lunch & Learn postcard</TableCell>
      <TableCell><Badge intent="success">Approved</Badge></TableCell>
      <TableCell align="right" cellType="numeric">$148.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      playground={TABLE_PLAYGROUND}
    >
      <div className="docs-table-example docs-table-example--full">
        <Table className="docs-product-table-example" style={{ minWidth: 0 }}>
          <colgroup>
            <col style={{ width: "44px" }} />
            <col />
            <col style={{ width: "120px" }} />
            <col style={{ width: "96px" }} />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((row) => (
              <TableRow key={row.design} interactive>
                <TableCell cellType="checkbox">
                  <Checkbox aria-label={`Select ${row.design}`} />
                </TableCell>
                <TableCell cellType="thumbnail">
                  <span className="maxa-table__cell-content">
                    <span className="maxa-table__thumbnail" aria-hidden="true" />
                    <span className="maxa-table__cell-stack">
                      <span className="maxa-table__cell-title">{row.design}</span>
                      <span className="maxa-table__cell-subtitle">{row.format}</span>
                    </span>
                  </span>
                </TableCell>
                <TableCell cellType="badge">
                  <Badge intent={row.intent}>{row.status}</Badge>
                </TableCell>
                <TableCell align="right" cellType="numeric">
                  {row.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentPreview>
  )
}
