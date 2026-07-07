import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";

const resources = [
  {
    icon: "credits",
    name: "Credits",
    earn: "Earned from missions and by selling gear.",
    spend: [
      "Buy weapons and utilities at the Armory; equipment and utilities at Security.",
      "Build a containment cell at the Chambers (10,000, then 25,000 for the next).",
      "Unlock a locked item slot at Engineering (20,000 each).",
      "Augment an item at Engineering to improve it.",
      "Lock or unlock a die mid-test with Anchor or Annul (300 each).",
    ],
  },
  {
    icon: "intel",
    name: "Intel",
    earn: "Earned from rewards and operative abilities like Gears' Assess.",
    spend: [
      "Research an SCP in the Database to reveal its traits before you fight it.",
      "Reroll your first failed die in a skill test with Clarity (1 Intel).",
      "Stabilize an investigation to reset its Risk.",
      "Resolve certain events that call for hard intelligence.",
    ],
  },
];

export function ResourcesSection() {
  return (
    <SectionShell
      id="resources"
      index="R-04"
      label="Resources"
      title="Credits and Intel"
      lede="Two resources carry across the run and pay for almost everything you improve: Credits, the facility's currency, and Intel, spent to study threats and bend the odds."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {resources.map((r) => (
          <div key={r.name} className="border border-border bg-card/40 p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src={`/images/rulebook/stats/${r.icon}.png`}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <span className="text-ui text-foreground">{r.name}</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {r.earn}
            </p>
            <SubLabel>Spent On</SubLabel>
            <ul className="space-y-2 text-sm text-foreground/85">
              {r.spend.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
