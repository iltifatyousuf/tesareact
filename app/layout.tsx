import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TesaReact - AI-Powered Document Intelligence Platform",
  description:
    "Transform your documents with advanced AI processing, translation, chat, and analytics.",
  keywords: [
    "AI",
    "Document Processing",
    "Translation",
    "Chat",
    "Analytics",
    "TesaReact",
  ],
  authors: [{ name: "TesaReact Team" }],
  openGraph: {
    title: "TesaReact - AI Document Intelligence",
    description:
      "Transform your documents with advanced AI processing, translation, and analytics.",
    url: "https://tesareact.vercel.app",
    siteName: "TesaReact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
