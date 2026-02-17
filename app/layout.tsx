import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import { SvgFilters } from "@/components/SvgFilters";
import { Footer } from "@/components/site/footer";
import { MobileWhatsAppSticky } from "@/components/site/mobile-whatsapp-sticky";
import { FOOTER_QUERY, SETTINGS_QUERY, sanityFetch, type FooterDoc, type SiteSettingsDoc } from "@/lib/sanity";
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
  title: "Pepu Gonzalez | Transformacion fisica",
  description:
    "Entrenamiento personalizado para fuerza, recomposicion y rendimiento con acompanamiento directo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, footer] = await Promise.all([
    sanityFetch<SiteSettingsDoc>(SETTINGS_QUERY),
    sanityFetch<FooterDoc>(FOOTER_QUERY),
  ]);

  return (
    <html lang="es">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <div className="relative min-h-screen bg-background pt-[var(--navbar-height)] text-foreground">
          <SvgFilters />
          <Navbar extraNavItems={settings.navItems} />
          {children}
          <MobileWhatsAppSticky />
          <Footer content={footer} />
        </div>
      </body>
    </html>
  );
}

