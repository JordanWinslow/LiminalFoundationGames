"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ClassifiedBadge } from "@/components/classified-badge";
import { SteamFeatureBlock } from "./steam-feature-block";
import { GameLoopDiagram } from "./game-loop-diagram";
import { MediaPlaceholder } from "./media-placeholder";
import { steamSections } from "./dlp-sections-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function DLPPageClient() {
  return (
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
            className="mb-8 max-w-2xl text-xl leading-relaxed text-foreground/90 md:text-2xl"
          >
            Something is wrong inside Site-19. Something worse is out there.
            A strategic horror roguelike where no two runs tell the same
            story.
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            className="mb-8 max-w-2xl leading-relaxed text-muted-foreground"
          >
            Investigate anomalies, contain creatures you don&apos;t
            understand, and try to hold a facility together while it falls
            apart around you. You won&apos;t come back stronger between
            runs. You&apos;ll come back knowing what went wrong, and that
            changes everything.
          </motion.p>

          <motion.div custom={5} variants={fadeUp}>
            <div className="red-line" />
          </motion.div>
        </motion.div>

        {/* Trailer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
          className="mb-20"
        >
          <p className="text-label mb-4 text-accent">Announcement Trailer</p>
          <div className="relative aspect-video w-full border border-border bg-surface">
            <iframe
              src="https://www.youtube.com/embed/iaC9YpJQjuM"
              title="SCP: Dead Letter Protocol — Announcement Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-16">
          {steamSections.map((section) => (
            <div key={section.id} className="space-y-10">
              {/* Video ABOVE text for sections that specify it */}
              {section.media?.position === "above" && section.media.video && (
                <MediaPlaceholder
                  label={section.media.label}
                  video={section.media.video}
                />
              )}

              <SteamFeatureBlock section={section} />

              {/* GameLoopDiagram inside the phases section */}
              {section.id === "phases" && <GameLoopDiagram />}

              {/* Video BELOW text (default) */}
              {section.media?.position !== "above" && section.media && (
                <MediaPlaceholder
                  label={section.media.label}
                  video={section.media.video}
                />
              )}
            </div>
          ))}
        </div>

        {/* For Fans Of */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
          className="mt-16 border border-border bg-card/50 p-8 md:p-12"
        >
          <p className="text-label mb-4 text-accent">For Fans Of</p>
          <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">
            The investigation and replayability of World of Horror. The dread
            of Darkest Dungeon. The universe of the SCP Foundation.
          </p>
        </motion.div>

        {/* Closing tagline */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
          className="mt-16 text-center text-xl leading-relaxed text-muted-foreground md:text-2xl"
        >
          No jumpscares. No grinding. Just decisions and what they cost.
        </motion.p>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
          className="mt-16 flex justify-center"
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
  );
}
