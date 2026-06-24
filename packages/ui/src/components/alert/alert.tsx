"use client"
import * as React from "react"
import { cva } from "class-variance-authority"

import { CheckCircle, Info, Warning, X, XCircle } from "@maxa/icons"

import { Button } from "../button/index.js"

import "./alert.css"

import type { VariantProps } from "class-variance-authority"
import type { ButtonProps } from "../button/index.js"

const alertVariants = cva("maxa-alert", {
  variants: {
    intent: {
      info:    "maxa-alert--info",
      success: "maxa-alert--success",
      warning: "maxa-alert--warning",
      danger:  "maxa-alert--danger",
    },
  },
  defaultVariants: {
    intent: "info",
  },
})

export type AlertIntent = "info" | "success" | "warning" | "danger"
export type AlertOrientation = "horizontal" | "vertical"
type AlertLayout = "stacked" | "inline"

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  intent?: AlertIntent
  title?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  orientation?: AlertOrientation
}

export interface AlertActionProps extends Omit<ButtonProps, "size" | "iconOnly"> {
  size?: "sm" | "md"
}

const intentIcons: Record<AlertIntent, React.ComponentType<{ "aria-hidden"?: boolean }>> = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  danger: XCircle,
}

const intentRole: Record<AlertIntent, "alert" | "status"> = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
}

const resolveLayout = (orientation: AlertOrientation | undefined, hasTitle: boolean): AlertLayout => {
  if (orientation) return orientation === "vertical" ? "stacked" : "inline"
  return hasTitle ? "stacked" : "inline"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, intent = "info", title, icon, action, dismissible = false, onDismiss, orientation, role, children, ...props }, ref) => {
    const resolvedRole = role ?? intentRole[intent]
    const ariaLive = resolvedRole === "alert" ? "assertive" : "polite"
    const DefaultIcon = intentIcons[intent]
    const iconNode = icon ?? <DefaultIcon aria-hidden />
    const hasTitle = Boolean(title)
    const layout = resolveLayout(orientation, hasTitle)

    const dismissButton = dismissible
      ? <button type="button" className="maxa-alert__dismiss" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); onDismiss?.() }}><X aria-hidden focusable={false} /></button>
      : null

    return (
      <div
        ref={ref}
        className={alertVariants({ intent, className })}
        data-layout={layout}
        role={resolvedRole}
        aria-live={ariaLive}
        {...props}
      >
        <span className="maxa-alert__strip" aria-hidden="true" />

        { layout === "stacked"
          ? (
            <div className="maxa-alert__inner">
              <span className="maxa-alert__icon" aria-hidden="true">{iconNode}</span>
              <div className="maxa-alert__content">
                {hasTitle && <div className="maxa-alert__title">{title}</div>}
                {children && <div className="maxa-alert__body">{children}</div>}
                {action && <div className="maxa-alert__action-row">{action}</div>}
              </div>
              {dismissButton}
            </div>
          )
          : (
            <div className="maxa-alert__inner">
              <span className="maxa-alert__icon" aria-hidden="true">{iconNode}</span>
              <div className="maxa-alert__content">
                {hasTitle && <div className="maxa-alert__title">{title}</div>}
                {children && <div className="maxa-alert__body">{children}</div>}
              </div>
              {(action || dismissible) && (
                <div className="maxa-alert__right">
                  {action && <div className="maxa-alert__action-slot">{action}</div>}
                  {dismissButton}
                </div>
              )}
            </div>
          )
        }
      </div>
    )
  },
)

Alert.displayName = "Alert"

// AlertAction — thin wrapper over Button. Alert's CSS overrides Button's color
// tokens depending on data-layout="inline" (outline style) or "stacked" (filled).
const AlertAction = React.forwardRef<HTMLButtonElement, AlertActionProps>(
  ({ className, variant = "outline", size = "sm", children, ...props }, ref) => (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      className={`maxa-alert__action${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Button>
  ),
)

AlertAction.displayName = "AlertAction"

export { Alert, AlertAction, alertVariants }
