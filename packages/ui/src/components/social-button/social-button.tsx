"use client"

import * as React from "react"
import { social } from "@maxa/icons"
import "./social-button.css"
import { cn } from "../../lib/cn.js"

export interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider:
    | "apple"
    | "facebook"
    | "github"
    | "google"
    | "instagram"
    | "linkedin"
    | "pinterest"
    | "reddit"
    | "telegram"
    | "tiktok"
    | "twitter"
    | "whatsapp"
    | "x"
    | "youtube"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  icon?: React.ReactNode
  label?: string
}

const providerLabel = {
  apple: "Apple",
  facebook: "Facebook",
  github: "GitHub",
  google: "Google",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  pinterest: "Pinterest",
  reddit: "Reddit",
  telegram: "Telegram",
  tiktok: "TikTok",
  twitter: "Twitter",
  whatsapp: "WhatsApp",
  x: "X",
  youtube: "YouTube",
}

const providerIcon: Record<SocialButtonProps["provider"], React.ReactNode> = {
  apple: <social.AppleIcon />,
  facebook: <social.FacebookIcon />,
  github: <social.GithubIcon />,
  google: <social.GoogleIcon />,
  instagram: <social.InstagramIcon />,
  linkedin: <social.LinkedinIcon />,
  pinterest: <social.PinterestIcon />,
  reddit: <social.RedditIcon />,
  telegram: <social.TelegramIcon />,
  tiktok: <social.TiktokIcon />,
  twitter: <social.TwitterIcon />,
  whatsapp: <social.WhatsappIcon />,
  x: <social.XIcon />,
  youtube: <social.YoutubeIcon />,
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(function SocialButton(
  {
    className,
    provider,
    size = "md",
    fullWidth = false,
    icon,
    label,
    children,
    ...props
  },
  ref,
) {
  const content = children ?? label ?? `Sign in with ${providerLabel[provider]}`

  return (
    <button
      ref={ref}
      className={cn(
        "maxa-social-button",
        `maxa-social-button--${provider}`,
        `maxa-social-button--${size}`,
        fullWidth && "maxa-social-button--full-width",
        className,
      )}
      type="button"
      {...props}
    >
      <span className="maxa-social-button__icon" aria-hidden="true">
        <span className="maxa-social-button__glyph">{icon ?? providerIcon[provider]}</span>
      </span>
      <span className="maxa-social-button__label">{content}</span>
    </button>
  )
})

SocialButton.displayName = "SocialButton"

export { SocialButton }
