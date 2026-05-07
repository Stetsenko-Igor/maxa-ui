import type { Metadata } from "next"
import { Heading, Text } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Typography — MAXA UI" }
const descs: React.CSSProperties = { fontSize: "var(--text-md)", lineHeight: "24px", color: "var(--color-text-secondary)", margin: "0 0 16px" }
const TOC = [
  { href: "#prose-demo", label: "Prose demo" },
  { href: "#heading", label: "Heading" },
  { href: "#text", label: "Text" },
  { href: "#text-colors", label: "Text colors" },
  { href: "#scale-reference", label: "Scale reference" },
  { href: "#font-families", label: "Font families" },
]

const prose = {
  h1: { fontSize: "var(--text-heading-2xl)", lineHeight: "48px", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", margin: "0 0 24px", letterSpacing: "-0.02em" } as React.CSSProperties,
  h2: { fontSize: "var(--text-heading-md)", lineHeight: "30px", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", margin: "32px 0 16px", paddingBottom: "8px", borderBottom: "1px solid var(--color-border-subtle)" } as React.CSSProperties,
  p:  { fontSize: "var(--text-md)", lineHeight: "24px", color: "var(--color-text-secondary)", margin: "0 0 16px" } as React.CSSProperties,
  blockquote: { margin: "24px 0", paddingLeft: "16px", borderLeft: "3px solid var(--color-border-default)", fontStyle: "italic" as const, color: "var(--color-text-secondary)", fontSize: "var(--text-md)", lineHeight: "24px" } as React.CSSProperties,
  ul: { margin: "0 0 16px", paddingLeft: "24px", color: "var(--color-text-secondary)", fontSize: "var(--text-md)", lineHeight: "24px" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, margin: "16px 0", fontSize: "var(--text-md)" } as React.CSSProperties,
  th: { padding: "8px 16px", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border-default)", textAlign: "left" as const } as React.CSSProperties,
  td: { padding: "8px 16px", color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-subtle)" } as React.CSSProperties,
  tdr: { padding: "8px 16px", color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-bg-surface-layer1)" } as React.CSSProperties,
}

const TYPE_SCALE = [
  { token: "heading-2xl", size: "40", lh: "48", weight: "Bold",     w: "bold" },
  { token: "heading-xl",  size: "32", lh: "40", weight: "Bold",     w: "bold" },
  { token: "heading-lg",  size: "26", lh: "34", weight: "Bold",     w: "bold" },
  { token: "heading-md",  size: "22", lh: "30", weight: "Semibold", w: "semibold" },
  { token: "heading-sm",  size: "18", lh: "26", weight: "Semibold", w: "semibold" },
  { token: "heading-xs",  size: "16", lh: "24", weight: "Semibold", w: "semibold" },
  { token: "lg",          size: "16", lh: "24", weight: "Regular",  w: "regular" },
  { token: "md",          size: "14", lh: "20", weight: "Regular",  w: "regular" },
  { token: "sm",          size: "12", lh: "18", weight: "Regular",  w: "regular" },
  { token: "caption-sm",  size: "10", lh: "16", weight: "Regular",  w: "regular" },
]

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", minWidth: "52px" }}>
      <span style={{ fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}>{label}</span>
      <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{value}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-secondary)", background: "var(--color-bg-surface-layer2)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-xs)", padding: "2px 7px", whiteSpace: "nowrap" as const }}>
      {children}
    </span>
  )
}

