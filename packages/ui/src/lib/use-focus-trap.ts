import * as React from "react"

export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

function getVisibleFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => {
      const style = window.getComputedStyle(element)
      return (
        !element.hasAttribute("disabled") &&
        !element.hidden &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      )
    },
  )
}

interface UseFocusTrapOptions {
  onEscape?: () => void
}

interface UseFocusTrapResult {
  onKeyDown: (event: React.KeyboardEvent) => void
}

export function useFocusTrap(
  contentRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  options: UseFocusTrapOptions = {},
): UseFocusTrapResult {
  const returnFocusRef = React.useRef<HTMLElement | null>(null)
  const { onEscape } = options

  React.useEffect(() => {
    if (!open) return
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const content = contentRef.current
    const firstFocusable = content ? getVisibleFocusable(content)[0] : undefined
    ;(firstFocusable ?? content)?.focus()

    return () => {
      returnFocusRef.current?.focus()
      returnFocusRef.current = null
    }
  }, [open, contentRef])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.defaultPrevented && event.key === "Escape") {
        onEscape?.()
        return
      }
      if (event.defaultPrevented || event.key !== "Tab") return

      const focusable = getVisibleFocusable(event.currentTarget as HTMLElement)

      if (focusable.length === 0) {
        event.preventDefault()
        ;(event.currentTarget as HTMLElement).focus()
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
    },
    [onEscape],
  )

  return { onKeyDown }
}
