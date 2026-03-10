import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Habesha Services — Community Marketplace",
    template: "%s | Habesha Services",
  },
  description:
    "Find and offer trusted local services within the Ethiopian and East African diaspora community across the United States.",
  keywords: ["Ethiopian", "Habesha", "East African", "diaspora", "community", "services", "marketplace"],
  openGraph: {
    title: "Habesha Services",
    description: "Community services marketplace for the East African diaspora",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d97b16",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf8f4]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
