import { Check, Phone, X } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { PrimaryButton } from "@/components/site/primary-button";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";

// TODO: reemplazá "#" con tu link de Calendly u otro sistema de turnos
const BOOKING_URL = "#";

const INCLUDES = [
  "Aprendés a comer con lo que ya comés. Milanesa, asado, fideos, todo entra.",
  "Rutina adaptada para los días que entrenás, y no te estanques mas.",
  "El plan se adapta 100% a vos solo.",
  "Me mandás el video haciendo el ejercicio y te corrijo la técnica.",
  "Las 30 recetas que uso yo.",
  "Cada 15 días miramos fotos y medidas y ajusto lo que haga falta.",
  "Mi WhatsApp. El mío.",
  "Y lo que no te da nadie: qué hacer el día que te mandaste una cagada y tenés ganas de largar todo.",
];

const EXCLUDES = [
  "Suplementos mágicos. Nada de eso hace falta.",
  "Caminos rápidos. Ni retos de 15 días ni bajar 10 kilos en un mes.",
  "si venís a intentar una semana. Esto es para el que ya se cansó de arrancar y dejar.",
];

export function AsesoriaPage() {
  return (
    <main>

      {/* PASO 4 — Resumen: arriba de todo, antes de "QUÉ TE LLEVÁS" */}
      <Section id="asesoria-resumen" tone="b" glow="faint-right">
        <SectionEyebrow>DE ENTRADA</SectionEyebrow>
        <SectionTitle className="mt-3">
          TODO LO QUE NECESITÁS <AccentText>saber</AccentText>
        </SectionTitle>

        <div className="mt-10 flex flex-col divide-y divide-[var(--dorado-suave)]/20">
          <div className="pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Para quién</p>
            <p className="copy mt-1.5 text-[var(--texto)]">
              Tenés entre <span className="font-bold text-[var(--dorado)]">18 y 30</span>, entrenás hace un tiempo y no ves los cambios que querés.
            </p>
          </div>
          <div className="py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Resultado</p>
            <p className="copy mt-1.5 text-[var(--texto)]">
              <span className="font-bold text-[var(--dorado)]">Definis</span> sin dejar de comer lo que te gusta, y aprendés a sostenerlo solo.
            </p>
          </div>
          <div className="py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Tiempo</p>
            <p className="copy mt-1.5 text-[var(--texto)]">
              <span className="font-bold text-[var(--dorado)]">90 días.</span>
            </p>
          </div>
          <div className="py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Qué incluye</p>
            <p className="copy mt-1.5 text-[var(--texto)]">
              Una videollamada conmigo{" "}
              <span className="font-bold text-[var(--dorado)]">todas las semanas</span> de{" "}
              <span className="font-bold text-[var(--dorado)]">45 minutos</span>, rutina armada para tus días y tu
              gimnasio, corrección de técnica en vivo sobre tus videos, el recetario, y WhatsApp para dudas.
            </p>
          </div>
          <div className="pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Lugares</p>
            <p className="copy mt-1.5 text-[var(--texto)]">
              <span className="font-bold text-[var(--dorado)]">5.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* PASO 6 — El mecanismo */}
      <Section id="asesoria-mecanismo" tone="a" glow="faint-left">
        <SectionEyebrow>EL MECANISMO</SectionEyebrow>
        <SectionTitle className="mt-3">
          No te mando un PDF. <AccentText>Te veo entrenar.</AccentText>
        </SectionTitle>
        <p className="copy mt-5 text-[var(--texto-gris)]">
          Todas las semanas, 45 minutos, cara a cara. Me mostrás los videos de tus series y te corrijo en vivo.
        </p>
      </Section>

      {/* Qué te llevás */}
      <Section id="asesoria" tone="b" glow="faint-right">
        <SectionEyebrow>LA ASESORÍA</SectionEyebrow>
        <SectionTitle className="mt-3">
          QUÉ TE <AccentText>llevás</AccentText>
        </SectionTitle>

        <div className="mt-12 flex flex-col gap-4 md:mt-14">
          {INCLUDES.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PASO 5 — Precio */}
      <Section id="asesoria-precio" tone="a" glow="faint-left">
        <SectionEyebrow>PRECIO</SectionEyebrow>
        <SectionTitle className="mt-3">
          <AccentText>$99.000</AccentText> por mes
        </SectionTitle>
        <p className="copy mt-4 text-[var(--texto-gris)]">
          3 meses · 5 lugares. Del sexto lugar en adelante, $139.000.
        </p>
      </Section>

      {/* Qué no vas a encontrar */}
      <Section id="asesoria-que-no-incluye" tone="b" glow="faint-right">
        <SectionEyebrow>SEAMOS CLAROS</SectionEyebrow>
        <SectionTitle className="mt-3">
          QUÉ NO VAS A <AccentText>encontrar</AccentText>
        </SectionTitle>

        <div className="mt-10 flex flex-col gap-4">
          {EXCLUDES.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <X className="mt-1 size-4 shrink-0 text-[var(--dorado-suave)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto-gris)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PASO 7 — Garantía */}
      <Section id="asesoria-garantia" tone="a" glow="soft-left">
        <SectionEyebrow>GARANTÍA</SectionEyebrow>
        <SectionTitle className="mt-3">
          Sin resultados, seguís <AccentText>sin pagar</AccentText>
        </SectionTitle>
        <p className="copy mt-5 text-[var(--texto-gris)]">
          Si cumplís el 90% de los entrenamientos y registrás tus comidas, y a los 90 días no ves cambios, seguís conmigo sin pagar hasta que los veas.
        </p>
      </Section>

      {/* PASO 8 — CTA: llamada de diagnóstico */}
      <Section id="asesoria-cta" tone="b" glow="faint-right" containerClassName="flex flex-col items-center text-center">
        <PrimaryButton
          href={BOOKING_URL}
          icon={<Phone className="size-4 shrink-0" />}
          caption="15 minutos · sin costo · sin compromiso"
        >
          Pedir la llamada de 15 minutos
        </PrimaryButton>
      </Section>

    </main>
  );
}
