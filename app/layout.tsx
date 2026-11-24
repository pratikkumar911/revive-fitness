import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revive Fitness Club",
  description: "Open floor, real coaching, no gimmicks.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
