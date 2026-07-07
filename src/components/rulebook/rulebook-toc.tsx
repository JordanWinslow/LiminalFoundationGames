"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocEntry {
  id: string;
  index: string;
  label: string;
}

/**
 * Sticky in-page table of contents with scrollspy.
 * - Desktop (lg+): a vertical rail that sticks beside the content.
 * - Mobile: a horizontally-scrollable chip bar pinned under the site header.
 */
export function RulebookToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (obsEntries) => {
        const visible = obsEntries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Trigger when a section's heading passes the upper third of the viewport.
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    entries.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entries]);

  return (
    <>
      {/* Desktop rail — self-start stops the grid from stretching it so it pins */}
      <nav
        className="sticky top-24 hidden max-h-[calc(100vh-7rem)] self-start overflow-y-auto pr-2 lg:block"
        aria-label="Rulebook contents"
      >
        <p className="text-caption mb-4 text-text-dim">Rulebook — Index</p>
        <ul className="space-y-0.5 border-l border-border">
          {entries.map((entry) => {
            const active = entry.id === activeId;
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className={cn(
                    "group flex items-baseline gap-2 border-l-2 py-1.5 pl-3 -ml-px transition-colors",
                    active
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-caption w-8 shrink-0 text-text-dim group-hover:text-accent">
                    {entry.index}
                  </span>
                  <span className="text-ui-sm normal-case tracking-normal">
                    {entry.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile chip bar */}
      <nav
        className="sticky top-16 z-30 -mx-6 mb-8 border-y border-border bg-background/90 backdrop-blur-md lg:hidden"
        aria-label="Rulebook contents"
      >
        <div className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {entries.map((entry) => {
            const active = entry.id === activeId;
            return (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className={cn(
                  "text-ui-sm shrink-0 border px-3 py-1.5 transition-colors",
                  active
                    ? "border-accent/50 bg-[var(--accent-muted)] text-accent"
                    : "border-border text-muted-foreground"
                )}
              >
                <span className="mr-1.5 text-text-dim">{entry.index}</span>
                {entry.label}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
