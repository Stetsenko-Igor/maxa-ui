"use client"

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const PAGINATION_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "total",
      label: "pages",
      options: [
        { label: "3 pages", value: "3" },
        { label: "4 pages", value: "4" },
        { label: "5 pages", value: "5" },
      ],
      default: "4",
    },
    {
      type: "select",
      name: "current",
      label: "active page",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
      default: "2",
    },
    { type: "boolean", name: "showPrevNext", default: true },
  ],
  render: (v: PlaygroundValues) => {
    const total = Number(v.total)
    const current = Math.min(Number(v.current), total)
    const pages = Array.from({ length: total }, (_, i) => i + 1)
    return (
      <Pagination>
        <PaginationList>
          {v.showPrevNext && (
            <PaginationItem><PaginationPrevious href={`?page=${Math.max(1, current - 1)}`} /></PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href={`?page=${page}`} isActive={page === current}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {v.showPrevNext && (
            <PaginationItem><PaginationNext href={`?page=${Math.min(total, current + 1)}`} /></PaginationItem>
          )}
        </PaginationList>
      </Pagination>
    )
  },
  code: (v: PlaygroundValues) => {
    const total = Number(v.total)
    const current = Math.min(Number(v.current), total)
    const pages = Array.from({ length: total }, (_, i) => i + 1)
    const lines: string[] = []
    if (v.showPrevNext) lines.push(`    <PaginationItem><PaginationPrevious href="?page=${Math.max(1, current - 1)}" /></PaginationItem>`)
    pages.forEach((page) => {
      const active = page === current ? " isActive" : ""
      lines.push(`    <PaginationItem><PaginationLink href="?page=${page}"${active}>${page}</PaginationLink></PaginationItem>`)
    })
    if (v.showPrevNext) lines.push(`    <PaginationItem><PaginationNext href="?page=${Math.min(total, current + 1)}" /></PaginationItem>`)
    return `<Pagination>\n  <PaginationList>\n${lines.join("\n")}\n  </PaginationList>\n</Pagination>`
  },
}

export function PaginationDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Pagination>\n  <PaginationList>\n    <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>\n    <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>\n  </PaginationList>\n</Pagination>`}
      playground={PAGINATION_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <Pagination>
          <PaginationList>
            <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
            <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="?page=3">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
          </PaginationList>
        </Pagination>
      </div>
    </ComponentPreview>
  )
}
