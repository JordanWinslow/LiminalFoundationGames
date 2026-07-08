import Image from "next/image";
import { SectionShell, SubLabel } from "../section-shell";
import { Screenshot } from "../media-clip";
import { Callout } from "../callout";
import { ItemCard, type ItemCardData } from "../item-card";
import { cn } from "@/lib/utils";

const itemTypes = [
  { key: "weapon", name: "Weapon", desc: "Equipped to damage SCPs in a fight. Carries traits that must match the target." },
  { key: "equipment", name: "Equipment", desc: "Equipped for passive stat effects that last while it stays in a slot." },
  { key: "consumable", name: "Consumable", desc: "Used once for an immediate effect — restore Health or Stress, gain Actions." },
  { key: "utility", name: "Utility", desc: "A limited-use combat item, such as a grenade, with traits of its own." },
  { key: "ally", name: "Ally", desc: "A recruited character who fights, protects, and can be talked to." },
  { key: "technology", name: "Technology", desc: "Rare, high-power gear with strong destroy and contain values." },
  { key: "contingency", name: "Contingency", desc: "Held back for the final confrontation — never used on an ordinary turn." },
];

const cards: ItemCardData[] = [
  {
    id: "weapon",
    name: "SCP-127: Living Gun",
    type: "weapon",
    cost: "1,000 cr",
    art: "/images/rulebook/items/item-living-gun.png",
    traits: ["alive", "biological", "predatory"],
    destroy: 4,
    uses: "∞",
    description:
      "A biological firearm that regrows its own ammunition from internal organs — and feeds on its handler's blood to do it. Its living traits tear through alive, biological, and predatory SCPs.",
  },
  {
    id: "equipment",
    name: "Reinforced Vest",
    type: "equipment",
    cost: "850 cr",
    art: "/images/rulebook/items/item-vest.png",
    effects: ["+1 Defense", "+1 Strength", "+1 Stress"],
    description:
      "An armored vest built to turn aside physical attacks. Equip it before a hostile SCP encounter for a flat boost to Defense, Strength, and Stress that lasts as long as you wear it.",
  },
  {
    id: "consumable",
    name: "SCP-500: Panacea",
    type: "consumable",
    cost: "1,800 cr",
    art: "/images/rulebook/items/item-panacea.png",
    uses: "1",
    description:
      "A single perfect red pill that cures every injury and Condition at once. Rare, expensive, and gone in one use — you will want it in your worst moment, not your first.",
  },
  {
    id: "utility",
    name: "SCP-184: The Architect",
    type: "utility",
    cost: "1,200 cr",
    art: "/images/rulebook/items/item-architect.png",
    traits: ["spatial", "transient", "reality_bending"],
    contain: 5,
    uses: "2",
    description:
      "A brass polyhedron that warps the space around a target, shrinking the room it can hide in. No destroy value at all — pure capture power, and one of the surest ways to take a spatial SCP alive.",
  },
  {
    id: "ally",
    name: "SCP-181: Lucky",
    type: "ally",
    cost: "1,200 cr",
    art: "/images/rulebook/items/item-lucky.png",
    effects: ["+1 Defense", "+1 Agility"],
    allyHealth: 4,
    requires: "Agility 2",
    description:
      "A D-Class with an unsettling calm, around whom events bend toward improbable outcomes. He does not fight so much as make everything go your way, steadying your Defense and Agility at his side.",
  },
  {
    id: "technology",
    name: "SCP-1499: Gas Mask",
    type: "technology",
    cost: "1,800 cr",
    art: "/images/rulebook/items/item-gas-mask.png",
    uses: "1",
    description:
      "A decayed Soviet gas mask. Put it on outside of combat and it pulls you into another dimension — a detour you take for loot or knowledge, if you are willing to see what waits there.",
  },
  {
    id: "contingency",
    name: "Emergency Quarantine Protocols",
    type: "contingency",
    cost: "800 cr",
    art: "/images/rulebook/items/item-84.png",
    contain: 15,
    uses: "1",
    description:
      "Barrier sequences salvaged from the Site-19 outbreak. A contingency item — saved automatically and brought out only for the final confrontation with the K-Class threat.",
  },
];

const slots = [
  { label: "Weapon", locked: false },
  { label: "Equip", locked: false },
  { label: "Any", locked: false },
  { label: "Any", locked: false },
  { label: "Locked", locked: true },
  { label: "Locked", locked: true },
  { label: "Locked", locked: true },
  { label: "Locked", locked: true },
];

export function GearSection() {
  return (
    <SectionShell
      id="gear"
      index="R-07"
      label="Gearing Up"
      title="Items and Gear"
      lede="Everything your operative carries is a card. The front shows what it does — its type, cost, traits or effects, and its destroy and contain values. The back shows what it is. Click a card to flip it, just like in the game."
    >
      <SubLabel>Click a Card to Flip It</SubLabel>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        One real example of each item type. A red{" "}
        <span className="text-[#d9534f]">DESTROY</span> value is its damage
        against a matching SCP; a{" "}
        <span className="text-accent">CONTAIN</span> value is how much it helps
        capture one alive.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <ItemCard key={c.id} card={c} />
        ))}
      </div>

      <div className="mt-12">
        <SubLabel>The Seven Item Types</SubLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {itemTypes.map((t) => (
            <div
              key={t.key}
              className="flex items-start gap-3 border border-border bg-card/40 p-4"
            >
              <div className="relative h-8 w-8 shrink-0">
                <Image
                  src={`/images/rulebook/icons/type-${t.key}.png`}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <div>
                <span className="text-ui text-foreground">{t.name}</span>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="tip" title="Traits or effects — never both" className="mt-8">
        <p>
          Weapons, utilities, and technology carry <strong>traits</strong> (like{" "}
          <em>alive</em> or <em>reality_bending</em>) that must match an
          SCP&apos;s own traits to hit at full strength. Equipment and consumables
          carry <strong>effects</strong> instead — stat changes and healing.
          Allies come both ways, but no single item carries both at once.
        </p>
      </Callout>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <SubLabel>Equipping — Eight Slots</SubLabel>
          <div className="grid grid-cols-4 gap-2">
            {slots.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center border p-1 text-center",
                  s.locked
                    ? "border-border/60 bg-surface"
                    : "border-accent/40 bg-[var(--accent-muted)]"
                )}
              >
                <span
                  className={cn(
                    "text-caption",
                    s.locked ? "text-text-dim" : "text-accent"
                  )}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            You start with four usable slots: one locked to a{" "}
            <strong>Weapon</strong>, one to <strong>Equipment</strong>, and two
            that take <strong>any</strong> item. The other four are unlocked one
            at a time at Engineering &amp; Maintenance for{" "}
            <strong>20,000 Credits</strong> each. Your inventory holds far more
            than you can equip, so you re-equip to suit the SCP in front of you.
          </p>
        </div>

        <div>
          <SubLabel>Using Items — In and Out of Combat</SubLabel>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            Most items are used in a fight: a weapon Attacks, a utility or
            consumable is spent with <strong>Use Item</strong>. A few instead do
            something on the map when you use them outside combat — SCP-1499&apos;s
            Gas Mask transports you elsewhere for loot, SCP-662&apos;s Silver Bell
            summons a butler. An item marked for the map cannot be used mid-fight,
            and vice versa.
          </p>
          <Screenshot
            src="/press-kit/screenshots/recruit-shop.png"
            alt="A shop offering items for purchase"
            caption="Buying gear at a shop"
          />
        </div>
      </div>
    </SectionShell>
  );
}
