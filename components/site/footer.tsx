import Image from "next/image";
import { Mail } from "lucide-react";

import type { FooterDoc } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type SocialLink = {
  label: string;
  href: string;
  iconSrc: string;
  previewHref: string;
  iconClassName?: string;
};

type LegalLink = {
  label: string;
  href: string;
};

const socialIconByName: Record<string, { iconSrc: string; iconClassName?: string }> = {
  instagram: { iconSrc: "/image (3).png", iconClassName: "h-[21px] w-[21px] translate-y-[0.5px]" },
  tiktok: { iconSrc: "/image (5).png", iconClassName: "h-5 w-5" },
  whatsapp: { iconSrc: "/image (2).png", iconClassName: "h-5 w-5 -translate-x-[0.5px] translate-y-[0.5px]" },
  youtube: { iconSrc: "/image (4).png", iconClassName: "h-[21px] w-[21px] -translate-x-[0.5px]" },
  kick: { iconSrc: "/kicck.png", iconClassName: "h-5 w-5 translate-x-[0.5px] -translate-y-[0.5px]" },
};

function normalizeSocialName(name: string): string {
  return name.trim().toLowerCase();
}

function getPreviewHref(href: string): string {
  try {
    const parsed = new URL(href);
    return `${parsed.hostname}${parsed.pathname === "/" ? "" : parsed.pathname}`;
  } catch {
    return href;
  }
}

function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

const SHOW_DEV_CREDIT = false;

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
        previewHref: getPreviewHref(item.href),
      } satisfies SocialLink;
    });

  const activeSocialLinks = cmsSocialLinks;
  const cmsLegalLinks = content.legalLinks.filter((item) => item?.label && item?.href);
  const activeLegalLinks: LegalLink[] = cmsLegalLinks;
  const email = content.email;

  return (
    <footer
      id="contacto"
      className="scroll-mt-[calc(var(--navbar-height)+0.7rem)] border-t border-white/8 bg-[radial-gradient(circle_at_14%_0%,rgba(212,20,20,0.14),transparent_38%),linear-gradient(180deg,#111217_0%,#0b0c10_100%)]"
    >
      <div className="layout-shell py-7 md:py-8">
        <div className="rounded-[16px] border border-white/14 bg-[linear-gradient(145deg,#14151a_0%,#101116_100%)] p-5 shadow-[0_30px_58px_-44px_rgba(0,0,0,0.95)] md:p-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-[11px] border border-white/16 bg-[linear-gradient(120deg,rgba(122,14,14,0.32)_0%,rgba(122,14,14,0.14)_100%)] px-3 py-2">
              <div className="grid size-9 place-items-center rounded-[9px] border border-primary/35 bg-primary/20 text-primary">
                <span className="font-heading text-sm font-bold">PG</span>
              </div>
              <div>
                <p className="font-heading text-[1.1rem] font-semibold tracking-[0.05em] text-foreground">Pepu Gonzalez</p>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground">COACHING</p>
              </div>
            </div>

            <p className="max-w-xl text-sm text-muted-foreground md:text-base">Contacto directo para resolver dudas y elegir tu plan.</p>

            <a
              href={`mailto:${email}`}
              className="group inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Mail className="size-4" />
              <span className="relative">
                {email}
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </span>
            </a>
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
                  className="group relative inline-flex size-11 shrink-0 items-center justify-center rounded-[9999px] border border-[rgba(255,0,0,0.22)] bg-[rgba(10,10,15,0.6)] backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-[220ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-[rgba(255,0,0,0.5)] hover:bg-[rgba(14,8,10,0.72)] hover:shadow-[0_0_0_1px_rgba(255,0,0,0.2),0_18px_28px_-18px_rgba(255,0,0,0.65)] active:translate-y-0 active:shadow-[0_0_0_1px_rgba(255,0,0,0.25),0_10px_20px_-16px_rgba(255,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                >
                  <span className="inline-flex h-[22px] w-[22px] items-center justify-center">
                    <Image
                      src={item.iconSrc}
                      alt=""
                      width={22}
                      height={22}
                      unoptimized
                      className={cn(
                        "object-contain object-center transition-transform duration-200 group-hover:scale-[1.04]",
                        item.iconClassName
                      )}
                    />
                  </span>
                  <span className="sr-only">{item.label}</span>
                  <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[8px] border border-white/14 bg-black/84 px-2 py-1 text-[10px] font-medium text-white/84 opacity-0 shadow-[0_14px_28px_-20px_rgba(0,0,0,0.95)] transition-all duration-[220ms] ease-[var(--ease-premium)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {item.previewHref}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="my-5 h-px w-full bg-white/10" />

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

            {SHOW_DEV_CREDIT ? (
              <p className="text-xs text-muted-foreground/82">Desarrollado por tu equipo web.</p>
            ) : null}

            <p className="text-xs text-muted-foreground/90">(c) 2026 Pepu Gonzalez. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
