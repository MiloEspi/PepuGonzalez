import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
];

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-border/70 bg-card/70 md:scroll-mt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-heading text-base font-semibold text-foreground">Pepu Gonzalez Coaching</p>
          <p>Planes personalizados para fuerza, estetica y rendimiento.</p>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>

        <p>{new Date().getFullYear()} Pepu Gonzalez. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
