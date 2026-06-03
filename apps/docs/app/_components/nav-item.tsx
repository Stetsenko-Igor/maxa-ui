"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface NavItemProps {
  href: string
  label: string
  isNew?: boolean
}

export function NavItem({ href, label, isNew }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderRadius: "var(--radius-sm)",
        fontSize: "var(--text-sm)",
        lineHeight: "20px",
        fontWeight: "var(--font-weight-semibold)",
        color: isActive ? "var(--color-action-primary)" : "var(--color-text-secondary)",
        background: isActive || hovered ? "var(--color-bg-muted)" : "transparent",
        textDecoration: "none",
        transition: "background 100ms ease, color 100ms ease",
      }}
    >
      {label}
      {isNew && (
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "10px",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-success)",
          lineHeight: 1,
        }}>
          <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" fill="currentColor" />
          </svg>
          New
        </span>
      )}
    </Link>
  )
}
