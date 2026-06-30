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
    <SectionShell
      id="planes"
      eyebrow="EL PROGRAMA"
      title="El Sistema Pepu — tu transformación en 90 días"
    >
      <div className="mx-auto w-full max-w-xl">
        {/* Subtítulo */}
        <p className="mb-6 text-center text-[0.97rem] leading-relaxed text-white/72 md:text-base">
          Un plan hecho para tu cuerpo para construir el físico que querés y la
          seguridad que buscás, sin vivir en el gimnasio ni muerto de hambre.
        </p>

        {/* Tarjeta principal */}
        <div className="rounded-[18px] border border-primary/28 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_32px_64px_-32px_rgba(122,14,14,0.45)]">

          {/* Lista de lo que incluye */}
          <div className="p-5 md:p-7">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
              Lo que incluye
            </p>
            <ul className="space-y-3.5">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[7px] border border-primary/40 bg-primary/16 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-snug text-white/86">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-5 h-px bg-white/8 md:mx-7" />

          {/* Garantía + cupos */}
          <div className="p-5 md:p-7">
            <div className="rounded-[12px] border border-[#25D366]/28 bg-[rgba(37,211,102,0.04)] px-4 py-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-[#25D366]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#25D366]/80">
                  Garantía
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                Si seguís el plan y hacés tus check-ins y a los 90 días no ves
                cambios, seguimos sin costo hasta que los veas. El riesgo lo pongo yo.
              </p>
            </div>

            <p className="mt-5 text-center text-[0.8rem] font-semibold tracking-[0.02em] text-white/48">
              Tomo pocos alumnos por mes para seguir cada caso de verdad.
            </p>
          </div>

          {/* CTA */}
          <div className="border-t border-white/8 px-5 py-5 md:px-7">
            <WhatsAppButton
              href={getStickyWhatsAppHref("Sistema Pepu")}
              size="lg"
              className="w-full justify-center text-sm font-bold"
            >
              Quiero mi lugar
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
