"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItemProps {
  href: string
  label: string
}

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "5px 12px",
        borderRadius: "var(--radius-sm)",
        fontSize: "var(--text-sm)",
        lineHeight: "20px",
        fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
        color: isActive ? "var(--color-action-primary)" : "var(--color-text-secondary)",
        background: isActive ? "var(--color-action-primary-subtle)" : "transparent",
        textDecoration: "none",
        transition: "background 100ms ease, color 100ms ease",
      }}
    >
      {label}
    </Link>
  )
}
