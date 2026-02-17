"use client";

import Image from "next/image";

import { SectionShell } from "@/components/site/section-shell";

const ABOUT_IMAGE_SRC = "/DSC02489.jpg";

export function AboutSection() {
  return (
    <SectionShell id="sobre-mi" className="pt-1" contentClassName="gap-4">
      <span id="sobremi" aria-hidden className="sr-only" />

      <article className="overflow-hidden rounded-[18px] border border-white/14 bg-[linear-gradient(145deg,#16181f_0%,#101116_100%)] shadow-[0_34px_60px_-40px_rgba(0,0,0,0.95)]">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
          <Image
            src={ABOUT_IMAGE_SRC}
            alt="Pepu Gonzalez entrenando"
            fill
            sizes="(max-width: 768px) 100vw, 82vw"
            className="object-cover object-[center_18%] scale-[1.08]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.16)_0%,rgba(8,8,10,0.38)_44%,rgba(8,8,10,0.76)_100%)]" />

          <div className="absolute inset-x-0 top-0 px-5 pt-5 sm:px-6 sm:pt-6">
            <h2
              data-section-title
              className="section-shell-title inline-flex rounded-[10px] border border-white/14 bg-[rgba(8,9,12,0.52)] px-3 py-1.5 text-[0.88rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-[8px] drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
            >
              Sobre mí
            </h2>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-[linear-gradient(145deg,rgba(10,11,15,0.88)_0%,rgba(15,16,21,0.96)_100%)] px-5 py-4 sm:px-6 sm:py-5">
          <span data-section-line aria-hidden className="section-shell-active-bar mb-3 block" />
          <p className="max-w-3xl text-sm leading-relaxed text-white/84 sm:text-[0.98rem]">
            Soy Pepu Gonzalez. Soy de La Plata, Argentina, y convertí mi propio cambio físico en un sistema claro que
            hoy aplico con mis alumnos. Trabajo con estructura, seguimiento y decisiones simples para que progreses de
            verdad, sin improvisar ni perder tiempo.
          </p>
        </div>
      </article>
    </SectionShell>
  );
}
