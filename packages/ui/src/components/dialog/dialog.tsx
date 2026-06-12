"use client"

import * as React from "react"
import "./dialog.css"

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

export interface DialogProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error("Dialog components must be used within Dialog")
  return context
}

function Dialog({ children, defaultOpen = false, open: controlledOpen, onOpenChange }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const titleId = React.useId()
  const descriptionId = React.useId()
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = React.useCallback((nextOpen: boolean) => {
    onOpenChange?.(nextOpen)
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen)
  }, [controlledOpen, onOpenChange])

  return (
    <DialogContext.Provider value={{ open, setOpen, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { setOpen } = useDialog()
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
DialogTrigger.displayName = "DialogTrigger"

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onClick, ...props }, ref) => {
    const { setOpen } = useDialog()
    return (
      <div
        ref={ref}
        className={["maxa-dialog__overlay", className].filter(Boolean).join(" ")}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) setOpen(false)
        }}
        {...props}
      />
    )
  },
)
DialogOverlay.displayName = "DialogOverlay"

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, size = "md", role = "dialog", onKeyDown, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId } = useDialog()
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
      <div className="maxa-dialog__portal">
        <DialogOverlay />
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
          className={["maxa-dialog__content", `maxa-dialog__content--${size}`, className].filter(Boolean).join(" ")}
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
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-dialog__header", className].filter(Boolean).join(" ")} {...props} />
  ),
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDialog()
    return <h2 ref={ref} id={titleId} className={["maxa-dialog__title", className].filter(Boolean).join(" ")} {...props} />
  },
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDialog()
    return <p ref={ref} id={descriptionId} className={["maxa-dialog__description", className].filter(Boolean).join(" ")} {...props} />
  },
)
DialogDescription.displayName = "DialogDescription"

const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-dialog__body", className].filter(Boolean).join(" ")} {...props} />
  ),
)
DialogBody.displayName = "DialogBody"

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={["maxa-dialog__footer", className].filter(Boolean).join(" ")} {...props} />
  ),
)
DialogFooter.displayName = "DialogFooter"

export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inline?: boolean
}

const closeIcon = (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 5l10 10M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children = closeIcon, inline, onClick, ...props }, ref) => {
    const { setOpen } = useDialog()
    return (
      <button
        ref={ref}
        type="button"
        data-inline={inline || undefined}
        className={["maxa-dialog__close", className].filter(Boolean).join(" ")}
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
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
