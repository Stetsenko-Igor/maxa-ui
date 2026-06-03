import type { Metadata } from "next"
import { Button, Tooltip, TooltipProvider } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Tooltip - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#sides", label: "Sides" },
  { href: "#align", label: "Alignment" },
  { href: "#delay", label: "Delay" },
  { href: "#api-reference", label: "API reference" },
]

const TOOLTIP_PROPS = [
  { name: "content", type: "ReactNode", default: undefined, description: "Tooltip body. Keep it short — tooltips are not for rich or interactive content." },
  { name: "children", type: "ReactNode", default: undefined, description: "The trigger element. Rendered via Radix asChild — must be a single focusable element." },
  { name: "side", type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: "Preferred side of the trigger to render against." },
  { name: "align", type: "'start' | 'center' | 'end'", default: "'center'", description: "Alignment along the chosen side." },
  { name: "delayDuration", type: "number", default: "200", description: "Hover delay before the tooltip opens, in ms." },
  { name: "sideOffset", type: "number", default: "6", description: "Distance in px between the trigger and the content." },
  { name: "open / defaultOpen / onOpenChange", type: "—", default: undefined, description: "Forwarded to the Radix Root for controlled or uncontrolled usage." },
]

const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "center", padding: "24px" }

export default function TooltipPage() {
  return (
    <ComponentPage
      title="Tooltip"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/tooltip"
      markdown=""
      previous={{ href: "/docs/components/switch", label: "Switch" }}
      next={{ href: "/docs/components/button", label: "Button" }}
      lead={
        <>
          A floating hint shown on hover or keyboard focus of a trigger. Built on Radix
          Tooltip for accessibility and positioning, rendered on an inverse surface.
          Wrap your app in a single <code>TooltipProvider</code>.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import { Tooltip, TooltipProvider } from "@maxa/ui"\n\n<TooltipProvider>\n  <Tooltip content="Copy to clipboard">\n    <Button variant="outline">Copy</Button>\n  </Tooltip>\n</TooltipProvider>`}>
            <TooltipProvider>
              <div style={row}>
                <Tooltip content="Copy to clipboard">
                  <Button variant="outline">Hover me</Button>
                </Tooltip>
              </div>
            </TooltipProvider>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui, import the token stylesheet once, and mount a TooltipProvider near your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { Tooltip, TooltipProvider } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<TooltipProvider>\n  <Tooltip content="Copy to clipboard">\n    <Button>Copy</Button>\n  </Tooltip>\n</TooltipProvider>`}
        />
      </DocsSection>

      <DocsSection
        id="sides"
        title="Sides"
        description="Position the tooltip on any of the four sides of its trigger with the side prop."
      >
        <DocsExample title="top, right, bottom, left">
          <ComponentPreview code={`<Tooltip content="Top" side="top"><Button>Top</Button></Tooltip>\n<Tooltip content="Right" side="right"><Button>Right</Button></Tooltip>\n<Tooltip content="Bottom" side="bottom"><Button>Bottom</Button></Tooltip>\n<Tooltip content="Left" side="left"><Button>Left</Button></Tooltip>`}>
            <TooltipProvider>
              <div style={row}>
                <Tooltip content="On top" side="top"><Button variant="outline">Top</Button></Tooltip>
                <Tooltip content="On the right" side="right"><Button variant="outline">Right</Button></Tooltip>
                <Tooltip content="On the bottom" side="bottom"><Button variant="outline">Bottom</Button></Tooltip>
                <Tooltip content="On the left" side="left"><Button variant="outline">Left</Button></Tooltip>
              </div>
            </TooltipProvider>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="align"
        title="Alignment"
        description="Use align to shift the tooltip toward the start, center, or end of the chosen side."
      >
        <DocsExample title="start, center, end">
          <ComponentPreview code={`<Tooltip content="Aligned start" side="bottom" align="start"><Button>Start</Button></Tooltip>\n<Tooltip content="Aligned center" side="bottom" align="center"><Button>Center</Button></Tooltip>\n<Tooltip content="Aligned end" side="bottom" align="end"><Button>End</Button></Tooltip>`}>
            <TooltipProvider>
              <div style={row}>
                <Tooltip content="Aligned to the start" side="bottom" align="start"><Button variant="outline">Start</Button></Tooltip>
                <Tooltip content="Aligned to the center" side="bottom" align="center"><Button variant="outline">Center</Button></Tooltip>
                <Tooltip content="Aligned to the end" side="bottom" align="end"><Button variant="outline">End</Button></Tooltip>
              </div>
            </TooltipProvider>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="delay"
        title="Delay"
        description="delayDuration controls how long the user must hover before the tooltip opens. Default is 200ms."
      >
        <DocsExample title="No delay vs. slow">
          <ComponentPreview code={`<Tooltip content="Opens instantly" delayDuration={0}><Button>Instant</Button></Tooltip>\n<Tooltip content="Opens after 700ms" delayDuration={700}><Button>Slow</Button></Tooltip>`}>
            <TooltipProvider>
              <div style={row}>
                <Tooltip content="Opens instantly" delayDuration={0}><Button variant="outline">Instant</Button></Tooltip>
                <Tooltip content="Opens after 700ms" delayDuration={700}><Button variant="outline">Slow</Button></Tooltip>
              </div>
            </TooltipProvider>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={TOOLTIP_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
