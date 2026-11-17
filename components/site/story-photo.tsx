import Image from "next/image";

import type { PublicAssetSlot } from "@/lib/public-asset";

export function StoryPhoto({ slot, label, priority }: { slot: PublicAssetSlot; label: string; priority?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] bg-[var(--negro-2)]">
        {slot.exists ? (
          <Image
            src={slot.src}
            alt={`${label} de Pepu González`}
            fill
            priority={priority}
            sizes="(max-width: 767px) 230px, 250px"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--texto-gris)]">{slot.filename}</span>
          </div>
        )}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--dorado)]">{label}</span>
    </div>
  );
}
