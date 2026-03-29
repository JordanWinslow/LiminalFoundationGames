"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Carousel } from "./carousel";

const featureTags = [
  "100+ creatures drawn from the SCP Wiki — hidden traits, unique dialogue, and multiple paths to resolution",
  "Every creature starts classified. Match hidden vulnerabilities or your best gear barely registers",
  "Contain creatures to permanently document them. Knowledge carries between runs — not power",
  "Escalating entropy: lockdowns, crises, and a final boss that arrives whether you're ready or not",
  "Procedural narrative — hundreds of encounters assembled into a different story every run",
];

import type { CarouselSlide } from "./carousel";

const carouselSlides: CarouselSlide[] = [
  { src: "/images/games/scp-dlp-logo.png", alt: "SCP: Dead Letter Protocol", caption: "SCP: Dead Letter Protocol", contain: true },
  {
    video: {
      mp4: "/videos/carousel/map-movement.mp4",
      webm: "/videos/carousel/map-movement.webm",
      poster: "/videos/carousel/map-movement-poster.webp",
    },
    alt: "Facility map movement gameplay",
    caption: "Fig. 01 — Procedural Facility Navigation",
  },
  { src: "/images/carousel/combat-ui.webp", alt: "Tactical combat system", caption: "Fig. 02 — Tactical Combat System", comingSoon: true },
  { src: "/images/carousel/facility-map.webp", alt: "Procedural facility layout", caption: "Fig. 03 — Procedural Facility Layout", comingSoon: true },
  { src: "/images/carousel/scp-database.webp", alt: "In-game SCP database", caption: "Fig. 04 — In-Game Anomaly Database", comingSoon: true },
  { src: "/images/carousel/location-command.webp", alt: "Mobile command center", caption: "Fig. 05 — Mobile Command Center", comingSoon: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function GameSection() {
  return (
    <section id="games" className="relative z-10 py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div custom={0} variants={fadeUp}>
            <SectionHeading index="001" label="Debut Title" className="mb-12" />
          </motion.div>

          {/* Game carousel — logo as first slide */}
          <motion.div custom={1} variants={fadeUp} className="mb-12">
            <Carousel slides={carouselSlides} href="/games/dead-letter-protocol" />
          </motion.div>

          {/* Two-column layout */}
          <div className="mb-16 grid gap-10 md:grid-cols-5">
            <motion.div custom={2} variants={fadeUp} className="md:col-span-3">
              <p className="text-lg leading-relaxed text-foreground/90 md:text-xl max-w-160">
                Something is wrong inside Site-19. Something worse is happening
                outside. A punishing strategic horror game where every run
                creates a story no other player has lived.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                There&apos;s a threat beyond the facility walls. Poorly
                understood, escalating, and harder to stop the longer it goes
                unchecked. Investigate it. Weaken it across three missions. Then
                face off with it in a final mission before it becomes
                unstoppable.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The facility you&apos;re operating from is its own disaster:
                containment failing, threats in the corridors, and a situation
                that deteriorates every round whether you&apos;re paying
                attention or not.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                No jumpscares. No grinding. No two runs that tell the same
                story.
              </p>
            </motion.div>

            <motion.div custom={3} variants={fadeUp} className="flex flex-col gap-2 md:col-span-2">
              <p className="text-label mb-2 text-accent">
                Operational Brief
              </p>
              {featureTags.map((tag) => (
                <div key={tag} className="vfx-hover-line flex items-center gap-3 border-b border-border py-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span className="text-ui text-foreground/80">
                    {tag}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* View Complete Intel CTA */}
          <motion.div custom={3.5} variants={fadeUp} className="mb-16 flex justify-center">
            <Link
              href="/games/dead-letter-protocol/"
              className="vfx-hover-glitch magnetic-btn text-ui inline-flex items-center gap-3 border border-accent/40 bg-accent-muted px-8 py-3.5 text-accent transition-colors hover:border-accent"
            >
              View Complete Intel
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Steam — locked achievement style */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-12 border border-dashed border-border-bright bg-card/50 px-8 py-8 md:py-10"
          >
            <div className="flex flex-col items-center gap-5 text-center md:flex-row md:gap-8 md:text-left">
              {/* Lock icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-background">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-dim">
                  <rect x="3" y="11" width="18" height="11" rx="1" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-label mb-1 text-text-dim">
                  Achievement Locked
                </p>
                <p className="text-display text-2xl text-foreground/70">
                  Steam Page Coming Soon
                </p>
                <p className="text-ui-sm mt-1 text-muted-foreground">
                  Wishlist to be notified at launch &mdash; page goes live during early access
                </p>
              </div>
              <div className="text-ui border border-border-bright px-6 py-2.5 text-text-dim">
                Pending
              </div>
            </div>
          </motion.div>

          {/* Discord community */}
          <motion.div
            custom={5}
            variants={fadeUp}
            className="vfx-hover-scan mt-6 border border-border bg-card p-8 md:p-10"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <p className="text-label mb-2 text-accent">
                  Open Channel
                </p>
                <h3 className="text-display mb-2 text-3xl text-foreground">
                  Join the Community
                </h3>
                <p className="max-w-lg leading-relaxed text-muted-foreground">
                  Playtest upcoming builds, talk directly with the developer,
                  and connect with like-minded horror enthusiasts who live for
                  the dread. Your feedback doesn&apos;t just matter &mdash; it
                  shapes the game.
                </p>
              </div>
              <a
                href="https://discord.gg/cCQTJFWH"
                target="_blank"
                rel="noopener noreferrer"
                className="vfx-hover-glitch magnetic-btn text-ui flex items-center gap-2 self-start border border-foreground/20 bg-foreground/10 px-8 py-3 text-foreground transition-colors hover:border-accent hover:text-accent md:self-center"
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
