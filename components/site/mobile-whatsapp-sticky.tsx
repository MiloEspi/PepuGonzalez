"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

import { getWhatsAppUrl, offers } from "@/data/offers";

function normalizePathname(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getDetailPlanName(pathname: string): string | null {
  const normalizedPathname = normalizePathname(pathname);
  const matchedOffer = offers.find(
    (offer) => normalizedPathname === `/programas/${offer.slug}` || normalizedPathname === `/planes/${offer.slug}`
  );
  return matchedOffer?.title ?? null;
}

export function MobileWhatsAppSticky() {
  const pathname = usePathname();
  const detailPlanName = getDetailPlanName(pathname);
  const whatsappMessage = detailPlanName
    ? `Me interesa el plan ${detailPlanName} para completar`
    : "Me interesa el plan ___ para completar";
  const whatsappLabel = detailPlanName ? `WhatsApp: ${detailPlanName}` : "WhatsApp";

  return (
    <a
      href={getWhatsAppUrl(whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 z-[70] inline-flex items-center gap-2 rounded-[10px] border border-[#25D366] bg-[#25D366] px-4 py-3 text-xs font-semibold text-[#06351d] shadow-[0_18px_32px_-22px_rgba(37,211,102,0.86)] transition-transform duration-[220ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:bg-[#1fbd5b] md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      aria-label="Abrir WhatsApp para aplicar a un plan"
    >
      <MessageCircle className="size-4" />
      <span>{whatsappLabel}</span>
    </a>
  );
}
