import { SectionShell, SubLabel } from "../section-shell";
import { SpriteFigure } from "../sprite-figure";

const winPoints = [
  "Complete three missions to unlock the final mission.",
  "Your decisions across the run determine which version of the final mission you face.",
  "Complete the final mission and stop the K-Class threat.",
];

const losePoints = [
  "Health reaches zero — your operative is killed.",
  "Stress reaches zero — your operative breaks.",
  "Entropy reaches 100% — the K-Class threat breaks loose at full strength.",
  "Three missions failed — you lose command, and the threat breaks loose at full strength.",
];

export function OverviewSection() {
  return (
    <SectionShell
      id="overview"
      index="R-01"
      label="Objective"
      title="The Objective"
      lede="Each run is a single deployment to Site-19, and the facility is already coming apart. You investigate anomalies, contain the threats that break loose, and sharpen your operative — all while chasing the truth behind this run's K-Class Scenario: a civilization-ending event you were sent to stop. Solve it and you win. Let the site fall first, and it takes you with it."
    >
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="border border-border bg-card/40 p-5">
            <SubLabel>Winning</SubLabel>
            <ul className="space-y-2">
              {winPoints.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-accent/30 bg-card/40 p-5">
            <SubLabel>Losing</SubLabel>
            <ul className="space-y-2">
              {losePoints.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SpriteFigure
          src="/images/rulebook/scps/682.png"
          alt="A contained SCP specimen"
          caption="SCP specimen"
          ratio="square"
          className="w-full max-w-[220px] justify-self-center md:justify-self-end"
        />
      </div>
    </SectionShell>
  );
}
