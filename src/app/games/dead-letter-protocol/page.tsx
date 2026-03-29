import type { Metadata } from "next";
import { DLPPageClient } from "@/components/games/dlp/dlp-page-client";

export const metadata: Metadata = {
  title: "SCP: Dead Letter Protocol | Liminal Foundation Games",
  description:
    "Something is wrong inside Site-19. Something worse is happening outside. A punishing strategic horror game where every run creates a story no other player has lived. Investigate anomalies, contain threats, and make decisions more disturbing than anything you'll fight.",
  openGraph: {
    title: "SCP: Dead Letter Protocol",
    description:
      "A punishing strategic horror game where every run creates a story no other player has lived. You don't get stronger between runs — you get smarter. Winning isn't about saving everything. It's about knowing what you can afford to lose.",
    type: "website",
  },
};

export default function DeadLetterProtocolPage() {
  return <DLPPageClient />;
}
