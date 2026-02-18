import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import { Navbar } from "@/components/Navbar";
import { SvgFilters } from "@/components/SvgFilters";
import { Footer } from "@/components/site/footer";
import { MobileWhatsAppSticky } from "@/components/site/mobile-whatsapp-sticky";
import { OverflowDebug } from "@/components/dev/overflow-debug";
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

const GA_ID = "G-13631090908";

export const metadata: Metadata = {
  title: "Pepu González | Transformación física",
  description:
    "Entrenamiento personalizado para fuerza, recomposición y rendimiento con acompañamiento directo.",
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
          {process.env.NODE_ENV === "development" ? <OverflowDebug /> : null}
          <SvgFilters />
          <Navbar extraNavItems={settings.navItems} />
          {children}
          <MobileWhatsAppSticky />
          <Footer content={footer} />
        </div>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}

