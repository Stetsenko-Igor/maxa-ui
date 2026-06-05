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
  borderBottom: "1px solid var(--color-border-secondary)",
  verticalAlign: "top",
}

const headCellStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontSize: "var(--text-caption-sm)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-tertiary)",
  background: "var(--color-bg-muted)",
  borderBottom: "1px solid var(--color-border-secondary)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  textAlign: "left" as const,
  verticalAlign: "middle",
}

const codeStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-sm)",
  background: "var(--color-bg-muted)",
  padding: "1px 6px",
  borderRadius: "var(--radius-xs)",
  color: "var(--color-text-primary)",
  whiteSpace: "normal",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="docs-props-table">
      <style>{`
        .docs-props-table {
          border: 1px solid var(--color-border-secondary);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .docs-props-table table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
        }

        .docs-props-table td::before {
          display: none;
        }

        @media (max-width: 640px) {
          .docs-props-table table,
          .docs-props-table thead,
          .docs-props-table tbody,
          .docs-props-table tr,
          .docs-props-table th,
          .docs-props-table td {
            display: block;
            width: 100% !important;
          }

          .docs-props-table thead {
            display: none;
          }

          .docs-props-table tr {
            padding: 10px 0;
            border-bottom: 1px solid var(--color-border-secondary);
          }

          .docs-props-table tr:last-child {
            border-bottom: 0;
          }

          .docs-props-table td {
            display: grid;
            grid-template-columns: 92px minmax(0, 1fr);
            gap: 12px;
            border-bottom: 0 !important;
            padding-block: 6px !important;
          }

          .docs-props-table td::before {
            content: attr(data-label);
            display: block;
            font-size: var(--text-caption-sm);
            font-weight: var(--font-weight-semibold);
            color: var(--color-text-tertiary);
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }
        }
      `}</style>
      <table>
        <thead>
          <tr>
            <th style={{ ...headCellStyle, width: "20%" }}>Prop</th>
            <th style={{ ...headCellStyle, width: "26%" }}>Type</th>
            <th style={{ ...headCellStyle, width: "16%" }}>Default</th>
            <th style={headCellStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td style={cellStyle} data-label="Prop">
                <code style={codeStyle}>{prop.name}</code>
              </td>
              <td style={cellStyle} data-label="Type">
                <code style={{ ...codeStyle, color: "var(--color-action-primary)" }}>{prop.type}</code>
              </td>
              <td style={cellStyle} data-label="Default">
                {prop.default ? (
                  <code style={codeStyle}>{prop.default}</code>
                ) : (
                  <span style={{ color: "var(--color-text-tertiary)" }}>—</span>
                )}
              </td>
              <td style={cellStyle} data-label="Description">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
