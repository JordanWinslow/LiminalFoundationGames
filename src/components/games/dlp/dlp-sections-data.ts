export interface SteamSubsection {
  title: string;
  body: string;
}

export interface SteamSection {
  id: string;
  title: string;
  body: string[];
  subsections?: SteamSubsection[];
  media?: {
    label: string;
    video?: {
      mp4: string;
      webm: string;
      poster: string;
    };
  };
}

export const steamSections: SteamSection[] = [
  {
    id: "about",
    title: "About This Game",
    body: [
      "There's a threat beyond the facility walls. Poorly understood, escalating, and harder to stop the longer it goes unchecked. Investigate it. Weaken it across three missions. Then face off with it in a final mission before it becomes unstoppable. The facility you're operating from is its own disaster: containment failing, threats in the corridors, and a situation that deteriorates every round whether you're paying attention or not.",
    ],
    media: {
      label: "Mission advancement gameplay",
      video: {
        mp4: "/videos/carousel/mission-advancement.mp4",
        webm: "/videos/carousel/mission-advancement.webm",
        poster: "/videos/carousel/mission-advancement-poster.webp",
      },
    },
  },
  {
    id: "phases",
    title: "The Four Phases",
    body: [],
    subsections: [
      {
        title: "Player Phase.",
        body: "3 actions. Move, research, shop, gain intel, recruit allies. Every location offers different actions and more viable strategies than any single run can explore. Where you end your turn determines your encounter.",
      },
      {
        title: "Encounter Phase.",
        body: "Dozens of unique encounters per location. Stat boosts, equipment, allies, narrative choices, and hidden opportunities even in the hallways between primary locations.",
      },
      {
        title: "Anomaly Phase.",
        body: "Anomalies count down each round. At zero, they become SCPs: threats that roam the facility, block your path, and damage locations until they breach.",
      },
      {
        title: "Entropy Phase.",
        body: "Quiet at first. Until it isn't. Escalating threats, lockdowns, and crisis objectives with consequences that compound on each other. At 100%, the scenario's final boss arrives at full power whether you're ready or not.",
      },
    ],
    media: {
      label: "Four-phase round cycle gameplay",
      video: {
        mp4: "/videos/carousel/phases.mp4",
        webm: "/videos/carousel/phases.webm",
        poster: "/videos/carousel/phases-poster.webp",
      },
    },
  },
  {
    id: "combat",
    title: "You Don't Know What You're Fighting",
    body: [
      "Every creature starts classified. Name, traits, weaknesses: all black bars. Equipment is locked before the fight. Match a creature's hidden vulnerabilities and your weapons hit like they were built for this. Miss, and your best gear barely registers. Observe it. Talk to it. Branching dialogue can crack the fight open or make it worse. Destroy it, or contain it and add it to a permanent database that carries between runs. Contained creatures reveal their full profiles forever, and knowing what you're fighting next time changes everything.",
    ],
    media: {
      label: "SCP redaction, trait reveal, database, combat",
      video: {
        mp4: "/videos/carousel/redaction.mp4",
        webm: "/videos/carousel/redaction.webm",
        poster: "/videos/carousel/redaction-poster.webp",
      },
    },
  },
  {
    id: "between-runs",
    title: "Between Runs",
    body: [
      "What carries over isn't power. It's knowledge. Every creature you contain is permanently documented. Black bars lift for good. New operatives unlock. New scenarios open. You start seeing strategies you missed before, routes through the facility that only work because you finally know what's waiting. The replay isn't repetition. It's the moment the game stops being survival and starts being mastery.",
      "No jumpscares. No grinding. No two runs that tell the same story.",
    ],
  },
];
