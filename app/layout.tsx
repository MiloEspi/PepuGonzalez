import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { MobileWhatsAppSticky } from "@/components/site/mobile-whatsapp-sticky";
import { Navbar } from "@/components/site/navbar";
import "./globals.css";

const headingFont = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pepu Gonzalez | Coaching de rendimiento",
  description:
    "Entrenamiento personalizado para fuerza, recomposicion y rendimiento con acompanamiento directo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="relative min-h-screen bg-background text-foreground">
          <Navbar />
          {children}
          <MobileWhatsAppSticky />
          <Footer />
        </div>
      </body>
    </html>
  );
}
