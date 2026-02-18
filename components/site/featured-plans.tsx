import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { SectionShell } from "@/components/site/section-shell";
import { Badge } from "@/components/ui/badge";
import {
  PROGRAMA_COLUMN_LABELS,
  PROGRAMA_COLUMN_ORDER,
  PROGRAMA_COMPARISON_ROWS,
  PROGRAMA_MAS_ELEGIDO_TIER,
  PROGRAMAS,
  getProgramaSummary,
} from "@/data/programas";
import { getStickyWhatsAppHref } from "@/data/offers";
import { cn } from "@/lib/utils";

const MAX_HOME_INCLUDE_ITEMS = 6;

export function FeaturedPlans() {
  return (
    <SectionShell
      id="planes"
      eyebrow="PLANES Y PROGRAMAS"
      title="Elegí el programa que mejor encaja con tu objetivo"
      description="Resumen rápido por plan en la home. En cada detalle vas a ver el contenido completo."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PROGRAMAS.map((programa) => {
          const isMostChosen = programa.tier === PROGRAMA_MAS_ELEGIDO_TIER;
          const previewIncludes = programa.includes.slice(0, MAX_HOME_INCLUDE_ITEMS);
          const summary = getProgramaSummary(programa, 2);

          return (
            <article
              key={programa.slug}
              id={`plan-${programa.slug}`}
              className={cn(
                "relative flex h-full flex-col overflow-hidden rounded-[16px] border bg-[linear-gradient(152deg,#16171d_0%,#111216_100%)] p-5 shadow-[0_26px_46px_-38px_rgba(0,0,0,0.9)]",
                isMostChosen
                  ? "border-primary/50 bg-[linear-gradient(152deg,rgba(86,10,10,0.58)_0%,#111216_100%)] md:-translate-y-1 md:scale-[1.03]"
                  : "border-white/14"
              )}
            >
              <div className="space-y-3">
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

                <div>
                  <h3
                    className={cn(
                      "text-[1.35rem] font-black leading-[1.02] tracking-[0.03em] text-white md:text-[1.55rem]",
                      isMostChosen ? "text-[#ff4b4b]" : ""
                    )}
                  >
                    {programa.subtitle}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">{summary}</p>
                </div>

                <div className="rounded-[11px] border border-white/14 bg-black/28 px-3.5 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/62">Precio</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {programa.pricing.ars ?? "Consultar"}
                    <span className="px-2 text-white/38">|</span>
                    <span className="text-sm font-medium text-white/86">{programa.pricing.usd ?? "Consultar"}</span>
                  </p>
                  {programa.limits ? <p className="mt-1 text-xs text-white/70">{programa.limits}</p> : null}
                </div>

                <ul className="space-y-2">
                  {previewIncludes.map((item) => (
                    <li key={`${programa.slug}-${item}`} className="flex items-start gap-2.5 text-sm text-white/86">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[7px] border border-primary/35 bg-primary/12 text-primary">
                        <Check className="size-3.5" />
                      </span>
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 grid gap-2">
                <AnimatedButton
                  href={`/planes/${programa.slug}`}
                  className={cn(
                    "h-11 w-full justify-between rounded-[10px] border px-4 text-[0.72rem] font-bold tracking-[0.11em]",
                    isMostChosen
                      ? "border-primary/58 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] text-white"
                      : "border-white/20 bg-white/10 text-white hover:bg-white/14"
                  )}
                >
                  <span>Ver detalle</span>
                  <ArrowRight className="size-4 shrink-0" />
                </AnimatedButton>

                <a
                  href={getStickyWhatsAppHref(programa.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#25D366]/58 bg-[#25D366]/12 px-3 py-2.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-[#8affbc] transition-colors duration-200 hover:bg-[#25D366]/20"
                  aria-label={programa.ctaLabel}
                >
                  {programa.ctaLabel}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-7 rounded-[16px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-white">Tabla comparativa</h3>
          <p className="text-[11px] uppercase tracking-[0.11em] text-white/58">INICIO | BASE | TRANSFORMACIÓN | MENTORÍA</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="rounded-l-[10px] border border-white/15 bg-black/34 px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-white/62">
                  Característica
                </th>
                {PROGRAMA_COLUMN_ORDER.map((tier, index) => (
                  <th
                    key={`comparison-head-${tier}`}
                    className={cn(
                      "border border-white/15 bg-black/34 px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-white/82",
                      index === PROGRAMA_COLUMN_ORDER.length - 1 ? "rounded-r-[10px]" : ""
                    )}
                  >
                    {PROGRAMA_COLUMN_LABELS[tier]}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PROGRAMA_COMPARISON_ROWS.map((row) => (
                <tr key={`comparison-row-${row.label}`}>
                  <td className="border border-white/12 bg-[rgba(17,18,24,0.92)] px-3 py-2.5 font-semibold text-white/84">{row.label}</td>
                  {PROGRAMA_COLUMN_ORDER.map((tier) => (
                    <td key={`comparison-cell-${row.label}-${tier}`} className="border border-white/12 bg-[rgba(17,18,24,0.7)] px-3 py-2.5 text-white/80">
                      {row.values[tier]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-white/60">
          El resumen completo de cada programa está disponible en su detalle:{" "}
          <Link href="/planes/programa-transformacion" className="underline decoration-primary/70 underline-offset-4 hover:text-white">
            ver ejemplo
          </Link>
          .
        </p>
      </section>
    </SectionShell>
  );
}
