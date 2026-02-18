import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

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
  const developerLinkedInHref =
    activeSocialLinks.find((item) => normalizeSocialName(item.label) === "linkedin")?.href ??
    activeLegalLinks.find((item) => item.href.toLowerCase().includes("linkedin.com/in/"))?.href ??
    "https://linkedin.com/in/camiloespinazo";
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
                  className="group inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[rgba(255,0,0,0.24)] bg-[rgba(9,10,13,0.82)] transition-[transform,border-color,box-shadow,background-color] duration-[220ms] ease-[var(--ease-premium)] hover:scale-105 hover:border-[rgba(255,0,0,0.58)] hover:bg-[rgba(14,8,10,0.92)] hover:shadow-[0_0_0_1px_rgba(255,0,0,0.22),0_18px_28px_-18px_rgba(255,0,0,0.7)] active:scale-[0.97] active:shadow-[0_0_0_1px_rgba(255,0,0,0.24),0_10px_20px_-16px_rgba(255,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
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

            <a
              href={developerLinkedInHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit cursor-pointer items-center gap-1.5 text-[11px] tracking-[0.06em] text-foreground/88 transition-[color,transform,opacity] duration-200 hover:-translate-y-[1px] hover:text-primary hover:opacity-100"
              aria-label="Developed by en LinkedIn"
            >
              <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground transition-colors duration-200 group-hover:text-primary/85">
                Developed by:
              </span>
              <Linkedin className="size-3.5" />
              <span className="relative font-medium tracking-[0.08em] text-foreground/92 transition-colors duration-200 group-hover:text-primary">
                Camilo Espinazo
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </span>
            </a>

            <p className="text-xs text-muted-foreground/90">(c) 2026 Pepu Gonzalez. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
