import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AccentText } from "@/components/site/accent-text";
import { PaymentButtons } from "@/components/site/payment-buttons";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { DIGITAL_PRODUCTS, type DigitalProductPayment } from "@/data/digital-products";
import { formatPrecio, PRECIOS } from "@/data/precios";
import { publicAssetSlot } from "@/lib/public-asset";

type Card = {
  key: string;
  title: string;
  text: string;
  price: number;
  // Sin detailHref, la foto y el título no llevan a ningún lado.
  detailHref?: string;
  payment: DigitalProductPayment;
  previewSlot: ReturnType<typeof publicAssetSlot>;
  imagePosition: string;
};

const CARDS: Card[] = [
  {
    key: "recetario",
    title: "Definir comiendo rico",
    text: "Las recetas que como yo para estar definido, cada una con sus macros. Más cómo armo mi día, intercambios y lista del súper.",
    price: PRECIOS.recetario,
    payment: DIGITAL_PRODUCTS.recetario.payment,
    previewSlot: publicAssetSlot("preview/recetario-1.jpg"),
    imagePosition: "center top",
  },
  {
    key: "rutinas",
    title: DIGITAL_PRODUCTS.rutinas.title,
    text: DIGITAL_PRODUCTS.rutinas.tagline,
    price: PRECIOS[DIGITAL_PRODUCTS.rutinas.priceKey],
    detailHref: `/${DIGITAL_PRODUCTS.rutinas.slug}`,
    payment: DIGITAL_PRODUCTS.rutinas.payment,
    previewSlot: publicAssetSlot("preview/rutinas-portada.jpg"),
    imagePosition: "center 35%",
  },
];

function CardTop({ card }: { card: Card }) {
  return (
    <>
      <div className="relative aspect-[4/5] w-full bg-[var(--negro)]">
        {card.previewSlot.exists ? (
          <Image
            src={card.previewSlot.src}
            alt={card.title}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: card.imagePosition }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--texto-gris)]">{card.previewSlot.filename}</span>
          </div>
        )}
      </div>
      <div className="px-6 pt-6">
        <p className="font-heading text-xl uppercase tracking-tight text-[var(--texto)]">{card.title}</p>
        <p className="copy mt-2 text-[var(--texto-gris)]">{card.text}</p>
        <p className="mt-3 font-heading text-3xl text-[var(--dorado)]">{formatPrecio(card.price)}</p>
      </div>
    </>
  );
}

function MaybeLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <div>{children}</div>;
  return (
    <Link href={href} className="block transition-opacity duration-200 hover:opacity-90">
      {children}
    </Link>
  );
}

export function ProductsTeaserSection() {
  return (
    <Section id="mas-formas-de-empezar" tone="a" glow="faint-left">
      <SectionTitle>
        MÁS FORMAS DE <AccentText>empezar</AccentText>
      </SectionTitle>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {CARDS.map((card) => (
          <article
            key={card.key}
            className="flex flex-col overflow-hidden rounded-[16px] border border-[var(--dorado-suave)] bg-[var(--negro-2)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--dorado)]"
          >
            <MaybeLink href={card.detailHref}>
              <CardTop card={card} />
            </MaybeLink>
            <PaymentButtons payment={card.payment} className="mt-auto px-6 pb-6 pt-5" />
          </article>
        ))}
      </div>
    </Section>
  );
}
