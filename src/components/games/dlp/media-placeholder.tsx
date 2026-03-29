"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function MediaPlaceholder({ label }: { label: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
      className="flex aspect-video max-w-3xl items-center justify-center border border-dashed border-border bg-card/50"
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <Film className="h-8 w-8 text-text-dim" />
        <p className="text-caption text-text-dim">{label}</p>
      </div>
    </motion.div>
  );
}
