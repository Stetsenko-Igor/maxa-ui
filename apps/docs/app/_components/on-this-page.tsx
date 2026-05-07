"use client"

import { useEffect, useState } from "react"

export interface TocItem {
  href: string
  label: string
}

interface OnThisPageProps {
  items: TocItem[]
}

export function OnThisPage({ items }: OnThisPageProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "")

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((node): node is HTMLElement => Boolean(node))

    if (headings.length === 0) return

    let frame = 0

    const updateActive = () => {
      const offset = 128
      const current = headings.reduce((active, heading) => {
        const top = heading.getBoundingClientRect().top
        if (top <= offset) return heading
        return active
      }, headings[0] ?? headings[headings.length - 1])

      if (current) setActiveHref(`#${current.id}`)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActive)
    }

    updateActive()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items])

  if (items.length === 0) return null

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.getElementById(href.replace("#", ""))
    if (!target) return

    event.preventDefault()
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
    window.history.pushState(null, "", href)
  }

  return (
    <nav
      aria-label="On this page"
      className="docs-on-this-page"
    >
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-text-primary)",
        }}
      >
        On this page
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item) => {
          const isActive = activeHref === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => handleClick(event, item.href)}
              style={{
                fontSize: "var(--text-sm)",
                lineHeight: "18px",
                color: isActive ? "var(--color-action-primary)" : "var(--color-text-tertiary)",
                textDecoration: "none",
                fontWeight: isActive ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
              }}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
