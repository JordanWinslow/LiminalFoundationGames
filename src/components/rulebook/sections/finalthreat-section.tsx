import { SectionShell, SubLabel } from "../section-shell";
import { MediaClip } from "../media-clip";
import { FlowDiagram } from "../flow-diagram";
import { Callout } from "../callout";

const contingency = [
  { name: "Field Report", desc: "Played during Finding Moments to raise Threat Analysis. The correct report adds the most; a wrong one costs you Health or Stress." },
  { name: "Countermeasure", desc: "A combat item used on your own turn for a direct effect." },
  { name: "Research Data", desc: "Spent during the Neutralize roll: Exploit lowers the successes you need, Adapt turns a low roll into a success." },
];

export function FinalThreatSection() {
  return (
    <SectionShell
      id="finalthreat"
      index="R-15"
      label="Final Threat"
      title="The K-Class Threat"
      lede="The run ends in a confrontation with the K-Class threat. It plays as a special encounter: you can only Attack, Defend, and Use Item — there is no Observe, Talk, or Run. Instead of the Vulnerability meter you fill a Threat Analysis meter, and winning means neutralizing the threat before it ends you."
    >
      <MediaClip
        src="/images/rulebook/clips/kclass-reveal.mp4"
        caption="A K-Class Scenario is declared"
        className="mb-8"
      />

      <SubLabel>Contingency Items</SubLabel>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Contingency items are collected across the run and saved for this fight.
        There are three kinds, each used at a different moment.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {contingency.map((c) => (
          <div key={c.name} className="border border-border bg-card/40 p-5">
            <span className="text-ui text-foreground">{c.name}</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <FlowDiagram
        title="Neutralizing the Threat"
        note="Threat Analysis must reach 100% first"
        steps={[
          { marker: "01", label: "Finding Moments", desc: "Play Field Reports" },
          { marker: "02", label: "Threat Analysis 100%", desc: "Meter full" },
          { marker: "03", label: "Neutralize", desc: "The Neutralize roll" },
          { marker: "04", label: "Averted", desc: "You win the run" },
        ]}
      />

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        During the threat&apos;s Finding Moments, play the correct Field Report to
        raise Threat Analysis. Once it reaches 100%, the Neutralize action opens a
        final dice roll — pass it and the scenario is averted. Fail the run, and it
        is over.
      </p>

      <Callout variant="warning" title="Two ways to arrive" className="mt-6">
        <p>
          Complete the final mission and you face the threat weakened: Threat
          Analysis starts partly filled and the Neutralize roll needs fewer
          successes. Arrive by failing three missions or letting Entropy reach
          100%, and you face it at full power, from nothing.
        </p>
      </Callout>
    </SectionShell>
  );
}
