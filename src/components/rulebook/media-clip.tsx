import { cn } from "@/lib/utils";

interface MediaClipProps {
  /** Video source under /public (mp4). */
  src: string;
  caption?: string;
  ratio?: "video" | "square";
  className?: string;
}

/**
 * Autoplaying, muted, looping demo clip in the site's bordered/scan frame.
 * Used for short in-game captures (mp4). Silent and non-interactive.
 */
export function MediaClip({
  src,
  caption,
  ratio = "video",
  className,
}: MediaClipProps) {
  return (
    <figure className={cn("group", className)}>
      <div className="vfx-hover-scan relative overflow-hidden border border-border bg-surface transition-colors group-hover:border-accent/50">
        <div className={cn("relative w-full", ratio === "video" ? "aspect-video" : "aspect-square")}>
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="text-caption mt-2 text-text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Captioned screenshot figure (real UI PNG). Plain <img> so large static-export
 * screenshots render at full fidelity without the image optimizer.
 */
export function Screenshot({
  src,
  alt,
  caption,
  ratio = "video",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: "video" | "square" | "auto";
  className?: string;
}) {
  return (
    <figure className={cn("group", className)}>
      <div className="vfx-hover-scan relative overflow-hidden border border-border bg-surface transition-colors group-hover:border-accent/50">
        {ratio === "auto" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="block h-auto w-full" />
        ) : (
          <div className={cn("relative w-full", ratio === "video" ? "aspect-video" : "aspect-square")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-caption mt-2 text-text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
