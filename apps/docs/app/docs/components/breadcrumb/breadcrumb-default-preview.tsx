"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const FULL_PATH = ["Dashboard", "Components", "Navigation", "Breadcrumb"]

const BREADCRUMB_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "levels",
      label: "levels",
      options: [
        { label: "2 levels", value: "2" },
        { label: "3 levels", value: "3" },
        { label: "4 levels", value: "4" },
      ],
      default: "3",
    },
    {
      type: "select",
      name: "separator",
      options: [
        { label: "slash", value: "/" },
        { label: "chevron", value: ">" },
      ],
      default: "/",
    },
  ],
  render: (v: PlaygroundValues) => {
    const count = Number(v.levels)
    const items = FULL_PATH.slice(0, count)
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((label, index) => {
            const isLast = index === items.length - 1
            return (
              <span key={label} style={{ display: "contents" }}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href="#">{label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator>{v.separator as string}</BreadcrumbSeparator>}
              </span>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
  },
  code: (v: PlaygroundValues) => {
    const count = Number(v.levels)
    const items = FULL_PATH.slice(0, count)
    const sep = v.separator === "/" ? "<BreadcrumbSeparator />" : `<BreadcrumbSeparator>${v.separator}</BreadcrumbSeparator>`
    const lines: string[] = []
    items.forEach((label, index) => {
      const isLast = index === items.length - 1
      const inner = isLast ? `<BreadcrumbPage>${label}</BreadcrumbPage>` : `<BreadcrumbLink href="#">${label}</BreadcrumbLink>`
      lines.push(`    <BreadcrumbItem>${inner}</BreadcrumbItem>`)
      if (!isLast) lines.push(`    ${sep}`)
    })
    return `<Breadcrumb>\n  <BreadcrumbList>\n${lines.join("\n")}\n  </BreadcrumbList>\n</Breadcrumb>`
  },
}

export function BreadcrumbDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Marketing Packages</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`}
      playground={BREADCRUMB_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/docs/components">Components</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </ComponentPreview>
  )
}
