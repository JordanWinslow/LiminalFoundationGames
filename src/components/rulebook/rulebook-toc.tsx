"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocEntry {
  id: string;
  index: string;
  label: string;
}

/**
 * Sticky in-page table of contents with scrollspy.
 * - Desktop (lg+): a vertical rail that sticks beside the content.
 * - Below lg: a horizontally-scrollable chip bar pinned under the site header.
 *   The scrollbar is hidden, so mouse users get drag-to-scroll and vertical
 *   wheel input is redirected horizontally; touch scrolls natively.
 */
export function RulebookToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

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

  // Mouse wheels only scroll vertically, so redirect wheel input sideways
  // while the cursor is over the bar. Needs a non-passive listener.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      el.scrollLeft += delta;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Keep the active chip in view as the scrollspy updates.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || drag.current.active) return;
    const chip = el.querySelector<HTMLElement>(`a[href="#${activeId}"]`);
    if (!chip) return;
    el.scrollTo({
      left: chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch pans natively via overflow scrolling; only mice need drag support.
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    // Capture only once a real drag starts, so plain clicks on chips keep
    // their original target and navigate normally.
    if (!drag.current.moved && Math.abs(dx) > 4) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = scrollerRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    // A drag that ends on a chip must not navigate.
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

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
        className="sticky top-16 z-30 -mx-6 mb-8 border-y border-border bg-background/90 backdrop-blur-md md:-mx-10 lg:hidden"
        aria-label="Rulebook contents"
      >
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onClickCapture={onClickCapture}
          className="relative flex cursor-grab select-none gap-2 overflow-x-auto px-6 py-3 active:cursor-grabbing md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {entries.map((entry) => {
            const active = entry.id === activeId;
            return (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                draggable={false}
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
        {/* Edge fades hint that the bar scrolls */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background/90 to-transparent" />
      </nav>
    </>
  );
}
