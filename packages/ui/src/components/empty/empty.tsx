import * as React from "react"
import "./empty.css"
import { cn } from "../../lib/cn.js"

export type EmptySize = "sm" | "md" | "lg"

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  size?: EmptySize
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      className,
      icon,
      title,
      description,
      action,
      secondaryAction,
      size = "md",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("maxa-empty", `maxa-empty--${size}`, className)}
      {...props}
    >
      {icon && <div className="maxa-empty__icon" aria-hidden="true">{icon}</div>}
      <div className="maxa-empty__content">
        <h3 className="maxa-empty__title">{title}</h3>
        {description && <p className="maxa-empty__description">{description}</p>}
      </div>
      {(action || secondaryAction) && (
        <div className="maxa-empty__actions">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  ),
)

Empty.displayName = "Empty"

export { Empty }
