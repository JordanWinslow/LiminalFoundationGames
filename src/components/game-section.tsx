"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Carousel } from "./carousel";

const featureTags = [
  "Strategic planning, resource management, and the constant question: what can I afford to ignore this round?",
  "Procedurally generated narrative: hundreds of encounters, anomalies  & crises assembled into a different story every run",
  "100+ nightmarish entities with hidden traits, unique dialogue, and multiple paths to resolution -- observe, fight, contain, or talk",
  "Punishing Turn-Based Combat that rewards knowledge and upfront preparation",
  "Fate dice system allows you to change predetermined outcomes - at a cost",
  "Decisions with weight: Save an innocent life or stop an outbreak?",
  "Legacy progression: unlock new operatives, apocalyptic scenarios, and build a database of every nightmare you've survived"
  // "100+ Tactical & thematic items ranging from allies to technology that can bend or break the rules",
];

const carouselSlides = [
  { src: "/images/games/scp-dlp-logo.png", alt: "SCP: Dead Letter Protocol", caption: "SCP: Dead Letter Protocol", contain: true },
  { src: "/images/carousel/concept-missions.webp", alt: "Mission briefing interface", caption: "Fig. 01 — Mission Briefing Interface", comingSoon: true },
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
                A turn-based crisis management game where your job isn't to win -- it's to decide what you're willing to lose."
              </p>
              
  <p className="mt-4 leading-relaxed text-muted-foreground">
  Beyond any government's reach, a secret organization maintains a global network of facilities containing the most
  dangerous supernatural threats on Earth: things that could reshape reality, corrode sanity, or destroy entire nations if they breach
  containment.</p>
  
  <p className="mt-4 leading-relaxed text-muted-foreground">
    And you just accepted a position you can't quit. Congratulations operative. Welcome to Site-19.
  </p>
    <p className="mt-4 leading-relaxed text-muted-foreground">
  Investigate anomalies, contain threats, and make morally
    questionable decisions as entropy tears your facility apart.
    Choose your apocalypse: every scenario pits you against a
    different existential threat, and every playthrough is a unique
    procedurally generated narrative of survival or catastrophic
    failure.
              </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          No jumpscares. No grinding. Just the mounting pressure of a facility that's
  falling apart faster than you can hold it together. Reinforce the breach or pursue
  the objective. Recruit an ally or stockpile for what's coming. Spend the round
  investigating or pray that ignoring the anomaly doesn't cost you the mission. Every
  decision costs something. Every round, the list of things you can't afford to lose
  gets shorter.
        </p>
            </motion.div>

            <motion.div custom={3} variants={fadeUp} className="flex flex-col gap-2 md:col-span-2">
              <p className="text-label mb-2 text-accent">
                Operational Brief
              </p>
              {featureTags.map((tag) => (
                <div key={tag} className="vfx-hover-line flex items-center gap-3 border-b border-border py-2.5">
                  <span className="h-1 w-1 bg-accent" />
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
