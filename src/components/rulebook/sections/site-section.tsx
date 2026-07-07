import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";
import { Screenshot } from "../media-clip";
import { Callout } from "../callout";

const locations = [
  { name: "Medical Bay", img: "medical-bay", action: "Rest", service: "Restore Health and Stress; heal your allies." },
  { name: "Armory", img: "armory", action: "Shop", service: "Buy weapons and utility items." },
  { name: "Security Department", img: "security", action: "Shop", service: "Buy equipment and utility items." },
  { name: "Command Center", img: "command-center", action: "Gather Intel", service: "Spend a turn to collect Intel from briefings." },
  { name: "Research & Development", img: "research", action: "Research", service: "Study SCPs and earn research rewards." },
  { name: "Engineering & Maintenance", img: "engineering", action: "Upgrades", service: "Unlock a slot (20,000 cr) or augment an item." },
  { name: "Containment Chambers", img: "containment-chambers", action: "View Cells", service: "Build cells; keep or destroy contained SCPs." },
  { name: "D-Class Dormitories", img: "dclass-dorms", action: "Recruit", service: "Recruit allies who meet your stat requirements." },
  { name: "Exit", img: "exit", action: "Travel", service: "Deploy to external mission locations." },
];

export function SiteSection() {
  return (
    <SectionShell
      id="site"
      index="R-06"
      label="The Facility"
      title="Locations and Travel"
      lede="Site-19 is a network of connected locations. The nine primary ones each have a special action and their own encounters — where you shop, research, recruit, and upgrade — plus Integrity that SCPs can breach to shut all of it down. Secondary locations have neither and rarely pay out."
    >
      <Screenshot
        src="/press-kit/screenshots/map.png"
        alt="The Site-19 facility map with its locations"
        caption="The facility map — primary locations and their connections"
        ratio="auto"
        className="mb-8"
      />

      <SubLabel>The Nine Primary Locations</SubLabel>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((l) => (
          <div key={l.name} className="group border border-border bg-card/40">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface">
              <Image
                src={`/images/rulebook/locations/${l.img}.png`}
                alt={l.name}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
                className="object-cover"
              />
              <span className="text-caption absolute left-2 top-2 border border-accent/50 bg-background/85 px-1.5 py-0.5 text-accent">
                {l.action}
              </span>
            </div>
            <div className="p-3">
              <p className="text-ui-sm text-foreground">{l.name}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {l.service}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <SubLabel>Integrity</SubLabel>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Integrity belongs to the primary locations — three points each, and
              only they have it. Every SCP standing in a location drains one point
              from it each Anomaly phase. Keep it above zero and the location keeps
              working.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              At zero the location breaches: Entropy rises, its NPCs scatter, and
              its special action, encounters, shop, and Intel all shut off until
              you restore it. You raise Integrity back with item effects, and
              destroying an SCP in a location repairs one point on the spot.
            </p>
            <Callout variant="danger" title="The Chambers are the exception">
              <p>
                Let the Containment Chambers breach and every SCP you have
                contained is released back into the facility at once. Defend them
                above all.
              </p>
            </Callout>
          </div>
          <div className="flex items-center gap-5 justify-self-center border border-border bg-card/40 p-5">
            <figure className="text-center">
              <div className="relative mx-auto h-10 w-10">
                <Image src="/images/rulebook/icons/integrity-3.png" alt="" fill className="object-contain" sizes="40px" />
              </div>
              <figcaption className="text-caption mt-2 text-[#5cb85c]">Secure</figcaption>
            </figure>
            <span className="text-text-dim">→</span>
            <figure className="text-center">
              <div className="relative mx-auto h-10 w-10">
                <Image src="/images/rulebook/icons/integrity-0.png" alt="" fill className="object-contain" sizes="40px" />
              </div>
              <figcaption className="text-caption mt-2 text-accent">Breached</figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <SubLabel>Move</SubLabel>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Move costs one Action and grants movement points to spend between
            connected locations. Higher Agility means more points per Move, so one
            order can cross several rooms. Cancel before confirming and the Action
            is refunded.
          </p>
        </div>
        <div>
          <SubLabel>Travel</SubLabel>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Some missions take place outside Site-19. Travel from the Exit to
            deploy, and Return when you are done. External locations run mission
            content only — no standard random events.
          </p>
        </div>
      </div>

      <Callout variant="tip" title="Location determines your event" className="mt-6">
        <p>
          The narrative event you receive during the Encounter phase depends on
          your current location. If you need a particular reward, end your turn
          where it is most likely — the Medical Bay for Health, Research &amp;
          Development for Credits.
        </p>
      </Callout>
    </SectionShell>
  );
}
