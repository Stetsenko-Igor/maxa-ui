import type { Metadata } from "next"
import { DocsPageLayout, DocsPageSection } from "../../../_components/docs-page-layout"

export const metadata: Metadata = { title: "Spacing — MAXA UI" }
const TOC = [{ href: "#scale", label: "Scale" }]

const SCALE = [
  { name: "none",  css: "--spacing-none",  px: 0,   tailwind: "0" },
  { name: "xxs",   css: "--spacing-xxs",   px: 2,   tailwind: "0.5" },
  { name: "xs",    css: "--spacing-xs",    px: 4,   tailwind: "1" },
  { name: "sm",    css: "--spacing-sm",    px: 6,   tailwind: "1.5" },
  { name: "md",    css: "--spacing-md",    px: 8,   tailwind: "2" },
  { name: "lg",    css: "--spacing-lg",    px: 12,  tailwind: "3" },
  { name: "xl",    css: "--spacing-xl",    px: 16,  tailwind: "4" },
  { name: "2xl",   css: "--spacing-2xl",   px: 20,  tailwind: "5" },
  { name: "3xl",   css: "--spacing-3xl",   px: 24,  tailwind: "6" },
  { name: "4xl",   css: "--spacing-4xl",   px: 32,  tailwind: "8" },
  { name: "5xl",   css: "--spacing-5xl",   px: 40,  tailwind: "10" },
  { name: "6xl",   css: "--spacing-6xl",   px: 48,  tailwind: "12" },
  { name: "7xl",   css: "--spacing-7xl",   px: 64,  tailwind: "16" },
  { name: "8xl",   css: "--spacing-8xl",   px: 80,  tailwind: "20" },
  { name: "9xl",   css: "--spacing-9xl",   px: 96,  tailwind: "24" },
  { name: "10xl",  css: "--spacing-10xl",  px: 128, tailwind: "32" },
  { name: "11xl",  css: "--spacing-11xl",  px: 160, tailwind: "40" },
]

const MAX_BAR = 160

export default function SpacingPage() {
  return (
    <DocsPageLayout
      eyebrow="Foundations"
      title="Spacing"
      toc={TOC}
      lead={<>17-step scale from 0 to 160px. Use semantic token names in component code, never raw pixel values.</>}
    >
      <DocsPageSection id="scale" title="Scale">
      <div style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 60px", gap: "0 16px", padding: "8px 16px", background: "var(--color-bg-surface-layer2)", borderRadius: "var(--radius-sm) var(--radius-sm) 0 0", border: "1px solid var(--color-border-subtle)", borderBottom: "none" }}>
        {["Token", "CSS var", "Visual", "px"].map(h => (
          <span key={h} style={{ fontSize: "var(--text-caption-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</span>
        ))}
      </div>

      {SCALE.map(({ name, css, px }, i) => (
        <div key={name} style={{ display: "grid", gridTemplateColumns: "80px 160px 1fr 60px", gap: "0 16px", alignItems: "center", padding: "10px 16px", border: "1px solid var(--color-border-subtle)", borderTop: i === 0 ? "1px solid var(--color-border-subtle)" : "none", borderRadius: i === SCALE.length - 1 ? "0 0 var(--radius-sm) var(--radius-sm)" : 0 }}>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-medium)" }}>{name}</code>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-sm)", color: "var(--color-text-tertiary)" }}>{css}</code>
          <div style={{ height: "16px", display: "flex", alignItems: "center" }}>
            {px > 0 && (
              <div style={{ height: "8px", width: `${(px / MAX_BAR) * 100}%`, minWidth: px > 0 ? "2px" : 0, background: "var(--color-action-primary)", borderRadius: "var(--radius-xxs)" }} />
            )}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)", textAlign: "right" }}>{px}px</span>
        </div>
      ))}
      </DocsPageSection>
    </DocsPageLayout>
  )
}
