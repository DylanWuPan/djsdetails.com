import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ's Details",
  description:
    "The best mobile auto detailing service in the Greater Boston area. We come to you, so you can spend more time doing what you love.",
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
