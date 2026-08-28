"use client"

import * as React from "react"
import "./avatar-label.css"
import { cn } from "../../lib/cn.js"
import type { AvatarProps, AvatarSize } from "../avatar/avatar.js"

export type AvatarLabelSize = Exclude<AvatarSize, "xs">

interface AvatarLabelCommonProps {
  avatar: React.ReactElement<AvatarProps>
  label: React.ReactNode
  description?: React.ReactNode
  size?: AvatarLabelSize
}

export type AvatarLabelLinkProps = AvatarLabelCommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof AvatarLabelCommonProps> & {
    href: string
  }

export type AvatarLabelStaticProps = AvatarLabelCommonProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof AvatarLabelCommonProps | "href"> & {
    href?: undefined
  }

export type AvatarLabelProps = AvatarLabelLinkProps | AvatarLabelStaticProps

const AvatarLabel = React.forwardRef<
  HTMLAnchorElement | HTMLDivElement,
  AvatarLabelProps
>((props, ref) => {
  const {
    avatar,
    label,
    description,
    size = "sm",
    className,
    href,
    ...restProps
  } = props

  const content = (
    <>
      {React.cloneElement(avatar, { size })}
      <span className="maxa-avatar-label__content">
        <span className="maxa-avatar-label__label">{label}</span>
        {description !== undefined && description !== null && (
          <span className="maxa-avatar-label__description">{description}</span>
        )}
      </span>
    </>
  )

  if (href !== undefined) {
    const anchorProps = restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...anchorProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn("maxa-avatar-label", className)}
        data-interaction="link"
        data-size={size}
      >
        {content}
      </a>
    )
  }

  const divProps = restProps as React.HTMLAttributes<HTMLDivElement>
  return (
    <div
      {...divProps}
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("maxa-avatar-label", className)}
      data-interaction="static"
      data-size={size}
    >
      {content}
    </div>
  )
})
AvatarLabel.displayName = "AvatarLabel"

export { AvatarLabel }
