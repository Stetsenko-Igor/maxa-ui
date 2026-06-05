import type { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Avatar - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#colors", label: "Colors" },
  { href: "#tones", label: "Tones" },
  { href: "#media", label: "Media" },
  { href: "#sizes", label: "Sizes" },
  { href: "#status", label: "Status" },
  { href: "#group", label: "Group" },
  { href: "#api-reference", label: "API reference" },
]

const AVATAR_PROPS = [
  { name: "Avatar", type: "Radix Root", default: undefined, description: "Root identity container. Supports size, shape, status, and Radix root props." },
  { name: "AvatarImage", type: "Radix Image", default: undefined, description: "Image element. Provide alt text when identity is not already visible nearby." },
  { name: "AvatarFallback", type: "Radix Fallback", default: undefined, description: "Fallback initials or short label shown while image is unavailable." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Avatar size." },
  { name: "color", type: "'blue' | 'green' | 'teal' | 'yellow' | 'orange' | 'red' | 'rose' | 'violet' | 'purple'", default: "'blue'", description: "Fallback color from the MAXA semantic palette." },
  { name: "tone", type: "'strong' | 'medium' | 'neutral'", default: "'strong'", description: "Fallback emphasis. Group overflow uses neutral by default." },
  { name: "shape", type: "'circle' | 'square'", default: "'circle'", description: "Circle for people, square for workspace/object avatars." },
  { name: "status", type: "'online' | 'offline' | 'busy' | 'away'", default: undefined, description: "Decorative status indicator anchored to the avatar." },
  { name: "AvatarGroup", type: "div", default: undefined, description: "Overlapping avatar stack. Accepts max for overflow count." },
  { name: "overflow", type: "'count' | 'ellipsis'", default: "'count'", description: "Overflow avatar content when group children exceed max." },
]

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "18px",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
}

const AVATAR_COLORS = ["blue", "green", "teal", "yellow", "orange", "red", "rose", "violet", "purple"] as const

const AVATAR_IMAGE_SRC = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%232d2d2e'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23f5f5f5'/%3E%3Cpath d='M14 76c4-18 17-28 26-28s22 10 26 28' fill='%230b73cb'/%3E%3C/svg%3E"

