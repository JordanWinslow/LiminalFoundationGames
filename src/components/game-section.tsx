"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Carousel } from "./carousel";

const featureTags = [
  "Strategic horror built around the hour-long run. Play it once to see what happens. Play it again because now you know what went wrong",
  "100+ classified creatures. Hidden traits. Branching dialogue. Multiple resolutions",
  "A combat system built on information, not stats. Know the creature or lose to it",
  "Every round has four phases. Only one belongs to you. The other three belong to the facility",
  "Permanent creature database. Contain it once, know it forever",
];

import type { CarouselSlide } from "./carousel";

const carouselSlides: CarouselSlide[] = [
  {
    youtube: "iaC9YpJQjuM",
    alt: "Official announcement trailer",
    caption: "Announcement Trailer",
  },
  { src: "/images/games/scp-dlp-logo.png", alt: "SCP: Dead Letter Protocol", caption: "SCP: Dead Letter Protocol", contain: true },
  {
    video: {
      mp4: "/videos/carousel/mission-advancement.mp4",
      webm: "/videos/carousel/mission-advancement.webm",
      poster: "/videos/carousel/mission-advancement-poster.webp",
    },
    alt: "Mission advancement gameplay",
    caption: "Fig. 01 — Mission Advancement",
  },
  {
    video: {
      mp4: "/videos/carousel/phases.mp4",
      webm: "/videos/carousel/phases.webm",
      poster: "/videos/carousel/phases-poster.webp",
    },
    alt: "Four-phase round cycle gameplay",
    caption: "Fig. 02 — The Four-Phase Round",
  },
  {
    video: {
      mp4: "/videos/carousel/redaction.mp4",
      webm: "/videos/carousel/redaction.webm",
      poster: "/videos/carousel/redaction-poster.webp",
    },
    alt: "SCP redaction and trait reveal",
    caption: "Fig. 03 — SCP Redaction & Combat",
  },
  {
    video: {
      mp4: "/videos/carousel/combat.mp4",
      webm: "/videos/carousel/combat.webm",
      poster: "/videos/carousel/combat-poster.webp",
    },
    alt: "SCP creature art and combat VFX",
    caption: "Fig. 04 — SCP Combat & VFX",
  },
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
            <Carousel slides={carouselSlides} href="/scp-dead-letter-protocol" />
          </motion.div>

          {/* Two-column layout */}
          <div className="mb-16 grid gap-10 md:grid-cols-5">
            <motion.div custom={2} variants={fadeUp} className="md:col-span-3">
              <p className="text-lg leading-relaxed text-foreground/90 md:text-xl max-w-160">
                Something is wrong inside Site-19. Something worse is out
                there. A strategic horror roguelike where no two runs tell
                the same story.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Investigate anomalies, contain creatures you don&apos;t
                understand, and try to hold a facility together while it
                falls apart around you. You won&apos;t come back stronger
                between runs. You&apos;ll come back knowing what went
                wrong, and that changes everything.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                No jumpscares. No grinding. Just decisions and what they
                cost.
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
              href="/scp-dead-letter-protocol"
              className="vfx-hover-glitch magnetic-btn text-ui inline-flex items-center gap-3 border border-accent/40 bg-accent-muted px-8 py-3.5 text-accent transition-colors hover:border-accent"
            >
              View Complete Intel
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Steam CTA */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="vfx-hover-glow mt-12 border border-accent/40 bg-accent-muted px-8 py-8 md:py-10"
          >
            <a
              href="https://store.steampowered.com/app/4581700/SCP_Dead_Letter_Protocol/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-5 text-center md:flex-row md:gap-8 md:text-left"
            >
              {/* Steam icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-accent/30 bg-background">
                <svg width="24" height="24" viewBox="0 0 496 512" fill="currentColor" className="text-accent">
                  <path d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 41.9-93.7 93.5v2.1L145.3 258c-17.6-1.1-34.1 5.2-46.4 16.7L0 234.8C6.6 108.1 113.8 5 247.6 5 384.8 5 496 119 496 256zM155.7 384.3l-30.5-12.6a52.8 52.8 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c20 8.3 29.6 31.2 21.4 51.1-8.1 19.9-31.2 29.5-51.3 21.6zm146.9-185.2c0-34.9 28.3-63.3 63.3-63.3s63.3 28.3 63.3 63.3-28.4 63.3-63.3 63.3-63.3-28.3-63.3-63.3zm18 .1c0 24.9 20.2 45.1 45.1 45.1 24.9 0 45.1-20.3 45.1-45.1 0-24.9-20.2-45.1-45.1-45.1-24.8 0-45.1 20.2-45.1 45.1z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-label mb-1 text-accent">
                  Now on Steam
                </p>
                <p className="text-display text-2xl text-foreground">
                  Wishlist SCP: Dead Letter Protocol
                </p>
                <p className="text-ui-sm mt-1 text-muted-foreground">
                  Add to your wishlist to get notified when the game launches.
                </p>
              </div>
              <div className="vfx-hover-glitch magnetic-btn text-ui border border-accent/40 bg-accent px-6 py-2.5 text-accent-foreground transition-colors hover:bg-accent-hover">
                Wishlist on Steam
              </div>
            </a>
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
                  and connect with players who want to help shape the game.
                </p>
              </div>
              <a
                href="https://discord.gg/7QCX33wgUZ"
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
