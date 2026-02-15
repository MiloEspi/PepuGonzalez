import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Music2, Youtube } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "TikTok", href: "#", icon: Music2 },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Facebook", href: "#", icon: Facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-white/10 bg-[linear-gradient(180deg,#15161a_0%,#0f0f12_100%)] md:scroll-mt-28">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="textured-surface rounded-[10px] border border-white/12 bg-[linear-gradient(145deg,#14151a_0%,#101116_100%)] p-6 shadow-[0_34px_68px_-48px_rgba(0,0,0,0.95)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 rounded-[8px] border border-primary/28 bg-[rgba(122,14,14,0.22)] px-3 py-2">
                <div className="grid size-9 place-items-center rounded-[6px] border border-primary/38 bg-primary/18 text-primary">
                  <span className="font-heading text-sm font-bold">PG</span>
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold tracking-[0.08em] text-foreground">PEPU GONZALEZ</p>
                  <p className="text-[11px] tracking-[0.2em] text-muted-foreground">COACHING</p>
                </div>
              </div>

              <p className="max-w-sm text-sm text-muted-foreground">
                Contacto directo para resolver dudas, elegir plan y coordinar tu ingreso.
              </p>

              <a
                href="mailto:contacto@pepugonzalez.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                contacto@pepugonzalez.com
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-background/58 text-muted-foreground transition-all duration-200 hover:-translate-y-px hover:border-primary/45 hover:bg-primary/18 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                >
                  <item.icon className="size-4.5" strokeWidth={2.05} />
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-6 bg-border/80" />

          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="font-medium text-foreground transition-colors hover:text-primary">
                Politica de privacidad
              </Link>
              <Link href="#" className="font-medium text-foreground transition-colors hover:text-primary">
                Terminos y condiciones
              </Link>
            </div>
            <p>{year} Pepu Gonzalez. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
