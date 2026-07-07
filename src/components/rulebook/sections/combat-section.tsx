"use client";

import { SectionShell, SubLabel } from "../section-shell";
import { SpriteFigure } from "../sprite-figure";
import { Screenshot } from "../media-clip";
import { FlowDiagram } from "../flow-diagram";
import { Callout } from "../callout";
import { cn } from "@/lib/utils";

function CpBadge({ cost }: { cost: number }) {
  const free = cost === 0;
  return (
    <span
      className={cn(
        "text-ui-sm inline-flex min-w-[3.25rem] items-center justify-center border px-2 py-0.5",
        free ? "border-border text-text-dim" : "border-accent/40 bg-[var(--accent-muted)] text-accent"
      )}
    >
      {free ? "0 CP" : `${cost} CP`}
    </span>
  );
}

/* Labels/costs from GLOBAL_CONSTANTS PLAYER_ACTIONS + CommandPointManager.
 * Attacks resolve automatically — they do NOT use the dice UI. */
const combatActions: { name: string; cost: number; desc: string }[] = [
  { name: "Attack", cost: 2, desc: "Strike the SCP with your equipped weapon." },
  { name: "Observe", cost: 2, desc: "Reveal one of the SCP's hidden traits." },
  { name: "Re-equip", cost: 2, desc: "Change your equipped weapon or gear during the encounter." },
  { name: "Defend", cost: 2, desc: "Reduce the damage of the SCP's next attack." },
  { name: "Use Item", cost: 2, desc: "Use a consumable or utility item. Allowed twice per turn." },
  { name: "Talk", cost: 2, desc: "Attempt to reason with the SCP. Some SCPs respond, raising the Vulnerability meter." },
  { name: "Give Order", cost: 2, desc: "Command an equipped ally to attack the SCP or protect you this turn." },
  { name: "Ability", cost: 2, desc: "Use your operative's special ability." },
  { name: "Contain", cost: 4, desc: "Attempt to contain the SCP with a Knowledge dice roll. Available once its traits are revealed and the Vulnerability meter is full." },
  { name: "Run", cost: 4, desc: "Attempt to flee the encounter." },
  { name: "End Turn", cost: 0, desc: "End your turn and let the SCP act." },
];

/* Attacks are NOT dice — this shows relative damage output only. */
function DamageBar({ level }: { level: "max" | "min" }) {
  const filled = level === "max" ? 10 : 2;
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={cn("h-3 w-3.5", i < filled ? "bg-accent" : "bg-border-bright/50")} />
      ))}
    </div>
  );
}

