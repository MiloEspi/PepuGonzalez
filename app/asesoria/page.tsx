import type { Metadata } from "next";

import { AsesoriaPage } from "@/components/site/asesoria-page";

export const metadata: Metadata = {
  title: "Qué incluye la asesoría | Pepu González",
  description: "Todo lo que incluye trabajar 1 a 1 conmigo.",
};

export default function Page() {
  return <AsesoriaPage />;
}
