import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Brainly",
  description: "Your digital knowledge base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${spaceGrotesk.className} light bg-white`}>
        {children}
      </body>
    </html>
  );
}
