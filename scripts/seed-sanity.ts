import fs from "node:fs";
import path from "node:path";
import { createReadStream } from "node:fs";

import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";

import { getOfferPrimaryHref, getStickyWhatsAppHref, offers } from "../data/offers";

type SeedDocument = Record<string, unknown> & { _id: string; _type: string };

type PlanTier = "inicio" | "base" | "transformacion" | "mentoria";

type ImageValue = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !apiVersion || !token) {
  throw new Error(
    "Faltan env vars requeridas: SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const PUBLIC_DIR = path.join(process.cwd(), "public");

const PLAN_ID_BY_TIER: Record<PlanTier, string> = {
  inicio: "plan-inicio",
  base: "plan-base",
  transformacion: "plan-transformacion",
  mentoria: "plan-mentoria",
};

const TIER_BY_OFFER_SLUG: Record<(typeof offers)[number]["slug"], PlanTier> = {
  "programa-inicio": "inicio",
  "programa-base": "base",
  "programa-transformacion": "transformacion",
  "mentoria-1-1": "mentoria",
};

const FAQ_ITEMS = [
  {
    order: 1,
    question: "¿En cuánto tiempo voy a ver resultados?",
    answer: "Si aplicás el sistema con consistencia, los primeros cambios suelen aparecer entre la semana 3 y la 5.",
  },
  {
    order: 2,
    question: "¿Esto es para mi nivel?",
    answer: "Sí. El punto de partida cambia, pero el método se adapta para que progreses sin improvisar.",
  },
  {
    order: 3,
    question: "¿Qué pasa si no puedo cumplir todo perfecto?",
    answer: "No busco perfección. Ajusto carga, volumen y frecuencia para que puedas sostener avance semana a semana.",
  },
  {
    order: 4,
    question: "¿Cómo sé que esto va a funcionar?",
    answer: "Porque no depende de motivación. Hay plan, seguimiento y ajustes según tu respuesta real.",
  },
  {
    order: 5,
    question: "¿Hay devoluciones?",
    answer: "Se revisa caso por caso después de la primera fase, según cumplimiento y ejecución del sistema.",
  },
];

const RESULT_ITEMS = [
  {
    id: "nico",
    personName: "Nicolás M.",
    testimonial: "Pasé de entrenar sin dirección a tener estructura clara. Subí masa y mejoré fuerza sin romper adherencia.",
    resultMetric: "+8kg",
    durationLabel: "16 semanas",
    beforeImagePath: "/isi antes.jpeg",
    afterImagePath: "/isi despues.jpeg",
    tagLabel: "TRANSFORMACIÓN REAL",
  },
  {
    id: "lucia",
    personName: "Lucía R.",
    testimonial: "Con seguimiento y plan ordenado pude sostener constancia real. El cambio visual en 3 meses fue gigante.",
    resultMetric: "-12kg",
    durationLabel: "90 días",
    beforeImagePath: "/isi antes.jpeg",
    afterImagePath: "/isi despues.jpeg",
    tagLabel: "TRANSFORMACIÓN REAL",
  },
  {
    id: "carla",
    personName: "Carla V.",
    testimonial: "Entendí cómo progresar semana a semana. Mejor postura, más energía y mucho más control de mi entrenamiento.",
    resultMetric: "+5kg magros",
    durationLabel: "14 semanas",
    beforeImagePath: "/isi antes.jpeg",
    afterImagePath: "/isi despues.jpeg",
    tagLabel: "TRANSFORMACIÓN REAL",
  },
  {
    id: "franco",
    personName: "Franco A.",
    testimonial: "Por primera vez dejé de improvisar. El sistema fue simple de ejecutar y los resultados aparecieron rápido.",
    resultMetric: "-9cm cintura",
    durationLabel: "12 semanas",
    beforeImagePath: "/isi antes.jpeg",
    afterImagePath: "/isi despues.jpeg",
    tagLabel: "TRANSFORMACIÓN REAL",
  },
];

function toPublicFilePath(publicPath: string): string {
  return path.join(PUBLIC_DIR, publicPath.replace(/^[/\\]/, ""));
}

function parseCurrencyValue(input: string): number {
  const digits = input.replace(/[^\d]/g, "");
  return Number.parseInt(digits, 10);
}

function ensureFeatureList(values: string[]): string[] {
  return values.filter(Boolean).slice(0, 8);
}

async function ensureImageValue(publicImagePath: string): Promise<ImageValue> {
  const absoluteFilePath = toPublicFilePath(publicImagePath);
  if (!fs.existsSync(absoluteFilePath)) {
    throw new Error(`No se encontro la imagen local: ${absoluteFilePath}`);
  }

  const filename = path.basename(absoluteFilePath);
  const existingAsset = await client.fetch<{ _id: string } | null>(
    `*[_type=="sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename }
  );

  const assetId =
    existingAsset?._id ??
    (
      await client.assets.upload("image", createReadStream(absoluteFilePath), {
        filename,
      })
    )._id;

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: assetId,
    },
  };
}

async function deleteDocumentsNotIn(type: string, keepIds: string[]) {
  await client.delete({
    query: `*[_type == $type && !(_id in $keepIds)]._id`,
    params: { type, keepIds },
  });
}

async function upsertDocuments(documents: SeedDocument[]) {
  for (const document of documents) {
    await client.createOrReplace(document);
  }
}

async function buildSeedDocuments(): Promise<SeedDocument[]> {
  const heroImage = await ensureImageValue("/Hero.jpg");
  const aboutImage = await ensureImageValue("/DSC02489.jpg");

  const siteSettingsDoc: SeedDocument = {
    _id: "siteSettings",
    _type: "siteSettings",
    heroTitle: "Transforma tu físico.\nConstruí tu mejor versión.",
    heroSubtitle: "Entrenamiento personalizado para fuerza, recomposición y rendimiento.",
    heroImage,
    primaryCtaText: "Iniciar evaluación",
    primaryCtaHref: "https://pepugonzalez.com/#cuestionario",
    whatsappCtaText: "Hablar por WhatsApp",
    whatsappCtaHref: getStickyWhatsAppHref("Programa Transformación"),
    navItems: [
      { _key: "resultados", label: "Resultados", href: "#resultados" },
      { _key: "faq", label: "FAQ", href: "#faq" },
      { _key: "aplicar", label: "Aplicar", href: "#aplicar-ahora" },
      { _key: "contacto", label: "Contacto", href: "#contacto" },
    ],
  };

  const aboutDoc: SeedDocument = {
    _id: "about",
    _type: "about",
    headline: "De entrenar sin rumbo a construir un sistema",
    aboutImage,
    shortBio:
      "Soy Pepu González. Soy de La Plata, Argentina, y convertí mi propio cambio físico en un sistema claro que hoy aplico con mis alumnos. Trabajo con estructura, seguimiento y decisiones simples para que progreses de verdad, sin improvisar ni perder tiempo.",
  };

  const footerDoc: SeedDocument = {
    _id: "footer",
    _type: "footer",
    email: "pepugonzalez1@gmail.com",
    socialLinks: [
      {
        _key: "instagram",
        name: "Instagram",
        href: "https://www.instagram.com/pepugonzalezzz/?hl=es",
      },
      {
        _key: "tiktok",
        name: "TikTok",
        href: "https://www.tiktok.com/@pepugonzalezz",
      },
      {
        _key: "whatsapp",
        name: "WhatsApp",
        href: getStickyWhatsAppHref(),
      },
      {
        _key: "youtube",
        name: "YouTube",
        href: "https://www.youtube.com/@pepugonzalezz",
      },
      {
        _key: "kick",
        name: "Kick",
        href: "https://kick.com/pepugonzalezz",
      },
    ],
    legalLinks: [
      {
        _key: "privacidad",
        label: "Política de privacidad",
        href: "https://pepugonzalez.com/politica-de-privacidad",
      },
      {
        _key: "terminos",
        label: "Términos y condiciones",
        href: "https://pepugonzalez.com/terminos-y-condiciones",
      },
    ],
  };

  const planDocs = await Promise.all(
    offers.map(async (offer) => {
      const tier = TIER_BY_OFFER_SLUG[offer.slug];
      if (!offer.coverImage) {
        throw new Error(`El plan ${offer.slug} no tiene coverImage para seed.`);
      }
      const image = await ensureImageValue(offer.coverImage);

      return {
        _id: PLAN_ID_BY_TIER[tier],
        _type: "plan",
        tier,
        title: offer.title,
        subtitle: offer.strapline,
        descriptionLong: offer.descriptionLong,
        priceARS: parseCurrencyValue(offer.priceArs),
        priceUSD: parseCurrencyValue(offer.priceUsd),
        durationLabel: offer.durationLabel,
        shortDesc: offer.pitch,
        idealFor: offer.idealFor,
        resultExpected: offer.resultExpected,
        limits: offer.limits,
        conversionFlow: offer.conversionFlow,
        badgeLabel: offer.badgeLabel,
        features: ensureFeatureList(offer.benefits),
        ctaLabel: offer.ctaLabel,
        ctaType: offer.ctaType,
        checkoutUrl: offer.ctaType === "checkout" ? getOfferPrimaryHref(offer) : undefined,
        image,
        isFeatured: Boolean(offer.featured),
      } satisfies SeedDocument;
    })
  );

  const faqDocs: SeedDocument[] = FAQ_ITEMS.map((item) => ({
    _id: `faq-${item.order}`,
    _type: "faq",
    question: item.question,
    answer: item.answer,
    order: item.order,
  }));

  const resultDocs = await Promise.all(
    RESULT_ITEMS.map(async (item) => ({
      _id: `result-${item.id}`,
      _type: "result",
      personName: item.personName,
      testimonial: item.testimonial,
      resultMetric: item.resultMetric,
      durationLabel: item.durationLabel,
      beforeImage: await ensureImageValue(item.beforeImagePath),
      afterImage: await ensureImageValue(item.afterImagePath),
      tagLabel: item.tagLabel,
    }))
  );

  return [siteSettingsDoc, aboutDoc, footerDoc, ...planDocs, ...faqDocs, ...resultDocs];
}

async function seed() {
  console.log("Iniciando seed de Sanity...");

  const documents = await buildSeedDocuments();

  const singletonIds = ["siteSettings", "about", "footer"];
  const planIds = Object.values(PLAN_ID_BY_TIER);
  const faqIds = FAQ_ITEMS.map((item) => `faq-${item.order}`);
  const resultIds = RESULT_ITEMS.map((item) => `result-${item.id}`);

  await deleteDocumentsNotIn("siteSettings", singletonIds);
  await deleteDocumentsNotIn("about", singletonIds);
  await deleteDocumentsNotIn("footer", singletonIds);
  await deleteDocumentsNotIn("plan", planIds);
  await deleteDocumentsNotIn("faq", faqIds);
  await deleteDocumentsNotIn("result", resultIds);

  await upsertDocuments(documents);

  console.log(`Seed completado: ${documents.length} documentos actualizados.`);
  console.log("IDs actualizados:");
  documents.forEach((doc) => console.log(`- ${doc._id}`));
}

seed().catch((error) => {
  console.error("Error ejecutando seed de Sanity:");
  console.error(error);
  process.exit(1);
});
