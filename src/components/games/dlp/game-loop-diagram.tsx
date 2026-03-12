"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phases = [
  {
    id: 1,
    numeral: "I",
    label: "Player\nPhase",
    desc: "Navigate. Investigate. Prepare.",
  },
  {
    id: 2,
    numeral: "II",
    label: "Encounter\nPhase",
    desc: "Procedural narrative events",
  },
  {
    id: 3,
    numeral: "III",
    label: "Anomaly\nPhase",
    desc: "SCPs activate. Threats escalate.",
  },
  {
    id: 4,
    numeral: "IV",
    label: "Entropy\nPhase",
    desc: "Facility degrades. Chaos spreads.",
  },
];

/* ── Animation cycle ────────────────────────────────────────────────
 * 8 steps looping:
 *   0 phase-I → 1 arrow→II → 2 phase-II → 3 arrow→III
 *   4 phase-III → 5 arrow→IV → 6 phase-IV → 7 return-arrow
 * ─────────────────────────────────────────────────────────────────── */
const TOTAL_STEPS = 8;
const STEP_DURATIONS = [1400, 500, 1400, 500, 1400, 500, 1400, 1600];

function getStepInfo(step: number) {
  if (step === 7) return { type: "return" as const, index: 0 };
  if (step % 2 === 0) return { type: "phase" as const, index: step / 2 };
  return { type: "arrow" as const, index: Math.floor(step / 2) };
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/*
 * Return arrow curve (viewBox 0 0 100 65).
 * Starts at right (Phase IV center-bottom) → curves deep below → ends at left (Phase I center-bottom).
 * The SVG container is inset by half-a-box-width on each side so x=0 and x=100 align with box centers.
 */
const RETURN_CURVE = "M 100 0 C 100 60, 0 60, 0 0";

export function GameLoopDiagram() {
  const [step, setStep] = useState(0);
  const info = getStepInfo(step);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, STEP_DURATIONS[step]);
    return () => clearTimeout(timer);
  }, [step]);

  const isPhaseActive = (i: number) =>
    info.type === "phase" && info.index === i;
  const isArrowActive = (i: number) =>
    info.type === "arrow" && info.index === i;
  const isReturnActive = info.type === "return";

  return (
    <div className="mt-10 mb-4">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-label text-accent">Operation Cycle</span>
        <span className="h-px flex-1 bg-border" />
        <span className="text-caption text-text-dim">Repeats Each Round</span>
      </div>

      {/* ── Desktop ───────────────────────────────────────────────── */}
      <div className="hidden md:block">
        <div className="relative border border-border bg-card/50 px-6 pt-8 pb-4">
          {/* Corner brackets */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent/40" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent/40" />
          </div>

          {/* Phase boxes + forward arrows */}
          <div className="flex items-center">
            {phases.map((phase, i) => (
              <Fragment key={phase.id}>
                {/* Phase box — entrance wrapper */}
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="w-36 flex-none lg:w-44"
                >
                  {/* Phase box — state-driven effects */}
                  <motion.div
                    className={`
                      relative flex flex-col overflow-hidden border bg-background
                      transition-[border-color,box-shadow] duration-500
                      ${
                        isPhaseActive(i)
                          ? "border-accent shadow-[0_0_24px_-4px_rgba(194,48,48,0.4),inset_0_0_24px_-6px_rgba(194,48,48,0.1)]"
                          : "border-border"
                      }
                    `}
                    animate={{
                      x: isPhaseActive(i) ? [0, -2, 3, -1, 0] : 0,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Scan-line overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194,48,48,0.04) 2px, rgba(194,48,48,0.04) 4px)",
                        opacity: isPhaseActive(i) ? 1 : 0,
                      }}
                    />
                    {/* Film-grain overlay */}
                    <svg
                      className="pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-500"
                      style={{ opacity: isPhaseActive(i) ? 0.06 : 0 }}
                    >
                      <filter id={`pgrain-${phase.id}`}>
                        <feTurbulence
                          baseFrequency="0.65"
                          numOctaves="3"
                          stitchTiles="stitch"
                        />
                      </filter>
                      <rect
                        width="100%"
                        height="100%"
                        filter={`url(#pgrain-${phase.id})`}
                      />
                    </svg>

                    {/* Phase numeral header */}
                    <div className="border-b border-border px-3 py-1.5">
                      <span
                        className={`text-caption transition-colors duration-500 ${
                          isPhaseActive(i) ? "text-accent" : "text-accent/50"
                        }`}
                      >
                        Phase {phase.numeral}
                      </span>
                    </div>
                    {/* Phase name */}
                    <div className="flex flex-1 items-center justify-center px-3 py-4 text-center">
                      <span
                        className={`text-ui whitespace-pre-line transition-colors duration-500 ${
                          isPhaseActive(i)
                            ? "text-accent"
                            : "text-foreground/90"
                        }`}
                      >
                        {phase.label}
                      </span>
                    </div>
                    {/* Description footer */}
                    <div className="border-t border-border/50 px-3 py-2">
                      <span className="text-caption leading-tight text-text-dim">
                        {phase.desc}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Forward arrow connector */}
                {i < phases.length - 1 && (
                  <div className="relative flex min-w-6 flex-1 items-center px-2 lg:px-4">
                    <div
                      className={`h-px flex-1 transition-all duration-300 ${
                        isArrowActive(i) ? "bg-accent" : "bg-border-bright"
                      }`}
                      style={
                        isArrowActive(i)
                          ? {
                              boxShadow:
                                "0 0 8px 1px rgba(194,48,48,0.3)",
                            }
                          : undefined
                      }
                    />
                    <svg
                      width="10"
                      height="14"
                      viewBox="0 0 10 14"
                      className={`shrink-0 transition-colors duration-300 ${
                        isArrowActive(i)
                          ? "text-accent"
                          : "text-border-bright"
                      }`}
                    >
                      <path
                        d="M1 1l8 6-8 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    {/* Traveling energy pulse */}
                    <AnimatePresence>
                      {isArrowActive(i) && (
                        <motion.div
                          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                          initial={{ left: "0%", opacity: 0.3 }}
                          animate={{
                            left: "calc(100% - 16px)",
                            opacity: [0.3, 1, 1],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <div
                            className="h-[3px] w-8 rounded-full"
                            style={{
                              background:
                                "radial-gradient(ellipse at center, rgba(194,48,48,0.9) 0%, transparent 80%)",
                              boxShadow:
                                "0 0 12px 4px rgba(194,48,48,0.4)",
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* ── Return arrow ────────────────────────────────────────
           * mx offsets = half of box width so x=0 and x=100 in the
           * viewBox align exactly with Phase I and Phase IV centers.
           * w-36 = 144px → 72px; lg:w-44 = 176px → 88px
           * ──────────────────────────────────────────────────────── */}
          <div
            className="relative mx-[72px] mt-3 lg:mx-[88px]"
            style={{ height: 65 }}
          >
            {/* Base dashed curve — always visible */}
            <svg
              className="absolute inset-0"
              width="100%"
              height="100%"
              viewBox="0 0 100 65"
              preserveAspectRatio="none"
            >
              <path
                d={RETURN_CURVE}
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                vectorEffect="non-scaling-stroke"
                style={{
                  stroke: isReturnActive
                    ? "rgba(194,48,48,0.35)"
                    : "rgba(194,48,48,0.2)",
                  transition: "stroke 500ms",
                }}
              />
            </svg>

            {/* Accent overlay — CSS clip-path wipe right→left */}
            <AnimatePresence>
              {isReturnActive && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 65"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={RETURN_CURVE}
                      fill="none"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      stroke="rgba(194,48,48,0.6)"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Arrowhead at Phase I end (left edge, pointing up) */}
            <svg
              className="absolute"
              style={{ left: -7, top: -9 }}
              width="14"
              height="10"
              viewBox="0 0 14 10"
            >
              <path
                d="M1 9l6-8 6 8"
                fill="none"
                style={{
                  stroke: isReturnActive
                    ? "rgba(194,48,48,0.6)"
                    : "rgba(194,48,48,0.2)",
                  transition: "stroke 500ms",
                }}
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <p className="text-caption mt-1 text-center text-text-dim">
            Cycle repeats -- entropy escalates each round
          </p>
        </div>
      </div>

      {/* ── Mobile: vertical with animation ───────────────────────── */}
      <div className="md:hidden">
        <div className="relative border border-border bg-card/50 px-4 py-6">
          {/* Corner brackets */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-accent/40" />
            <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent/40" />
          </div>

          <div className="flex flex-col items-center gap-2">
            {phases.map((phase, i) => (
              <div
                key={phase.id}
                className="flex w-full flex-col items-center gap-2"
              >
                {/* Phase box — entrance wrapper */}
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="w-full max-w-xs"
                >
                  {/* Phase box — state-driven effects */}
                  <motion.div
                    className={`
                      relative flex flex-col overflow-hidden border bg-background
                      transition-[border-color,box-shadow] duration-500
                      ${
                        isPhaseActive(i)
                          ? "border-accent shadow-[0_0_20px_-4px_rgba(194,48,48,0.35),inset_0_0_20px_-4px_rgba(194,48,48,0.08)]"
                          : "border-border"
                      }
                    `}
                    animate={{
                      x: isPhaseActive(i) ? [0, -1, 2, -1, 0] : 0,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Scan-line overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(194,48,48,0.04) 2px, rgba(194,48,48,0.04) 4px)",
                        opacity: isPhaseActive(i) ? 1 : 0,
                      }}
                    />
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <span
                        className={`text-caption transition-colors duration-500 ${
                          isPhaseActive(i) ? "text-accent" : "text-accent/50"
                        }`}
                      >
                        {phase.numeral}
                      </span>
                      <span
                        className={`text-ui transition-colors duration-500 ${
                          isPhaseActive(i)
                            ? "text-accent"
                            : "text-foreground/90"
                        }`}
                      >
                        {phase.label.replace("\n", " ")}
                      </span>
                      <span className="ml-auto text-caption text-text-dim">
                        {phase.desc}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Down arrow between phases */}
                {i < phases.length - 1 && (
                  <div className="relative">
                    <svg
                      width="12"
                      height="20"
                      viewBox="0 0 12 20"
                      className={`transition-colors duration-300 ${
                        isArrowActive(i) ? "text-accent" : "text-border-bright"
                      }`}
                      style={
                        isArrowActive(i)
                          ? {
                              filter:
                                "drop-shadow(0 0 4px rgba(194,48,48,0.5))",
                            }
                          : undefined
                      }
                    >
                      <path
                        d="M6 0v16m-4-4l4 4 4-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Return indicator */}
          <div className="mt-4 flex justify-center">
            <div
              className={`
                flex items-center gap-2 border border-dashed px-4 py-2
                transition-all duration-500
                ${
                  isReturnActive
                    ? "border-accent/50 shadow-[0_0_12px_-4px_rgba(194,48,48,0.3)]"
                    : "border-accent/30"
                }
              `}
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                className={`transition-colors duration-500 ${
                  isReturnActive ? "text-accent" : "text-accent/50"
                }`}
              >
                <path
                  d="M14 6H4m4-4L4 6l4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span
                className={`text-caption transition-colors duration-500 ${
                  isReturnActive ? "text-accent/80" : "text-text-dim"
                }`}
              >
                Cycle repeats -- entropy escalates each round
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
