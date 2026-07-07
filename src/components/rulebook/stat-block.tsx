import Image from "next/image";
import { cn } from "@/lib/utils";

interface StatBlockProps {
  /** Path to a game sprite icon under /public. */
  iconSrc: string;
  /** Stat / resource name, e.g. "Strength". */
  name: string;
  /** One-line role description. */
  desc: string;
  /** Optional filled/total meter (renders square pips). */
  meter?: { value: number; max: number };
  className?: string;
}

/**
 * Compact stat / resource card: game icon + name + role, with an optional
 * square-pip meter. Uses the site's bordered-panel + mono-label language and
 * reveals a scan-line on hover.
 */
export function StatBlock({
  iconSrc,
  name,
  desc,
  meter,
  className,
}: StatBlockProps) {
  return (
    <div
      className={cn(
        "vfx-hover-scan group flex items-start gap-4 border border-border bg-card/40 p-4 transition-colors hover:border-accent/50",
        className
      )}
    >
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src={iconSrc}
          alt=""
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-ui text-foreground">{name}</p>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          {desc}
        </p>
        {meter && (
          <div className="mt-2.5 flex gap-1" aria-hidden>
            {Array.from({ length: meter.max }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 w-3.5",
                  i < meter.value ? "bg-accent" : "bg-border-bright/60"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
