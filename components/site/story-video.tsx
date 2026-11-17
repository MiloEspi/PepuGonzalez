"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

import type { PublicAssetSlot } from "@/lib/public-asset";

export function StoryVideo({ video, poster }: { video: PublicAssetSlot; poster: PublicAssetSlot }) {
  const [videoActive, setVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlayClick() {
    const element = videoRef.current;
    if (!element) return;
    element.muted = false;
    void element.play();
    setVideoActive(true);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[16px] bg-[var(--negro-2)]" style={{ aspectRatio: "16 / 9" }}>
      {!video.exists ? (
        <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
          <span className="text-xs uppercase tracking-[0.14em] text-[var(--texto-gris)]">{video.filename}</span>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={video.src}
            poster={poster.exists ? poster.src : undefined}
            controls={videoActive}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          {!poster.exists && !videoActive ? (
            <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
              <span className="text-xs uppercase tracking-[0.14em] text-[var(--texto-gris)]">{poster.filename}</span>
            </div>
          ) : null}
          {!videoActive ? (
            <button
              type="button"
              onClick={handlePlayClick}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label="Reproducir video"
            >
              <span className="grid size-14 place-items-center rounded-full bg-[var(--dorado)] shadow-[0_0_36px_-12px_rgba(227,179,65,0.55)] transition-transform duration-200 group-hover:scale-105 sm:size-20">
                <Play className="size-5 translate-x-0.5 text-black sm:size-7" />
              </span>
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
