"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@maxa/ui"
import { DocsPageLayout } from "../../../_components/docs-page-layout"
import type { TocItem } from "../../../_components/on-this-page"
import { ColorExplorer } from "./color-explorer"
import explorerData from "./explorer.generated.json"
import type { ColorExplorerData } from "./explorer-types"
import "./colors-layout.css"

type View = "overview" | "explore" | "reference"

export function ColorsLayout({
  overview,
  reference,
  toc,
}: {
  overview: ReactNode
  reference: ReactNode
  toc: TocItem[]
}) {
  const [view, setView] = useState<View>("overview")
  useEffect(() => {
    const restore = () => {
      const hash = window.location.hash
      if (hash === "#explore") setView("explore")
      else if (hash === "#reference" || toc.slice(4).some((item) => item.href === hash))
        setView("reference")
      else setView("overview")
    }
    restore()
    window.addEventListener("hashchange", restore)
    return () => window.removeEventListener("hashchange", restore)
  }, [toc])

  function changeView(value: string) {
    setView(value as View)
    window.history.replaceState(null, "", `#${value}`)
  }

  return (
    <div className="colors-page" data-view={view}>
      <DocsPageLayout
        eyebrow="Foundations"
        title="Colors"
        lead="A color has a job. See how our palette becomes a purpose, how components use it, and what changes when you try another color."
        toc={view === "explore" ? [] : view === "overview" ? toc.slice(0, 4) : toc.slice(4)}
      >
        <Tabs value={view} onValueChange={changeView}>
          <TabsList aria-label="Color documentation views">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">{overview}</TabsContent>
          <TabsContent value="explore">
            <ColorExplorer data={explorerData as ColorExplorerData} />
          </TabsContent>
          <TabsContent value="reference">{reference}</TabsContent>
        </Tabs>
      </DocsPageLayout>
    </div>
  )
}
