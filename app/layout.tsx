import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "OpenBoxOffice",
    template: "%s | OpenBoxOffice",
  },
  description: "A modern, opionated ticketing and event management system",
  keywords: ["box office", "ticketing", "events", "tickets", "venue management", "event management"],
  authors: [{ name: "OpenBoxOffice Team" }],
  creator: "OpenBoxOffice",
  publisher: "OpenBoxOffice",
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
    url: "/",
    siteName: "OpenBoxOffice",
    title: "OpenBoxOffice",
    description: "A modern, opionated ticketing and event management system",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenBoxOffice",
    description: "A modern, opionated ticketing and event management system",
    creator: "@openboxoffice",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48 256x256" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider
        >
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
