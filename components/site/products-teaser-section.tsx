import Link from "next/link";

import { AccentText } from "@/components/site/accent-text";
import { CardImageCarousel, type CarouselSlide } from "@/components/site/card-image-carousel";
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
  titleHref?: string;
  payment: DigitalProductPayment;
  slides: CarouselSlide[];
};

function slides(items: Array<{ path: string; alt: string; fit: CarouselSlide["fit"]; position?: string }>): CarouselSlide[] {
  return items
    .map((item) => ({ slot: publicAssetSlot(item.path), ...item }))
    .filter((item) => item.slot.exists)
    .map(({ slot, alt, fit, position }) => ({ src: slot.src, alt, fit, position }));
}

const CARDS: Card[] = [
  {
    key: "recetario",
    title: "Definir comiendo rico",
    text: "Las recetas que como yo para estar definido, cada una con sus macros. Más cómo armo mi día, intercambios y lista del súper.",
    price: PRECIOS.recetario,
    payment: DIGITAL_PRODUCTS.recetario.payment,
    slides: slides([
      { path: "preview/recetario-portada.jpg", alt: "Portada del recetario Definir comiendo rico", fit: "cover", position: "center top" },
      { path: "preview/recetario-pagina.jpg", alt: "Página de receta del recetario", fit: "contain" },
    ]),
  },
  {
    key: "rutinas",
    title: DIGITAL_PRODUCTS.rutinas.title,
    text: DIGITAL_PRODUCTS.rutinas.tagline,
    price: PRECIOS[DIGITAL_PRODUCTS.rutinas.priceKey],
    titleHref: `/${DIGITAL_PRODUCTS.rutinas.slug}`,
    payment: DIGITAL_PRODUCTS.rutinas.payment,
    slides: slides([
      { path: "preview/rutinas-portada.jpg", alt: "Pepu González", fit: "cover", position: "center 35%" },
      { path: "preview/rutinas-tabla.jpg", alt: "Tabla de las 12 semanas", fit: "contain" },
      { path: "preview/rutinas-2.jpg", alt: "Día de entrenamiento", fit: "contain" },
      { path: "preview/rutinas-3.jpg", alt: "Volumen semanal por músculo", fit: "contain" },
    ]),
  },
];

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
            <CardImageCarousel slides={card.slides} />

            <div className="px-6 pt-4">
              {card.titleHref ? (
                <Link
                  href={card.titleHref}
                  className="font-heading text-xl uppercase tracking-tight text-[var(--texto)] underline-offset-4 transition-colors duration-200 hover:text-[var(--dorado)] hover:underline"
                >
                  {card.title}
                </Link>
              ) : (
                <p className="font-heading text-xl uppercase tracking-tight text-[var(--texto)]">{card.title}</p>
              )}
              <p className="copy mt-2 text-[var(--texto-gris)]">{card.text}</p>
              <p className="mt-3 font-heading text-3xl text-[var(--dorado)]">{formatPrecio(card.price)}</p>
            </div>

            <PaymentButtons payment={card.payment} className="mt-auto px-6 pb-6 pt-5" />
          </article>
        ))}
      </div>
    </Section>
  );
}
