import Image from "next/image";

import type { FooterDoc } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type SocialLink = {
  label: string;
  href: string;
  iconSrc: string;
  iconClassName?: string;
};

type LegalLink = {
  label: string;
  href: string;
};

const socialIconByName: Record<string, { iconSrc: string; iconClassName?: string }> = {
  instagram: { iconSrc: "/social/instagram.png", iconClassName: "h-5 w-5" },
  tiktok: { iconSrc: "/social/tiktok.png", iconClassName: "h-5 w-5" },
  whatsapp: { iconSrc: "/social/whatsapp.png", iconClassName: "h-5 w-5" },
  youtube: { iconSrc: "/social/youtube.png", iconClassName: "h-5 w-5" },
  kick: { iconSrc: "/social/kick.png", iconClassName: "h-5 w-5" },
};
function normalizeSocialName(name: string): string {
  return name.trim().toLowerCase();
}

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

interface FooterProps {
  content: FooterDoc;
}

export function Footer({ content }: FooterProps) {
  const cmsSocialLinks = content.socialLinks
    .filter((item) => item?.name && item?.href)
    .map((item) => {
      const normalizedName = normalizeSocialName(item.name);
      const iconConfig = socialIconByName[normalizedName] ?? { iconSrc: "/globe.svg" };

      return {
        label: item.name,
        href: item.href,
        iconSrc: iconConfig.iconSrc,
        iconClassName: iconConfig.iconClassName,
      } satisfies SocialLink;
    });

  const activeSocialLinks = cmsSocialLinks;
  const cmsLegalLinks = content.legalLinks.filter((item) => item?.label && item?.href);
  const activeLegalLinks: LegalLink[] = cmsLegalLinks;
  return (
    <footer
      id="contacto"
      className="scroll-mt-[calc(var(--navbar-height)+0.7rem)] border-t border-[rgba(201,169,97,0.1)] bg-[radial-gradient(circle_at_14%_0%,rgba(185,147,74,0.07),transparent_38%),linear-gradient(180deg,#080809_0%,#060607_100%)]"
    >
      <div className="layout-shell py-7 md:py-8">
        <div className="rounded-[16px] border border-white/10 bg-[linear-gradient(145deg,#0d0e12_0%,#09090c_100%)] p-5 shadow-[0_30px_58px_-44px_rgba(0,0,0,0.95)] md:p-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-[11px] border border-white/14 bg-[linear-gradient(120deg,rgba(30,24,8,0.28)_0%,rgba(20,16,5,0.14)_100%)] px-3 py-2">
              <div className="grid size-9 place-items-center rounded-[9px] border border-primary/35 bg-primary/20 text-primary">
                <span className="font-heading text-sm font-bold">PG</span>
              </div>
              <div>
                <p className="font-heading text-[1.1rem] font-semibold tracking-[0.05em] text-foreground">Pepu González</p>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground">COACHING</p>
              </div>
            </div>

            <p className="max-w-xl text-sm text-muted-foreground md:text-base">Contacto directo para resolver dudas y elegir tu plan.</p>

          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              {activeSocialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ir a ${item.label}`}
                  title={item.label}
                  className="group inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[rgba(185,147,74,0.22)] bg-[rgba(8,8,10,0.82)] transition-[transform,border-color,box-shadow,background-color] duration-[220ms] ease-[var(--ease-premium)] hover:scale-105 hover:border-[rgba(185,147,74,0.48)] hover:bg-[rgba(10,9,5,0.92)] hover:shadow-[0_0_0_1px_rgba(185,147,74,0.18),0_18px_28px_-18px_rgba(185,147,74,0.5)] active:scale-[0.97] active:shadow-[0_0_0_1px_rgba(185,147,74,0.18),0_10px_20px_-16px_rgba(185,147,74,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                >
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                    className={cn("object-contain object-center transition-transform duration-200 group-hover:scale-[1.03]", item.iconClassName)}
                  />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="my-5 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(201,169,97,0.22),transparent)]" />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {activeLegalLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target={isExternalLink(link.href) ? "_blank" : undefined}
                  rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                  className="group relative font-medium text-foreground/94 transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                  <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            <p className="text-xs text-muted-foreground/90">(c) 2026 Pepu González. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