export default function TypographyPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Typography"
      toc={TOC}
      lead={
        <>
        Two components — <code>Heading</code> and <code>Text</code> — cover the full type scale.
        Both accept a <code>size</code> prop that maps directly to token names.
        </>
      }
    >

      <DocsPageSection id="prose-demo" title="Prose demo">
      <ComponentPreview layout="block" code={`import { Heading, Text } from "@maxa/ui"

<article>
  <Heading as="h1" size="heading-2xl">
    Automate Design Creation and Delivery with Brand Control
  </Heading>
  <Text size="text-md">MAXA integrates with industry data to auto-create marketing.</Text>

  <Heading as="h2" size="heading-md">We make the marketing team superhuman</Heading>
  <Text size="text-md">
    Scale your team's content creation, eliminate repetitive requests,
    and ensure brand compliance and consistency.
  </Text>
</article>`}>
        <article>
          <Heading as="h1" size="heading-2xl" style={{ margin: "0 0 24px", letterSpacing: "-0.02em" }}>
            Automate Design Creation and Delivery with Brand Control
          </Heading>
          <Text size="text-md" style={{ margin: "0 0 16px" }}>
            MAXA integrates with industry data to auto-create marketing. Scale your team&apos;s content creation, eliminate repetitive requests, and ensure brand compliance and consistency.
          </Text>

          <Heading as="h2" size="heading-md" style={{ ...prose.h2 }}>We make the marketing team superhuman</Heading>
          <Text size="text-md" style={{ margin: "0 0 16px" }}>
            Convert designs into{" "}
            <a href="#" style={{ color: "var(--color-action-primary)", textDecoration: "underline" }}>dynamic, branded templates</a>{" "}
            for sales teams. Used by 1,000+ brands and 50,000+ sales associates.
          </Text>

          <blockquote style={prose.blockquote}>
            &quot;Empowering sales teams to easily create marketing, save time and resources, and ensure brand compliance.&quot;
          </blockquote>

          <Heading as="h2" size="heading-md" style={{ ...prose.h2 }}>Purpose Built for Real Estate</Heading>
          <Text size="text-md" style={{ margin: "0 0 12px" }}>A complete marketing platform built for real estate, mortgage, and lending teams:</Text>
          <ul style={prose.ul}>
            <li>Web to Print + Direct Mailing</li>
            <li>Social Media Mobile App</li>
            <li>Email Marketing with HTML export</li>
            <li>Video Marketing with editing tools</li>
            <li>AI Content Writer + Command Prompts</li>
          </ul>

          <Heading as="h2" size="heading-md" style={{ ...prose.h2 }}>Industry Focus</Heading>
          <Text size="text-md" style={{ margin: "0 0 16px" }}>Recognized as 2025 Top Tech for Brokerages by Inman &amp; T3 Sixty. Rated 5 stars on Google.</Text>

          <table style={prose.table}>
            <thead>
              <tr>
                <th style={prose.th}>Industry</th>
                <th style={prose.th}>Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={prose.td}>Real Estate</td><td style={prose.td}>MLS data + 300+ branded templates</td></tr>
              <tr><td style={prose.tdr}>Mortgage &amp; Lending</td><td style={prose.tdr}>Automated branded documents</td></tr>
              <tr><td style={prose.td}>Title &amp; Partners</td><td style={prose.td}>Compliance approval system</td></tr>
            </tbody>
          </table>
        </article>
      </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection id="heading" title="Heading">
      <p style={descs}>
        <code>size</code> accepts any <code>heading-*</code> token. <code>as</code> sets the HTML element — defaults to <code>h2</code>.
      </p>

      {([
        { size: "heading-2xl", as: "h1", note: "40px · Bold · Display" },
        { size: "heading-xl",  as: "h1", note: "32px · Bold" },
        { size: "heading-lg",  as: "h2", note: "26px · Bold" },
        { size: "heading-md",  as: "h3", note: "22px · Semibold" },
        { size: "heading-sm",  as: "h4", note: "18px · Semibold" },
        { size: "heading-xs",  as: "h5", note: "16px · Semibold" },
      ] as const).map(({ size, as, note }) => (
        <ComponentPreview
          key={size}
          layout="block"
          label={note}
          code={`<Heading as="${as}" size="${size}">${size}</Heading>`}
        >
          <Heading as={as} size={size} style={{ margin: 0 }}>{size}</Heading>
        </ComponentPreview>
      ))}
      </DocsPageSection>

      <DocsPageSection id="text" title="Text">
      <p style={descs}>
        <code>size</code> accepts <code>text-lg</code>, <code>text-md</code>, <code>text-sm</code>, <code>caption-sm</code>, <code>caption-xs</code>.
      </p>

      {([
        { size: "text-lg",    note: "16px · Regular · Lead",    text: "Automate design creation and delivery with brand control." },
        { size: "text-md",    note: "14px · Regular · Body",    text: "Scale your team's content creation, eliminate repetitive requests, and ensure marketing compliance." },
        { size: "text-sm",    note: "12px · Regular · Small",   text: "Convert designs into dynamic, branded templates for sales teams across real estate, mortgage, and lending." },
        { size: "caption-sm", note: "10px · Regular · Caption", text: "Used by 1,000+ brands and 50,000+ sales associates · 5-star Google rating" },
      ] as const).map(({ size, note, text }) => (
        <ComponentPreview
          key={size}
          layout="block"
          label={note}
          code={`<Text size="${size}">${text}</Text>`}
        >
          <Text size={size} style={{ margin: 0 }}>{text}</Text>
        </ComponentPreview>
      ))}
      </DocsPageSection>

      <DocsPageSection id="text-colors" title="Text colors">
      <p style={descs}>Pass a semantic color token to the <code>color</code> prop.</p>

      <ComponentPreview
        layout="block"
        code={`<Text color="primary">primary — main content</Text>
<Text color="secondary">secondary — supporting text</Text>
<Text color="tertiary">tertiary — captions, metadata</Text>
<Text color="disabled">disabled — unavailable</Text>
<Text color="brand">brand — teal accent</Text>
<Text color="success">success — positive feedback</Text>
<Text color="error">error — validation</Text>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {(["primary","secondary","tertiary","disabled","brand","success","error"] as const).map(c => (
            <Text key={c} color={c} size="text-md" style={{ margin: 0 }}>
              <strong style={{ fontWeight: "var(--font-weight-semibold)" as string }}>{c}</strong>
              {" — "}
              {{ primary: "main content", secondary: "supporting text", tertiary: "captions, metadata", disabled: "unavailable", brand: "teal accent", success: "positive feedback", error: "validation" }[c]}
            </Text>
          ))}
        </div>
      </ComponentPreview>
      </DocsPageSection>

      <DocsPageSection id="scale-reference" title="Scale reference">
      <div style={{ borderBottom: "1px solid var(--color-border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "10px" }}>
        <span style={{ fontSize: "var(--text-caption-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Specimen</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Token", "Size", "L/H", "Weight"].map(l => (
            <span key={l} style={{ fontSize: "var(--text-caption-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", minWidth: "52px", textAlign: "right" }}>{l}</span>
          ))}
        </div>
      </div>
      {TYPE_SCALE.map(({ token, size, lh, weight, w }) => (
        <div key={token} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--color-border-subtle)", gap: "24px" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: `var(--text-${token})`, lineHeight: lh + "px", fontWeight: `var(--font-weight-${w})`, color: "var(--color-text-primary)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
            The quick brown fox
          </span>
          <div style={{ display: "flex", gap: "24px", flexShrink: 0 }}>
            <Meta label="token"  value={token} />
            <Meta label="size"   value={size + "px"} />
            <Meta label="l/h"    value={lh + "px"} />
            <Meta label="weight" value={weight} />
          </div>
        </div>
      ))}
      </DocsPageSection>

      <DocsPageSection id="font-families" title="Font families">
      <div style={{ display: "flex", gap: "12px" }}>
        {[
          { name: "Montserrat",  token: "--font-body", role: "Body & UI",   sample: "ABCDEFGHIJKLM\nNOPQRSTUVWXYZ\n0123456789" },
          { name: "Roboto Mono", token: "--font-mono", role: "Code & data", sample: "const x = 42\nfn(a, b) => a + b\n/* comment */" },
        ].map(f => (
          <div key={f.token} style={{ flex: 1, padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-subtle)", background: "var(--color-bg-surface-layer1)", display: "flex", flexDirection: "column", gap: "16px" }}>
            <pre style={{ margin: 0, fontFamily: `var(${f.token})`, fontSize: "var(--text-heading-xs)", lineHeight: "26px", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-semibold)", letterSpacing: "0.04em" }}>{f.sample}</pre>
            <div style={{ borderTop: "1px solid var(--color-border-subtle)", paddingTop: "12px" }}>
              <p style={{ margin: "0 0 2px", fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{f.name}</p>
              <p style={{ margin: "0 0 8px", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{f.role}</p>
              <Tag>{f.token}</Tag>
            </div>
          </div>
        ))}
      </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
