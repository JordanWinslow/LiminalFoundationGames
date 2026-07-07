import { SectionShell } from "../section-shell";
import { Callout } from "../callout";
import { cn } from "@/lib/utils";

type Cat = {
  key: string;
  name: string;
  tone: string; // border/text accent
  blurb: string;
  examples: { name: string; effect: string }[];
};

const categories: Cat[] = [
  {
    key: "injury",
    name: "Injury",
    tone: "text-[#d9534f] border-[#d9534f]/40",
    blurb: "Physical harm. Usually drains Health each cycle or lowers a physical stat.",
    examples: [
      { name: "Lacerations", effect: "−1 Health each cycle" },
      { name: "Concussion", effect: "−2 Knowledge for 5 cycles" },
      { name: "Internal Bleeding", effect: "−2 Health each cycle until treated" },
    ],
  },
  {
    key: "affliction",
    name: "Affliction",
    tone: "text-[#a86fd1] border-[#a86fd1]/40",
    blurb: "Mental or anomalous harm. Warps your stats, your dice, or the facility around you.",
    examples: [
      { name: "Cognitohazard", effect: "A rolled 5 becomes a locked failure" },
      { name: "Paranoia", effect: "−3 Charisma; the interface starts lying to you" },
      { name: "Ontological Fracture", effect: "Entropy rises twice as fast" },
    ],
  },
  {
    key: "augmentation",
    name: "Augmentation",
    tone: "text-[#e0b341] border-[#e0b341]/40",
    blurb: "An anomalous benefit — power taken from the things you contain.",
    examples: [
      { name: "Precognition", effect: "+1 re-roll; better evasion in combat" },
      { name: "Eidetic Imprint", effect: "+3 Knowledge" },
      { name: "Eldritch Insight", effect: "A rolled 2 becomes a locked success" },
    ],
  },
  {
    key: "provision",
    name: "Provision",
    tone: "text-[#5cb85c] border-[#5cb85c]/40",
    blurb: "Foundation treatment — temporary buffs from medicine, stims, and field kit.",
    examples: [
      { name: "Combat Stims", effect: "+2 Strength and extra Command Points for 4 cycles" },
      { name: "Cognitive Stabilizers", effect: "+3 Willpower for 5 cycles" },
      { name: "SCP-500 Euphoria", effect: "Raises your maximums and heals each cycle for 3 cycles" },
    ],
  },
  {
    key: "entropy",
    name: "Entropy Edict",
    tone: "text-[#e08a41] border-[#e08a41]/40",
    blurb: "Facility-wide states forced by a crisis. They hit everyone until they expire.",
    examples: [
      { name: "Heightened Alert", effect: "−1 Defense, Agility, and Willpower for 3 cycles" },
      { name: "Communications Blackout", effect: "−2 Knowledge; your Stress is hidden for 4 cycles" },
      { name: "Quarantine Protocol", effect: "−1 Agility and Defense, but Medical care is free" },
    ],
  },
  {
    key: "mood",
    name: "Mood",
    tone: "text-[#6b8cae] border-[#6b8cae]/40",
    blurb: "Not a real condition — a live read-out of your operative's state, from your current Health and Stress.",
    examples: [
      { name: "Fit for Duty", effect: "Health and Stress both healthy" },
      { name: "Exhausted", effect: "Health running low" },
      { name: "Breaking Down", effect: "Stress near collapse" },
    ],
  },
];

export function ConditionsSection() {
  return (
    <SectionShell
      id="conditions"
      index="R-11"
      label="Conditions"
      title="Conditions"
      lede="Injuries, anomalous effects, medicine, and facility crises all leave your operative with Conditions. Each one changes your stats, your dice, or what happens to you every cycle, and they stack until something clears them."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((c) => (
          <div key={c.key} className={cn("border bg-card/40 p-5", c.tone.split(" ")[1])}>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <span className={cn("text-ui", c.tone.split(" ")[0])}>{c.name}</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
            <div className="space-y-1.5 border-t border-border pt-3">
              {c.examples.map((e) => (
                <div key={e.name} className="flex items-baseline gap-2 text-sm">
                  <span className="text-ui-sm shrink-0 text-foreground">{e.name}</span>
                  <span className="leading-snug text-muted-foreground">— {e.effect}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Callout variant="tip" title="Some effects reach your dice">
          <p>
            A few conditions change what a die face means. Cognitohazard turns a
            rolled 5 into a locked failure; Eldritch Insight turns a rolled 2 into
            a locked success. A condition can help or hurt the same roll — read
            them before a hard test.
          </p>
        </Callout>
        <Callout variant="warning" title="Clearing the bad ones">
          <p>
            Negative conditions do not fade on their own unless they list a
            duration. Remove them with the <strong>Augment</strong> action at
            Engineering &amp; Maintenance, which improves a consumable and strips
            your negative conditions at the same time, or with items and events
            that cure specific conditions. Rest at the Medical Bay restores Health
            and Stress, not conditions.
          </p>
        </Callout>
      </div>
    </SectionShell>
  );
}
