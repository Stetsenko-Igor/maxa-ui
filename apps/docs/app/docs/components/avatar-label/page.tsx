import type { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarLabel } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"
import { AvatarLabelDefaultPreview } from "./avatar-label-default-preview"

export const metadata: Metadata = { title: "Avatar Label - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#sizes", label: "Sizes" },
  { href: "#profile-link", label: "Profile link" },
  { href: "#installation", label: "Installation" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  {
    name: "avatar",
    type: "ReactElement<AvatarProps>",
    default: undefined,
    description: "Required Avatar element. Avatar Label applies the selected size to it.",
  },
  {
    name: "label",
    type: "ReactNode",
    default: undefined,
    description: "Required visible identity label.",
  },
  {
    name: "description",
    type: "ReactNode",
    default: undefined,
    description: "Optional secondary identity detail.",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'sm'",
    description: "Controls the Avatar and paired typography scale.",
  },
  {
    name: "href",
    type: "string",
    default: undefined,
    description: "When supplied, renders one semantic anchor around the complete identity target.",
  },
]

const sizes = ["sm", "md", "lg", "xl"] as const

export default function AvatarLabelPage() {
  return (
    <ComponentPage
      title="Avatar Label"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/avatar-label"
      markdown=""
      previous={{ href: "/docs/components/avatar", label: "Avatar" }}
      next={{ href: "/docs/components/badge", label: "Badge" }}
      lead="Avatar with a visible name and optional description. It can stay static or make the complete identity target navigate to the represented profile."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Static and profile link">
          <AvatarLabelDefaultPreview />
        </DocsExample>
      </section>

      <DocsSection
        id="sizes"
        title="Sizes"
        description="Size keeps the nested Avatar and text scale synchronized. The smallest supported Avatar Label starts at the 32 px Avatar size."
      >
        <DocsExample title="sm, md, lg, xl">
          <ComponentPreview
            code={`{(["sm", "md", "lg", "xl"] as const).map((size) => (
  <AvatarLabel
    key={size}
    size={size}
    avatar={<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>}
    label="Maxa Design"
    description="Product designer"
  />
))}`}
          >
            <div style={{ display: "grid", gap: "24px", padding: "24px" }}>
              {sizes.map((size) => (
                <AvatarLabel
                  key={size}
                  size={size}
                  avatar={
                    <Avatar>
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                  }
                  label="Maxa Design"
                  description="Product designer"
                />
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="profile-link"
        title="Profile link"
        description="Supply href when the identity navigates to another page. Hover and active affect only the label; focus-visible surrounds the complete Avatar + text target. The product owns the destination."
      >
        <DocsExample title="Profile navigation">
          <ComponentPreview
            code={`<AvatarLabel
  avatar={<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>}
  label="Maxa Design"
  description="Product designer"
  href="/profile"
  aria-label="Open Maxa Design profile"
/>`}
          >
            <AvatarLabel
              avatar={
                <Avatar>
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
              }
              label="Maxa Design"
              description="Product designer"
              href="/profile"
              aria-label="Open Maxa Design profile"
            />
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection
        id="installation"
        title="Installation"
        description="Install from @maxa/ui and import the token stylesheet once in your app root."
      >
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import {
  Avatar,
  AvatarFallback,
  AvatarLabel,
} from "@maxa/ui"
import "@maxa/tokens/theme.css"`}
          usage={`<AvatarLabel
  avatar={<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>}
  label="Maxa Design"
  description="Product designer"
  href="/profile"
/>`}
        />
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
