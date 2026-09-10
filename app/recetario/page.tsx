import type { Metadata } from "next";

import { DigitalProductPage } from "@/components/site/digital-product-page";
import { DIGITAL_PRODUCTS } from "@/data/digital-products";
import { publicAssetSlot } from "@/lib/public-asset";

export const metadata: Metadata = {
  title: "Recetario | Pepu González",
  description: DIGITAL_PRODUCTS.recetario.tagline,
};

const PREVIEW_SLOTS = ["preview/recetario-1.jpg", "preview/recetario-2.jpg", "preview/recetario-3.jpg"].map(publicAssetSlot);

export default function RecetarioPage() {
  return <DigitalProductPage product={DIGITAL_PRODUCTS.recetario} previewSlots={PREVIEW_SLOTS} />;
}
