import { OnThisPage, type TocItem } from "./on-this-page"
import { PageActions, type AdjacentPage } from "./page-actions"

interface ComponentPageProps {
  children: React.ReactNode
  eyebrow?: string
  githubHref?: string
  lead: React.ReactNode
  markdown?: string
  next?: AdjacentPage | undefined
  previous?: AdjacentPage | undefined
  title: string
  toc: TocItem[]
}

export function ComponentPage({
  children,
  eyebrow = "Components",
  githubHref,
  lead,
  markdown,
  next,
  previous,
  title,
  toc,
}: ComponentPageProps) {
  return (
    <div className="docs-component-page">
      <article className="docs-component-content">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "12px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-tertiary)",
                margin: "0 0 8px",
              }}
            >
              {eyebrow}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <h1
                style={{
                  fontSize: "var(--text-heading-lg)",
                  lineHeight: "34px",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-text-primary)",
                  margin: 0,
                  letterSpacing: 0,
                }}
              >
                {title}
              </h1>
              {githubHref && (
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    height: "26px",
                    padding: "0 9px",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-full)",
                    color: "var(--color-text-secondary)",
                    background: "var(--color-bg-surface-layer1)",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-semibold)",
                    textDecoration: "none",
                  }}
                >
                  GitHub
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              )}
            </div>
          </div>
          {markdown && <PageActions markdown={markdown} next={next} previous={previous} title={title} />}
        </div>
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

interface DocsSectionProps {
  children: React.ReactNode
  description?: React.ReactNode
  id: string
  title: string
}

export function DocsSection({ children, description, id, title }: DocsSectionProps) {
  return (
    <section id={id} style={{ scrollMarginTop: "96px", marginTop: "48px" }}>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--color-border-subtle)",
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

interface DocsExampleProps {
  children: React.ReactNode
  description?: React.ReactNode
  title: string
}

export function DocsExample({ children, description, title }: DocsExampleProps) {
  return (
    <div style={{ marginTop: "24px" }}>
      <h3
        style={{
          fontSize: "var(--text-md)",
          lineHeight: "20px",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-primary)",
          margin: "0 0 6px",
          letterSpacing: 0,
        }}
      >
        {title}
      </h3>
      {description && (
        <div
          style={{
            maxWidth: "720px",
            fontSize: "var(--text-sm)",
            lineHeight: "20px",
            color: "var(--color-text-tertiary)",
            margin: "0 0 12px",
          }}
        >
          {description}
        </div>
      )}
      {children}
    </div>
  )
}
