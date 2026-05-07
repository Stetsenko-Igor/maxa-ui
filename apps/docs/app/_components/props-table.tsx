interface Prop {
  name: string
  type: string
  default?: string | undefined
  description: string
}

interface PropsTableProps {
  props: Prop[]
}

const cellStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-secondary)",
  borderBottom: "1px solid var(--color-border-subtle)",
  verticalAlign: "top",
}

const headCellStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontSize: "var(--text-caption-sm)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-tertiary)",
  background: "var(--color-bg-surface-layer2)",
  borderBottom: "1px solid var(--color-border-subtle)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  textAlign: "left" as const,
  verticalAlign: "middle",
}

const codeStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-sm)",
  background: "var(--color-bg-surface-layer2)",
  padding: "1px 6px",
  borderRadius: "var(--radius-xs)",
  color: "var(--color-text-primary)",
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-md)",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <table style={{ width: "100%", minWidth: "46rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...headCellStyle, width: "140px" }}>Prop</th>
            <th style={{ ...headCellStyle, width: "180px" }}>Type</th>
            <th style={{ ...headCellStyle, width: "100px" }}>Default</th>
            <th style={headCellStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td style={cellStyle}>
                <code style={codeStyle}>{prop.name}</code>
              </td>
              <td style={cellStyle}>
                <code style={{ ...codeStyle, color: "var(--color-action-primary)" }}>{prop.type}</code>
              </td>
              <td style={cellStyle}>
                {prop.default ? (
                  <code style={codeStyle}>{prop.default}</code>
                ) : (
                  <span style={{ color: "var(--color-text-tertiary)" }}>—</span>
                )}
              </td>
              <td style={cellStyle}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
