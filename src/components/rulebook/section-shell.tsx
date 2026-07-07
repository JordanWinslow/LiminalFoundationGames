"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface SectionShellProps {
  id: string;
  index: string;
  label: string;
  title: string;
  /** Optional one-line intro. Keep it short. */
  lede?: React.ReactNode;
  children: React.ReactNode;
  /** Omit the bottom divider (last section). */
  last?: boolean;
}

/** Standard rulebook section: index rail + display heading + optional lede. */
export function SectionShell({
  id,
  index,
  label,
  title,
  lede,
  children,
  last = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 ${last ? "" : "mb-14 border-b border-border pb-14"}`}
    >
      <SectionHeading index={index} label={label} className="mb-5" />
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="text-display mb-4 text-3xl text-foreground md:text-4xl"
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-7 max-w-3xl text-lg leading-relaxed text-foreground/90"
        >
          {lede}
        </motion.p>
      )}
      {children}
    </section>
  );
}

/** Small label + rule used to head a sub-block inside a section. */
export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-label text-accent">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
