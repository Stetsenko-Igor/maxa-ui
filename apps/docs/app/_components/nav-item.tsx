"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface NavItemProps {
  href: string
  label: string
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
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
    </Link>
  )
}
