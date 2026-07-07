import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";
import { StatBlock } from "../stat-block";
import { Screenshot } from "../media-clip";
import { ClassifiedBadge } from "@/components/classified-badge";

const operatives = [
  { key: "gears", name: "Dr. Charles Gears", role: "Analytical, with high Knowledge and Willpower. Suited to containment.", unlock: "Free" },
  { key: "wheeler", name: "Chief Marion Wheeler", role: "Starts with an extra Action each turn.", unlock: "Free" },
  { key: "mann", name: "Dr. Everett Mann", role: "High Health. A durable field surgeon.", unlock: "2,000 Clearance" },
  { key: "light", name: "Dr. Sophia Light", role: "High Charisma. Suited to talking her way through events.", unlock: "3,500 Clearance" },
];

const stats = [
  { icon: "health", name: "Health", desc: "Your operative's life, spent in combat and events. At zero, the run ends." },
  { icon: "stress", name: "Stress", desc: "Psychological reserve, spent by frightening events and attacks. At zero, your operative breaks and the run ends." },
  { icon: "strength", name: "Strength", desc: "In combat, raises your attack damage. In tests, the stat for feats of force." },
  { icon: "defense", name: "Defense", desc: "In combat, reduces the physical damage an SCP deals to you." },
  { icon: "willpower", name: "Willpower", desc: "Reduces damage to Stress, and is the stat rolled in tests of nerve." },
  { icon: "agility", name: "Agility", desc: "Sets your movement points on the map and drives dodging, sneaking, and reflex tests." },
  { icon: "knowledge", name: "Knowledge", desc: "The stat for every containment roll, and for research and technical tests." },
  { icon: "charisma", name: "Charisma", desc: "Powers the Talk action against SCPs and every social test with NPCs." },
  { icon: "actions", name: "Actions", desc: "How many actions you take each cycle on the map. Usually three." },
];

const bios = [
  {
    key: "gears",
    name: "Dr. Charles Gears",
    title: "Containment Specialist",
    line: "Analytical and unshakeable. His high Knowledge and Willpower make him the natural choice for taking SCPs alive.",
    die: "Clinical Calm — a rolled 4 also grants +1 Stress relief",
    ability: "Compose — spend an Action to shed Stress",
    combat: "Assess — spend Command Points in a fight to gain Intel",
    start: "Gears' Logbook",
  },
  {
    key: "wheeler",
    name: "Chief Marion Wheeler",
    title: "Antimemetics Director",
    line: "Fast and fragile. She starts each cycle with a fourth Action and a steady supply of Intel, trading resilience for tempo.",
    die: "Total Recall — a rolled 5 also grants +2 Intel",
    ability: "Mnestic — spend an Action to gain Intel",
    combat: "Recall — spend Command Points in a fight to gain Intel",
    start: "Class-W Mnestics",
  },
];

const traits = [
  { name: "Bio", desc: "Who your operative is." },
  { name: "Unique Item", desc: "A starting item only this operative carries." },
  { name: "Unique Die", desc: "A special effect on one die face, applied to every skill test you roll." },
  { name: "Ability", desc: "An active power you can use during the run, such as restoring Stress." },
];

export function OperativeSection() {
  return (
    <SectionShell
      id="operative"
      index="R-03"
      label="Your Operative"
      title="Your Operative"
      lede="You pick one operative before each run. What they excel at shapes your options: Knowledge favors containment, Strength favors destroying SCPs, Charisma favors talking your way through events. Two are free; the rest unlock with Clearance."
    >
      <SubLabel>The Roster</SubLabel>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {operatives.map((op) => (
          <div
            key={op.key}
            className="vfx-hover-scan flex flex-col border border-border bg-card/40 transition-colors hover:border-accent/50"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
              <Image
                src={`/images/rulebook/characters/${op.key}.png`}
                alt={op.name}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 100vw, 300px"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
              <span className="text-ui text-foreground">{op.name}</span>
              <p className="flex-1 text-sm leading-snug text-muted-foreground">{op.role}</p>
              <ClassifiedBadge
                variant={op.unlock === "Free" ? "active" : "pending"}
                className="self-start"
              >
                {op.unlock}
              </ClassifiedBadge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <SubLabel>Your Two Starting Operatives</SubLabel>
        <div className="grid gap-5 lg:grid-cols-2">
          {bios.map((b) => (
            <div
              key={b.key}
              className="flex gap-4 border border-border bg-card/40 p-4"
            >
              <div className="relative aspect-[3/5] w-28 shrink-0 overflow-hidden border border-border bg-surface sm:w-36">
                <Image
                  src={`/images/rulebook/characters/${b.key}.png`}
                  alt={b.name}
                  fill
                  className="object-contain object-bottom"
                  sizes="150px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-ui text-foreground">{b.name}</span>
                <p className="text-caption mt-0.5 text-accent">{b.title}</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  {b.line}
                </p>
                <dl className="mt-3 space-y-1.5 border-t border-border pt-3">
                  {[
                    ["Unique Die", b.die],
                    ["Ability", b.ability],
                    ["Combat", b.combat],
                    ["Starts With", b.start],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-sm">
                      <dt className="text-caption w-20 shrink-0 pt-0.5 text-text-dim">
                        {k}
                      </dt>
                      <dd className="leading-snug text-muted-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <SubLabel>The Nine Stats</SubLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <StatBlock
              key={s.name}
              iconSrc={`/images/rulebook/stats/${s.icon}.png`}
              name={s.name}
              desc={s.desc}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <SubLabel>The Character Screen</SubLabel>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Screenshot
            src="/images/rulebook/ui/character-screen.png"
            alt="The Character screen showing Dr. Charles Gears"
            caption="Character screen — Dr. Charles Gears"
            ratio="auto"
          />
          <div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Alongside stats and current Conditions, each operative has four
              defining features:
            </p>
            <div className="space-y-2">
              {traits.map((t) => (
                <div key={t.name} className="flex items-start gap-3 border-b border-border pb-2">
                  <span className="text-ui-sm w-28 shrink-0 text-accent">{t.name}</span>
                  <span className="text-sm leading-snug text-muted-foreground">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
