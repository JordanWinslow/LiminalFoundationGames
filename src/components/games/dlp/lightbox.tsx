"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const image = images[currentIndex];
  if (!image) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Counter */}
        <div className="absolute left-4 top-4 z-10">
          <span className="text-caption text-text-dim">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={image.src}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          src={image.src}
          alt={image.alt}
          className="max-h-[85vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Caption */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <p className="text-caption text-text-dim">{image.caption}</p>
        </div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
