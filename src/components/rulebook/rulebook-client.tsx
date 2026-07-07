"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ClassifiedBadge } from "@/components/classified-badge";
import { RulebookToc, type TocEntry } from "./rulebook-toc";
import { OverviewSection } from "./sections/overview-section";
import { EntropySection } from "./sections/entropy-section";
import { OperativeSection } from "./sections/operative-section";
import { ResourcesSection } from "./sections/resources-section";
import { RoundSection } from "./sections/round-section";
import { SiteSection } from "./sections/site-section";
import { GearSection } from "./sections/gear-section";
import { EnemySection } from "./sections/enemy-section";
import { CombatSection } from "./sections/combat-section";
import { SkillTestsSection } from "./sections/skilltests-section";
import { ConditionsSection } from "./sections/conditions-section";
import { InvestigationsSection } from "./sections/investigations-section";
import { MissionsSection } from "./sections/missions-section";
import { UpgradingSection } from "./sections/upgrading-section";
import { FinalThreatSection } from "./sections/finalthreat-section";
import { ProgressionSection } from "./sections/progression-section";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const tocEntries: TocEntry[] = [
  { id: "overview", index: "R-01", label: "Objective" },
  { id: "entropy", index: "R-02", label: "Entropy" },
  { id: "operative", index: "R-03", label: "Operative" },
  { id: "resources", index: "R-04", label: "Resources" },
  { id: "round", index: "R-05", label: "Cycles & Phases" },
  { id: "site", index: "R-06", label: "Locations" },
  { id: "gear", index: "R-07", label: "Items" },
  { id: "enemy", index: "R-08", label: "SCPs & Research" },
  { id: "combat", index: "R-09", label: "Combat" },
  { id: "skilltests", index: "R-10", label: "Skill Tests" },
  { id: "conditions", index: "R-11", label: "Conditions" },
  { id: "investigations", index: "R-12", label: "Investigations" },
  { id: "missions", index: "R-13", label: "Missions" },
  { id: "upgrading", index: "R-14", label: "Improving" },
  { id: "finalthreat", index: "R-15", label: "Final Threat" },
  { id: "progression", index: "R-16", label: "Clearance" },
];

export function RulebookClient() {
  return (
    <div className="relative z-10 pt-24 pb-24 md:pt-32 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Page header */}
        <motion.div initial="hidden" animate="visible" className="mb-14">
          <motion.div custom={0} variants={fadeUp}>
            <Link
              href="/scp-dead-letter-protocol"
              className="text-ui mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Dossier
            </Link>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} className="mb-4">
            <ClassifiedBadge variant="classified">Rulebook</ClassifiedBadge>
          </motion.div>

          <motion.h1
            custom={2}
            variants={fadeUp}
            className="text-display mb-3 text-5xl text-foreground md:text-7xl"
          >
            How to Play
          </motion.h1>

          <motion.p
            custom={3}
            variants={fadeUp}
            className="mb-8 max-w-2xl text-xl leading-relaxed text-foreground/90"
          >
            The rules of SCP: Dead Letter Protocol — how a run works, what each
            system does, and how to win.
          </motion.p>

          <motion.div custom={4} variants={fadeUp}>
            <div className="red-line" />
          </motion.div>
        </motion.div>

        {/* Sticky index + content */}
        <div className="lg:grid lg:grid-cols-[210px_1fr] lg:gap-14">
          <RulebookToc entries={tocEntries} />

          <div>
            <OverviewSection />
            <EntropySection />
            <OperativeSection />
            <ResourcesSection />
            <RoundSection />
            <SiteSection />
            <GearSection />
            <EnemySection />
            <CombatSection />
            <SkillTestsSection />
            <ConditionsSection />
            <InvestigationsSection />
            <MissionsSection />
            <UpgradingSection />
            <FinalThreatSection />
            <ProgressionSection />

            {/* Footer CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              <a
                href="https://store.steampowered.com/app/4581700/SCP_Dead_Letter_Protocol/"
                target="_blank"
                rel="noopener noreferrer"
                className="vfx-hover-glitch magnetic-btn text-ui inline-flex items-center gap-3 border border-accent/40 bg-accent-muted px-8 py-3.5 text-accent transition-colors hover:border-accent"
              >
                Wishlist on Steam
              </a>
              <Link
                href="/scp-dead-letter-protocol"
                className="text-ui inline-flex items-center gap-3 border border-border px-8 py-3.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Dossier
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
