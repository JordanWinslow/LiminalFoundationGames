"use client";

import { useEffect, useRef } from "react";

interface VideoSlideProps {
  /** Path to MP4 source (fallback) */
  mp4: string;
  /** Path to WebM source (preferred, smaller) */
  webm?: string;
  /** Path to poster/thumbnail image */
  poster?: string;
  /** Alt text for accessibility */
  alt: string;
  /** Whether this slide is currently active/visible */
  isActive?: boolean;
  /** Whether the video should loop (default true) */
  shouldLoop?: boolean;
  /** Callback when video finishes playing (only fires if shouldLoop is false) */
  onEnded?: () => void;
}

/**
 * A video element that behaves like a GIF — autoplay, muted, looping.
 * Lazy-loads via IntersectionObserver and pauses when not visible.
 */
export function VideoSlide({ mp4, webm, poster, alt, isActive, shouldLoop = true, onEnded }: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoaded = useRef(false);

  // Play/pause based on slide visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasLoaded.current) return;

    if (isActive) {
      // Reset to start when becoming active (important for non-looping videos)
      if (!shouldLoop) video.currentTime = 0;
      video.play().catch(() => {
        // Autoplay blocked — fine, poster is visible
      });
    } else {
      video.pause();
    }
  }, [isActive, shouldLoop]);

  // Fire onEnded callback when video finishes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onEnded) return;
    const handler = () => onEnded();
    video.addEventListener("ended", handler);
    return () => video.removeEventListener("ended", handler);
  }, [onEnded]);

  // Lazy load: only set sources when element enters viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded.current) {
          hasLoaded.current = true;
          // Set sources from data attributes
          video.querySelectorAll("source").forEach((source) => {
            const lazySrc = source.dataset.src;
            if (lazySrc) {
              source.src = lazySrc;
            }
          });
          video.load();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={shouldLoop}
      playsInline
      poster={poster}
      preload="none"
      aria-label={alt}
      className="absolute inset-0 h-full w-full object-cover"
    >
      {webm && <source data-src={webm} type="video/webm" />}
      <source data-src={mp4} type="video/mp4" />
    </video>
  );
}
