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
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [animationFailed, setAnimationFailed] = useState(false);
  const playing = (playback ?? !reducedMotion) && !animationFailed;
  const loading = playing && !animationLoaded;

  function togglePlayback() {
    setAnimationLoaded(false);
    setAnimationFailed(false);
    setPlayback(animationFailed || !playing);
  }

  return (
    <figure className="overflow-hidden border border-border bg-card">
      <div
        id="castaway-preview"
        aria-busy={loading}
        className="relative aspect-video"
      >
        <Image
          src={`${imageRoot}/island-stories-poster.webp`}
          alt="Scenes from Johnny’s island: unexpected visitors, seaside misadventures and a camp of his own."
          width={960}
          height={540}
          sizes="(max-width: 1400px) 100vw, 1320px"
          priority
          unoptimized
          className="h-auto w-full object-contain"
        />
        {playing && (
          <Image
            src={`${imageRoot}/island-stories.gif`}
            alt=""
            aria-hidden="true"
            width={768}
            height={432}
            loading="eager"
            unoptimized
            onLoad={() => setAnimationLoaded(true)}
            onError={() => { setAnimationLoaded(false); setAnimationFailed(true); }}
            className={`absolute inset-0 h-full w-full object-contain ${animationLoaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-6">
        <span role="status" className="text-ui-sm text-muted-foreground">
          {animationFailed ? "Preview unavailable. Showing a still image." : loading ? "Loading animated preview…" : "Six scenes from island life · Actual gameplay"}
        </span>
        <button
          type="button"
          onClick={togglePlayback}
          aria-controls="castaway-preview"
          aria-label={animationFailed ? "Retry animated preview" : loading ? "Cancel loading the animated preview" : playing ? "Pause preview and show a still image" : "Play animated preview"}
          className="text-ui inline-flex min-h-10 items-center gap-2 border border-border px-3 py-2 text-foreground hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {animationFailed ? "Retry preview" : loading ? "Cancel preview" : playing ? "Pause preview" : "Play preview"}
        </button>
      </figcaption>
    </figure>
  );
}
