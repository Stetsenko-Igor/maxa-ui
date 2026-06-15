import * as React from "react"
import "./pagination.css"
import { cn } from "../../lib/cn.js"

const Pagination = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Pagination"
      className={cn("maxa-pagination", className)}
      {...props}
    />
  ),
)
Pagination.displayName = "Pagination"

const PaginationList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("maxa-pagination__list", className)} {...props} />
  ),
)
PaginationList.displayName = "PaginationList"

const PaginationItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("maxa-pagination__item", className)} {...props} />
  ),
)
PaginationItem.displayName = "PaginationItem"

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive = false, "aria-current": ariaCurrent, ...props }, ref) => (
    <a
      ref={ref}
      className={["maxa-pagination__link", isActive ? "maxa-pagination__link--active" : "", className]
        .filter(Boolean)
        .join(" ")}
      aria-current={isActive ? "page" : ariaCurrent}
      {...props}
    />
  ),
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ children = "Previous", ...props }, ref) => (
    <PaginationLink ref={ref} className="maxa-pagination__link--text" aria-label="Go to previous page" {...props}>
      <span aria-hidden="true">‹</span>
      {children}
    </PaginationLink>
  ),
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ children = "Next", ...props }, ref) => (
    <PaginationLink ref={ref} className="maxa-pagination__link--text" aria-label="Go to next page" {...props}>
      {children}
      <span aria-hidden="true">›</span>
    </PaginationLink>
  ),
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("maxa-pagination__ellipsis", className)}
      {...props}
    >
      ...
    </span>
  ),
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
}
