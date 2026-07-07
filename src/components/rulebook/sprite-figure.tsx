import Image from "next/image";
import { cn } from "@/lib/utils";

interface SpriteFigureProps {
  src: string;
  alt: string;
  /** Caption rendered beneath the frame in mono caption type. */
  caption?: string;
  /** Aspect ratio box, e.g. "square", "video", or a custom class. Default: square. */
  ratio?: "square" | "video" | "portrait";
  /** object-contain (default, for transparent sprites) vs object-cover. */
  fit?: "contain" | "cover";
  className?: string;
  /** Padding inside the frame around a contained sprite. */
  padded?: boolean;
}

const ratioClass: Record<NonNullable<SpriteFigureProps["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

/**
 * Captioned game-art figure. A bordered surface frame with a hover scan-line
 * and a mono caption — the site's standard way of presenting a screenshot/sprite.
 */
export function SpriteFigure({
  src,
  alt,
  caption,
  ratio = "square",
  fit = "contain",
  padded = true,
  className,
}: SpriteFigureProps) {
  return (
    <figure className={cn("group", className)}>
      <div className="vfx-hover-scan relative overflow-hidden border border-border bg-surface transition-colors group-hover:border-accent/50">
        <div className={cn("relative w-full", ratioClass[ratio])}>
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              fit === "contain" ? "object-contain" : "object-cover",
              padded && fit === "contain" && "p-4"
            )}
            sizes="(max-width: 768px) 100vw, 400px"
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
