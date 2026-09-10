import type { Metadata } from "next";

import { FullStorySection } from "@/components/site/full-story-section";

export const metadata: Metadata = {
  title: "Mi Historia | Pepu González",
  description: "Cómo pasé de pesar 90 kilos a entender que bajar de peso no requiere pasar hambre.",
};

export default function MiHistoriaPage() {
  return (
    <main>
      <FullStorySection />
    </main>
  );
}
