import Link from "next/link";
import { Facebook, Instagram, Linkedin, Music2, Youtube } from "lucide-react";

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
    <footer
      id="contacto"
      className="scroll-mt-24 border-t border-slate-800 bg-[linear-gradient(180deg,hsl(221_28%_12%)_0%,hsl(222_31%_8%)_100%)] md:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-xl border border-[#f2dd1a]/40 bg-black/25 px-4 py-3">
          <div className="grid size-10 place-items-center rounded-md border border-[#f2dd1a]/65 text-[#f2dd1a]">
            <span className="font-heading text-sm font-bold tracking-wide">PG</span>
          </div>
          <div className="text-left">
            <p className="font-heading text-sm font-semibold tracking-[0.12em] text-slate-100">PEPU GONZALEZ</p>
            <p className="text-[11px] tracking-[0.24em] text-slate-400">COACHING</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="inline-flex size-12 items-center justify-center rounded-full border border-[#f2dd1a] bg-[#f2dd1a] text-slate-950 transition-transform duration-200 hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2dd1a]/70"
            >
              <item.icon className="size-5" strokeWidth={2.2} />
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Link
            href="#"
            className="font-heading text-xs tracking-[0.2em] text-slate-100 transition-colors hover:text-[#f2dd1a]"
          >
            TERMS AND CONDITIONS
          </Link>
          <p className="text-xs text-slate-400">{year} Pepu Gonzalez. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
