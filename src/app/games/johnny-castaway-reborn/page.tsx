import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Expand } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { JohnnyCastawayMedia } from "@/components/games/johnny-castaway-media";
import { JOHNNY_PLAY_URL } from "@/components/games/johnny-castaway-links";

const imageRoot = "/images/games/johnny-castaway-reborn";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export const metadata: Metadata = {
  title: "Johnny Castaway: Reborn | Liminal Foundation Games",
  description: "Watch Johnny build a camp, meet unexpected visitors and get into trouble. An unofficial love letter to the classic screensaver by Jordan Winslow.",
  alternates: { canonical: "https://liminalfoundationgames.com/games/johnny-castaway-reborn/" },
  openGraph: {
    title: "Johnny Castaway: Reborn",
    description: "An island worth watching. A castaway with a mind of his own.",
    type: "website",
    url: "https://liminalfoundationgames.com/games/johnny-castaway-reborn/",
    images: [{ url: `https://liminalfoundationgames.com${imageRoot}/island-stories-poster.webp`, width: 960, height: 540, alt: "Johnny Castaway: Reborn gameplay" }],
  },
};

const screenshots = [
  {
    file: "island-life.webp",
    alt: "Johnny on his illustrated island with his growing camp around him",
    caption: "A little camp, built one day at a time.",
  },
  {
    file: "island-storm.webp",
    alt: "Rain and storm clouds sweeping across Johnny’s island",
    caption: "A sudden change in the weather.",
  },
  {
    file: "fire-and-dreams.webp",
    alt: "Johnny asleep beside his campfire at night",
    caption: "A warm fire and somewhere to dream.",
  },
  {
    file: "mermaid-dance.webp",
    alt: "Johnny dancing with Mary the mermaid beside their dinner table",
    caption: "An evening with Mary.",
  },
  {
    file: "huge-ship.webp",
    alt: "A huge ship passing close to Johnny’s island",
    caption: "Surely they can see him from there.",
  },
  {
    file: "shark-tow.webp",
    alt: "Johnny being pulled through the sea by a shark on his fishing line",
    caption: "He has caught rather more than dinner.",
  },
];

const features = [
  { title: "Watch a life unfold", text: "Foraging, fishing and building give way to storms, visitors and familiar misadventures from the original." },
  { title: "Make it your island", text: "Choose Johnny’s personality, change the pace, and settle in with captions, thought bubbles or just the view." },
  { title: "Come back whenever", text: "Your island saves on your device. Optional local AI adds new thoughts; Johnny has plenty to do without it." },
];

export default function JohnnyCastawayPage() {
  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 [--font-display:var(--font-bebas-neue)] min-[360px]:pt-32 sm:px-6 md:px-10 md:pb-28">
      <Link href="/#games" className={`text-ui mb-5 inline-flex min-h-10 items-center gap-2 text-muted-foreground hover:text-foreground ${focusRing}`}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All games
      </Link>

      <header className="mb-6">
        <SectionHeading index="ISLAND" label="An unofficial love letter to the 1992 classic" className="mb-4" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-4xl">
            <h1 className="text-display text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">Johnny Castaway: Reborn</h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">Watch Johnny build a camp, meet unexpected visitors and get into trouble.</p>
          </div>
          <a href={JOHNNY_PLAY_URL} className={`text-ui inline-flex min-h-12 shrink-0 items-center gap-3 border border-accent bg-accent px-6 py-3 text-accent-foreground hover:bg-accent-hover ${focusRing}`}>
            Visit the island <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <JohnnyCastawayMedia />

      <section id="screenshots" className="mt-14 scroll-mt-32 sm:mt-20" aria-labelledby="screenshots-title">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <SectionHeading index="VIEWS" label="From the island" className="mb-3" />
            <h2 id="screenshots-title" className="text-display text-4xl text-foreground sm:text-5xl">Never quite the same day</h2>
          </div>
          <p className="text-ui-sm text-muted-foreground">Select an image for the full view</p>
        </div>
        <div className="grid gap-x-6 gap-y-9 md:grid-cols-2">
          {screenshots.map((shot, index) => (
            <figure key={shot.file}>
              <a href={`${imageRoot}/${shot.file}`} target="_blank" rel="noopener noreferrer" className={`group relative block scroll-mt-40 overflow-hidden border border-border bg-card hover:border-accent ${focusRing}`} aria-label={`Open full screenshot in a new tab: ${shot.caption}`}>
                <Image src={`${imageRoot}/${shot.file}`} alt={shot.alt} width={960} height={540} sizes="(max-width: 767px) 100vw, (max-width: 1400px) 50vw, 648px" className="aspect-video h-auto w-full object-contain" />
                <span className="absolute bottom-3 right-3 border border-white/30 bg-black/70 p-2 text-white" aria-hidden="true"><Expand className="h-4 w-4" /></span>
              </a>
              <figcaption className="mt-3 flex items-baseline gap-3 leading-relaxed text-muted-foreground">
                <span className="text-ui-sm text-accent" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base">{shot.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16 border-y border-border py-10 sm:mt-20 sm:py-12" aria-label="About the game">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {features.map((feature) => (
            <div key={feature.title}>
              <h2 className="text-display text-2xl text-foreground">{feature.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A passion project by Jordan Winslow, with new artwork and an evolving island simulation. Inspired by <a href="https://en.wikipedia.org/wiki/Johnny_Castaway" className={`text-foreground underline underline-offset-4 hover:text-accent ${focusRing}`}>the original Johnny Castaway</a>. Unofficial; not affiliated with Sierra or Dynamix.
        </p>
        <div className="shrink-0">
          <a href={JOHNNY_PLAY_URL} className={`text-ui inline-flex min-h-12 items-center gap-3 border border-accent bg-accent px-6 py-3 text-accent-foreground hover:bg-accent-hover ${focusRing}`}>
            Visit the island <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="text-ui-sm mt-3 text-muted-foreground">In your browser · No account needed</p>
        </div>
      </footer>
    </article>
  );
}
