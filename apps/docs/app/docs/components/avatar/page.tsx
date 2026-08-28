import type { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { AvatarDefaultPreview } from "./avatar-default-preview"

export const metadata: Metadata = { title: "Avatar - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#appearance", label: "Appearance" },
  { href: "#emphasis", label: "Emphasis" },
  { href: "#media", label: "Media" },
  { href: "#sizes", label: "Sizes" },
  { href: "#status", label: "Status" },
  { href: "#api-reference", label: "API reference" },
]

const AVATAR_PROPS = [
  {
    name: "Avatar",
    type: "Radix Root",
    default: undefined,
    description: "Root identity container. Supports size, shape, status, and Radix root props.",
  },
  {
    name: "AvatarImage",
    type: "Radix Image",
    default: undefined,
    description: "Image element. Provide alt text when identity is not already visible nearby.",
  },
  {
    name: "AvatarFallback",
    type: "Radix Fallback",
    default: undefined,
    description: "Fallback initials or short label shown while image is unavailable.",
  },
  {
    name: "size",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: "Avatar size.",
  },
  {
    name: "appearance",
    type: "16 decorative hues",
    default: "'blue'",
    description: "Decorative palette hue for colored fallback avatars. No semantic meaning.",
  },
  {
    name: "emphasis",
    type: "'strong' | 'medium' | 'neutral'",
    default: "'neutral'",
    description:
      "Neutral is the default. Medium is the Figma-approved colored fallback treatment; strong is retained for compatibility.",
  },
  {
    name: "shape",
    type: "'circle' | 'square'",
    default: "'circle'",
    description: "Circle for people, square for workspace/object avatars.",
  },
  {
    name: "status",
    type: "'online' | 'offline' | 'busy' | 'away'",
    default: undefined,
    description: "Decorative status indicator anchored to the avatar.",
  },
]

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "18px",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
}

const AVATAR_APPEARANCES = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const

const AVATAR_IMAGE_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%232d2d2e'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23f5f5f5'/%3E%3Cpath d='M14 76c4-18 17-28 26-28s22 10 26 28' fill='%230b73cb'/%3E%3C/svg%3E"

function UserIcon() {
  return (
    <svg
      width="52%"
      height="52%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
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
      next={{ href: "/docs/components/avatar-label", label: "Avatar Label" }}
      lead={
        <>
          A compact identity primitive for users, accounts, collaborators, and workspace objects.
          Built on Radix Avatar and styled with MAXA component tokens.
        </>
      }
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <AvatarDefaultPreview imageSrc={AVATAR_IMAGE_SRC} />
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

      <DocsSection
        id="appearance"
        title="Appearance"
        description="Colored fallback avatars use the full 16-hue Figma palette with medium emphasis. Appearance is decorative and must not carry meaning by itself."
      >
        <DocsExample title="Palette">
          <ComponentPreview
            code={`{appearances.map((appearance) => (\n  <Avatar key={appearance} appearance={appearance} emphasis="medium">\n    <AvatarFallback>{initials}</AvatarFallback>\n  </Avatar>\n))}`}
          >
            <div style={row}>
              {AVATAR_APPEARANCES.map((appearance) => (
                <Avatar key={appearance} appearance={appearance} emphasis="medium">
                  <AvatarFallback>{appearance.slice(0, 1)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="emphasis"
        title="Emphasis"
        description="Neutral is the default identity fallback. Use medium for a colored fallback approved in Figma. Strong remains in the API only for compatibility with existing consumers."
      >
        <DocsExample title="neutral and colored medium">
          <ComponentPreview
            code={`<Avatar><AvatarFallback>IS</AvatarFallback></Avatar>\n<Avatar appearance="blue" emphasis="medium"><AvatarFallback>IS</AvatarFallback></Avatar>`}
          >
            <div style={{ display: "grid", gap: "24px", padding: "24px" }}>
              <div style={row}>
                {AVATAR_APPEARANCES.map((appearance) => (
                  <Avatar key={appearance} appearance={appearance} emphasis="medium">
                    <AvatarFallback>{appearance.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div style={row}>
                <Avatar emphasis="neutral">
                  <AvatarFallback>IS</AvatarFallback>
                </Avatar>
                <Avatar emphasis="neutral">
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                <Avatar emphasis="neutral">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="media"
        title="Media"
        description="Use an icon fallback when the person is unknown, and AvatarImage when a user photo is available."
      >
        <DocsExample title="icon and image">
          <ComponentPreview
            code={`<Avatar emphasis="neutral"><AvatarFallback><UserIcon /></AvatarFallback></Avatar>\n<Avatar><AvatarImage alt="Ava Wilson" src="/avatar.png" /><AvatarFallback>AW</AvatarFallback></Avatar>`}
          >
            <div style={row}>
              <Avatar emphasis="neutral">
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage alt="Ava Wilson" src={AVATAR_IMAGE_SRC} />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="sizes"
        title="Sizes"
        description="Use xs/sm for dense menus and md/lg/xl for profile or collaborator surfaces."
      >
        <DocsExample title="xs, sm, md, lg, xl">
          <ComponentPreview
            code={`{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (\n  <Avatar key={size} size={size}><AvatarFallback>IS</AvatarFallback></Avatar>\n))}`}
          >
            <div style={row}>
              {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                <Avatar key={size} appearance="violet" emphasis="medium" size={size}>
                  <AvatarFallback>IS</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="status"
        title="Status"
        description="Status dots are decorative; expose real status in text when it affects workflow decisions."
      >
        <DocsExample title="online, offline, busy, away">
          <ComponentPreview
            code={`<Avatar status="online"><AvatarFallback>IS</AvatarFallback></Avatar>\n<Avatar status="busy"><AvatarFallback>AV</AvatarFallback></Avatar>`}
          >
            <div style={row}>
              <Avatar appearance="blue" emphasis="medium" status="online">
                <AvatarFallback>IS</AvatarFallback>
              </Avatar>
              <Avatar appearance="green" emphasis="medium" status="offline">
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <Avatar appearance="rose" emphasis="medium" status="busy">
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <Avatar appearance="orange" emphasis="medium" status="away">
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
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
