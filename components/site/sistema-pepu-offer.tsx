import { Check, ShieldCheck } from "lucide-react";

import { SectionShell } from "@/components/site/section-shell";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { getStickyWhatsAppHref } from "@/data/offers";

const INCLUDES = [
  "Diagnóstico inicial real (fotos, medidas, tu nivel y tus días) para construir todo sobre tu cuerpo",
  "Plan de entrenamiento 100% personalizado, con progresión semana a semana",
  "Plan de nutrición a medida, sin pasar hambre: sabés exactamente qué comer",
  "Videos de técnica de cada ejercicio para que entrenes bien y no te lesiones",
  "Ajustes cada 30 días según tu progreso",
  "Acompañamiento directo conmigo por WhatsApp",
  "Trabajo de cabeza para sostener el hábito y cambiar cómo te ves",
];

export function SistemaPepuOffer() {
  return (
    <SectionShell id="planes">
      <div className="mx-auto w-full max-w-xl">

        {/* ── Encabezado centrado ── */}
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-[#25D366]/30 bg-[#25D366]/[0.07] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#25D366]">
            El Programa
          </span>
          <h2 className="text-[2.4rem] font-bold uppercase leading-[1.0] text-white sm:text-[3rem]">
            El Sistema Pepu
          </h2>
          <p className="mt-2 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-primary sm:text-[0.9rem]">
            Tu transformación en 90 días
          </p>
        </div>

        {/* ── Tarjeta principal con glow bordeaux ── */}
        <div className="rounded-[18px] border border-primary/30 bg-[linear-gradient(150deg,#181015_0%,#100b0f_55%,#0a0a0c_100%)] shadow-[0_24px_64px_-20px_rgba(111,21,21,0.52),inset_0_1px_0_rgba(255,255,255,0.04)]">

          {/* Subtítulo + separador */}
          <div className="px-5 pb-4 pt-5 text-center md:px-7 md:pt-7">
            <p className="text-[0.92rem] leading-relaxed text-white/68 md:text-[0.97rem]">
              Un plan hecho para tu cuerpo para construir el físico que querés y la
              seguridad que buscás, sin vivir en el gimnasio ni muerto de hambre.
            </p>
            <div className="mt-4 h-px bg-white/8" />
          </div>

          {/* Lista de lo que incluye */}
          <div className="px-5 pb-5 md:px-7">
            <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
              Lo que incluye
            </p>
            <ul className="space-y-3.5">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[7px] bg-[#25D366]">
                    <Check className="size-3.5 stroke-[2.5] text-[#0d3320]" />
                  </span>
                  <span className="text-sm leading-snug text-white/82">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-5 h-px bg-white/8 md:mx-7" />

          {/* Garantía */}
          <div className="px-5 py-5 md:px-7">
            <div className="rounded-[12px] border border-[#25D366]/28 bg-[rgba(37,211,102,0.05)] px-4 py-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-[#25D366]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#25D366]/90">
                  Garantía Real
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                Si seguís el plan y hacés tus check-ins y a los 90 días no ves
                cambios, seguimos sin costo hasta que los veas. El riesgo lo pongo yo.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-white/8 px-5 py-5 md:px-7">
            <WhatsAppButton
              href={getStickyWhatsAppHref("Sistema Pepu")}
              size="lg"
              className="w-full justify-center text-sm font-bold shadow-[0_8px_32px_-8px_rgba(37,211,102,0.6)]"
            >
              Quiero mi lugar
            </WhatsAppButton>
            <p className="mt-3 text-center text-[0.72rem] text-white/38">
              Tomo pocos alumnos por mes · Cupos limitados
            </p>
          </div>
        </div>

      </div>
    </SectionShell>
  );
}
