"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STEAM_URL =
  "https://store.steampowered.com/app/4581700/SCP_Dead_Letter_Protocol/";
const DISMISS_KEY = "lf-steam-banner-dismissed";

export function SteamBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(DISMISS_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  if (!visible) return null;

  return (
    <div className="relative z-[60] border-b border-accent/30 bg-accent-muted">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2.5 md:px-10">
        <a
          href={STEAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-3 transition-opacity hover:opacity-80"
        >
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent" />
          <span className="text-ui text-accent">
            SCP: Dead Letter Protocol is now on Steam
          </span>
          <span className="text-ui-sm hidden text-foreground/60 sm:inline">
            — Wishlist Now
          </span>
        </a>
        <button
          onClick={dismiss}
          className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-accent"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
