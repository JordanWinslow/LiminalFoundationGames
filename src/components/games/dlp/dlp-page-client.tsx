"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import { ClassifiedBadge } from "@/components/classified-badge";
import { SteamFeatureBlock } from "./steam-feature-block";
import { GameLoopDiagram } from "./game-loop-diagram";
import { steamSections } from "./dlp-sections-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* ---- Media data for gallery sections ---- */
interface MediaItem {
  src: string;
  label: string;
  type: "image" | "video" | "gif";
}

const gameplayClips: MediaItem[] = [
  { src: "/press-kit/videos/redaction.mp4", label: "Redaction & Trait Reveal", type: "video" },
  { src: "/press-kit/videos/combat.mp4", label: "Combat Encounters", type: "video" },
  { src: "/press-kit/videos/phases.mp4", label: "The Four Phases", type: "video" },
  { src: "/press-kit/videos/mission-advancement.mp4", label: "Mission Advancement", type: "video" },
  { src: "/press-kit/videos/game-end.mp4", label: "Game End", type: "video" },
];

const screenshots: MediaItem[] = [
  { src: "/press-kit/screenshots/combat-1.png", label: "Combat Encounter", type: "image" },
  { src: "/press-kit/screenshots/dice-contain.png", label: "Containment Roll", type: "image" },
  { src: "/press-kit/screenshots/investigate-1.png", label: "Investigation Phase", type: "image" },
  { src: "/press-kit/screenshots/map.png", label: "Facility Map", type: "image" },
  { src: "/press-kit/screenshots/hard-decisions.png", label: "Difficult Choices", type: "image" },
  { src: "/press-kit/screenshots/mission-selection.png", label: "Mission Selection", type: "image" },
  { src: "/press-kit/screenshots/gaining-items.png", label: "Item Acquisition", type: "image" },
  { src: "/press-kit/screenshots/recruit-shop.png", label: "Recruit Shop", type: "image" },
  { src: "/press-kit/screenshots/scp-database.png", label: "SCP Database", type: "image" },
  { src: "/press-kit/screenshots/fail-objective.png", label: "Failed Objective", type: "image" },
  { src: "/press-kit/screenshots/combat-2.png", label: "Combat Encounter 2", type: "image" },
  { src: "/press-kit/screenshots/combat-3.png", label: "Combat Encounter 3", type: "image" },
];

/* ---- Lightbox ---- */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="absolute left-4 top-4 z-10 flex items-center gap-4">
        <span className="text-caption text-text-dim">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <span className="text-caption text-muted-foreground">{item.label}</span>
      </div>

      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <div className="max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            autoPlay
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        ) : (
          <img
            src={item.src}
            alt={item.label}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        )}
      </div>

      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
}

/* ---- Thumbnail Card ---- */
function MediaThumb({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative block w-full border border-border bg-card/50 text-left transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        {item.type === "video" ? (
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Eye className="h-6 w-6 text-foreground" />
        </div>
      </div>
      <div className="px-3 py-2.5">
        <span className="text-ui-sm text-muted-foreground">{item.label}</span>
      </div>
    </button>
  );
}

/* ---- Media Grid Section ---- */
function MediaGrid({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: MediaItem[];
  onItemClick: (items: MediaItem[], index: number) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <motion.div custom={0} variants={fadeUp} className="mb-6">
        <p className="text-label mb-2 text-accent">{title}</p>
        <div className="red-line" />
      </motion.div>
      <motion.div
        custom={1}
        variants={fadeUp}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => (
          <MediaThumb
            key={item.src}
            item={item}
            onClick={() => onItemClick(items, i)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---- Main Page ---- */
export function DLPPageClient() {
  const [lightbox, setLightbox] = useState<{
    items: MediaItem[];
    index: number;
  } | null>(null);

  const openLightbox = useCallback((items: MediaItem[], index: number) => {
    setLightbox({ items, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const prevLightbox = useCallback(() => {
    if (!lightbox) return;
    setLightbox({
      items: lightbox.items,
      index: (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length,
    });
  }, [lightbox]);

  const nextLightbox = useCallback(() => {
    if (!lightbox) return;
    setLightbox({
      items: lightbox.items,
      index: (lightbox.index + 1) % lightbox.items.length,
    });
  }, [lightbox]);

  // Get sections by ID for controlled rendering order
  const aboutSection = steamSections.find((s) => s.id === "about")!;
  const phasesSection = steamSections.find((s) => s.id === "phases")!;
  const combatSection = steamSections.find((s) => s.id === "combat")!;
  const betweenRunsSection = steamSections.find((s) => s.id === "between-runs")!;
  const keyFeaturesSection = steamSections.find((s) => s.id === "key-features")!;

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

        {/* Gameplay Clips Grid */}
        <div className="mb-20">
          <MediaGrid
            title="Gameplay"
            items={gameplayClips}
            onItemClick={openLightbox}
          />
        </div>

        {/* About Section */}
        <div className="mb-16 space-y-10">
          <SteamFeatureBlock section={aboutSection} />
        </div>

        {/* Phases Section */}
        <div className="mb-16 space-y-10">
          <SteamFeatureBlock section={phasesSection} />
          <GameLoopDiagram />
        </div>

        {/* Combat Section */}
        <div className="mb-16 space-y-10">
          <SteamFeatureBlock section={combatSection} />
        </div>

        {/* Screenshots Grid */}
        <div className="mb-20">
          <MediaGrid
            title="Screenshots"
            items={screenshots}
            onItemClick={openLightbox}
          />
        </div>

        {/* Between Runs */}
        <div className="mb-16 space-y-10">
          <SteamFeatureBlock section={betweenRunsSection} />
        </div>

        {/* Key Features */}
        <div className="space-y-10">
          <SteamFeatureBlock section={keyFeaturesSection} />
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

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </div>
  );
}
