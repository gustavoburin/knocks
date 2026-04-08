import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knocks",
  description: "90 players. 53 spots. Every cut hits different.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-ink min-h-screen">{children}</body>
    </html>
  );
}
