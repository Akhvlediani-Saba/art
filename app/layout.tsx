import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ფანდური & გიტარა — წიგნი და ვიდეო გაკვეთილები",
  description: "ისწავლე ფანდურზე და გიტარაზე დაკვრა ნაბიჯ-ნაბიჯ — წიგნით და QR ვიდეოებით.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17110C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600&family=Noto+Serif+Georgian:wdth,wght@62.5..100,500..900&family=Noto+Sans:wght@400;500;600&family=Noto+Serif:wght@500;700&display=swap"
        />
      </head>
      <body>
        <AppProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
