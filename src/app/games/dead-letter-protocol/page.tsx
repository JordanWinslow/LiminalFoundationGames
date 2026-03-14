import type { Metadata } from "next";
import { DLPPageClient } from "@/components/games/dlp/dlp-page-client";

export const metadata: Metadata = {
  title: "SCP: Dead Letter Protocol | Liminal Foundation Games",
  description:
    "A turn-based crisis management game where your job isn't to win -- it's to decide what you're willing to lose. 100+ nightmarish entities drawn from the SCP Wiki. Investigate, fight, contain, or talk your way through a collapsing Foundation facility.",
  openGraph: {
    title: "SCP: Dead Letter Protocol",
    description:
      "Investigate anomalies, fight nightmarish entities, and make impossible choices as entropy tears your facility apart. 100+ SCPs, procedural narrative, punishing turn-based combat. Every decision costs something.",
    type: "website",
  },
};

export default function DeadLetterProtocolPage() {
  return <DLPPageClient />;
}
