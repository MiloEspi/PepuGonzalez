"use client";

import { MessageCircle } from "lucide-react";

import { getStickyWhatsAppHref } from "@/data/offers";

export function MobileWhatsAppSticky() {
  return (
    <a
      href={getStickyWhatsAppHref()}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 z-[70] inline-flex items-center gap-1.5 rounded-full bg-[var(--dorado)] px-3.5 py-2.5 text-xs font-bold text-black transition-[filter] duration-200 hover:brightness-110 md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      aria-label="Escribir por WhatsApp"
    >
      <MessageCircle className="size-4" />
      <span>WhatsApp</span>
    </a>
  );
}
