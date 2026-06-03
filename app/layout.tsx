import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://djsdetails.com"),
  title: {
    default: "DJ's Details | Mobile Auto Detailing in Needham & Greater Boston",
    template: "%s | DJ's Details",
  },
  description:
    "Needham-based mobile auto detailing for Greater Boston. Interior details, exterior hand washes, pet hair removal, paint-safe products, and free estimates from DJ's Details.",
  applicationName: "DJ's Details",
  authors: [{ name: "Dillan Akinc" }],
  creator: "DJ's Details",
  publisher: "DJ's Details",
  category: "Mobile auto detailing",
  keywords: [
    "mobile auto detailing Needham MA",
    "car detailing Needham",
    "mobile car detailing Greater Boston",
    "interior car detailing",
    "exterior car detailing",
    "pet hair removal car detailing",
    "DJ's Details",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DJ's Details",
    title: "DJ's Details | Mobile Auto Detailing in Needham & Greater Boston",
    description:
      "Mobile interior and exterior car detailing in Needham and Greater Boston, handled personally by DJ.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "DJ's Details mobile auto detailing results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ's Details | Mobile Auto Detailing in Needham & Greater Boston",
    description:
      "Mobile interior and exterior car detailing in Needham and Greater Boston, handled personally by DJ.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
