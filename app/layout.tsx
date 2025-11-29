import type { Metadata, Viewport } from "next"
import Oneko from "./components/Oneko";
import { GoogleAnalytics } from "@next/third-parties/google"
import { inter, jetbrainsMono, geist } from '../lib/fonts'
import "./globals.css"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://priyanzsh.github.io"),
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
  manifest: "/favicon/site.webmanifest",
  twitter: {
    title: "Priyansh Prajapat",
    card: "summary_large_image",
    creator: "@priyanzsh",
    creatorId: "@priyanzsh",
    site: "@priyanzsh",
    siteId: "@priyanzsh",
    description: "Full stack developer from India.",
    images: ["/og/card.png"],
  },
    openGraph: {
      title: "Priyansh Prajapat",
      description: "Full stack developer from India",
      url: "https://priyanzsh.github.io",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const analytics = process.env.GOOGLE_ANALYTICS ?? "";
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${geist.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Oneko />
        <div className="text-white w-full max-w-2xl lg:max-w-lg xl:max-w-2xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          {children}
          <GoogleAnalytics gaId={analytics} />
        </div>
      </body>
    </html>
  );
}