import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";
import { GameLoopDiagram } from "@/components/games/dlp/game-loop-diagram";
import { Callout } from "../callout";

const anomalySteps = [
  { n: "1", t: "Countdowns advance", d: "Every active anomaly ticks down toward becoming a live SCP." },
  { n: "2", t: "Anomalies become SCPs", d: "Any that reach zero manifest as live SCPs on the map." },
  { n: "3", t: "New anomalies appear", d: "Fresh anomalies roll onto the map, with a higher chance the more Entropy has built up." },
  { n: "4", t: "Everything moves", d: "Anomalies drift toward their targets and SCPs move by their nature — hunting NPCs, seeking intact rooms, or wandering." },
  { n: "5", t: "Integrity drains", d: "Each SCP standing in a primary location strips a point of that location's Integrity." },
  { n: "6", t: "The facility reacts", d: "Lockdowns tick down, NPCs may be killed or arrive and leave, then the Entropy phase begins." },
];

const phases = [
  { numeral: "I", name: "Player", desc: "Your active phase. You spend three Actions to move between locations, use shops and services, research SCPs, and investigate." },
  { numeral: "II", name: "Encounter", desc: "A narrative event occurs at your current location. Most events present choices, and many call for a skill test." },
  { numeral: "III", name: "Anomaly", desc: "New anomalies appear and existing ones advance. An anomaly left unresolved becomes a live SCP." },
  { numeral: "IV", name: "Entropy", desc: "A facility-wide crisis occurs. Its severity scales with the current Entropy level." },
];

export function RoundSection() {
  return (
    <SectionShell
      id="round"
      index="R-05"
      label="The Cycle"
      title="Cycles and Phases"
      lede="A run advances in cycles, shown as a Round counter. Each cycle runs four phases in a fixed order. You act during the Player phase; the other three resolve on their own."
    >
      <GameLoopDiagram />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {phases.map((p) => (
          <div
            key={p.name}
            className="flex items-start gap-3 border border-border bg-card/40 p-4"
          >
            <span className="text-display flex h-9 w-9 shrink-0 items-center justify-center border border-accent/40 bg-[var(--accent-muted)] text-lg text-accent">
              {p.numeral}
            </span>
            <div>
              <span className="text-ui text-foreground">{p.name}</span>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <SubLabel>Inside the Anomaly Phase</SubLabel>
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The Anomaly phase is where the facility turns against you, in a fixed
          order each cycle. Watching it play out tells you where threats are
          headed and which rooms are about to fall.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {anomalySteps.map((s) => (
            <div key={s.n} className="border border-border bg-card/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-caption flex h-6 w-6 shrink-0 items-center justify-center border border-accent/40 text-accent">
                  {s.n}
                </span>
                <span className="text-ui-sm text-foreground">{s.t}</span>
              </div>
              <p className="text-sm leading-snug text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="warning" title="Ending your turn with an SCP present" className="mt-8">
        <p>
          End your turn in a location that holds an SCP and the encounter begins
          then and there, instead of the phase advancing.
        </p>
      </Callout>

      <div className="mt-5 flex items-start gap-4 border border-border bg-card/40 p-5">
        <div className="relative h-12 w-12 shrink-0">
          <Image
            src="/images/rulebook/icons/lockdown.png"
            alt="Lockdown indicator"
            fill
            className="object-contain"
            sizes="48px"
          />
        </div>
        <div>
          <span className="text-ui text-foreground">Lockdown</span>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Missions and events can seal a location for a set number of cycles.
            Nothing enters or leaves while it holds — SCPs and anomalies are shut
            out, and so are you. It lifts on its own when the timer runs out.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
