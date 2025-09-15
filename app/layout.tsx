import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priyansh Prajapat",
  description: "Portfolio of Priyansh Prajapat",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      </body>
    </html>
  );
}
