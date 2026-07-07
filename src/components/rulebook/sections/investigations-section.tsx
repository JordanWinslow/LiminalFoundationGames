import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";
import { MediaClip } from "../media-clip";
import { Callout } from "../callout";

const icons = [
  { key: "examine", name: "Examine", desc: "Inspect an object. This is how you find what an investigation requires." },
  { key: "passage", name: "Passage", desc: "Move to another part of the scene. Free to use again once opened." },
  { key: "obstruction", name: "Obstruction", desc: "A blockage. Clearing it reveals new points to interact with." },
  { key: "observe", name: "Observe", desc: "Read background detail. This carries no risk." },
];

const walkthrough = [
  "Read the Observe points first — they cost nothing and set up the scene.",
  "Examine points to find what the objective needs; each interaction adds to Risk.",
  "Clear an Obstruction to reveal hidden points, and use Passages to move around.",
  "When Risk climbs, spend one Intel to Stabilize and reset it.",
  "Once you have found what is required, leave — pushing for extras invites a complication.",
];

export function InvestigationsSection() {
  return (
    <SectionShell
      id="investigations"
      index="R-12"
      label="Investigations"
      title="Investigations"
      lede="Some missions and locations open an investigation. You move through the scene and interact with points marked by icons to find what you need. Each meaningful interaction raises the Risk meter."
    >
      <MediaClip
        src="/images/rulebook/clips/investigation.mp4"
        caption="Working through an investigation scene"
        className="mb-8"
      />

      <SubLabel>The Icons You Will See</SubLabel>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {icons.map((h) => (
          <div key={h.key} className="border border-border bg-card/40 p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="relative h-7 w-7 shrink-0">
                <Image src={`/images/rulebook/icons/hotspot-${h.key}.png`} alt="" fill className="object-contain" sizes="28px" />
              </div>
              <span className="text-ui-sm text-foreground">{h.name}</span>
            </div>
            <p className="text-sm leading-snug text-muted-foreground">{h.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <SubLabel>A Typical Investigation</SubLabel>
          <ol className="space-y-2">
            {walkthrough.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-foreground/85">
                <span className="text-caption mt-0.5 shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-5">
          <Callout variant="warning" title="Risk and complications">
            <p>
              As the Risk meter rises, so does the chance your next interaction
              triggers a complication. A complication ends your turn, and the
              facility&apos;s other phases resolve while you are away. Enough of
              them end the investigation in failure — spend one Intel to Stabilize
              and reset Risk before it gets there.
            </p>
          </Callout>
        </div>
      </div>
    </SectionShell>
  );
}
