import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";
import { Callout } from "../callout";

const raises = [
  "A primary location breaches — its Integrity hits zero (+5%).",
  "Harmful events and the Entropy-phase crises that fire each cycle.",
  "A few Conditions, such as Ontological Fracture, which doubles what you gain.",
  "Shortcuts you take in a skill test that trade a slice of Entropy for extra dice.",
];

const lowers = [
  "Gather Intel at the Command Center, which has a chance to cut it.",
  "Items and mission rewards that specifically reduce it.",
  "Favorable event outcomes and Conditions like Dimensional Anchor.",
];

export function EntropySection() {
  return (
    <SectionShell
      id="entropy"
      index="R-02"
      label="Entropy"
      title="Entropy"
      lede="Entropy is the facility's instability, a single gauge that runs from 0 to 100%. It is the run's difficulty clock: the higher it climbs, the harder everything gets, and reaching 100% ends the run on your worst terms."
    >
      <div className="mb-8 border border-accent/30 bg-card/40 p-5">
        <div className="relative h-8 w-full max-w-md">
          <Image
            src="/images/rulebook/icons/entropy-gauge.png"
            alt="The Entropy gauge"
            fill
            className="object-contain object-left"
            sizes="448px"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <SubLabel>What Raises It</SubLabel>
          <ul className="space-y-2 text-sm text-foreground/85">
            {raises.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SubLabel>What Lowers It</SubLabel>
          <ul className="space-y-2 text-sm text-foreground/85">
            {lowers.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Entropy rarely falls on its own. Left alone it only climbs, so keeping
            it down is work you do across the whole run.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-border bg-card/40 p-5">
          <span className="text-ui text-foreground">More anomalies</span>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The higher Entropy sits, the more likely a new anomaly appears on the
            map each Anomaly phase — the facility spawns threats faster than you
            can clear them.
          </p>
        </div>
        <div className="border border-border bg-card/40 p-5">
          <span className="text-ui text-foreground">Harsher crises</span>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The Entropy phase that ends each cycle scales with the gauge, from
            minor setbacks early to facility-wide disasters as it fills.
          </p>
        </div>
      </div>

      <Callout variant="danger" title="At 100%, the run is effectively over" className="mt-8">
        <p>
          Fill the gauge and the K-Class threat is unleashed at full strength,
          before you have prepared for it — a fight you are almost certain to
          lose. Entropy is not a background number; it is the clock you are racing
          the entire run.
        </p>
      </Callout>
    </SectionShell>
  );
}
