"use client"

import * as React from "react"
import type { ToastProps, ToastIntent } from "./toast"

// Module-level state — works outside React tree (shadcn pattern)

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 150  // ms after close animation before removal

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}>

export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  intent?: ToastIntent
}

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

interface State {
  toasts: ToasterToast[]
}

let count = 0
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function scheduleRemove(id: string) {
  if (toastTimeouts.has(id)) return
  const t = setTimeout(() => {
    toastTimeouts.delete(id)
    dispatch({ type: "REMOVE_TOAST", toastId: id })
  }, TOAST_REMOVE_DELAY)
  toastTimeouts.set(id, t)
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "UPDATE_TOAST":
      return {
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        scheduleRemove(toastId)
      } else {
        state.toasts.forEach((t) => scheduleRemove(t.id))
      }
      return {
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { toasts: [] }
      return { toasts: state.toasts.filter((t) => t.id !== action.toastId) }
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((l) => l(memoryState))
}

type ToastInput = Omit<ToasterToast, "id">

function toast(input: ToastInput) {
  const id = genId()
  const update = (partial: Partial<ToasterToast>) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...partial, id } })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...input,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return { id, update, dismiss }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const idx = listeners.indexOf(setState)
      if (idx > -1) listeners.splice(idx, 1)
    }
  }, [])

  return {
    toasts: state.toasts,
    toast,
    dismiss: (toastId?: string) => {
    if (toastId !== undefined) {
      dispatch({ type: "DISMISS_TOAST", toastId })
    } else {
      dispatch({ type: "DISMISS_TOAST" })
    }
  },
  }
}
