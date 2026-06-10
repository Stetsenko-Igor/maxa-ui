import type { Metadata } from "next"
import { SocialButton } from "@maxa/ui"
import { ComponentPage, DocsExample, DocsSection } from "../../../_components/component-page"
import { ComponentPreview } from "../../../_components/component-preview"
import { InstallationBlock } from "../../../_components/installation-block"
import { PropsTable } from "../../../_components/props-table"

export const metadata: Metadata = { title: "Social Button - MAXA UI" }

const TOC = [
  { href: "#preview", label: "Preview" },
  { href: "#installation", label: "Installation" },
  { href: "#providers", label: "Providers" },
  { href: "#sizes", label: "Sizes" },
  { href: "#states", label: "States" },
  { href: "#api-reference", label: "API reference" },
]

const PROPS = [
  {
    name: "provider",
    type: "'apple' | 'facebook' | 'github' | 'google' | 'instagram' | 'linkedin' | 'pinterest' | 'reddit' | 'telegram' | 'tiktok' | 'twitter' | 'whatsapp' | 'x' | 'youtube'",
    default: undefined,
    description: "Provider visual preset.",
  },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Button size." },
  { name: "fullWidth", type: "boolean", default: "false", description: "Expands the button to the width of its container." },
  { name: "icon", type: "React.ReactNode", default: "provider icon", description: "Optional custom provider icon." },
  { name: "label", type: "string", default: "'Sign in with …'", description: "Accessible label text when children are not provided." },
]

const ADDITIONAL_PROVIDERS = [
  "apple",
  "facebook",
  "github",
  "instagram",
  "pinterest",
  "reddit",
  "telegram",
  "tiktok",
  "twitter",
  "whatsapp",
  "x",
  "youtube",
] as const

export default function SocialButtonPage() {
  return (
    <ComponentPage
      title="Social Button"
      toc={TOC}
      githubHref="https://github.com/Stetsenko-Igor/maxa-ui/tree/main/packages/ui/src/components/social-button"
      markdown=""
      previous={{ href: "/docs/components/slider", label: "Slider" }}
      next={{ href: "/docs/components/spinner", label: "Spinner" }}
      lead="Provider sign-in button for authentication and account-linking surfaces. Uses color provider icons, bordered surfaces, shadow, and tokenized states."
    >
      <section id="preview" style={{ scrollMarginTop: "96px" }}>
        <DocsExample title="Default">
          <ComponentPreview code={`<SocialButton provider="google" label="Sign in with Google" />`}>
            <div style={{ padding: "32px", display: "flex", justifyContent: "center" }}>
              <SocialButton provider="google" label="Sign in with Google" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </section>

      <DocsSection id="installation" title="Installation">
        <InstallationBlock
          command="pnpm add @maxa/ui @maxa/tokens"
          imports={`import { SocialButton } from "@maxa/ui"\nimport "@maxa/tokens/theme.css"`}
          usage={`<SocialButton provider="google" label="Sign in with Google" />`}
        />
      </DocsSection>

      <DocsSection id="providers" title="Providers">
        <DocsExample title="Google and LinkedIn">
          <ComponentPreview code={`<SocialButton provider="google" />\n<SocialButton provider="linkedin" />`}>
            <div style={{ display: "grid", gap: "12px", width: "320px", padding: "32px" }}>
              <SocialButton provider="google" />
              <SocialButton provider="linkedin" />
            </div>
          </ComponentPreview>
        </DocsExample>
        <DocsExample title="Additional provider presets">
          <ComponentPreview code={`<SocialButton provider="apple" />\n<SocialButton provider="facebook" />\n<SocialButton provider="instagram" />\n<SocialButton provider="youtube" />`}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", padding: "32px" }}>
              {ADDITIONAL_PROVIDERS.map((provider) => (
                <SocialButton key={provider} provider={provider} />
              ))}
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="sizes" title="Sizes">
        <DocsExample title="sm, md, lg">
          <ComponentPreview code={`<SocialButton provider="google" size="sm" />\n<SocialButton provider="google" />\n<SocialButton provider="google" size="lg" />`}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", padding: "32px" }}>
              <SocialButton provider="google" size="sm" />
              <SocialButton provider="google" />
              <SocialButton provider="google" size="lg" />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="states" title="States">
        <DocsExample title="Full width and disabled">
          <ComponentPreview code={`<SocialButton provider="linkedin" fullWidth />\n<SocialButton provider="google" disabled fullWidth />`}>
            <div style={{ display: "grid", gap: "12px", width: "360px", maxWidth: "100%", padding: "32px" }}>
              <SocialButton provider="linkedin" fullWidth />
              <SocialButton provider="google" disabled fullWidth />
            </div>
          </ComponentPreview>
        </DocsExample>
      </DocsSection>

      <DocsSection id="api-reference" title="API reference">
        <PropsTable props={PROPS} />
      </DocsSection>
    </ComponentPage>
  )
}
