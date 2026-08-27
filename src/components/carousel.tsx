"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, VolumeX } from "lucide-react";
import { VideoSlide } from "./video-slide";

/**
 * YouTube embed that starts muted the moment it is scrolled into view, and
 * unmutes on the viewer's first click.
 *
 * The player is not mounted until then: a live <iframe> pulls well over a
 * megabyte of YouTube scripts as soon as it exists, which would otherwise
 * compete with the hero intro during the initial page load. Deferring it to
 * the first intersection keeps that off the critical path.
 *
 * Playback is driven through the IFrame Player API over postMessage
 * (`enablejsapi=1`), so no additional YouTube script is needed.
 */
function YouTubeSlide({
  id,
  title,
  isActive,
}: {
  id: string;
  title: string;
  isActive: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const inViewRef = useRef(false);

  const command = useCallback((func: string) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
  }, []);

  // Mount on first intersection, then keep watching so the trailer pauses
  // when it scrolls away instead of playing on unattended.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setMounted(true);
          command("playVideo");
        } else {
          command("pauseVideo");
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [command]);

  // Pause when the carousel moves to another slide, resume on return.
  useEffect(() => {
    if (!mounted) return;
    if (isActive && inViewRef.current) command("playVideo");
    else command("pauseVideo");
  }, [isActive, mounted, command]);

  const enableSound = () => {
    command("unMute");
    command("playVideo");
    setUnmuted(true);
  };

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      {mounted ? (
        <iframe
          ref={frameRef}
          src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1&mute=1&playsinline=1&enablejsapi=1`}
          title={title}
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              // Not every upload has a maxres thumbnail; hqdefault always does.
              const img = e.currentTarget;
              if (!img.src.endsWith("hqdefault.jpg")) {
                img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-background/30">
            <span className="flex h-16 w-16 items-center justify-center border border-accent/60 bg-background/80 text-accent backdrop-blur-sm">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
            </span>
          </span>
        </>
      )}

      {/* Sound prompt. Covers the player until dismissed, so the first click
          anywhere turns audio on; after that YouTube's own controls take over. */}
      {mounted && !unmuted && (
        <button
          onClick={enableSound}
          className="group/snd absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Unmute ${title}`}
        >
          <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 border border-accent/50 bg-background/85 px-4 py-2 text-accent backdrop-blur-sm transition-colors group-hover/snd:border-accent group-hover/snd:bg-accent group-hover/snd:text-accent-foreground">
            <VolumeX className="h-4 w-4" />
            <span className="text-ui-sm">Click for sound</span>
          </span>
        </button>
      )}
    </div>
  );
}

export interface CarouselSlide {
  src?: string;
  video?: { mp4: string; webm?: string; poster?: string };
  youtube?: string;
  alt: string;
  caption?: string;
  contain?: boolean;
}

interface CarouselProps {
  slides: CarouselSlide[];
  href?: string;
}

export function Carousel({ slides, href }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (!emblaApi || !isVisible || isPaused) return;

    const slide = slides[emblaApi.selectedScrollSnap()];
    // Only auto-advance image slides (videos advance via onEnded, YouTube is manual)
    if (!slide?.video && !slide?.youtube) {
      timerRef.current = setTimeout(() => {
        emblaApi.scrollNext();
      }, 2000);
    }
  }, [emblaApi, slides, isVisible, isPaused, clearTimer]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // When selected index, visibility, or pause state changes, re-evaluate the timer
  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [selectedIndex, isVisible, isPaused, scheduleNext, clearTimer]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Track carousel visibility
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Video ended handler: advance to next slide
  const handleVideoEnded = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div
      ref={containerRef}
      className="group"
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative" style={{ position: "relative" }}>
        <div className="overflow-hidden border border-border bg-card">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {slides.map((slide, i) => {
                const isVideo = !!slide.video;
                const isYouTube = !!slide.youtube;

                const slideContent = (
                  <>
                    <div className={`scan-lines relative aspect-video ${slide.contain ? "bg-background" : ""}`}>
                      {isYouTube ? (
                        <YouTubeSlide
                          id={slide.youtube!}
                          title={slide.alt}
                          isActive={i === selectedIndex}
                        />
                      ) : isVideo ? (
                        <VideoSlide
                          mp4={slide.video!.mp4}
                          webm={slide.video!.webm}
                          poster={slide.video!.poster}
                          alt={slide.alt}
                          isActive={i === selectedIndex}
                          shouldLoop={false}
                          onEnded={handleVideoEnded}
                        />
                      ) : (
                        <Image
                          src={slide.src!}
                          alt={slide.alt}
                          fill
                          className={slide.contain ? "object-contain p-8" : "object-cover"}
                          sizes="(max-width: 1400px) 100vw, 1400px"
                        />
                      )}
                    </div>
                    {slide.caption && (
                      <div className="border-t border-border bg-surface px-4 py-2">
                        <p className="text-ui-sm text-muted-foreground">
                          {slide.caption}
                        </p>
                      </div>
                    )}
                  </>
                );

                return (
                  <div
                    key={i}
                    className="relative min-w-0 flex-[0_0_100%]"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.alt}`}
                  >
                    {href && !isYouTube ? (
                      <Link href={href} className="block cursor-pointer">
                        {slideContent}
                      </Link>
                    ) : (
                      slideContent
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Previous arrow */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent disabled:opacity-30 md:opacity-0 md:group-hover:opacity-100"
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next arrow */}
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent disabled:opacity-30 md:opacity-0 md:group-hover:opacity-100"
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Bar + Dots */}
      <div className="mt-4 flex items-center gap-4">
        <span className="text-caption text-text-dim">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        <div className="relative h-px flex-1 bg-border">
          <div
            className="absolute left-0 top-0 h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`transition-all duration-300 ${
                i === selectedIndex
                  ? "h-2.5 w-6 bg-accent"
                  : "h-2.5 w-2.5 bg-border-bright hover:bg-muted-foreground"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selectedIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
