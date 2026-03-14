"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ClassifiedBadge } from "@/components/classified-badge";
import { DossierSection } from "./dossier-section";
import { GameLoopDiagram } from "./game-loop-diagram";
import { Lightbox } from "./lightbox";
import { dlpSections } from "./dlp-sections-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface LightboxState {
  images: { src: string; alt: string; caption: string }[];
  index: number;
}

export function DLPPageClient() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback(
    (images: { src: string; alt: string; caption: string }[], startIndex: number) => {
      setLightbox({ images, index: startIndex });
    },
    []
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        index: (prev.index - 1 + prev.images.length) % prev.images.length,
      };
    });
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        index: (prev.index + 1) % prev.images.length,
      };
    });
  }, []);

  return (
    <>
      <div className="relative z-10 pt-24 pb-24 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          {/* Page Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.div custom={0} variants={fadeUp}>
              <Link
                href="/#games"
                className="text-ui mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" />
                Return to Command
              </Link>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} className="mb-4">
              <ClassifiedBadge variant="classified">
                Top Secret // SCI
              </ClassifiedBadge>
            </motion.div>

            <motion.h1
              custom={2}
              variants={fadeUp}
              className="text-display mb-3 text-5xl text-foreground md:text-7xl"
            >
              SCP: Dead Letter Protocol
            </motion.h1>

            <motion.p
              custom={3}
              variants={fadeUp}
              className="mb-4 max-w-2xl text-xl leading-relaxed text-foreground/90 md:text-2xl"
            >
              Your job isn&apos;t to win. It&apos;s to decide what
              you&apos;re willing to lose.
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeUp}
              className="mb-8 max-w-2xl leading-relaxed text-muted-foreground"
            >
              Investigate anomalies, fight nightmarish entities, and make
              impossible choices as entropy tears your facility apart. Every
              playthrough is a unique procedurally generated narrative of
              survival -- or catastrophic failure.
            </motion.p>

            <motion.div custom={5} variants={fadeUp}>
              <div className="red-line" />
            </motion.div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-16">
            {dlpSections.map((section, i) => (
              <DossierSection
                key={section.index}
                index={section.index}
                label={section.label}
                category={section.category}
                categoryVariant={section.categoryVariant}
                title={section.title}
                summary={section.summary}
                detail={section.detail}
                images={section.images}
                openLightbox={openLightbox}
              >
                {/* Render the game loop diagram inside the Operation Cycle section */}
                {section.index === "002" && <GameLoopDiagram />}
              </DossierSection>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
            className="mt-24 flex justify-center"
          >
            <Link
              href="/#games"
              className="vfx-hover-glitch magnetic-btn text-ui inline-flex items-center gap-3 border border-accent/40 bg-accent-muted px-8 py-3.5 text-accent transition-colors hover:border-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              Return to Command
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
