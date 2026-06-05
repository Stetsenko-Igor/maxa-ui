import * as React from "react"
import "./social-button.css"

export interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "facebook" | "google" | "apple"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  icon?: React.ReactNode
  label?: string
}

const providerLabel = {
  apple: "Apple",
  facebook: "Facebook",
  google: "Google",
}

const providerIcon: Record<SocialButtonProps["provider"], React.ReactNode> = {
  apple: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="currentColor"
        d="M16.42 12.8c-.03-2.58 2.1-3.82 2.2-3.88-1.2-1.76-3.07-2-3.73-2.03-1.6-.16-3.11.94-3.92.94-.82 0-2.07-.91-3.4-.89-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.46 7.83 1.31 10.39.87 1.25 1.9 2.66 3.26 2.61 1.3-.05 1.8-.84 3.37-.84 1.58 0 2.02.84 3.4.81 1.4-.03 2.3-1.28 3.16-2.54 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.77-1.06-2.82-4.2ZM13.84 5.2c.72-.88 1.21-2.1 1.08-3.32-1.04.04-2.3.69-3.04 1.57-.67.77-1.25 2.02-1.09 3.2 1.15.09 2.33-.59 3.05-1.45Z"
      />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="currentColor"
        d="M13.7 21v-8.2h2.75l.42-3.2H13.7V7.56c0-.92.25-1.55 1.58-1.55h1.69V3.15A22.6 22.6 0 0 0 14.5 3c-2.44 0-4.11 1.49-4.11 4.22V9.6H7.62v3.2h2.77V21h3.31Z"
      />
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" role="img" focusable="false">
      <path
        fill="currentColor"
        d="M21.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.35a4.57 4.57 0 0 1-1.98 3v2.48h3.2c1.87-1.72 2.99-4.26 2.99-7.49Z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.96-.9 6.61-2.42l-3.2-2.48c-.89.6-2.02.95-3.41.95a6.01 6.01 0 0 1-5.65-4.15H3.05v2.56A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="currentColor"
        d="M6.35 13.9a6.01 6.01 0 0 1 0-3.8V7.54h-3.3a10 10 0 0 0 0 8.92l3.3-2.56Z"
      />
      <path
        fill="currentColor"
        d="M12 5.95c1.47 0 2.78.5 3.82 1.5l2.86-2.86C16.95 2.98 14.69 2 12 2a9.99 9.99 0 0 0-8.95 5.54l3.3 2.56A6.01 6.01 0 0 1 12 5.95Z"
      />
    </svg>
  ),
}

function SocialButton({
  className,
  provider,
  size = "md",
  fullWidth = false,
  icon,
  label,
  children,
  ...props
}: SocialButtonProps) {
  const content = children ?? label ?? `Continue with ${providerLabel[provider]}`

  return (
    <button
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
        {icon ?? providerIcon[provider]}
      </span>
      <span className="maxa-social-button__label">{content}</span>
    </button>
  )
}

export { SocialButton }
