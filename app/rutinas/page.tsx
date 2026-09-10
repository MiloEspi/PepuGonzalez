import type { Metadata } from "next";

import { DigitalProductPage } from "@/components/site/digital-product-page";
import { DIGITAL_PRODUCTS } from "@/data/digital-products";
import { publicAssetSlot } from "@/lib/public-asset";

export const metadata: Metadata = {
  title: "Rutinas | Pepu González",
  description: DIGITAL_PRODUCTS.rutinas.tagline,
};

const PREVIEW_SLOTS = ["preview/rutinas-1.jpg", "preview/rutinas-2.jpg", "preview/rutinas-3.jpg"].map(publicAssetSlot);

export default function RutinasPage() {
  return <DigitalProductPage product={DIGITAL_PRODUCTS.rutinas} previewSlots={PREVIEW_SLOTS} showPackLine={false} />;
}
