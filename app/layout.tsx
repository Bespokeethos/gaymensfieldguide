import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { Inter } from "next/font/google"

import "./globals.css"

import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/site-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://gaymensfieldguide.com"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: "https://gaymensfieldguide.com",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`min-h-screen bg-slate-50 text-slate-900 antialiased transition dark:bg-slate-950 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-48 bg-gradient-to-b from-fuchsia-500/20 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-8">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded-full focus:bg-slate-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to content
            </a>

            <header className="sticky top-6 z-20 mb-10 rounded-2xl border border-slate-200/60 bg-white/90 px-6 py-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {siteConfig.name}
                </Link>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-slate-400">Est. Cleveland</p>
                <nav className="ml-auto flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {siteConfig.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="transition hover:text-fuchsia-600 dark:hover:text-fuchsia-300"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <ModeToggle />
                </nav>
              </div>
            </header>

            <main id="main" className="flex-1 pb-12">
              <div className="space-y-12">{children}</div>
            </main>

            <footer className="mt-auto border-t border-slate-200/60 pt-8 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
              <p>{siteConfig.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500">
                <span>{siteConfig.location}</span>
                <a
                  className="text-fuchsia-700 transition hover:text-fuchsia-500 dark:text-fuchsia-300"
                  href={`mailto:${siteConfig.contactEmail}`}
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </footer>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
