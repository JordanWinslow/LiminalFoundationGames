import { SectionShell, SubLabel } from "../section-shell";

const earnings = [
  { act: "Contain an SCP", amount: "150–200", note: "By object class: Safe 150, Euclid 175, Keter 200" },
  { act: "Destroy an SCP", amount: "75–100", note: "By object class: Safe 75, Euclid 90, Keter 100" },
  { act: "First time seen", amount: "+50", note: "Bonus the first time you resolve a given SCP" },
  { act: "Complete a mission", amount: "150", note: "+50 for all objectives, +100 the first time" },
];

const unlocks = [
  { name: "Dr. Everett Mann", cost: "2,000 Clearance", note: "Durable field surgeon" },
  { name: "Dr. Sophia Light", cost: "3,500 Clearance", note: "High Charisma and Defense" },
  { name: "SCP-610 scenario", cost: "Complete the tutorial", note: "The Flesh That Hates" },
];

const tips = [
  { h: "Manage Entropy", t: "Entropy only climbs on its own. Defend your locations from breaches and spend Gather Intel at the Command Center to push it back down." },
  { h: "Spend Actions deliberately", t: "You have three Actions per turn. Prioritize the one or two that matter most." },
  { h: "Research before you fight", t: "Spend Intel in the SCP Database to learn an SCP's traits, then equip weapons that match." },
  { h: "Contain when you can afford to", t: "Destroying an SCP is quick, but containing one awards Clearance and lasting benefits." },
  { h: "Protect Health and Stress", t: "Either reaching zero ends the run. Restore both before high-Entropy crises." },
  { h: "Choose your encounters", t: "Use Sneak or avoidance against SCPs you are not equipped to fight." },
];

export function ProgressionSection() {
  return (
    <SectionShell
      id="progression"
      index="R-16"
      label="Between Runs"
      title="Clearance and Unlocks"
      lede="Every run awards Clearance, whether you win or lose. You earn it for SCPs contained or destroyed, missions completed, and the run's outcome, with a win awarding the most."
      last
    >
      <p className="mb-8 max-w-3xl text-lg leading-relaxed text-foreground/90">
        Clearance is permanent and carries across runs. Spend it to unlock
        additional operatives and scenarios. Any SCP you contain stays fully
        documented in the SCP Database on future runs, so a threat you have
        captured before is one you can prepare for the next time it appears.
      </p>

      <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <SubLabel>How Clearance Adds Up</SubLabel>
          <div className="border border-border">
            {earnings.map((e, i) => (
              <div
                key={e.act}
                className={`flex items-start gap-4 px-4 py-2.5 ${i !== 0 ? "border-t border-border" : ""} ${i % 2 === 1 ? "bg-card/30" : ""}`}
              >
                <span className="text-ui-sm w-16 shrink-0 text-accent">{e.amount}</span>
                <div>
                  <span className="text-ui-sm text-foreground">{e.act}</span>
                  <p className="text-caption mt-0.5 text-text-dim">{e.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SubLabel>What It Unlocks</SubLabel>
          <div className="space-y-3">
            {unlocks.map((u) => (
              <div key={u.name} className="border border-border bg-card/40 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-ui-sm text-foreground">{u.name}</span>
                  <span className="text-caption text-accent">{u.cost}</span>
                </div>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{u.note}</p>
              </div>
            ))}
          </div>
          <p className="text-caption mt-3 text-text-dim">
            More operatives and scenarios are planned as the game grows.
          </p>
        </div>
      </div>

      <SubLabel>Summary</SubLabel>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <div key={tip.h} className="border border-border bg-card/40 p-4">
            <span className="text-ui-sm text-accent">{tip.h}</span>
            <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
              {tip.t}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
