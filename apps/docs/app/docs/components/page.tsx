import type { Metadata } from "next"
import Link from "next/link"
import { Button, DatePicker, Input, Select } from "@maxa/ui"
import { DocsPageLayout, DocsPageSection } from "../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Components — MAXA UI" }
const TOC = [{ href: "#catalog", label: "Catalog" }]

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
}

const card: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "260px",
  padding: "20px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border-subtle)",
  background: "var(--color-bg-surface-layer1)",
  textDecoration: "none",
}

const eyebrow: React.CSSProperties = {
  fontSize: "var(--text-caption-sm)",
  color: "var(--color-text-tertiary)",
  margin: "0 0 8px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontWeight: "var(--font-weight-semibold)",
}

const title: React.CSSProperties = {
  fontSize: "var(--text-heading-xs)",
  lineHeight: "24px",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
  margin: "0 0 8px",
}

const description: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  lineHeight: "20px",
  color: "var(--color-text-secondary)",
  margin: "0",
}

const preview: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "112px",
  marginTop: "24px",
  padding: "16px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border-subtle)",
  background: "var(--color-bg-surface-layer2)",
}

const footer: React.CSSProperties = {
  marginTop: "auto",
  paddingTop: "20px",
  fontSize: "var(--text-sm)",
  color: "var(--color-action-primary)",
  fontWeight: "var(--font-weight-semibold)",
}

export default function ComponentsPage() {
  return (
    <DocsPageLayout
      eyebrow="Catalog"
      title="Components"
      toc={TOC}
      lead={
        <>
        The current approved component set is intentionally small: Button for
        actions and Input for text entry. Both use component-level tokens,
        typed React APIs, and documentation examples.
        </>
      }
    >
      <DocsPageSection id="catalog" title="Catalog" description="Approved components are documented in the same centered layout as the newest pages, with previews that stretch and stay readable across screen sizes.">
        <div style={grid}>
        <Link href="/docs/components/button" style={card}>
          <p style={eyebrow}>Action</p>
          <h2 style={title}>Button</h2>
          <p style={description}>
            Seven variants, four sizes, icon support, loading state, and
            polymorphic rendering with asChild.
          </p>
          <div style={preview}>
            <Button variant="primary">Create item</Button>
          </div>
          <span style={footer}>View Button</span>
        </Link>

        <Link href="/docs/components/input" style={card}>
          <p style={eyebrow}>Form</p>
          <h2 style={title}>Input</h2>
          <p style={description}>
            Label, hint text, icons, validation states, disabled state, and
            three size options.
          </p>
          <div style={preview}>
            <div style={{ width: "100%", maxWidth: "280px" }}>
              <Input label="Email" placeholder="you@example.com" />
            </div>
          </div>
          <span style={footer}>View Input</span>
        </Link>

        <Link href="/docs/components/select" style={card}>
          <p style={eyebrow}>Form</p>
          <h2 style={title}>Select</h2>
          <p style={description}>
            Input-like field with a chevron for choosing one value from a known list.
          </p>
          <div style={preview}>
            <div style={{ width: "100%", maxWidth: "280px" }}>
              <Select label="Dropdown" defaultValue="">
                <option value="" disabled>Placeholder</option>
                <option>One</option>
              </Select>
            </div>
          </div>
          <span style={footer}>View Select</span>
        </Link>

        <Link href="/docs/components/date-picker" style={card}>
          <p style={eyebrow}>Form</p>
          <h2 style={title}>Date Picker</h2>
          <p style={description}>
            Single-date and range-date fields with shared form composition.
          </p>
          <div style={preview}>
            <div style={{ width: "100%", maxWidth: "280px" }}>
              <DatePicker label="Date Picker" />
            </div>
          </div>
          <span style={footer}>View Date Picker</span>
        </Link>
        </div>
      </DocsPageSection>
    </DocsPageLayout>
  )
}
