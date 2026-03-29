"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoSlide } from "./video-slide";

export interface CarouselSlide {
  /** Image source path */
  src?: string;
  /** Video sources — when provided, renders a <video> instead of <img> */
  video?: { mp4: string; webm?: string; poster?: string };
  alt: string;
  caption?: string;
  contain?: boolean;
  comingSoon?: boolean;
}

interface CarouselProps {
  slides: CarouselSlide[];
  href?: string;
}

export function Carousel({ slides, href }: CarouselProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [autoplayPlugin.current]
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

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

  // Start autoplay only when the carousel is visible
  useEffect(() => {
    const node = containerRef.current;
    if (!node || !emblaApi) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          autoplayPlugin.current.play();
        } else {
          autoplayPlugin.current.stop();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
    <div ref={containerRef} className="group" role="region" aria-label="Image carousel" aria-roledescription="carousel">
      <div className="relative" style={{ position: "relative" }}>
        <div className="overflow-hidden border border-border bg-card">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {slides.map((slide, i) => {
                const isVideo = !!slide.video;
                const slideContent = (
                  <>
                    <div className={`scan-lines relative aspect-video ${slide.contain ? "bg-background" : ""}`}>
                      {isVideo ? (
                        <VideoSlide
                          mp4={slide.video!.mp4}
                          webm={slide.video!.webm}
                          poster={slide.video!.poster}
                          alt={slide.alt}
                          isActive={i === selectedIndex}
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
                      {slide.comingSoon && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
                          <span className="text-display text-3xl tracking-[0.25em] text-muted-foreground md:text-5xl">
                            COMING SOON
                          </span>
                        </div>
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
                    {href ? (
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

        {/* Previous arrow — positioned absolutely, pointer-events isolated from Embla root */}
        <button
          onClick={scrollPrev}
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
          disabled={!canScrollPrev}
          className="flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent disabled:opacity-30 md:opacity-0 md:group-hover:opacity-100"
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Next arrow — positioned absolutely, pointer-events isolated from Embla root */}
        <button
          onClick={scrollNext}
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
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
        {/* Slide counter */}
        <span className="text-caption text-text-dim">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        {/* Progress bar */}
        <div className="relative h-px flex-1 bg-border">
          <div
            className="absolute left-0 top-0 h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Dot indicators */}
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
