"use client";

import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Antes",
  afterAlt = "Después",
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);

  function updatePosition(clientX: number, element: HTMLDivElement) {
    const rect = element.getBoundingClientRect();
    if (!rect.width) return;
    const relative = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(relative, 0, 100));
  }

  return (
    <div
      className={cn(
        "relative isolate aspect-[4/5] w-full overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(140deg,#15171e_0%,#0f1014_100%)] shadow-[0_24px_46px_-34px_rgba(0,0,0,0.96)]",
        className
      )}
      onPointerDown={(event) => {
        if (!(event.currentTarget instanceof HTMLDivElement)) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        updatePosition(event.clientX, event.currentTarget);
      }}
      onPointerMove={(event) => {
        if (!isDragging || !(event.currentTarget instanceof HTMLDivElement)) return;
        updatePosition(event.clientX, event.currentTarget);
      }}
      onPointerUp={(event) => {
        if (!(event.currentTarget instanceof HTMLDivElement)) return;
        event.currentTarget.releasePointerCapture(event.pointerId);
        setIsDragging(false);
      }}
      onPointerCancel={() => setIsDragging(false)}
    >
      {!afterError ? (
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover object-center" onError={() => setAfterError(true)} />
      ) : (
        <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#17181d_0%,#111217_100%)] px-5 text-center text-sm text-white/72">
          Subí tu imagen final en {afterSrc}
        </div>
      )}

      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        {!beforeError ? (
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center"
            onError={() => setBeforeError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#181119_0%,#101116_100%)] px-5 text-center text-sm text-white/72">
            Subí tu imagen inicial en {beforeSrc}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `calc(${position}% - 1px)` }}>
        <span className="absolute inset-y-0 block w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.24)]" />
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/58 text-white shadow-[0_16px_30px_-20px_rgba(0,0,0,0.92)]">
          <MoveHorizontal className="size-4" />
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-white/86">
        <span className="rounded-[7px] border border-white/22 bg-black/45 px-2 py-1">Antes</span>
        <span className="rounded-[7px] border border-white/22 bg-black/45 px-2 py-1">Después</span>
      </div>

      <label className="sr-only" htmlFor="about-before-after-range">
        Slider antes y después
      </label>
      <input
        id="about-before-after-range"
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute bottom-3 left-3 right-3 h-1 cursor-ew-resize accent-primary"
      />
    </div>
  );
}
