import { Instagram, Mail, MessageCircle, Youtube } from "lucide-react";

import { getStickyWhatsAppHref } from "@/data/offers";
import type { FooterDoc } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type LegalLink = {
  label: string;
  href: string;
};

function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M16.6 5.82c-.63-.7-.98-1.6-.98-2.55h-2.96v13.3a2.9 2.9 0 1 1-2.05-2.77V10.6a5.86 5.86 0 1 0 5.01 5.8V9.4a7.4 7.4 0 0 0 4.36 1.4V7.84a4.7 4.7 0 0 1-3.38-2.02Z" strokeLinejoin="round" />
    </svg>
  );
}

function normalizeSocialName(name: string): string {
  return name.trim().toLowerCase();
}

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

const SOCIAL_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  instagram: (props) => <Instagram {...props} strokeWidth={1.5} />,
  youtube: (props) => <Youtube {...props} strokeWidth={1.5} />,
  tiktok: TikTokGlyph,
};

interface FooterProps {
  content: FooterDoc;
}

export function Footer({ content }: FooterProps) {
  const socialLinks = content.socialLinks
    .filter((item) => item?.name && item?.href)
    .map((item) => ({ label: item.name, href: item.href, key: normalizeSocialName(item.name) }))
    .filter((item) => item.key !== "whatsapp" && SOCIAL_ICONS[item.key]);

  const legalLinks: LegalLink[] = content.legalLinks.filter((item) => item?.label && item?.href);

  return (
    <footer id="contacto" className="border-t border-white/10 bg-[var(--negro-2)] pt-[60px] md:pt-[90px]">
      <div className="layout-shell pb-14 md:pb-16">
        <p className="font-heading text-sm uppercase tracking-[0.06em] text-[var(--texto)]">Pepu González</p>

        <div className="mt-4 flex flex-col gap-1.5 text-sm">
          <a href={`mailto:${content.email}`} className="w-fit text-[var(--texto-gris)] transition-colors duration-200 hover:text-[var(--dorado)]">
            {content.email}
          </a>
          <a
            href={getStickyWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            className="w-fit text-[var(--texto-gris)] transition-colors duration-200 hover:text-[var(--dorado)]"
          >
            Escribime por WhatsApp
          </a>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <a
            href={getStickyWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="text-[var(--texto-gris)] transition-colors duration-200 hover:text-[var(--dorado)]"
          >
            <MessageCircle className="size-5" strokeWidth={1.5} />
          </a>
          <a href={`mailto:${content.email}`} aria-label="Mail" title="Mail" className="text-[var(--texto-gris)] transition-colors duration-200 hover:text-[var(--dorado)]">
            <Mail className="size-5" strokeWidth={1.5} />
          </a>
          {socialLinks.map((item) => {
            const Icon = SOCIAL_ICONS[item.key];
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
                className="text-[var(--texto-gris)] transition-colors duration-200 hover:text-[var(--dorado)]"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-5 text-sm">
            {legalLinks.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                target={isExternalLink(link.href) ? "_blank" : undefined}
                rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                className={cn("font-medium text-[var(--texto-gris)] transition-colors duration-200 hover:text-[var(--dorado)]")}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-[var(--texto-gris)]">(c) 2026 Pepu González. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
