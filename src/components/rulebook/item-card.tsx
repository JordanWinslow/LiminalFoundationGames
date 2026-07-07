"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ItemCardData = {
  id: string;
  name: string;
  type:
    | "weapon"
    | "equipment"
    | "consumable"
    | "utility"
    | "ally"
    | "technology"
    | "contingency";
  cost: string;
  art: string;
  /** Combat items carry traits; support items carry effects — never both. */
  traits?: string[];
  effects?: string[];
  destroy?: number;
  contain?: number;
  uses?: string;
  allyHealth?: number;
  requires?: string;
  /** Back-face flavor / description. */
  description: string;
};

const typeLabel: Record<ItemCardData["type"], string> = {
  weapon: "Weapon",
  equipment: "Equipment",
  consumable: "Consumable",
  utility: "Utility",
  ally: "Ally",
  technology: "Technology",
  contingency: "Contingency",
};

export function ItemCard({ card }: { card: ItemCardData }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${card.name} — click to flip`}
      className="group block w-full text-left [perspective:1400px]"
    >
      <div
        className={cn(
          "relative aspect-[3/4.1] w-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col border border-border bg-card [backface-visibility:hidden]">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <Image
                src={`/images/rulebook/icons/type-${card.type}.png`}
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 object-contain"
              />
              <span className="text-caption text-text-dim">
                {typeLabel[card.type]}
              </span>
            </div>
            <span className="text-ui-sm text-accent">{card.cost}</span>
          </div>

          <div className="relative flex-1 bg-surface">
            <Image
              src={card.art}
              alt={card.name}
              fill
              sizes="(max-width:640px) 45vw, 220px"
              className="object-contain p-3"
            />
            {(card.destroy || card.contain) && (
              <div className="absolute bottom-2 left-2 flex gap-1.5">
                {card.destroy ? (
                  <span className="text-caption border border-[#d9534f]/50 bg-background/80 px-1.5 py-0.5 text-[#d9534f]">
                    DESTROY {card.destroy}
                  </span>
                ) : null}
                {card.contain ? (
                  <span className="text-caption border border-accent/50 bg-background/80 px-1.5 py-0.5 text-accent">
                    CONTAIN {card.contain}
                  </span>
                ) : null}
              </div>
            )}
            {card.allyHealth ? (
              <span className="text-caption absolute bottom-2 right-2 border border-[#5cb85c]/50 bg-background/80 px-1.5 py-0.5 text-[#5cb85c]">
                HP {card.allyHealth}
              </span>
            ) : null}
          </div>

          <div className="border-t border-border px-3 py-2.5">
            <p className="text-ui-sm mb-1.5 leading-tight text-foreground">
              {card.name}
            </p>
            {card.traits ? (
              <div className="flex flex-wrap gap-1">
                {card.traits.map((t) => (
                  <span
                    key={t}
                    className="text-caption border border-border bg-surface px-1.5 py-0.5 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            {card.effects ? (
              <div className="space-y-0.5">
                {card.effects.map((e) => (
                  <p key={e} className="text-caption text-[#5cb85c]">
                    {e}
                  </p>
                ))}
              </div>
            ) : null}
            <div className="mt-1.5 flex items-center justify-between">
              {card.uses ? (
                <span className="text-caption text-text-dim">
                  Uses: {card.uses}
                </span>
              ) : (
                <span />
              )}
              {card.requires ? (
                <span className="text-caption text-[#e0b341]">
                  Req: {card.requires}
                </span>
              ) : null}
            </div>
          </div>

          <span className="text-caption absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-text-dim opacity-0 transition-opacity group-hover:opacity-70">
            flip
          </span>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col border border-accent/40 bg-card p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <span className="text-caption text-accent">
              {typeLabel[card.type]}
            </span>
            <span className="text-caption text-text-dim">{card.id}</span>
          </div>
          <p className="text-ui-sm mb-3 leading-tight text-foreground">
            {card.name}
          </p>
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
            {card.description}
          </p>
          <span className="text-caption mt-3 text-text-dim opacity-70">
            Click to flip back
          </span>
        </div>
      </div>
    </button>
  );
}
