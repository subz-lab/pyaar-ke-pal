import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pyaar Ke Pal — Nostalgia Music",
  description: "A nostalgic music player celebrating iconic Indian romantic classics.",
  openGraph: {
    title: "Pyaar Ke Pal — Nostalgia Music",
    description: "A nostalgic music player celebrating iconic Indian romantic classics.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white font-sans overflow-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
