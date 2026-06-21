import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valmik Nahata",
  description: "Personal Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&amp;family=Crimson+Text:ital@0;1&amp;display=swap" rel="stylesheet" />
        <script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js" async></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
