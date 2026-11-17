"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { WhatsAppGlyph } from "@/components/site/primary-button";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";
import { WHATSAPP_NUMBER } from "@/data/offers";

type FieldKey = "nombre" | "entrena" | "noCambia" | "probo" | "tresMeses" | "pais";

const FIELDS: Array<{ key: FieldKey; label: string; messageLabel: string; multiline?: boolean }> = [
  { key: "nombre", label: "Nombre", messageLabel: "Nombre" },
  { key: "entrena", label: "¿Cuánto hace que entrenás y cuántos días por semana?", messageLabel: "Entreno hace", multiline: true },
  { key: "noCambia", label: "¿Qué es lo que no te cambia aunque entrenes?", messageLabel: "Lo que no me cambia", multiline: true },
  { key: "probo", label: "¿Qué probaste antes y por qué lo dejaste?", messageLabel: "Probé antes", multiline: true },
  { key: "tresMeses", label: "Si en 3 meses estás igual que hoy, ¿qué te pasa?", messageLabel: "Si sigo igual en 3 meses", multiline: true },
  { key: "pais", label: "¿De qué país sos?", messageLabel: "País" },
];

const EMPTY: Record<FieldKey, string> = { nombre: "", entrena: "", noCambia: "", probo: "", tresMeses: "", pais: "" };

const inputClass =
  "w-full rounded-[12px] border border-[var(--dorado-suave)]/40 bg-[var(--negro)] px-4 py-3 text-base text-[var(--texto)] outline-none transition-colors duration-200 placeholder:text-[var(--texto-gris)]/60 focus:border-[var(--dorado)]";

export function ApplySection() {
  const [values, setValues] = useState(EMPTY);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      "Hola Pepu, quiero aplicar a la asesoría.",
      ...FIELDS.map((field) => `${field.messageLabel}: ${values[field.key].trim()}`),
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    // En celular, window.open puede quedar bloqueado; en ese caso abrimos en la misma pestaña.
    const popup = window.open(url, "_blank");
    if (popup) popup.opener = null;
    else window.location.href = url;
  }

  return (
    <Section id="aplicar" tone="a" glow>
      <SectionEyebrow>CUPOS FUNDADORES</SectionEyebrow>
      <SectionTitle className="mt-3">
        APLICÁ A LA <AccentText>asesoría</AccentText>
      </SectionTitle>
      <p className="copy mt-5 text-[var(--texto-gris)]">
        Abro 5 lugares. Son pocos porque los sigo de cerca a cada uno. Completá esto y te respondo yo por WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex max-w-[620px] flex-col gap-6">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[var(--texto)]">{field.label}</span>
            {field.multiline ? (
              <textarea
                required
                rows={3}
                value={values[field.key]}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className={`${inputClass} resize-y`}
              />
            ) : (
              <input
                required
                type="text"
                value={values[field.key]}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className={inputClass}
              />
            )}
          </label>
        ))}

        <div className="mt-2 flex flex-col items-center gap-2.5 self-center text-center">
          <button
            type="submit"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--dorado)] px-6 py-3.5 text-[0.95rem] font-bold text-black shadow-[0_0_36px_-12px_rgba(227,179,65,0.55)] transition-[filter] duration-200 hover:brightness-110 active:brightness-95"
          >
            <WhatsAppGlyph />
            <span>Enviar por WhatsApp</span>
            <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
          <p className="text-xs text-[var(--texto-gris)]">
            Se abre WhatsApp con tus respuestas ya escritas. Solo tenés que tocar enviar.
          </p>
        </div>
      </form>

      <p className="mt-10 max-w-[620px] text-center text-sm text-[var(--texto-gris)]">
        <a
          href="#mas-formas-de-empezar"
          className="underline-offset-4 transition-colors duration-200 hover:text-[var(--dorado)] hover:underline"
        >
          ¿Todavía no es tu momento? Empezá por el recetario o las rutinas ↓
        </a>
      </p>
    </Section>
  );
}
