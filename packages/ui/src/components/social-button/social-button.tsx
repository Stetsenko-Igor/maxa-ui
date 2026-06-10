import * as React from "react"
import "./social-button.css"

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
  apple: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#1B1A1A"
        d="M16.42 12.8c-.03-2.58 2.1-3.82 2.2-3.88-1.2-1.76-3.07-2-3.73-2.03-1.6-.16-3.11.94-3.92.94-.82 0-2.07-.91-3.4-.89-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.46 7.83 1.31 10.39.87 1.25 1.9 2.66 3.26 2.61 1.3-.05 1.8-.84 3.37-.84 1.58 0 2.02.84 3.4.81 1.4-.03 2.3-1.28 3.16-2.54 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.77-1.06-2.82-4.2ZM13.84 5.2c.72-.88 1.21-2.1 1.08-3.32-1.04.04-2.3.69-3.04 1.57-.67.77-1.25 2.02-1.09 3.2 1.15.09 2.33-.59 3.05-1.45Z"
      />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M13.7 21v-8.2h2.75l.42-3.2H13.7V7.56c0-.92.25-1.55 1.58-1.55h1.69V3.15A22.6 22.6 0 0 0 14.5 3c-2.44 0-4.11 1.49-4.11 4.22V9.6H7.62v3.2h2.77V21h3.31Z"
      />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#181717"
        fillRule="evenodd"
        d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.58 7.19 9.97.53.1.72-.23.72-.51v-1.8c-2.93.64-3.55-1.25-3.55-1.25-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.46 1.14 3.07.87.09-.68.36-1.14.66-1.4-2.34-.27-4.8-1.17-4.8-5.21 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.79 0 0 .89-.28 2.9 1.08a10.13 10.13 0 0 1 5.28 0c2.01-1.36 2.89-1.08 2.89-1.08.58 1.45.22 2.52.11 2.79.67.74 1.08 1.68 1.08 2.83 0 4.05-2.47 4.94-4.82 5.2.38.33.72.98.72 1.98v2.71c0 .28.19.61.73.5A10.51 10.51 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#4285F4"
        d="M21.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.35a4.57 4.57 0 0 1-1.98 3v2.48h3.2c1.87-1.72 2.99-4.26 2.99-7.49Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.61-2.42l-3.2-2.48c-.89.6-2.02.95-3.41.95a6.01 6.01 0 0 1-5.65-4.15H3.05v2.56A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.35 13.9a6.01 6.01 0 0 1 0-3.8V7.54h-3.3a10 10 0 0 0 0 8.92l3.3-2.56Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.47 0 2.78.5 3.82 1.5l2.86-2.86C16.95 2.98 14.69 2 12 2a9.99 9.99 0 0 0-8.95 5.54l3.3 2.56A6.01 6.01 0 0 1 12 5.95Z"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <rect width="19" height="19" x="2.5" y="2.5" fill="none" stroke="#1B1A1A" strokeWidth="2" rx="5" />
      <circle cx="12" cy="12" r="4.25" fill="none" stroke="#1B1A1A" strokeWidth="2" />
      <circle cx="17.35" cy="6.65" r="1.25" fill="#1B1A1A" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <rect width="18" height="18" x="3" y="3" fill="#0A66C2" rx="2" />
      <path
        fill="#FFFFFF"
        d="M7.25 10.1h2.25V17h-2.25v-6.9Zm1.12-3.25a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54Zm3.05 3.25h2.15v.96h.03c.3-.57 1.03-1.17 2.12-1.17 2.27 0 2.69 1.5 2.69 3.44V17h-2.24v-3.25c0-.78-.01-1.78-1.08-1.78-1.09 0-1.25.85-1.25 1.72V17h-2.42v-6.9Z"
      />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <circle cx="12" cy="12" r="10.5" fill="#E60023" />
      <path
        fill="#FFFFFF"
        d="M12.2 4.8c-4.05 0-6.2 2.72-6.2 5.69 0 1.38.74 3.1 1.92 3.64.18.08.28.05.32-.13.03-.14.2-.79.27-1.1.03-.1.02-.2-.07-.3-.39-.47-.7-1.34-.7-2.14 0-2.08 1.58-4.1 4.27-4.1 2.33 0 3.96 1.59 3.96 3.86 0 2.57-1.3 4.35-2.99 4.35-.93 0-1.63-.77-1.4-1.72.26-1.13.78-2.35.78-3.16 0-.73-.39-1.34-1.2-1.34-.96 0-1.73.99-1.73 2.31 0 .84.28 1.41.28 1.41s-.94 3.96-1.11 4.69c-.19.8-.12 1.93-.03 2.66.03.22.32.3.45.11.37-.5.8-1.21 1-1.98.08-.29.43-1.65.43-1.65.39.74 1.52 1.36 2.72 1.36 3.58 0 6.16-3.3 6.16-7.39 0-3.93-3.2-6.85-7.13-6.85Z"
      />
    </svg>
  ),
  reddit: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <circle cx="12" cy="12" r="10.5" fill="#FF4500" />
      <path
        fill="#FFFFFF"
        d="M19.1 11.5c.03.17.05.35.05.53 0 2.63-3.2 4.77-7.15 4.77s-7.15-2.14-7.15-4.77c0-.18.02-.36.05-.53a1.9 1.9 0 1 1 2.1-3.13 8.5 8.5 0 0 1 4.43-1.18l.84-3.95a.45.45 0 0 1 .53-.35l2.75.59a1.35 1.35 0 1 1-.19.88l-2.32-.5-.71 3.34a8.5 8.5 0 0 1 4.66 1.18 1.9 1.9 0 1 1 2.11 3.12ZM8.65 11.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm6.7 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm-.2 3.6a.45.45 0 0 0-.64-.64c-.5.5-1.58.69-2.5.69s-2-.19-2.5-.69a.45.45 0 0 0-.64.64c.86.86 2.43.95 3.14.95s2.28-.09 3.14-.95Z"
      />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <circle cx="12" cy="12" r="10.5" fill="#26A5E4" />
      <path
        fill="#FFFFFF"
        d="M17.63 7.27 5.9 11.82c-.8.32-.79.77-.15.97l3.01.94 1.16 3.54c.15.43.08.59.5.59.32 0 .47-.15.65-.33l1.56-1.52 3.24 2.4c.6.33 1.02.16 1.17-.56l2.11-9.96c.22-.87-.33-1.27-1.52-.62Zm-8.38 6.23 6.88-4.34c.34-.21.65-.1.4.13l-5.57 5.02-.21 2.3-1.5-3.11Z"
      />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#25F4EE"
        d="M10.05 8.15v1.73a5.26 5.26 0 0 0-1.04-.1 5.03 5.03 0 1 0 5.03 5.03V7.73a6.55 6.55 0 0 0 3.82 1.22V5.6a3.14 3.14 0 0 1-3.14-3.1h-3.3v12.28a1.74 1.74 0 1 1-1.37-1.7v-3.33Z"
      />
      <path
        fill="#FE2C55"
        d="M11.3 8.15v1.73a5.26 5.26 0 0 0-1.04-.1 5.03 5.03 0 1 0 5.03 5.03V7.73a6.55 6.55 0 0 0 3.82 1.22V5.6a3.14 3.14 0 0 1-3.14-3.1h-3.3v12.28a1.74 1.74 0 1 1-1.37-1.7v-3.33Z"
        opacity="0.92"
      />
      <path
        fill="#000000"
        d="M10.7 8.15v1.73a5.26 5.26 0 0 0-1.04-.1 5.03 5.03 0 1 0 5.03 5.03V7.73a6.55 6.55 0 0 0 3.82 1.22V5.6a3.14 3.14 0 0 1-3.14-3.1h-3.3v12.28a1.74 1.74 0 1 1-1.37-1.7v-3.33Z"
      />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#1DA1F2"
        d="M21.75 6.26c.01.21.01.42.01.63 0 6.43-4.9 13.85-13.85 13.85A13.76 13.76 0 0 1 .45 18.56c.39.05.77.06 1.18.06a9.75 9.75 0 0 0 6.04-2.08 4.88 4.88 0 0 1-4.55-3.38c.3.05.6.08.92.08.44 0 .88-.06 1.29-.17a4.87 4.87 0 0 1-3.9-4.78v-.06c.65.36 1.39.58 2.18.61A4.87 4.87 0 0 1 2.1 2.34a13.82 13.82 0 0 0 10.03 5.08 5.5 5.5 0 0 1-.12-1.11 4.87 4.87 0 0 1 8.42-3.33 9.58 9.58 0 0 0 3.09-1.18 4.86 4.86 0 0 1-2.14 2.68 9.76 9.76 0 0 0 2.8-.75 10.46 10.46 0 0 1-2.43 2.53Z"
      />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#27B43E"
        d="M12 2.25A9.75 9.75 0 0 0 3.6 16.9L2.5 21.5l4.72-1.07A9.75 9.75 0 1 0 12 2.25Z"
      />
      <path
        fill="#FFFFFF"
        d="M8.2 7.08c.2 0 .42 0 .59.01.2.01.46-.07.7.54.27.65.92 2.27 1 2.44.08.16.13.35.03.56-.1.21-.16.34-.33.53-.16.18-.35.42-.49.56-.16.16-.34.34-.14.66.19.33.85 1.4 1.82 2.26 1.25 1.12 2.3 1.47 2.63 1.63.33.16.52.13.71-.08.2-.21.82-.95 1.04-1.28.21-.33.43-.27.73-.16.3.1 1.9.9 2.23 1.06.32.16.54.24.62.38.08.13.08.76-.19 1.49-.27.73-1.56 1.41-2.18 1.5-.55.08-1.26.12-2.03-.12-.47-.15-1.07-.35-1.84-.68-3.24-1.4-5.35-4.66-5.51-4.87-.16-.21-1.32-1.76-1.32-3.36 0-1.6.84-2.38 1.14-2.71.3-.33.65-.41.87-.41Z"
      />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#000000"
        d="M15.77 21.5 10.47 14 3.84 21.5H1.03l8.2-9.32L1.03 2.5h7.2l5 7.12L19.48 2.5h2.81l-7.81 8.89 8.49 10.11h-7.2Zm3.12-2.13L6.94 4.63H5.05L17 19.37h1.89Z"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="#FF0000"
        d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45a2.78 2.78 0 0 0-1.95 1.97A29.03 29.03 0 0 0 1 12a29.03 29.03 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29.03 29.03 0 0 0 23 12a29.03 29.03 0 0 0-.46-5.58Z"
      />
      <path fill="#FFFFFF" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  ),
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
      className={[
        "maxa-social-button",
        `maxa-social-button--${provider}`,
        `maxa-social-button--${size}`,
        fullWidth && "maxa-social-button--full-width",
        className,
      ].filter(Boolean).join(" ")}
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
