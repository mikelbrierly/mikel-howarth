import type { Metadata } from "next";
import { AR_One_Sans } from "next/font/google";
import "../globals.css";

const arOneSans = AR_One_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Mikel Howarth's Blog",
  description: "All kinds of stuff.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={arOneSans.className}>{children}</body>
    </html>
  );
}
