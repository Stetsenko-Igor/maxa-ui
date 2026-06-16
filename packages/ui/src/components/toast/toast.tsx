"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import "./toast.css"
import { cn } from "../../lib/cn.js"

export type ToastIntent = "neutral" | "info" | "success" | "warning" | "error"

// ── Provider & Viewport ───────────────────────────────────────────────────

const ToastProvider = ToastPrimitives.Provider
ToastProvider.displayName = "ToastProvider"

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn("maxa-toast__viewport", className)}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

// ── Root ──────────────────────────────────────────────────────────────────

const toastVariants = cva("maxa-toast", {
  variants: {
    intent: {
      neutral: "maxa-toast--neutral",
      info:    "maxa-toast--info",
      success: "maxa-toast--success",
      warning: "maxa-toast--warning",
      error:   "maxa-toast--error",
    },
  },
  defaultVariants: { intent: "neutral" },
})

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, intent, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={toastVariants({ intent, className })}
    {...props}
  />
))
Toast.displayName = "Toast"

// ── Sub-parts ─────────────────────────────────────────────────────────────

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("maxa-toast__title", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("maxa-toast__description", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn("maxa-toast__action", className)}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn("maxa-toast__close", className)}
    aria-label="Dismiss notification"
    toast-close=""
    {...props}
  />
))
ToastClose.displayName = "ToastClose"

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
}
export type { ToastActionElement } from "./use-toast.js"
