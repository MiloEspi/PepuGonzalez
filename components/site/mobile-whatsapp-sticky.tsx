import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function MobileWhatsAppSticky() {
  return (
    <Link
      href="/#aplicar"
      className="fixed right-4 z-[70] inline-flex items-center gap-1.5 rounded-full bg-[var(--dorado)] px-3.5 py-2.5 text-xs font-bold text-black transition-[filter] duration-200 hover:brightness-110 md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <ArrowDown className="size-4" />
      <span>Aplicar</span>
    </Link>
  );
}
