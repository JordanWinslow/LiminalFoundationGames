import type { Metadata } from "next";
import { DLPPageClient } from "@/components/games/dlp/dlp-page-client";

export const metadata: Metadata = {
  title: "SCP: Dead Letter Protocol | Liminal Foundation Games",
  description:
    "You're not fighting the monsters. You're managing the disaster. A turn-based horror management game set inside a collapsing SCP Foundation facility. Make impossible choices as entropy tears your site apart.",
  openGraph: {
    title: "SCP: Dead Letter Protocol",
    description:
      "You're not fighting the monsters. You're managing the disaster. 30+ SCPs, procedural narrative, and a facility collapsing around you. Every decision costs something.",
    type: "website",
  },
};

export default function DeadLetterProtocolPage() {
  return <DLPPageClient />;
}
