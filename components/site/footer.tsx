import Link from "next/link";
import { Facebook, Instagram, Linkedin, Music2, Youtube } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "TikTok", href: "#", icon: Music2 },
  { label: "Facebook", href: "#", icon: Facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-border/70 bg-background/70 md:scroll-mt-28">
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="rounded-3xl border border-border/75 bg-card/82 p-6 shadow-[0_22px_36px_-34px_hsl(212_34%_20%)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3 rounded-xl border border-border/80 bg-background/75 px-3 py-2">
                <div className="grid size-9 place-items-center rounded-md border border-primary/35 bg-primary/10 text-primary">
                  <span className="font-heading text-sm font-bold">PG</span>
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold tracking-[0.08em] text-foreground">PEPU GONZALEZ</p>
                  <p className="text-[11px] tracking-[0.2em] text-muted-foreground">COACHING</p>
                </div>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Planes personalizados para fuerza, estetica y rendimiento con seguimiento cercano.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 bg-background/90 text-muted-foreground transition-all duration-200 hover:-translate-y-px hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                >
                  <item.icon className="size-4.5" strokeWidth={2.1} />
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-6 bg-border/70" />

          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <Link href="#" className="font-medium text-foreground transition-colors hover:text-primary">
              Terminos y condiciones
            </Link>
            <p>{year} Pepu Gonzalez. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
