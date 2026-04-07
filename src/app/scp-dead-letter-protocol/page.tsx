import type { Metadata } from "next";
import { DLPPageClient } from "@/components/games/dlp/dlp-page-client";

export const metadata: Metadata = {
  title: "SCP: Dead Letter Protocol | Liminal Foundation Games",
  description:
    "Something is wrong inside Site-19. Something worse is out there. A strategic horror roguelike where no two runs tell the same story. Investigate anomalies, contain creatures you don't understand, and try to hold a facility together while it falls apart around you.",
  openGraph: {
    title: "SCP: Dead Letter Protocol",
    description:
      "A strategic horror roguelike where no two runs tell the same story. You won't come back stronger between runs. You'll come back knowing what went wrong, and that changes everything.",
    type: "website",
  },
};

export default function DeadLetterProtocolPage() {
  return <DLPPageClient />;
}
