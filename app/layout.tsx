import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/lib/theme-context"
import Dock from "./components/Dock"
import KonamiCode from "./components/KonamiCode"
import ClickSound from "./components/ClickSound"
import { GoogleAnalytics } from "@next/third-parties/google"
import { inter, jetbrainsMono, geist } from '../lib/fonts'
import "./globals.css"

const themeInit = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://priyazsh.github.io"),
  title: {
    default: "Priyansh Prajapat",
    template: "%s | Priyansh Prajapat",
  },
  description: "Full stack developer from India",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/favicon/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/favicon/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://priyazsh.github.io",
  },
  twitter: {
    title: "Priyansh Prajapat",
    card: "summary_large_image",
    creator: "@priyazsh",
    site: "@priyazsh",
    description: "Full stack developer from India.",
    images: ["/og/card.png"],
  },
  openGraph: {
    title: "Priyansh Prajapat",
    description: "Full stack developer from India",
    url: "https://priyazsh.github.io",
    images: [
      {
        url: "/og/card.png",
        width: 1200,
        height: 630,
        alt: "Priyansh Prajapat",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const analytics = process.env.GOOGLE_ANALYTICS ?? ""
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen pb-28 sm:pb-32">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-14">
              {children}
            </div>
          </div>
          <Dock />
          <KonamiCode />
          <ClickSound />
          <GoogleAnalytics gaId={analytics} />
        </ThemeProvider>
      </body>
    </html>
  )
}
