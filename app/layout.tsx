import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Priyansh Prajapat",
  description: "Fullstack Developer from India",
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" antialiased">
        <div id="root">
          {children}
        </div>
        <GoogleAnalytics gaId="G-LM2B0KC5LB" />
      </body>
    </html>
  );
}
