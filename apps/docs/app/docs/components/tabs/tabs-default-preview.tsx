"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const TABS = [
  { value: "designs", label: "Designs" },
  { value: "scheduled", label: "Scheduled" },
  { value: "packages", label: "Packages" },
]

type Orientation = "horizontal" | "vertical"
type Activation = "automatic" | "manual"

const TABS_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "defaultValue",
      label: "active tab",
      options: TABS.map((tab) => ({ label: tab.label, value: tab.value })),
      default: "designs",
    },
    {
      type: "select",
      name: "orientation",
      options: [
        { label: "horizontal", value: "horizontal" },
        { label: "vertical", value: "vertical" },
      ],
      default: "horizontal",
    },
    {
      type: "select",
      name: "activationMode",
      options: [
        { label: "automatic", value: "automatic" },
        { label: "manual", value: "manual" },
      ],
      default: "automatic",
    },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ display: "grid", justifyContent: "center", width: "100%" }}>
      <Tabs
        defaultValue={v.defaultValue as string}
        orientation={v.orientation as Orientation}
        activationMode={v.activationMode as Activation}
      >
        <TabsList aria-label="Dashboard view">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.label} panel
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`defaultValue="${v.defaultValue}"`]
    if (v.orientation !== "horizontal") attrs.push(`orientation="${v.orientation}"`)
    if (v.activationMode !== "automatic") attrs.push(`activationMode="${v.activationMode}"`)
    const triggers = TABS.map((tab) => `    <TabsTrigger value="${tab.value}">${tab.label}</TabsTrigger>`).join("\n")
    return `<Tabs ${attrs.join(" ")}>
  <TabsList aria-label="Dashboard view">
${triggers}
  </TabsList>
  <TabsContent value="${v.defaultValue}">${TABS.find((t) => t.value === v.defaultValue)?.label} panel</TabsContent>
</Tabs>`
  },
}

export function TabsDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Tabs defaultValue="designs">\n  <TabsList aria-label="Dashboard view">\n    <TabsTrigger value="designs">Designs</TabsTrigger>\n    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>\n    <TabsTrigger value="packages">Packages</TabsTrigger>\n  </TabsList>\n  <TabsContent value="designs">Designs panel</TabsContent>\n</Tabs>`}
      playground={TABS_PLAYGROUND}
    >
      <div style={{ display: "grid", justifyContent: "center", width: "100%", padding: "32px" }}>
        <Tabs defaultValue="designs">
          <TabsList aria-label="Dashboard view">
            <TabsTrigger value="designs">Designs</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>
          <TabsContent value="designs">Designs</TabsContent>
          <TabsContent value="scheduled">Scheduled</TabsContent>
          <TabsContent value="packages">Packages</TabsContent>
        </Tabs>
      </div>
    </ComponentPreview>
  )
}
