import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  caption?: string;
  className?: string;
}

/**
 * El único botón del sitio nuevo: pastilla dorada, texto negro, ícono a la
 * izquierda, flecha a la derecha. Sin borde, sin glow fuerte — solo una
 * sombra dorada muy sutil. Reusar en todas las secciones, no crear variantes.
 */
export function PrimaryButton({ href, children, icon, caption, className }: PrimaryButtonProps) {
  return (
    <div className="inline-flex flex-col items-center gap-2.5">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "group inline-flex items-center gap-2.5 rounded-full bg-[var(--dorado)] px-6 py-3.5 text-[0.95rem] font-bold text-black shadow-[0_0_36px_-12px_rgba(227,179,65,0.55)] transition-[filter] duration-200 hover:brightness-110 active:brightness-95",
          className
        )}
      >
        {icon}
        <span>{children}</span>
        <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
      {caption ? <p className="text-xs text-[var(--texto-gris)]">{caption}</p> : null}
    </div>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 shrink-0", className)} fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.48 0 .11 5.36.11 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.9 11.9 0 0 0 5.7 1.45h.01c6.58 0 11.94-5.36 11.95-11.95a11.84 11.84 0 0 0-3.38-8.38ZM12 21.7c-1.77 0-3.51-.47-5.03-1.37l-.36-.21-3.7.97.99-3.6-.24-.37a9.79 9.79 0 0 1-1.52-5.2c0-5.41 4.4-9.81 9.82-9.81 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.88 6.93c0 5.41-4.4 9.81-9.81 9.81Zm5.38-7.37c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.15-.18.29-.73.94-.9 1.14-.16.2-.33.22-.62.08-.29-.14-1.23-.45-2.34-1.43-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.12-.59.12-.12.29-.33.43-.49.14-.16.19-.28.29-.47.09-.2.05-.37-.02-.52-.07-.14-.64-1.55-.87-2.12-.24-.57-.48-.49-.64-.5l-.55-.01c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.46s1.07 2.85 1.22 3.05c.14.2 2.09 3.18 5.06 4.46.71.31 1.27.49 1.71.62.72.23 1.37.2 1.88.12.58-.09 1.7-.69 1.95-1.36.24-.67.24-1.24.17-1.36-.07-.13-.26-.2-.55-.34Z" />
    </svg>
  );
}
