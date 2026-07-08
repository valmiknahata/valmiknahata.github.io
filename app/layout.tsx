import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valmik Nahata",
  description: "AI researcher, UC San Diego",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital@0;1&display=swap" rel="stylesheet" />
        <script src="https://code.iconify.design/iconify-icon/1.0.8/iconify-icon.min.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
