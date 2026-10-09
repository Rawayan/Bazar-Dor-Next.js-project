import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/providers/ToastProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <AuthProvider>
          <Navbar />
          <PriceTicker />

          {children}

          <Footer />

          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}