function UserIcon() {
  return (
    <svg width="52%" height="52%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function AvatarPage() {
  return (
    <ComponentPage
      title="Avatar"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/avatar"
      markdown=""
      previous={{ href: "/docs/components/alert", label: "Alert" }}
      next={{ href: "/docs/components/badge", label: "Badge" }}
      lead={
        <>
          A compact identity primitive for users, accounts, collaborators, and workspace
          objects. Built on Radix Avatar and styled with MAXA component tokens.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`import {\n  Avatar,\n  AvatarFallback,\n  AvatarImage,\n} from "@maxa/ui"\n\n<Avatar color="blue">\n  <AvatarImage alt="Igor Stetsenko" src="/avatar.png" />\n  <AvatarFallback>IS</AvatarFallback>\n</Avatar>`}>
            <div style={row}>
              <Avatar color="blue">
                <AvatarImage alt="Igor Stetsenko" src={AVATAR_IMAGE_SRC} />
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>
              <Avatar color="teal" shape="square">
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
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
          imports={`import {\n  Avatar,\n  AvatarFallback,\n  AvatarImage,\n} from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<Avatar status="online">\n  <AvatarImage alt="Igor Stetsenko" src="/avatar.png" />\n  <AvatarFallback>IS</AvatarFallback>\n</Avatar>`}
        />
      </DocsSection>

      <DocsSection id="colors" title="Colors" description="Fallback avatars use the MAXA semantic color scale. Use color to distinguish people, teams, or generated identities when no image exists.">
        <DocsExample title="Strong palette">
          <ComponentPreview code={`{colors.map((color) => (\n  <Avatar key={color} color={color}>\n    <AvatarFallback>{initials}</AvatarFallback>\n  </Avatar>\n))}`}>
            <div style={row}>
              {AVATAR_COLORS.map((color, index) => (
                <Avatar key={color} color={color}>
                  <AvatarFallback>{["IS", "AV", "MC", "JW", "TR", "AK", "NL", "OM", "KP"][index]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="tones" title="Tones" description="Use strong for high contrast, medium for calmer identity chips, and neutral for overflow or low-emphasis placeholders.">
        <DocsExample title="strong, medium, neutral">
          <ComponentPreview code={`<Avatar color="blue" tone="strong"><AvatarFallback>IS</AvatarFallback></Avatar>\n<Avatar color="blue" tone="medium"><AvatarFallback>IS</AvatarFallback></Avatar>\n<Avatar tone="neutral"><AvatarFallback>+1</AvatarFallback></Avatar>`}>
            <div style={{ display: "grid", gap: "24px", padding: "24px" }}>
              <div style={row}>
                {AVATAR_COLORS.map((color, index) => (
                  <Avatar key={color} color={color} tone="medium">
                    <AvatarFallback>{["IS", "AV", "MC", "JW", "TR", "AK", "NL", "OM", "KP"][index]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div style={row}>
                <Avatar tone="neutral"><AvatarFallback>IS</AvatarFallback></Avatar>
                <Avatar tone="neutral"><AvatarFallback>MW</AvatarFallback></Avatar>
                <Avatar tone="neutral"><AvatarFallback>+1</AvatarFallback></Avatar>
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="media" title="Media" description="Use an icon fallback when the person is unknown, and AvatarImage when a user photo is available.">
        <DocsExample title="icon and image">
          <ComponentPreview code={`<Avatar tone="neutral"><AvatarFallback><UserIcon /></AvatarFallback></Avatar>\n<Avatar><AvatarImage alt="Ava Wilson" src="/avatar.png" /><AvatarFallback>AW</AvatarFallback></Avatar>`}>
            <div style={row}>
              <Avatar tone="neutral">
                <AvatarFallback><UserIcon /></AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage alt="Ava Wilson" src={AVATAR_IMAGE_SRC} />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="sizes" title="Sizes" description="Use xs/sm for dense menus and md/lg/xl for profile or collaborator surfaces.">
        <DocsExample title="xs, sm, md, lg, xl">
          <ComponentPreview code={`{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (\n  <Avatar key={size} size={size}><AvatarFallback>IS</AvatarFallback></Avatar>\n))}`}>
            <div style={row}>
              {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <Avatar key={size} color="violet" size={size}>
                  <AvatarFallback>IS</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="status" title="Status" description="Status dots are decorative; expose real status in text when it affects workflow decisions.">
        <DocsExample title="online, offline, busy, away">
          <ComponentPreview code={`<Avatar status="online"><AvatarFallback>IS</AvatarFallback></Avatar>\n<Avatar status="busy"><AvatarFallback>AV</AvatarFallback></Avatar>`}>
            <div style={row}>
              <Avatar color="blue" status="online"><AvatarFallback>IS</AvatarFallback></Avatar>
              <Avatar color="green" status="offline"><AvatarFallback>AV</AvatarFallback></Avatar>
              <Avatar color="rose" status="busy"><AvatarFallback>MC</AvatarFallback></Avatar>
              <Avatar color="orange" status="away"><AvatarFallback>JW</AvatarFallback></Avatar>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="group" title="Group" description="Use AvatarGroup for collaborators or assigned users. Overflow can render as a count or ellipsis.">
        <DocsExample title="Grouped avatars">
          <ComponentPreview code={`<AvatarGroup max={3}>\n  <Avatar><AvatarFallback>IS</AvatarFallback></Avatar>\n  <Avatar><AvatarFallback>AV</AvatarFallback></Avatar>\n  <Avatar><AvatarFallback>MC</AvatarFallback></Avatar>\n  <Avatar><AvatarFallback>JW</AvatarFallback></Avatar>\n</AvatarGroup>\n\n<AvatarGroup max={3} overflow="ellipsis">...</AvatarGroup>`}>
            <div style={{ ...row, gap: "40px" }}>
              <AvatarGroup max={3}>
                <Avatar color="blue" tone="medium"><AvatarFallback>IS</AvatarFallback></Avatar>
                <Avatar color="green" tone="medium"><AvatarFallback>AV</AvatarFallback></Avatar>
                <Avatar color="rose" tone="medium"><AvatarFallback>MC</AvatarFallback></Avatar>
                <Avatar color="orange" tone="medium"><AvatarFallback>JW</AvatarFallback></Avatar>
              </AvatarGroup>
              <AvatarGroup max={3} overflow="ellipsis">
                <Avatar color="blue" tone="medium"><AvatarFallback>IS</AvatarFallback></Avatar>
                <Avatar color="green" tone="medium"><AvatarFallback>AV</AvatarFallback></Avatar>
                <Avatar color="rose" tone="medium"><AvatarFallback>MC</AvatarFallback></Avatar>
                <Avatar color="orange" tone="medium"><AvatarFallback>JW</AvatarFallback></Avatar>
                <Avatar color="violet" tone="medium"><AvatarFallback>TR</AvatarFallback></Avatar>
              </AvatarGroup>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={AVATAR_PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
