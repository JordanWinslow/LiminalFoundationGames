"use client";

import { motion } from "framer-motion";
import type { SteamSection } from "./dlp-sections-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function SteamFeatureBlock({ section }: { section: SteamSection }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      className="border-b border-border pb-16"
    >
      <h2 className="text-display mb-6 text-3xl text-foreground md:text-4xl">
        {section.title}
      </h2>

      {section.body.length > 0 && (
        <div className="max-w-3xl space-y-4">
          {section.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed text-foreground/90"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-6 max-w-3xl space-y-5">
          {section.subsections.map((sub) => (
            <p key={sub.title} className="text-lg leading-relaxed text-foreground/90">
              <strong className="text-foreground">{sub.title}</strong>{" "}
              {sub.body}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
}
