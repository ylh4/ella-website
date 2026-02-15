import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ella's Creative World",
    template: "%s | Ella's Creative World",
  },
  description:
    "Welcome to Ella's Creative World — books, poems, artwork, videos, and blog posts by Elnatan Lemma.",
  keywords: ["Ella", "Elnatan Lemma", "books", "poems", "artwork", "creative", "kids author"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${poppins.variable} font-sans antialiased bg-lavender-50 text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
