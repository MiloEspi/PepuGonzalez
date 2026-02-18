import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { Badge } from "@/components/ui/badge";
import { PROGRAMAS, getProgramaBySlug } from "@/data/programas";
import { getStickyWhatsAppHref } from "@/data/offers";

interface PlanDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMAS.map((programa) => ({ slug: programa.slug }));
}

export async function generateMetadata({ params }: PlanDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const programa = getProgramaBySlug(slug);
  if (!programa) return {};

  return {
    title: `${programa.title} – ${programa.subtitle} | Pepu Gonzalez`,
    description: programa.descriptionLong.split("\n").filter(Boolean).slice(0, 2).join(" "),
  };
}

function PriceDisplay({ ars, usd, note }: { ars?: string; usd?: string; note?: string }) {
  return (
    <div className="rounded-[12px] border border-white/14 bg-black/30 px-4 py-3.5">
      <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">Precio</p>
      <p className="mt-1 text-xl font-semibold text-white">
        {ars ?? "Consultar ARS"}
        <span className="px-2 text-white/38">|</span>
        <span className="text-base font-medium text-white/86">{usd ?? "Consultar USD"}</span>
      </p>
      {note ? <p className="mt-1 text-xs text-white/70">{note}</p> : null}
    </div>
  );
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { slug } = await params;
  const programa = getProgramaBySlug(slug);
  if (!programa) notFound();

  return (
    <main className="pb-16 pt-6">
      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <Link href="/#planes" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft className="size-4" />
          Volver a Planes y Programas
        </Link>

        <article className="mt-5 rounded-[18px] border border-white/14 bg-[linear-gradient(146deg,#17181d_0%,#101116_100%)] p-5 shadow-[0_34px_62px_-42px_rgba(0,0,0,0.95)] md:p-7">
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-[9px] border border-white/18 bg-black/35 px-2.5 py-1 text-[10px] tracking-[0.11em] text-white/88">
              {programa.title}
            </Badge>
            {programa.badges.map((badge) => (
              <Badge
                key={`${programa.slug}-${badge}`}
                className="rounded-[999px] border border-primary/42 bg-primary/20 px-2.5 py-1 text-[10px] tracking-[0.11em] text-white"
              >
                {badge}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-[2rem] font-black leading-[0.97] tracking-[0.03em] text-white md:text-[2.6rem]">{programa.subtitle}</h1>

          {programa.limits ? (
            <p className="mt-2 inline-flex rounded-[10px] border border-primary/44 bg-primary/16 px-3 py-1.5 text-xs font-medium text-white/92">{programa.limits}</p>
          ) : null}

          <div className="mt-5">
            <PriceDisplay ars={programa.pricing.ars} usd={programa.pricing.usd} note={programa.pricing.note} />
          </div>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <AnimatedButton
              href={getStickyWhatsAppHref(programa.title)}
              target="_blank"
              rel="noreferrer"
              className="h-11 w-full justify-between rounded-[10px] border border-primary/58 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-4 text-[0.74rem] font-bold tracking-[0.1em] text-white"
            >
              <span>{programa.ctaLabel}</span>
            </AnimatedButton>

            <AnimatedButton
              href="/#planes"
              className="h-11 w-full justify-center rounded-[10px] border border-white/20 bg-white/10 px-4 text-[0.74rem] font-semibold tracking-[0.08em] text-white hover:bg-white/14"
            >
              Ver otros programas
            </AnimatedButton>
          </div>
        </article>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-5">
        <article className="rounded-[14px] border border-white/14 bg-[linear-gradient(146deg,#17181d_0%,#101116_100%)] p-5">
          <h2 className="text-lg font-semibold text-white">Descripción persuasiva completa</h2>
          <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-white/84">
            {programa.descriptionLong.split("\n").map((line, index) => (
              <p key={`${programa.slug}-description-${index}`}>{line}</p>
            ))}
          </div>
        </article>

        <article className="rounded-[14px] border border-white/14 bg-[linear-gradient(146deg,#17181d_0%,#101116_100%)] p-5">
          <h2 className="text-lg font-semibold text-white">Incluye</h2>
          <ul className="mt-3 space-y-2.5">
            {programa.includes.map((item) => (
              <li key={`${programa.slug}-include-${item}`} className="flex items-start gap-2.5 rounded-[10px] border border-white/12 bg-black/24 px-3 py-2.5 text-sm text-white/86">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[7px] border border-primary/35 bg-primary/12 text-primary">
                  <Check className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[14px] border border-white/14 bg-[linear-gradient(146deg,#17181d_0%,#101116_100%)] p-5">
          <h2 className="text-lg font-semibold text-white">Ideal para</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/84">{programa.idealFor}</p>
        </article>

        {programa.resultExpected ? (
          <article className="rounded-[14px] border border-white/14 bg-[linear-gradient(146deg,#17181d_0%,#101116_100%)] p-5">
            <h2 className="text-lg font-semibold text-white">Resultado esperado</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/84">{programa.resultExpected}</p>
          </article>
        ) : null}

        {programa.conversionFlow ? (
          <article className="rounded-[14px] border border-white/14 bg-[linear-gradient(146deg,#17181d_0%,#101116_100%)] p-5">
            <h2 className="text-lg font-semibold text-white">Flujo de conversión</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/84">{programa.conversionFlow}</p>
          </article>
        ) : null}

        <article className="rounded-[14px] border border-primary/42 bg-[linear-gradient(146deg,rgba(122,14,14,0.32)_0%,rgba(26,9,11,0.9)_100%)] p-5">
          <h2 className="text-lg font-semibold text-white">CTA final</h2>
          <p className="mt-2 text-sm text-white/86">{programa.ctaLabel}</p>
          <AnimatedButton
            href={getStickyWhatsAppHref(programa.title)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 h-11 w-full justify-between rounded-[10px] border border-primary/58 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-4 text-[0.74rem] font-bold tracking-[0.1em] text-white sm:w-auto"
          >
            <span>{programa.ctaLabel}</span>
          </AnimatedButton>
        </article>
      </section>
    </main>
  );
}
