import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { DIGITAL_PRODUCTS } from "@/data/digital-products";
import { formatPrecio, PRECIOS } from "@/data/precios";
import { publicAssetSlot } from "@/lib/public-asset";

const CARDS = [
  { ...DIGITAL_PRODUCTS.recetario, previewSlot: publicAssetSlot("preview/recetario-1.jpg") },
  { ...DIGITAL_PRODUCTS.rutinas, previewSlot: publicAssetSlot("preview/rutinas-1.jpg") },
];

export function ProductsTeaserSection() {
  return (
    <Section id="mas-formas-de-empezar" tone="b">
      <SectionTitle>
        MÁS FORMAS DE <AccentText>empezar</AccentText>
      </SectionTitle>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.slug}
            href={`/${card.slug}`}
            className="group flex flex-col overflow-hidden rounded-[16px] border border-[var(--dorado-suave)] bg-[var(--negro-2)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--dorado)]"
          >
            <div className="relative aspect-[16/10] w-full bg-[var(--negro)]">
              {card.previewSlot.exists ? (
                <Image src={card.previewSlot.src} alt={card.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--texto-gris)]">{card.previewSlot.filename}</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="font-heading text-xl uppercase tracking-tight text-[var(--texto)]">{card.title}</p>
              <p className="copy mt-2 text-[var(--texto-gris)]">{card.tagline}</p>
              <p className="mt-3 font-heading text-3xl text-[var(--dorado)]">{formatPrecio(PRECIOS[card.priceKey])}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--dorado)]">
                Ver qué trae
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
