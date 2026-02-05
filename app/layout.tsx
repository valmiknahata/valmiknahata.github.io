import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valmik Nahata",
  description: "Data Scientist & AI Researcher Portfolio",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Valmik Nahata Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
