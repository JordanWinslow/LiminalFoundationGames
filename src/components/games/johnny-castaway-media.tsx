"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const imageRoot = "/images/games/johnny-castaway-reborn";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function JohnnyCastawayMedia() {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
  const [playback, setPlayback] = useState<boolean | null>(null);
  const playing = playback ?? !reducedMotion;

  return (
    <figure className="overflow-hidden border border-border bg-card">
      <Image
        id="castaway-preview"
        src={`${imageRoot}/${playing ? "island-stories.gif" : "island-stories-poster.webp"}`}
        alt="Scenes from Johnny’s island: unexpected visitors, seaside misadventures and a camp of his own."
        width={playing ? 768 : 960}
        height={playing ? 432 : 540}
        sizes="(max-width: 1400px) 100vw, 1320px"
        priority
        unoptimized
        className="aspect-video h-auto w-full object-contain"
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-6">
        <span className="text-ui-sm text-muted-foreground">Six scenes from island life · Actual gameplay</span>
        <button
          type="button"
          onClick={() => setPlayback(!playing)}
          aria-controls="castaway-preview"
          aria-label={playing ? "Pause preview and show a still image" : "Play animated preview"}
          className="text-ui inline-flex min-h-10 items-center gap-2 border border-border px-3 py-2 text-foreground hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {playing ? "Pause preview" : "Play preview"}
        </button>
      </figcaption>
    </figure>
  );
}
