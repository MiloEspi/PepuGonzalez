export type DigitalProductSlug = "recetario" | "rutinas";

export interface DigitalProductFaq {
  question: string;
  answer: string;
}

export interface DigitalProduct {
  slug: DigitalProductSlug;
  navLabel: string;
  title: string;
  tagline: string;
  audience: string;
  priceKey: "recetario" | "rutina";
  whatsappMessage: string;
  whatsInside: string[];
  audienceYes: string[];
  audienceNo: string[];
  faqs: DigitalProductFaq[];
}

export const DIGITAL_PRODUCTS: Record<DigitalProductSlug, DigitalProduct> = {
  recetario: {
    slug: "recetario",
    navLabel: "Recetario",
    title: "Recetario",
    tagline: "30 recetas argentinas armadas para bajar de peso sin vivir a pollo y arroz.",
    audience: "Para el que ya entrena o come más o menos ordenado y necesita variedad real.",
    priceKey: "recetario",
    whatsappMessage: "Hola Pepu, quiero el recetario",
    whatsInside: [
      "30 recetas: milanesas al horno, guisos, tartas, pastas y más — comida de todos los días.",
      "Cada receta con las porciones ya armadas, no tenés que calcular nada.",
      "Pensadas para déficit calórico sin dejar de comer comida argentina.",
    ],
    audienceYes: [
      "Ya sabés más o menos cuánto tenés que comer y te falta variedad.",
      "Cocinás vos, aunque sea poco.",
      "Querés dejar de comer pollo y arroz todos los días.",
    ],
    audienceNo: [
      "No sabés cuántas calorías necesitás — ahí primero hace falta el diagnóstico del 1 a 1.",
      "Buscás que alguien te arme el plan completo y te siga el progreso.",
    ],
    faqs: [
      {
        question: "¿Cómo lo recibo?",
        answer: "Es un PDF descargable. Apenas esté el cobro andando, te llega directo al mail.",
      },
      {
        question: "¿Tengo que pesar y calcular todo?",
        answer: "No. Cada receta ya trae las porciones armadas — la seguís y ya está.",
      },
      {
        question: "¿Sirve si no entreno?",
        answer: "Sí, esto es solo comida. El entrenamiento va aparte, en Rutinas.",
      },
    ],
  },
  rutinas: {
    slug: "rutinas",
    navLabel: "Rutinas",
    title: "Rutinas",
    tagline: "Planes de entrenamiento de 3, 4, 5 y 6 días, para elegir el que entra en tu semana real.",
    audience: "Para el que ya tiene la comida más o menos resuelta y solo necesita qué hacer en el gimnasio.",
    priceKey: "rutina",
    whatsappMessage: "Hola Pepu, quiero las rutinas",
    whatsInside: [
      "Rutinas armadas por cantidad de días: 3, 4, 5 o 6 por semana.",
      "Ejercicios, series, repeticiones y progresión semana a semana.",
      "Pensadas para gimnasio con mancuernas, barras y máquinas básicas.",
    ],
    audienceYes: [
      "Ya entrenaste antes y sabés ejecutar los movimientos básicos.",
      "Tenés la comida más o menos ordenada y te falta la parte del gimnasio.",
      "Sabés cuántos días por semana podés entrenar de verdad.",
    ],
    audienceNo: [
      "Nunca entrenaste y no sabés ni agarrar una barra — ahí hace falta corrección en vivo, no un PDF.",
      "Necesitás que alguien te ajuste el plan según cómo vas respondiendo.",
    ],
    faqs: [
      {
        question: "¿Cómo lo recibo?",
        answer: "PDF descargable. Apenas esté el cobro andando, te llega directo al mail.",
      },
      {
        question: "¿Necesito gimnasio?",
        answer: "Sí, están pensadas para entrenar con mancuernas, barras y máquinas básicas.",
      },
      {
        question: "¿Incluye videos de técnica?",
        answer: "No. Eso es parte del 1 a 1. Acá encontrás la rutina y la progresión, no corrección de técnica.",
      },
    ],
  },
};