export function CombatSection() {
  return (
    <SectionShell
      id="combat"
      index="R-09"
      label="Combat"
      title="SCP Encounters"
      lede="An SCP encounter begins when you end your turn in a location with an SCP present, or choose Engage SCP. Each of your turns gives you four Command Points (CP) to spend on actions; then the SCP takes one."
    >
      <Screenshot
        src="/press-kit/screenshots/combat-2.png"
        alt="An SCP encounter in progress"
        caption="An SCP encounter — Command Points, the Vulnerability meter, traits, and strikes"
        ratio="auto"
        className="mb-8"
      />

      <SubLabel>Your Actions (cost in CP)</SubLabel>
      <div className="border border-border">
        {combatActions.map((action, i) => (
          <div
            key={action.name}
            className={cn(
              "flex items-start gap-4 px-4 py-2.5 md:items-center",
              i !== 0 && "border-t border-border",
              i % 2 === 1 && "bg-card/30"
            )}
          >
            <div className="w-16 shrink-0"><CpBadge cost={action.cost} /></div>
            <div className="w-24 shrink-0"><span className="text-ui-sm text-foreground">{action.name}</span></div>
            <p className="flex-1 text-sm leading-snug text-muted-foreground">{action.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-caption mt-3 text-text-dim">
        Each action can be used once per turn, except Use Item, which is allowed twice.
      </p>

      {/* Two outcomes */}
      <div className="mt-12">
        <h3 className="text-display mb-2 text-2xl text-foreground md:text-3xl">Two Outcomes</h3>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-foreground/90">
          An SCP encounter has two winning outcomes: destroy the SCP, or contain
          it. (You can also flee — see below.)
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border border-border bg-card/40 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/rulebook/combat/destroy-icon.png" alt="" className="h-full w-full object-contain" />
              </div>
              <span className="text-ui text-foreground">Destroy</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Attack with a matching weapon until the SCP drops; each strike
              resolves on its own. Faster than containing, but pays less: Credits
              and one point of the location&apos;s Integrity restored.
            </p>
          </div>

          <div className="border border-accent/30 bg-card/40 p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/rulebook/combat/contain-icon.png" alt="" className="h-full w-full object-contain" />
              </div>
              <span className="text-ui text-accent">Contain</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Reveal the SCP&apos;s traits and fill its Vulnerability meter through
              Observe, Talk, and the right items, then attempt the containment roll
              (a dice test — see Skill Tests). Harder, and worth more: Clearance,
              plus a contained SCP you can keep for a passive bonus or cash in later.
            </p>
          </div>
        </div>

        <FlowDiagram
          title="Containing an SCP"
          note="Vulnerability meter must be full before Contain is available"
          steps={[
            { marker: "01", label: "Observe / Talk", desc: "Fill the meter" },
            { marker: "02", label: "Meter Full", desc: "Vulnerability at 100" },
            { marker: "03", label: "Contain", desc: "Knowledge dice roll" },
            { marker: "04", label: "Contained", desc: "Held in a cell" },
          ]}
        />
      </div>

      {/* Trait matching — damage magnitude, NOT dice */}
      <div className="mt-12">
        <h3 className="text-display mb-2 text-2xl text-foreground md:text-3xl">Matching Traits</h3>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-foreground/90">
          Your attack damage depends on your Strength, the weapon&apos;s destroy
          value, and — above all — whether the weapon&apos;s traits match the SCP.
          A matching weapon does maximum damage; a mismatch does very little. So
          reveal an SCP&apos;s traits and equip to match, or Observe and Re-equip
          once you see what you face.
        </p>
        <div className="relative border border-border bg-card/50 p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-accent/40" />
            <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-accent/40" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent/40" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-accent/30 bg-background/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-ui-sm text-accent">Trait Matches</span>
                <span className="text-caption text-text-dim">Maximum damage</span>
              </div>
              <DamageBar level="max" />
            </div>
            <div className="border border-border bg-background/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-ui-sm text-muted-foreground">No Match</span>
                <span className="text-caption text-text-dim">Very little</span>
              </div>
              <DamageBar level="min" />
            </div>
          </div>
        </div>
      </div>

      {/* The SCP's turn */}
      <div className="mt-12 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
        <SpriteFigure
          src="/images/rulebook/combat/scp-173.png"
          alt="SCP-173"
          caption="SCP-173"
          ratio="square"
          className="w-full max-w-[180px]"
        />
        <div>
          <h3 className="text-display mb-3 text-2xl text-foreground md:text-3xl">The SCP&apos;s Action</h3>
          <p className="mb-4 text-lg leading-relaxed text-foreground/90">
            The SCP takes one action per turn. Its chance to hit is its speed and
            perception against your <strong>Agility</strong>, so Agility both moves
            your operative and helps it evade. Damage that lands is reduced by your{" "}
            <strong>Defense</strong> against physical attacks, or your{" "}
            <strong>Willpower</strong> against attacks on the mind.
          </p>
          <Callout variant="danger" title="Both bars are lethal">
            <p>
              Some SCPs target Health and others target Stress. If either reaches
              zero, the run ends.
            </p>
          </Callout>
        </div>
      </div>

      {/* Passive + flee */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Callout variant="warning" title="Not everything attacks first">
          <p>
            Some SCPs are passive and will not move against you until you strike.
            Your first Attack turns a passive SCP hostile for the rest of the
            encounter, and it stops responding to Talk. Sometimes the safest play
            is to research, contain, or simply leave — not to swing.
          </p>
        </Callout>
        <Callout variant="note" title="Fleeing and avoiding">
          <p>
            Run costs four Command Points and is not guaranteed. Before an
            encounter even begins, you can attempt to Sneak past an SCP and skip
            the fight entirely. You are not required to fight everything; leave a
            threat and come back once you are equipped for it.
          </p>
        </Callout>
      </div>

      {/* Destroy vs contain — strategy */}
      <Callout variant="tip" title="Destroy or contain — which to choose" className="mt-6">
        <p>
          Destroying is usually the easier, faster answer, and it pays Credits.
          Containing is harder and needs an open cell, but it awards more Clearance
          and gives you a held SCP that strengthens your future encounters.
        </p>
      </Callout>

      {/* Containment Chambers */}
      <div className="mt-12">
        <h3 className="text-display mb-2 text-2xl text-foreground md:text-3xl">The Containment Chambers</h3>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-foreground/90">
          Contained SCPs are held in cells at the Containment Chambers, where you
          decide what to do with each one.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-border bg-card/40 p-5">
            <span className="text-ui text-foreground">Build a Cell</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You start with a limited number of cells. Build more for 10,000 then
              25,000 Credits, so you can hold several SCPs at once.
            </p>
          </div>
          <div className="border border-border bg-card/40 p-5">
            <span className="text-ui text-foreground">Keep for Effect</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A held SCP is passive gear. Any item you equip that shares one of its
              traits counts at full strength, so a well-chosen collection makes
              every fight easier.
            </p>
          </div>
          <div className="border border-accent/30 bg-card/40 p-5">
            <span className="text-ui text-accent">Destroy for Credits</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Terminate a contained SCP for an immediate Credit payout and a free
              cell. You trade its passive benefit for cash when you need it.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
