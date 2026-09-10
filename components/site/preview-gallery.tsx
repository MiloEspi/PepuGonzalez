"use client";

import Image from "next/image";
import { useState } from "react";

import type { PublicAssetSlot } from "@/lib/public-asset";

interface PreviewGalleryProps {
  slots: PublicAssetSlot[];
  productTitle: string;
}

export function PreviewGallery({ slots, productTitle }: PreviewGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openSlot = openIndex !== null ? slots[openIndex] : null;

  return (
    <>
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {slots.map((slot, index) => (
          <div key={slot.filename} className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[var(--negro)]">
            {slot.exists ? (
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="absolute inset-0 cursor-zoom-in"
                aria-label={`Ver página ${index + 1} de ${productTitle} en grande`}
              >
                <Image
                  src={slot.src}
                  alt={`Página ${index + 1} de la vista previa de ${productTitle}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 33vw, 240px"
                  className="object-contain"
                />
              </button>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--texto-gris)]">{slot.filename}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {openSlot ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
        >
          <div className="relative h-full max-h-[85vh] w-full max-w-2xl">
            <Image
              src={openSlot.src}
              alt={`Página ${(openIndex ?? 0) + 1} de la vista previa de ${productTitle}, en grande`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
