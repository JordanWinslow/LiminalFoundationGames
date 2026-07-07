import { SectionShell, SubLabel } from "../section-shell";
import { SpriteFigure } from "../sprite-figure";
import { Screenshot } from "../media-clip";
import { FlowDiagram } from "../flow-diagram";
import { Callout } from "../callout";

const tracks = [
  { name: "Containment", desc: "Lock the threat away." },
  { name: "Understanding", desc: "Study it and find a cure." },
  { name: "Annihilation", desc: "Destroy it." },
];

export function MissionsSection() {
  return (
    <SectionShell
      id="missions"
      index="R-13"
      label="Missions"
      title="Missions and the Final Mission"
      lede="Missions are your assignments from Deployment Orders. Complete a mission's objectives — travel somewhere, resolve an SCP, recover an item, hold a position — to finish it."
    >
      <Screenshot
        src="/press-kit/screenshots/mission-selection.png"
        alt="The mission selection screen"
        caption="Selecting a mission from your Deployment Orders"
        ratio="auto"
        className="mb-8"
      />

      <FlowDiagram
        title="Winning the Scenario"
        note="Three missions, then the final mission"
        steps={[
          { marker: "01", label: "Complete 3 Missions", desc: "Objectives met" },
          { marker: "02", label: "Final Mission Unlocks", desc: "Set by your choices" },
          { marker: "03", label: "Final Mission", desc: "The last assignment" },
          { marker: "04", label: "Stop the Threat", desc: "Scenario resolved" },
        ]}
      />

      <div className="mt-10">
        <SubLabel>Objectives</SubLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-border bg-card/40 p-4">
            <span className="text-ui-sm text-foreground">Required</span>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Must all be completed to finish the mission. Some appear only after you
              trigger them, and some carry a cycle limit — miss the deadline and the
              objective fails, with a cost to Health, Stress, or Entropy.
            </p>
          </div>
          <div className="border border-border bg-card/40 p-4">
            <span className="text-ui-sm text-foreground">Optional</span>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Bonus goals. You can finish the mission without them, but completing
              them pays extra.
            </p>
          </div>
          <div className="border border-border bg-card/40 p-4">
            <span className="text-ui-sm text-accent">Side Objectives</span>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Extra assignments offered by NPCs and events, layered on top of your
              current mission for their own rewards.
            </p>
          </div>
          <div className="border border-accent/30 bg-card/40 p-4">
            <span className="text-ui-sm text-accent">Entropy Objectives</span>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Crisis tasks that surface as Entropy climbs — usually to pull a
              location or the facility back from the edge.
            </p>
          </div>
        </div>
      </div>

      <Callout variant="note" title="No mission is strictly the best one" className="mt-6">
        <p>
          Each scenario has far more missions than a single run will ever show you.
          When three appear, they offer the same possible rewards — none is
          strictly better. What differs is their objectives, their lore, and the
          decisions they put in front of you, which is what shapes your ending.
        </p>
      </Callout>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <SubLabel>Your Decisions Shape the Ending</SubLabel>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Major decisions across the run are tracked across three philosophical
            approaches. Whichever you favor most determines which version of the
            final mission you face.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {tracks.map((t) => (
              <div key={t.name} className="border border-border bg-card/40 p-4">
                <span className="text-ui-sm text-accent">{t.name}</span>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Complete the final mission to stop the K-Class threat and win. Fail
            three missions along the way and it breaks loose at full strength
            instead.
          </p>
        </div>

        <SpriteFigure
          src="/images/rulebook/npcs/agent_dmitri_strelnikov.png"
          alt="A Foundation agent"
          caption="Command issues your orders"
          ratio="portrait"
          className="w-full max-w-[200px] justify-self-center"
        />
      </div>
    </SectionShell>
  );
}
