import type { Metadata } from "next"
import Script from "next/script"
import { Montserrat, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "./_components/sidebar"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MAXA UI",
  description: "A React design system with a token-first architecture.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${robotoMono.variable}`}
    >
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body
        suppressHydrationWarning
        style={{
          margin: 0,
          background: "var(--color-bg-default)",
          fontFamily: "var(--font-body)",
          color: "var(--color-text-primary)",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Sidebar />
        <main className="docs-main">{children}</main>
      </body>
    </html>
  )
}
