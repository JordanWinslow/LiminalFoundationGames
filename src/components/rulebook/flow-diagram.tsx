"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

export interface FlowStep {
  /** Small label above the box, e.g. "01" or "I". */
  marker?: string;
  /** Main step name. */
  label: string;
  /** Optional one-line description. */
  desc?: string;
}

interface FlowDiagramProps {
  title: string;
  note?: string;
  steps: FlowStep[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function CornerBrackets() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent/40" />
      <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-accent/40" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent/40" />
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent/40" />
    </div>
  );
}

/**
 * Static linear sequence diagram (steps connected by arrows). Horizontal on
 * desktop, vertical on mobile. Matches the corner-bracket / card panel language
 * of GameLoopDiagram but without the animation cycle.
 */
export function FlowDiagram({ title, note, steps }: FlowDiagramProps) {
  return (
    <div className="my-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-label text-accent">{title}</span>
        <span className="h-px flex-1 bg-border" />
        {note && <span className="text-caption text-text-dim">{note}</span>}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="relative border border-border bg-card/50 px-6 py-8">
          <CornerBrackets />
          <div className="flex items-stretch">
            {steps.map((step, i) => (
              <Fragment key={step.label}>
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex flex-1 flex-col border border-border bg-background"
                >
                  {step.marker && (
                    <div className="border-b border-border px-3 py-1.5">
                      <span className="text-caption text-accent/70">
                        {step.marker}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-center px-4 py-4 text-center">
                    <span className="text-ui text-foreground/90">
                      {step.label}
                    </span>
                    {step.desc && (
                      <span className="text-caption mt-2 leading-tight text-text-dim">
                        {step.desc}
                      </span>
                    )}
                  </div>
                </motion.div>

                {i < steps.length - 1 && (
                  <div className="flex min-w-8 items-center justify-center px-2">
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 10 14"
                      className="shrink-0 text-accent"
                    >
                      <path
                        d="M1 1l8 6-8 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="relative border border-border bg-card/50 px-4 py-6">
          <CornerBrackets />
          <div className="flex flex-col items-center gap-2">
            {steps.map((step, i) => (
              <div key={step.label} className="flex w-full flex-col items-center gap-2">
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex w-full max-w-xs items-center gap-3 border border-border bg-background px-3 py-2.5"
                >
                  {step.marker && (
                    <span className="text-caption text-accent/70">
                      {step.marker}
                    </span>
                  )}
                  <span className="text-ui text-foreground/90">
                    {step.label}
                  </span>
                  {step.desc && (
                    <span className="text-caption ml-auto text-right leading-tight text-text-dim">
                      {step.desc}
                    </span>
                  )}
                </motion.div>
                {i < steps.length - 1 && (
                  <svg
                    width="12"
                    height="18"
                    viewBox="0 0 12 20"
                    className="text-accent"
                  >
                    <path
                      d="M6 0v16m-4-4l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
