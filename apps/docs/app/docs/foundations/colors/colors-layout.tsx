"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@maxa/ui"
import { DocsPageLayout } from "../../../_components/docs-page-layout"
import type { TocItem } from "../../../_components/on-this-page"
import { ColorExplorer } from "./color-explorer"
import explorerData from "./explorer.generated.json"
import type { ColorExplorerData } from "./explorer-types"
import "./colors-layout.css"

type View = "overview" | "tokens"

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
      if (hash === "#explore" || hash === "#tokens") setView("tokens")
      else setView("overview")
    }
    restore()
    window.addEventListener("hashchange", restore)
    return () => window.removeEventListener("hashchange", restore)
  }, [])

  function changeView(value: string) {
    setView(value as View)
    window.history.replaceState(null, "", `#${value}`)
  }

  return (
    <div className="colors-page" data-view={view}>
      <DocsPageLayout
        eyebrow="Foundations"
        title="Colors"
        lead="Understand our color roles, browse their source values, and see which components use them."
        toc={view === "tokens" ? [] : toc}
      >
        <Tabs value={view} onValueChange={changeView}>
          <TabsList aria-label="Color documentation views">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {overview}
            {reference}
          </TabsContent>
          <TabsContent value="tokens">
            <ColorExplorer data={explorerData as ColorExplorerData} />
          </TabsContent>
        </Tabs>
      </DocsPageLayout>
    </div>
  )
}
