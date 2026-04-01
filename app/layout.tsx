import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profdle",
  description: "A Wordle-inspired game where you guess the professor of the day based on their infos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
