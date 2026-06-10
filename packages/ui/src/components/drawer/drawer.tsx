"use client"

import * as React from "react"
import "./drawer.css"

type DrawerContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

export interface DrawerProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type DrawerSide = "left" | "right" | "top" | "bottom"
export type DrawerSize = "sm" | "md" | "lg"

function useDrawer() {
  const context = React.useContext(DrawerContext)
  if (!context) throw new Error("Drawer components must be used within Drawer")
  return context
}

function Drawer({ children, defaultOpen = false, open: controlledOpen, onOpenChange }: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const titleId = React.useId()
  const descriptionId = React.useId()
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = React.useCallback((nextOpen: boolean) => {
    onOpenChange?.(nextOpen)
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen)
  }, [controlledOpen, onOpenChange])

  return (
    <DrawerContext.Provider value={{ open, setOpen, titleId, descriptionId }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { setOpen } = useDrawer()
    return (
      <button
        ref={ref}
        type="button"
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) setOpen(true)
        }}
        {...props}
      />
    )
  },
)
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { setOpen } = useDrawer()
    return (
      <div
        ref={ref}
        className={["maxa-drawer__overlay", className].filter(Boolean).join(" ")}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) setOpen(false)
        }}
        {...props}
      />
    )
  },
)
DrawerOverlay.displayName = "DrawerOverlay"

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: DrawerSide
  size?: DrawerSize
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, side = "right", size = "md", role = "dialog", onKeyDown, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useDrawer()
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const returnFocusRef = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
      if (!open) return
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

      const content = contentRef.current
      const firstFocusable = content?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      ;(firstFocusable ?? content)?.focus()

      return () => {
        returnFocusRef.current?.focus()
        returnFocusRef.current = null
      }
    }, [open])

    if (!open) return null

    return (
      <div className="maxa-drawer__portal">
        <DrawerOverlay />
        <div
          ref={(node) => {
            contentRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
          }}
          role={role}
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          data-side={side}
          data-size={size}
          className={["maxa-drawer__content", className].filter(Boolean).join(" ")}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (!event.defaultPrevented && event.key === "Escape") setOpen(false)
            if (event.defaultPrevented || event.key !== "Tab") return

            const focusable = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
            ).filter((element) => {
              const style = window.getComputedStyle(element)
              return !element.hasAttribute("disabled")
                && !element.hidden
                && style.display !== "none"
                && style.visibility !== "hidden"
            })

            if (focusable.length === 0) {
              event.preventDefault()
              event.currentTarget.focus()
              return
            }

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (!first || !last) return

            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first.focus()
            }
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  },
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-drawer__header", className].filter(Boolean).join(" ")} {...props} />
  ),
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDrawer()
    return <h2 ref={ref} id={titleId} className={["maxa-drawer__title", className].filter(Boolean).join(" ")} {...props} />
  },
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDrawer()
    return <p ref={ref} id={descriptionId} className={["maxa-drawer__description", className].filter(Boolean).join(" ")} {...props} />
  },
)
DrawerDescription.displayName = "DrawerDescription"

const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-drawer__body", className].filter(Boolean).join(" ")} {...props} />
  ),
)
DrawerBody.displayName = "DrawerBody"

const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-drawer__footer", className].filter(Boolean).join(" ")} {...props} />
  ),
)
DrawerFooter.displayName = "DrawerFooter"

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inline?: boolean
}

const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, children = "×", inline, onClick, ...props }, ref) => {
    const { setOpen } = useDrawer()
    return (
      <button
        ref={ref}
        type="button"
        data-inline={inline || undefined}
        className={["maxa-drawer__close", className].filter(Boolean).join(" ")}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) setOpen(false)
        }}
        {...props}
      >
        {children}
      </button>
    )
  },
)
DrawerClose.displayName = "DrawerClose"

export {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
}
