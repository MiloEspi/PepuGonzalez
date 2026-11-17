import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { DIGITAL_PRODUCTS } from "@/data/digital-products";
import { formatPrecio, PRECIOS } from "@/data/precios";
import { publicAssetSlot } from "@/lib/public-asset";
import { cn } from "@/lib/utils";

// Si se vacía, la tarjeta del recetario deja de mostrarse.
const RECETARIO_CHECKOUT_URL = "https://pay.hotmart.com/M108536789S";

type Card = {
  key: string;
  title: string;
  text: string;
  price: number;
  href: string;
  cta: string;
  previewSlot: ReturnType<typeof publicAssetSlot>;
  imagePosition: string;
};

const CARDS: Card[] = [
  ...(RECETARIO_CHECKOUT_URL
    ? [
        {
          key: "recetario",
          title: "Definir comiendo rico",
          text: "Las recetas que como yo para estar definido, cada una con sus macros. Más cómo armo mi día, intercambios y lista del súper.",
          price: PRECIOS.recetario,
          href: RECETARIO_CHECKOUT_URL,
          cta: "Lo quiero",
          previewSlot: publicAssetSlot("preview/recetario-1.jpg"),
          imagePosition: "center top",
        },
      ]
    : []),
  {
    key: "rutinas",
    title: DIGITAL_PRODUCTS.rutinas.title,
    text: DIGITAL_PRODUCTS.rutinas.tagline,
    price: PRECIOS[DIGITAL_PRODUCTS.rutinas.priceKey],
    href: `/${DIGITAL_PRODUCTS.rutinas.slug}`,
    cta: "Ver qué trae",
    previewSlot: publicAssetSlot("preview/rutinas-portada.jpg"),
    imagePosition: "center 35%",
  },
];

const cardClass =
  "group flex flex-col overflow-hidden rounded-[16px] border border-[var(--dorado-suave)] bg-[var(--negro-2)] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-[var(--dorado)]";

function CardBody({ card }: { card: Card }) {
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
      <div className="flex flex-1 flex-col p-6">
        <p className="font-heading text-xl uppercase tracking-tight text-[var(--texto)]">{card.title}</p>
        <p className="copy mt-2 text-[var(--texto-gris)]">{card.text}</p>
        <p className="mt-3 font-heading text-3xl text-[var(--dorado)]">{formatPrecio(card.price)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--dorado)]">
          {card.cta}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </>
  );
}

export function ProductsTeaserSection() {
  return (
    <Section id="mas-formas-de-empezar" tone="a" glow="faint-left">
      <SectionTitle>
        MÁS FORMAS DE <AccentText>empezar</AccentText>
      </SectionTitle>

      <div className={cn("mt-12 grid gap-4", CARDS.length > 1 && "md:grid-cols-2")}>
        {CARDS.map((card) =>
          card.href.startsWith("http") ? (
            <a key={card.key} href={card.href} target="_blank" rel="noreferrer" className={cardClass}>
              <CardBody card={card} />
            </a>
          ) : (
            <Link key={card.key} href={card.href} className={cardClass}>
              <CardBody card={card} />
            </Link>
          )
        )}
      </div>
    </Section>
  );
}
