import type { Metadata } from "next"
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Popover - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sides", label: "Sides" },
  { href: "#align", label: "Alignment" },
  { href: "#close", label: "Close action" },
  { href: "#api-reference", label: "API reference" },
]

const POPOVER_PROPS = [
  { name: "Popover", type: "Radix Root", default: undefined, description: "Root state container. Accepts open, defaultOpen, and onOpenChange." },
  { name: "PopoverTrigger", type: "Radix Trigger", default: undefined, description: "Trigger element. Use asChild with MAXA Button or IconButton." },
  { name: "PopoverContent", type: "Component", default: undefined, description: "Styled floating panel. Portaled by default." },
  { name: "side", type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: "Preferred side of the trigger to render against." },
  { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment along the chosen side." },
  { name: "sideOffset", type: "number", default: "8", description: "Distance in px between the trigger and content." },
  { name: "arrow", type: "boolean", default: "true", description: "Render the directional arrow." },
  { name: "PopoverClose", type: "Radix Close", default: undefined, description: "Button/slot that closes the popover." },
]

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
}

const panel: React.CSSProperties = {
  display: "grid",
  gap: "12px",
}

const panelTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
}

const panelText: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
  color: "var(--color-text-secondary)",
}

export default function PopoverPage() {
  return (
    <ComponentPage
      title="Popover"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/popover"
      markdown=""
      previous={{ href: "/docs/components/select", label: "Select" }}
      next={{ href: "/docs/components/toggle", label: "Toggle" }}
      lead={
        <>
          A floating, dismissible layer for interactive content anchored to a trigger.
          Built on Radix Popover and styled with MAXA component tokens.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Button, Popover, PopoverContent, PopoverTrigger } from "@maxa/ui"\n\n<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open popover</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <p>Interactive content belongs here.</p>\n  </PopoverContent>\n</Popover>`}>
            <div style={row}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div style={panel}>
                    <p style={panelTitle}>Filters</p>
                    <p style={panelText}>Choose the segment and apply the view.</p>
                    <Button size="sm">Apply</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Popover, PopoverContent, PopoverTrigger } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </PopoverTrigger>\n  <PopoverContent>Content</PopoverContent>\n</Popover>`}
        />
      </DocsSection>

      <DocsSection
        id="sides"
        title="Sides"
        description="Position the popover on any side of its trigger."
      >
        <DocsExample title="top, right, bottom, left">
          <ComponentPreview code={`<PopoverContent side="top">Top</PopoverContent>\n<PopoverContent side="right">Right</PopoverContent>\n<PopoverContent side="bottom">Bottom</PopoverContent>\n<PopoverContent side="left">Left</PopoverContent>`}>
            <div style={row}>
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Popover key={side}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">{side}</Button>
                  </PopoverTrigger>
                  <PopoverContent side={side}>
                    <p style={panelText}>Placed on {side}.</p>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="align"
        title="Alignment"
        description="Use align to shift the content toward the start, center, or end of the selected side."
      >
        <DocsExample title="start, center, end">
          <ComponentPreview code={`<PopoverContent side="bottom" align="start">Start</PopoverContent>\n<PopoverContent side="bottom" align="center">Center</PopoverContent>\n<PopoverContent side="bottom" align="end">End</PopoverContent>`}>
            <div style={row}>
              {(["start", "center", "end"] as const).map((align) => (
                <Popover key={align}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">{align}</Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align={align}>
                    <p style={panelText}>Aligned {align}.</p>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="close"
        title="Close action"
        description="Use PopoverClose for explicit completion actions inside the panel."
      >
        <DocsExample title="Close button">
          <ComponentPreview code={`<Popover>\n  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>\n  <PopoverContent>\n    <PopoverClose asChild><Button size="sm">Done</Button></PopoverClose>\n  </PopoverContent>\n</Popover>`}>
            <div style={row}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div style={panel}>
                    <p style={panelTitle}>Saved view</p>
                    <p style={panelText}>Close the panel after confirming the choice.</p>
                    <PopoverClose asChild>
                      <Button size="sm">Done</Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={POPOVER_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
