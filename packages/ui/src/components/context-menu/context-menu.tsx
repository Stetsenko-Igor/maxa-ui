"use client"

import * as React from "react"
import "./context-menu.css"

type ContextMenuState = { open: boolean; x: number; y: number }
type ContextMenuContextValue = ContextMenuState & {
  setState: React.Dispatch<React.SetStateAction<ContextMenuState>>
}

const ContextMenuContext = React.createContext<ContextMenuContextValue | null>(null)

function useContextMenu() {
  const context = React.useContext(ContextMenuContext)
  if (!context) throw new Error("ContextMenu components must be used within ContextMenu")
  return context
}

function ContextMenu({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ContextMenuState>({ open: false, x: 0, y: 0 })

  React.useEffect(() => {
    if (!state.open) return
    const close = () => setState((current) => ({ ...current, open: false }))
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("click", close)
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      window.removeEventListener("click", close)
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [state.open])

  return <ContextMenuContext.Provider value={{ ...state, setState }}>{children}</ContextMenuContext.Provider>
}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ onContextMenu, ...props }, ref) => {
    const { setState } = useContextMenu()
    return (
      <div
        ref={ref}
        tabIndex={0}
        onContextMenu={(event) => {
          onContextMenu?.(event)
          if (event.defaultPrevented) return
          event.preventDefault()
          setState({ open: true, x: event.clientX, y: event.clientY })
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return
          event.preventDefault()
          const rect = event.currentTarget.getBoundingClientRect()
          setState({ open: true, x: rect.left, y: rect.bottom })
        }}
        {...props}
      />
    )
  },
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

const ContextMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const { open, x, y } = useContextMenu()
    if (!open) return null
    return (
      <div
        ref={ref}
        role="menu"
        className={["maxa-context-menu", className].filter(Boolean).join(" ")}
        style={{ left: x, top: y, ...style }}
        {...props}
      />
    )
  },
)
ContextMenuContent.displayName = "ContextMenuContent"

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  variant?: "default" | "destructive"
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, disabled, variant = "default", onClick, ...props }, ref) => {
    const { setState } = useContextMenu()
    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        className={[
          "maxa-context-menu__item",
          variant === "destructive" ? "maxa-context-menu__item--destructive" : "",
          className,
        ].filter(Boolean).join(" ")}
        onClick={(event) => {
          if (disabled) return
          onClick?.(event)
          if (!event.defaultPrevented) setState((current) => ({ ...current, open: false }))
        }}
        onKeyDown={(event) => {
          if (disabled || (event.key !== "Enter" && event.key !== " ")) return
          event.preventDefault()
          event.currentTarget.click()
        }}
        {...props}
      />
    )
  },
)
ContextMenuItem.displayName = "ContextMenuItem"

const ContextMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-context-menu__label", className].filter(Boolean).join(" ")} {...props} />
  ),
)
ContextMenuLabel.displayName = "ContextMenuLabel"

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={["maxa-context-menu__separator", className].filter(Boolean).join(" ")} {...props} />
  ),
)
ContextMenuSeparator.displayName = "ContextMenuSeparator"

const ContextMenuShortcut = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={["maxa-context-menu__shortcut", className].filter(Boolean).join(" ")} {...props} />
  ),
)
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
}
