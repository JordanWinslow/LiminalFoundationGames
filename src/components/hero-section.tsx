"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";
import { InteractiveBanner } from "./interactive-banner";

// Module-level flag survives client-side navigations so the intro only plays
// on a fresh document load, not when navigating back to the homepage.
let introPlayedOnce = false;

// How long the animation stays fully visible before the site crossfades in.
// The loop runs ~2s, so hold slightly longer to let it finish.
const INTRO_HOLD_MS = 2200;
// Must match the CSS opacity transition on the overlay and banner below.
const CROSSFADE_MS = 2000;
// Hard ceiling: if the animation has not arrived by now, reveal the site
// anyway. The intro is decoration and must never hold the page hostage.
// Generous enough to cover slow connections now that the file is ~800KB and
// starts downloading from the document head with nothing competing for it.
const INTRO_MAX_WAIT_MS = 6000;

declare global {
  interface Window {
    __lfIntro?: { theme: string; blob: Promise<Blob> };
  }
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { theme, mounted } = useTheme();
  const [phase, setPhase] = useState<"gif" | "crossfade" | "banner">(
    introPlayedOnce ? "banner" : "gif"
  );
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [gifSrc, setGifSrc] = useState<string | null>(null);
  const gifUrlRef = useRef<string | null>(null);
  const introStarted = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch the animation as a blob so it starts from frame 0 when displayed.
  // The document head already kicked this request off before React loaded, so
  // reuse that in-flight promise rather than starting a second download.
  useEffect(() => {
    if (!mounted) return;
    if (introPlayedOnce && phase === "banner") return;

    // Animated WebP: same 67 frames as the source GIF at half the bytes.
    const url =
      theme === "dark"
        ? "/images/brand/avatar-dark.webp"
        : "/images/brand/avatar-light.webp";

    const preloaded = window.__lfIntro;
    const pending =
      preloaded && preloaded.theme === theme
        ? preloaded.blob
        : fetch(url).then((res) => res.blob());

    let cancelled = false;
    pending
      .then((blob) => {
        if (cancelled) return;
        if (gifUrlRef.current) URL.revokeObjectURL(gifUrlRef.current);
        const blobUrl = URL.createObjectURL(blob);
        gifUrlRef.current = blobUrl;
        setGifSrc(blobUrl);
      })
      .catch(() => {
        if (!cancelled) setGifSrc(url);
      });

    return () => {
      cancelled = true;
      if (gifUrlRef.current) {
        URL.revokeObjectURL(gifUrlRef.current);
        gifUrlRef.current = null;
      }
    };
    // `phase` is read only as a guard against refetching after the intro is
    // over; re-running on every phase change would restart the download.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mounted]);

  // Safety net: reveal the site even if the animation never arrives, so a slow
  // connection is never stuck staring at a blank overlay.
  useEffect(() => {
    if (introPlayedOnce) return;
    const bail = setTimeout(() => {
      if (introStarted.current) return;
      introStarted.current = true;
      introPlayedOnce = true;
      setPhase("banner");
    }, INTRO_MAX_WAIT_MS);
    return () => clearTimeout(bail);
  }, []);

  // Play the intro once the animation is decoded. Skips entirely on
  // client-side navigations back to the homepage.
  useEffect(() => {
    if (!gifSrc) return;
    if (introPlayedOnce || introStarted.current) {
      setPhase("banner");
      return;
    }
    introStarted.current = true;
    introPlayedOnce = true;
    setPhase("gif");
    const toCrossfade = setTimeout(() => setPhase("crossfade"), INTRO_HOLD_MS);
    const toBanner = setTimeout(
      () => setPhase("banner"),
      INTRO_HOLD_MS + CROSSFADE_MS
    );
    return () => {
      clearTimeout(toCrossfade);
      clearTimeout(toBanner);
    };
  }, [gifSrc]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background "
    >
      {/* Decorative gradient bars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] right-[55%] top-[18%] h-[3px] bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />
        <div className="absolute left-[50%] right-[12%] top-[28%] h-[2px] bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent" />
        <div className="absolute left-[15%] right-[65%] top-[42%] h-[2px] bg-gradient-to-r from-transparent via-accent/[0.08] to-transparent" />
        <div className="absolute left-[60%] right-[8%] top-[58%] h-[3px] bg-gradient-to-r from-transparent via-foreground/[0.05] to-transparent" />
        <div className="absolute left-[5%] right-[72%] top-[72%] h-[2px] bg-gradient-to-r from-transparent via-accent/[0.06] to-transparent" />
        <div className="absolute left-[45%] right-[20%] top-[82%] h-[2px] bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent" />
      </div>

      {/* Solid overlay — uses CSS var for correct theme before React hydrates */}
      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          backgroundColor: "var(--intro-bg)",
          opacity: phase === "gif" ? 1 : 0,
          transition: "opacity 2s ease-in-out",
        }}
      />

      {/* GIF — only rendered once blob is ready, guarantees frame-0 start */}
      <div
        className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
        style={{
          opacity: phase === "gif" && gifSrc ? 1 : 0,
          transition: "opacity 2s ease-in-out",
        }}
      >
        {gifSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={gifSrc}
            alt="Liminal Foundation"
            className="h-auto max-h-[400px] w-auto object-contain"
          />
        )}
      </div>

      {/* Content — no horizontal padding so banner can be full-bleed on mobile */}
      <div className="relative z-10 flex w-full flex-col items-center text-center md:mb-[5%]">
        {/* Banner area — full width, scales prominently for large screens */}
        <div className="relative w-full max-w-[1600px] aspect-[1.1/1] md:aspect-[2.5/1]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase !== "gif" ? 1 : 0, y: phase !== "gif" ? 0 : 20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-label tracking-[0.3em] text-accent absolute left-1/2 top-[12%] -translate-x-1/2"
          >
            Independent Game Studio
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "crossfade" || phase === "banner" ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <InteractiveBanner />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase !== "gif" ? 1 : 0, y: phase !== "gif" ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          className="max-w-[600px] px-6 md:text-lg leading-relaxed text-muted-foreground md:mb-[5%] mb-[15%]"
        >
          If you like SCP, the Backrooms, or obscure Analog Horror YouTube videos, boy have I got something for you 🖤
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== "gif" ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          className="flex items-center gap-3 px-6"
        >
          <span className="h-px w-8 bg-accent" />
          <p className="text-label tracking-[0.2em] text-text-dim">
            Founded by Jordan Winslow
          </p>
          <span className="h-px w-8 bg-accent" />
        </motion.div>
      </div>

      {/* Hero grain overlay — persistent animated noise */}
      <div
        className="pointer-events-none absolute inset-0 z-[25]"
        aria-hidden="true"
        style={{
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          animation: "static-noise 0.8s steps(4) infinite",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolledPastHero ? 0 : 1 }}
        transition={{
          // Hold until the intro crossfade has finished so it doesn't
          // surface over the animation.
          delay: scrolledPastHero ? 0 : (INTRO_HOLD_MS + CROSSFADE_MS) / 1000,
          duration: scrolledPastHero ? 0.3 : 1,
        }}
        className="pointer-events-none fixed bottom-6 left-1/2 z-[26] -translate-x-1/2"
      >
        <div className="animate-bounce-slow flex flex-col items-center gap-2">
          <span className="text-caption tracking-[0.3em] text-text-dim">
            Scroll
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-accent/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
