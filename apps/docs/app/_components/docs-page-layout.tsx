import { OnThisPage, type TocItem } from "./on-this-page"

interface DocsPageLayoutProps {
  children: React.ReactNode
  eyebrow: string
  lead: React.ReactNode
  title: string
  toc?: TocItem[]
}

export function DocsPageLayout({
  children,
  eyebrow,
  lead,
  title,
  toc = [],
}: DocsPageLayoutProps) {
  return (
    <div className="docs-component-page">
      <article className="docs-component-content">
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-tertiary)",
            margin: "0 0 8px",
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: "var(--text-heading-lg)",
            lineHeight: "34px",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-text-primary)",
            margin: "0 0 12px",
            letterSpacing: 0,
          }}
        >
          {title}
        </h1>
        <div
          style={{
            maxWidth: "760px",
            fontSize: "var(--text-md)",
            lineHeight: "24px",
            color: "var(--color-text-secondary)",
            margin: "0 0 32px",
          }}
        >
          {lead}
        </div>
        {children}
      </article>
      <OnThisPage items={toc} />
    </div>
  )
}

interface DocsPageSectionProps {
  children: React.ReactNode
  description?: React.ReactNode
  id: string
  title: string
}

export function DocsPageSection({
  children,
  description,
  id,
  title,
}: DocsPageSectionProps) {
  return (
    <section id={id} style={{ scrollMarginTop: "96px", marginTop: "48px" }}>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--color-border-secondary)",
          margin: "0 0 28px",
        }}
      />
      <h2
        style={{
          fontSize: "var(--text-heading-xs)",
          lineHeight: "24px",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-primary)",
          margin: "0 0 8px",
          letterSpacing: 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <div
          style={{
            maxWidth: "760px",
            fontSize: "var(--text-md)",
            lineHeight: "24px",
            color: "var(--color-text-secondary)",
            margin: "0 0 16px",
          }}
        >
          {description}
        </div>
      )}
      {children}
    </section>
  )
}
