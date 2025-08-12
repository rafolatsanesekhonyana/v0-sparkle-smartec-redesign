import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/toaster"
import { SkipLink } from "@/components/accessibility-skip-link"

// Optimized font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Brights' Nails Studio - Professional Nail Services",
  description:
    "Book your perfect nail appointment at Brights' Nails Studio. Professional manicures, pedicures, and nail art services.",
  keywords: "nail salon, manicure, pedicure, nail art, booking, appointment",
  authors: [{ name: "Brights' Nails Studio" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        {/* Added preload hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SkipLink />
        <ErrorBoundary>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
