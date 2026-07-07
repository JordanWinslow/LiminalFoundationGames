import { SectionShell, SubLabel } from "../section-shell";
import { Screenshot } from "../media-clip";
import { FlowDiagram } from "../flow-diagram";
import { Callout } from "../callout";

const revealSources = [
  { name: "Research", desc: "Spend Intel in the SCP Database before the encounter." },
  { name: "Observe", desc: "Use the Observe action during an encounter to reveal one trait." },
  { name: "Matching item", desc: "Using an item that shares a trait reveals that trait." },
  { name: "Contained before", desc: "An SCP you contained on a past run starts fully documented — destroying one does not." },
];

export function EnemySection() {
  return (
    <SectionShell
      id="enemy"
      index="R-08"
      label="SCPs & Research"
      title="Anomalies and the SCP Database"
      lede="Anomalies appear on the map during the Anomaly phase and advance each cycle. An anomaly you leave unresolved becomes a live SCP and raises Entropy. Every SCP has four traits, which act as its weaknesses: your weapons and tools are fully effective only when their traits match."
    >
      <Screenshot
        src="/press-kit/screenshots/scp-database.png"
        alt="The SCP Database screen"
        caption="The SCP Database — designation, class, traits, and record"
        ratio="auto"
        className="mb-8"
      />

      <SubLabel>Researching a Threat</SubLabel>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Open the SCP Database to study a threat. Reveal spends one Intel to
        uncover two traits and its designation.
        Research spends another to uncover the remaining traits, its object class,
        and its full record. Combat stats become visible after the first reveal.
      </p>

      <FlowDiagram
        title="Researching a Threat"
        note="One Intel per step"
        steps={[
          { marker: "Unknown", label: "Redacted", desc: "Traits hidden" },
          { marker: "Reveal", label: "Two Traits", desc: "Designation shown" },
          { marker: "Research", label: "All Four", desc: "Class and record" },
          { marker: "Then", label: "Match Gear", desc: "Equip matching traits" },
        ]}
      />

      <div className="mt-8">
        <SubLabel>Four Ways to Reveal a Trait</SubLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {revealSources.map((s) => (
            <div key={s.name} className="border border-border bg-card/40 p-4">
              <span className="text-ui text-foreground">{s.name}</span>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="tip" title="Two ways to prepare" className="mt-6">
        <p>
          Research an SCP and equip weapons that match its traits, or carry a
          range of weapons with different traits so that you have an answer for
          whatever appears.
        </p>
      </Callout>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Callout variant="note" title="Track what is loose in the facility">
          <p>
            The Database is also your threat board. It lists every SCP currently
            active on the map — where each one is and what it is doing — so you can
            plan a route around the rooms they hold and get ahead of the ones
            closing on you.
          </p>
        </Callout>
        <Callout variant="warning" title="Traits are only half of it">
          <p>
            Matching an SCP&apos;s traits wins the fight, but many SCPs attack in
            narrative moments that turn on what they <em>are</em>. Knowing an
            entity&apos;s lore — how it kills, what it wants, what it fears — is
            often what lets you pick the right response and survive it.
          </p>
        </Callout>
      </div>
    </SectionShell>
  );
}
