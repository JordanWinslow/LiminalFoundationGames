"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ClassifiedBadge } from "@/components/classified-badge";
import { SteamFeatureBlock } from "./steam-feature-block";
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
            Something is wrong inside Site-19. Something worse is happening
            outside. A punishing strategic horror game where every run creates
            a story no other player has lived.
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            className="mb-8 max-w-2xl leading-relaxed text-muted-foreground"
          >
            Investigate anomalies, contain threats, and make decisions more
            disturbing than anything you&apos;ll fight. You don&apos;t get
            stronger between runs &mdash; you get smarter. Winning isn&apos;t
            about saving everything. It&apos;s about knowing what you can
            afford to lose.
          </motion.p>

          <motion.div custom={5} variants={fadeUp}>
            <div className="red-line" />
          </motion.div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-16">
          {steamSections.map((section) => (
            <div key={section.id} className="space-y-10">
              <SteamFeatureBlock section={section} />
              {section.media && (
                <MediaPlaceholder label={section.media.label} />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
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
  );
}
