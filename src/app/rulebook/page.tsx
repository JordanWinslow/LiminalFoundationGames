import type { Metadata } from "next";
import { RulebookClient } from "@/components/rulebook/rulebook-client";

export const metadata: Metadata = {
  title: "How to Play — Rulebook | SCP: Dead Letter Protocol",
  description:
    "The operative field manual for SCP: Dead Letter Protocol. Learn the gameplay loop, combat and containment, resources, and the decisions that decide whether the facility holds — written for players new to the game.",
  openGraph: {
    title: "How to Play — SCP: Dead Letter Protocol Rulebook",
    description:
      "A beginner-friendly field manual: the gameplay loop, combat and containment, and how to win a shift at Site-19.",
    type: "article",
  },
};

export default function RulebookPage() {
  return <RulebookClient />;
}
