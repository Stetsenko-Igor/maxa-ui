"use client"

import * as React from "react"
import { CaretRight } from "@maxa/icons"
import "./breadcrumb.css"
import { cn } from "../../lib/cn.js"

function BreadcrumbSeparatorIcon() {
  return <CaretRight width="100%" height="100%" aria-hidden focusable={false} />
}

const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & {appearance?: "default" | "muted"}>(
  ({ className, appearance = "default", ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("maxa-breadcrumb", appearance === "muted" && "maxa-breadcrumb--muted", className)}
      {...props}
    />
  ),
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("maxa-breadcrumb__list", className)} {...props} />
  ),
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("maxa-breadcrumb__item", className)} {...props} />
  ),
)
BreadcrumbItem.displayName = "BreadcrumbItem"

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** A leading icon before the label — e.g. a Home icon on the root crumb. Optional; most
   *  crumbs have none. */
  iconLeading?: React.ReactNode
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, iconLeading, children, ...props }, ref) => (
    <a ref={ref} className={cn("maxa-breadcrumb__link", className)} {...props}>
      {iconLeading && (
        <span className="maxa-breadcrumb__icon" aria-hidden="true">{iconLeading}</span>
      )}
      {children}
    </a>
  ),
)
BreadcrumbLink.displayName = "BreadcrumbLink"

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** A leading icon before the label — same as BreadcrumbLink's, for when the current (last)
   *  crumb is also the root (a one-level trail). */
  iconLeading?: React.ReactNode
}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, iconLeading, children, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("maxa-breadcrumb__page", className)}
      {...props}
    >
      {iconLeading && (
        <span className="maxa-breadcrumb__icon" aria-hidden="true">{iconLeading}</span>
      )}
      {children}
    </span>
  ),
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, children = <BreadcrumbSeparatorIcon />, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn("maxa-breadcrumb__separator", className)}
      {...props}
    >
      <span className="maxa-breadcrumb__separator-icon">{children}</span>
    </li>
  ),
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      aria-label="More pages"
      type={type}
      className={cn("maxa-breadcrumb__ellipsis", className)}
      {...props}
    >
      ...
    </button>
  ),
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
