import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Sidebar } from "./_components/sidebar"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MAXA UI",
  description: "A React design system with a token-first architecture.",
}

const themeInitScript = `
try {
  var storedTheme = localStorage.getItem("maxa-theme");
  var theme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
} catch (error) {}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={montserrat.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        style={{
          margin: 0,
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
