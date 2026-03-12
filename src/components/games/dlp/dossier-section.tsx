"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ClassifiedBadge } from "@/components/classified-badge";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface DossierSectionProps {
  index: string;
  label: string;
  category: string;
  categoryVariant: "classified" | "active" | "pending" | "default";
  title: string;
  summary: string;
  detail: string[];
  images: { src: string; alt: string; caption: string }[];
  openLightbox: (images: { src: string; alt: string; caption: string }[], startIndex: number) => void;
  children?: React.ReactNode;
}

export function DossierSection({
  index,
  label,
  category,
  categoryVariant,
  title,
  summary,
  detail,
  images,
  openLightbox,
  children,
}: DossierSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      className="border-b border-border pb-16"
    >
      <SectionHeading index={index} label={label} className="mb-4" />
      <ClassifiedBadge variant={categoryVariant} className="mb-4">
        {category}
      </ClassifiedBadge>

      <h3 className="text-display mb-4 text-3xl text-foreground md:text-4xl">
        {title}
      </h3>

      <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
        {summary}
      </p>

      {detail.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-ui mt-6 flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
          >
            {expanded ? "Collapse Intel" : "Expand Full Brief"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 max-w-3xl space-y-4">
                  {detail.map((paragraph, i) => (
                    <p
                      key={i}
                      className="leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {children}

      {images.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(images, i)}
              className="vfx-hover-scan group relative overflow-hidden border border-border bg-card"
            >
              <div className="relative aspect-video">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-caption px-3 py-2 text-text-dim">
                {img.caption}
              </p>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
