import { SectionShell, SubLabel } from "../section-shell";
import { Screenshot } from "../media-clip";
import { Callout } from "../callout";

/* Die-face outcomes from obj_SkillTestController DiceFaceEffects. */
const faces = [
  { face: 1, label: "Locked failure — this die is stuck and cannot be re-rolled." },
  { face: 5, label: "Success." },
  { face: 6, label: "Success, and this die locks so a re-roll can't lose it." },
];

/* Mitigations from obj_SkillTestController (pre-roll + post-roll). */
const mitigations = [
  { name: "Clone", when: "Before rolling", cost: "+5% Entropy", effect: "Add two dice to the pool." },
  { name: "Clarity", when: "Before rolling", cost: "−1 Intel", effect: "Re-roll your first rolled 1." },
  { name: "Shift", when: "After rolling", cost: "One re-roll", effect: "Re-roll every die that isn't locked." },
  { name: "Anchor", when: "After rolling", cost: "−300 Credits", effect: "Lock one die so Shift can't touch it." },
  { name: "Annul", when: "After rolling", cost: "−300 Credits", effect: "Unlock one die so Shift can re-roll it." },
  { name: "Impose", when: "After rolling", cost: "−1 max Stress", effect: "Gain one extra re-roll." },
  { name: "Lament", when: "After rolling", cost: "Sacrifice an ally", effect: "Add one guaranteed success — the Blood Yield." },
];

export function SkillTestsSection() {
  return (
    <SectionShell
      id="skilltests"
      index="R-10"
      label="Skill Tests"
      title="Skill Tests and Dice"
      lede="Dice come out for the containment roll and for skill tests during narrative events. You roll a pool of them and pass by hitting enough successes; the size of the pool and the odds on each die are yours to influence."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <SubLabel>How a Test Works</SubLabel>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            The size of your dice pool is set by the stat the test checks, adjusted
            by your equipment, your Conditions, and the test&apos;s difficulty. Each
            die that lands on a 5 or 6 is a success. The panel shows how many
            successes you need and how many dice you have. Press Test Fate to roll,
            spend your mitigations, then Accept Fate to commit. Passing is a Good
            Fate; falling short is a Bad Fate.
          </p>

          <div className="mt-5 space-y-2">
            {faces.map((f) => (
              <div key={f.face} className="flex items-center gap-3 border-b border-border pb-2">
                <span className="relative block h-9 w-9 shrink-0 border border-border-bright bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/rulebook/dice/die-${f.face}.png`} alt={`Die showing ${f.face}`} className="absolute inset-0 h-full w-full object-contain p-0.5" />
                </span>
                <span className="text-sm text-muted-foreground">{f.label}</span>
              </div>
            ))}
            <p className="text-caption pt-1 text-text-dim">Faces 2–4 have no effect. Harder tests may only count 6s.</p>
          </div>
        </div>

        <Screenshot
          src="/press-kit/screenshots/dice-contain.png"
          alt="A containment roll in progress"
          caption="A containment roll"
          ratio="auto"
        />
      </div>

      <div className="mt-12">
        <SubLabel>Bending the Odds</SubLabel>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A roll is not final. Before and after the dice land you can spend
          resources to improve the result. Each option is used once per test, and
          each has a price.
        </p>
        <div className="border border-border">
          {mitigations.map((m, i) => (
            <div
              key={m.name}
              className={`flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-center ${i !== 0 ? "border-t border-border" : ""} ${i % 2 === 1 ? "bg-card/30" : ""}`}
            >
              <span className="text-ui-sm w-24 shrink-0 text-accent">{m.name}</span>
              <span className="text-caption w-28 shrink-0 text-text-dim">{m.when}</span>
              <span className="text-ui-sm w-40 shrink-0 text-foreground">{m.cost}</span>
              <span className="flex-1 text-sm leading-snug text-muted-foreground">{m.effect}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Callout variant="note" title="Dice abilities">
          <p>
            Your dice are not fixed. Each operative&apos;s Unique Die rewrites one
            face — Gears turns a 4 into recovered Stress. Conditions rewrite faces
            too, for better or worse. Some items and abilities grant extra dice or
            re-rolls. Two operatives rolling the same pool can get different odds.
          </p>
        </Callout>
        <Callout variant="warning" title="Containment roll vs. narrative test">
          <p>
            A narrative test uses whichever stat the event calls for, and failing
            plays out in the story. The containment roll always uses{" "}
            <strong>Knowledge</strong>, its difficulty is the SCP&apos;s containment
            rating, and failing lets the SCP strike back with a Purge — though your
            progress carries into the next attempt.
          </p>
        </Callout>
      </div>
    </SectionShell>
  );
}
