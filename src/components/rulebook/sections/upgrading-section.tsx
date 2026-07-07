import { SectionShell } from "../section-shell";
import { Callout } from "../callout";

const paths = [
  {
    name: "Stat improvements",
    desc: "Some location events permanently raise a stat by one — for example, maximum Health at the Medical Bay, or maximum Actions at Research & Development. They are usually earned by passing a test or making the right choice, and announced as a permanent improvement.",
  },
  {
    name: "Equipment slots",
    desc: "At Engineering & Maintenance, the Upgrades service unlocks one of your locked equipment slots for 20,000 Credits. Certain reward events unlock a slot as well. More slots mean more gear equipped at once.",
  },
  {
    name: "Equipment bonuses",
    desc: "An equipped item's bonuses apply only while it stays in a slot. Unequip it and they are gone — unlike stat gains, these never stick.",
  },
];

export function UpgradingSection() {
  return (
    <SectionShell
      id="upgrading"
      index="R-14"
      label="Improving"
      title="Improving Your Operative"
      lede="Your operative grows over a run in three ways: permanent stat gains, more equipment slots, and the gear you equip."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {paths.map((p) => (
          <div key={p.name} className="border border-border bg-card/40 p-5">
            <span className="text-ui text-foreground">{p.name}</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>

      <Callout variant="note" title="What doesn't change" className="mt-6">
        <p>
          An operative&apos;s Unique Die and Ability are fixed for the run. Only
          stats and equipment slots improve while you play; everything else
          carries over between runs as Clearance unlocks.
        </p>
      </Callout>
    </SectionShell>
  );
}
