import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollToTop from "./components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://oyepriyansh.github.io"),
  title: {
    default: "Priyansh Prajapat",
    template: "%s | Priyansh Prajapat",
  },
  description: "Full stack developer from India",
  keywords: [
    "Priyansh Prajapat",
    "Portfolio",
    "Projects",
    "JavaScript",
    "Next.js",
    "Java",
    "Web Developer",
    "Self-taught",
    "Full Stack Developer",
  ],
  authors: [
    { name: "Priyansh Prajapat", url: "https://oyepriyansh.github.io" },
  ],
  creator: "Priyansh Prajapat",
  publisher: "Priyansh Prajapat",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oyepriyansh.github.io",
    siteName: "Priyansh Prajapat",
    title: "Priyansh Prajapat",
    description: "Full stack developer from India",
    images: [
      {
        url: "/oyepriyansh.webp",
        width: 630,
        height: 630,
        alt: "Priyansh Prajapat",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Priyansh Prajapat",
    description: "Full stack developer from India",
    creator: "@oyepriyansh",
    images: ["/oyepriyansh.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/oyepriyansh.webp",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analytics = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  
  return (
    <html lang="en">
      <head>
      </head>
      <body className="antialiased">
        <div id="root">{children}</div>
        <ScrollToTop />
        {analytics && <GoogleAnalytics gaId={analytics} />}
      </body>
    </html>
  );
}
