import Link from "next/link";
import { Instagram, Mail, Youtube } from "lucide-react";
import type { ComponentType } from "react";

import { getStickyWhatsAppHref } from "@/data/offers";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4.5", className)} fill="currentColor">
      <path d="M14.4 2.5v2.4c0 1.2.9 2.2 2.1 2.3h1v2.8h-1a5.2 5.2 0 0 1-2.1-.4v6a4.8 4.8 0 1 1-4.8-4.8h.4v2.8h-.4a2 2 0 1 0 2 2V2.5h2.8Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4.5", className)} fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.48 0 .11 5.36.11 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.9 11.9 0 0 0 5.7 1.45h.01c6.58 0 11.94-5.36 11.95-11.95a11.84 11.84 0 0 0-3.38-8.38ZM12 21.7c-1.77 0-3.51-.47-5.03-1.37l-.36-.21-3.7.97.99-3.6-.24-.37a9.79 9.79 0 0 1-1.52-5.2c0-5.41 4.4-9.81 9.82-9.81 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.88 6.93c0 5.41-4.4 9.81-9.81 9.81Zm5.38-7.37c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.15-.18.29-.73.94-.9 1.14-.16.2-.33.22-.62.08-.29-.14-1.23-.45-2.34-1.43-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.12-.59.12-.12.29-.33.43-.49.14-.16.19-.28.29-.47.09-.2.05-.37-.02-.52-.07-.14-.64-1.55-.87-2.12-.24-.57-.48-.49-.64-.5l-.55-.01c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.46s1.07 2.85 1.22 3.05c.14.2 2.09 3.18 5.06 4.46.71.31 1.27.49 1.71.62.72.23 1.37.2 1.88.12.58-.09 1.7-.69 1.95-1.36.24-.67.24-1.24.17-1.36-.07-.13-.26-.2-.55-.34Z" />
    </svg>
  );
}

function KickIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4.5", className)} fill="currentColor">
      <rect x="3" y="3" width="5" height="18" rx="1" />
      <rect x="9" y="3" width="12" height="5" rx="1" />
      <rect x="9" y="10" width="8" height="5" rx="1" />
      <rect x="14" y="15" width="7" height="6" rx="1" />
    </svg>
  );
}

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
};

const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pepugonzalezzz/?hl=es",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@pepugonzalezz",
    icon: TikTokIcon,
  },
  {
    label: "WhatsApp",
    href: getStickyWhatsAppHref(),
    icon: WhatsAppIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@pepugonzalezz",
    icon: Youtube,
  },
  {
    label: "Kick",
    href: "https://kick.com/pepugonzalezz",
    icon: KickIcon,
  },
];

export function Footer() {
  return (
    <footer
      id="contacto"
      className="scroll-mt-[calc(var(--navbar-height)+0.7rem)] border-t border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(212,20,20,0.16),transparent_38%),linear-gradient(180deg,#121318_0%,#0b0c10_100%)]"
    >
      <div className="layout-shell py-10 md:py-12">
        <div className="textured-surface rounded-[16px] border border-white/14 bg-[linear-gradient(145deg,#14151a_0%,#101116_100%)] p-6 shadow-[0_34px_68px_-48px_rgba(0,0,0,0.95)] md:p-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-[11px] border border-white/16 bg-[linear-gradient(120deg,rgba(122,14,14,0.32)_0%,rgba(122,14,14,0.14)_100%)] px-3 py-2">
              <div className="grid size-9 place-items-center rounded-[9px] border border-primary/35 bg-primary/20 text-primary">
                <span className="font-heading text-sm font-bold">PG</span>
              </div>
              <div>
                <p className="font-heading text-[1.1rem] font-semibold tracking-[0.05em] text-foreground">Pepu Gonzalez</p>
                <p className="text-[11px] tracking-[0.2em] text-muted-foreground">COACHING</p>
              </div>
            </div>

            <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(212,20,20,0.88)_46%,rgba(255,255,255,0.04)_100%)]" />

            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Contacto directo para resolver dudas y elegir tu plan.
            </p>

            <a
              href="mailto:contacto@pepugonzalez.com"
              className="group inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Mail className="size-4" />
              <span className="relative">
                contacto@pepugonzalez.com
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </span>
            </a>
          </div>

          <div className="mt-6">
            <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ir a ${item.label}`}
                  title={item.label}
                  className="group inline-flex size-11 shrink-0 items-center justify-center rounded-[11px] border border-white/14 bg-[linear-gradient(130deg,rgba(17,18,24,0.92)_0%,rgba(12,13,18,0.98)_100%)] text-white/86 transition-[transform,border-color,box-shadow,color] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:border-primary/48 hover:text-white hover:shadow-[0_18px_30px_-20px_rgba(212,20,20,0.92)] active:translate-y-0"
                >
                  <item.icon className="transition-transform duration-200 group-hover:translate-x-[2px]" />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="my-6 h-px w-full bg-white/10" />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <Link href="#" className="group relative font-medium text-foreground/94 transition-colors duration-200 hover:text-primary">
                Politica de privacidad
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </Link>
              <Link href="#" className="group relative font-medium text-foreground/94 transition-colors duration-200 hover:text-primary">
                Terminos y condiciones
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/90">© 2026 Pepu Gonzalez. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
