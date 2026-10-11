import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const siteUrl = "https://johnnycastaway.fyi";
const imageRoot = "/images/games/johnny-castaway-reborn";

export const metadata: Metadata = {
  title: "Johnny Castaway: Reborn | Liminal Foundation Games",
  description:
    "Jordan Winslow's unofficial love letter to his favorite childhood screensaver: an illustrated island simulation with familiar misadventures, evolving camps and optional on-device AI.",
  alternates: {
    canonical: "https://liminalfoundationgames.com/games/johnny-castaway-reborn/",
  },
  openGraph: {
    title: "Johnny Castaway: Reborn",
    description: "One castaway. A little island. A life that keeps unfolding.",
    type: "website",
    url: "https://liminalfoundationgames.com/games/johnny-castaway-reborn/",
    images: [{ url: `https://liminalfoundationgames.com${imageRoot}/title.webp`, width: 1344, height: 752, alt: "Johnny Castaway: Reborn title artwork" }],
  },
};

const features = [
  {
    title: "An island that grows with him",
    text: "Johnny forages, fishes, gathers materials and builds a camp. Trees grow back, supplies wash ashore, shelters improve and storms can undo his work. Needs, weather, tides and the time of day shape what happens next.",
  },
  {
    title: "A different Johnny every time",
    text: "Each new castaway has nine personality traits and a few quirks. Adjust those traits, choose an island seed and set the pace. His personality influences everyday decisions even with AI switched off.",
  },
  {
    title: "More stories on the horizon",
    text: "Branching encounters bring strangers, pirates, sea creatures, UFOs and rescue attempts into island life. A raft can lead to rescue at sea or another island with the same Johnny. Story and survival settings let you shape the tone.",
  },
  {
    title: "A life you can return to",
    text: "The island saves locally, catches up after time away and keeps a journal you can filter and export. Export and restore island backups, pause the action or watch fullscreen. The web app works offline after its assets finish caching.",
  },
  {
    title: "Optional thoughts, on your device",
    text: "An optional local language model adds inner thoughts and chooses among supported story branches. It runs on your device after a separate model download from Hugging Face. The island also works with authored dialogue and rules, without AI.",
  },
  {
    title: "A new illustrated world",
    text: "Risograph-inspired artwork, expressive poses, thought bubbles, changing skies and firelight give the island its own identity. Use the display, motion and story controls to make it comfortable to leave running.",
  },
];

const screenshots = [
  {
    file: "island.webp",
    width: 1264,
    height: 735,
    alt: "Johnny beside driftwood on a cloudy illustrated island, with a thought bubble and watch controls",
    caption: "Everyday island life: gathering, weather and a mind of his own.",
  },
  {
    file: "moonlit-dance.webp",
    width: 960,
    height: 540,
    alt: "Johnny dancing with Mary the mermaid beneath the moon beside a dinner table and raft",
    caption: "A moonlit dance with Mary, one of the classic-inspired story moments.",
  },
  {
    file: "office-daydream.webp",
    width: 960,
    height: 540,
    alt: "Johnny asleep at an office desk, dreaming of Mary and the island",
    caption: "Back at work, still dreaming of the island.",
  },
];

export default function JohnnyCastawayPage() {
  return (
    <article className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-10 md:pb-32">
      <Link href="/#games" className="text-ui mb-10 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All games
      </Link>

      <SectionHeading index="ISLAND" label="An unofficial passion project" className="mb-6" />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-display text-5xl leading-none text-foreground sm:text-7xl">Johnny Castaway: Reborn</h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-foreground/90">One castaway. A little island. A life that keeps unfolding.</p>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            A love letter to my favorite screensaver growing up. I&apos;m Jordan Winslow,
            the developer behind Liminal Foundation Games, and I wanted to bring back
            the joy of watching Johnny go about his day — then give him a world that
            can keep changing around him.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={siteUrl} className="text-ui inline-flex items-center gap-3 border border-accent bg-accent px-6 py-3 text-accent-foreground hover:bg-accent-hover">
              Visit the island <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#screenshots" className="text-ui inline-flex items-center border border-border px-6 py-3 text-foreground hover:border-accent">View screenshots</a>
          </div>
          <p className="text-ui-sm mt-5 text-muted-foreground">Browser experience · No account required · Optional local AI</p>
        </div>
        <Image src={`${imageRoot}/title.webp`} alt="Johnny Castaway: Reborn title artwork, with a small island and a gull at sunset" width={1344} height={752} priority className="h-auto w-full border border-border" />
      </div>

      <section className="mt-20 grid gap-8 border-y border-border py-12 md:grid-cols-2" aria-labelledby="familiar-shore">
        <div>
          <p className="text-label mb-4 text-accent">Inspired by the original</p>
          <h2 id="familiar-shore" className="text-display text-4xl text-foreground">A familiar shore, redrawn</h2>
        </div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>The original Johnny Castaway made a tiny island feel like a continuing story. Reborn keeps that patient, watch-and-discover spirit: fishing mishaps, meddling gulls, passing boats and the promise of a rescue that might just slip away.</p>
          <p>Reimagined scenes follow Mary the mermaid, an SOS in a bottle, Suzy&apos;s letters and reunion, a dinner and dance beneath the stars, and Johnny&apos;s office daydream and parachute return. These moments sit alongside the new simulation and its branching encounters.</p>
          <p>This is an unofficial fan project with its own artwork and implementation. It is not an official Sierra or Dynamix release or a download of the original screensaver.</p>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="new-island">
        <p className="text-label mb-4 text-accent">What Reborn adds</p>
        <h2 id="new-island" className="text-display text-4xl text-foreground md:text-5xl">More than a repeating scene</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border bg-card p-6">
              <h3 className="text-display text-2xl text-foreground">{feature.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="screenshots" className="mt-20 scroll-mt-36" aria-labelledby="screenshots-title">
        <SectionHeading index="VIEWS" label="From the island" className="mb-4" />
        <h2 id="screenshots-title" className="text-display mb-8 text-4xl text-foreground md:text-5xl">Screenshots</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {screenshots.map((screenshot, index) => (
            <figure key={screenshot.file} className={index === 0 ? "md:col-span-2" : ""}>
              <a href={`${imageRoot}/${screenshot.file}`} target="_blank" rel="noopener noreferrer" className="block border border-border hover:border-accent" aria-label={`Open full screenshot: ${screenshot.caption}`}>
                <Image src={`${imageRoot}/${screenshot.file}`} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} className="h-auto w-full" />
              </a>
              <figcaption className="text-ui-sm mt-3 text-muted-foreground">{screenshot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-20 border border-border bg-card p-8 md:p-12" aria-labelledby="visit-island">
        <h2 id="visit-island" className="text-display text-4xl text-foreground">Pull up a patch of sand</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Open the island in your browser, let Johnny find his rhythm, and see what washes ashore. The About page collects the original screensaver&apos;s history, fan resources and information about Reborn.</p>
        <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
          <a href={siteUrl} className="text-ui inline-flex items-center gap-2 text-accent underline underline-offset-4">JohnnyCastaway.fyi <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          <a href={`${siteUrl}/about.html`} className="text-ui text-foreground underline underline-offset-4">About &amp; historical resources</a>
          <a href="https://liminalfoundationgames.itch.io/" className="text-ui text-foreground underline underline-offset-4">Liminal Foundation Games on itch.io</a>
        </div>
      </section>
    </article>
  );
}
