export default function Home() {
  return (
    <main
      style={{
        background: "var(--color-bg-default)",
        minHeight: "100vh",
        padding: "var(--spacing-8)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <h1 style={{ color: "var(--color-content-primary)", marginBottom: "var(--spacing-6)" }}>
        MAXA UI Tokens ✓
      </h1>

      <div
        style={{
          display: "inline-block",
          background: "var(--color-action-primary-normal)",
          color: "var(--color-content-on-brand)",
          padding: "var(--spacing-3) var(--spacing-6)",
          borderRadius: "var(--radius-md)",
          marginBottom: "var(--spacing-4)",
        }}
      >
        Primary Button — teal (#2C9A85)
      </div>

      <div
        style={{
          background: "var(--color-bg-error-subtle)",
          border: "1px solid var(--color-border-error-strong)",
          color: "var(--color-content-error)",
          padding: "var(--spacing-3) var(--spacing-4)",
          borderRadius: "var(--radius-sm)",
          marginBottom: "var(--spacing-4)",
        }}
      >
        Error state — red subtle bg, red border, red text
      </div>

      <div
        style={{
          background: "var(--color-bg-surface-layer1)",
          border: "1px solid var(--color-border-default)",
          color: "var(--color-content-secondary)",
          padding: "var(--spacing-4)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        Card surface — gray-50 bg, gray-300 border
      </div>
    </main>
  )
}
