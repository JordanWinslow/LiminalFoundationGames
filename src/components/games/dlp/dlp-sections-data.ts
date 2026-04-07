export interface SteamSubsection {
  title: string;
  body: string;
}

export interface SteamSection {
  id: string;
  title: string;
  body: string[];
  subsections?: SteamSubsection[];
  features?: string[];
  media?: {
    label: string;
    position?: "above" | "below";
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
      "Each scenario is a different way the world ends. You choose which one to face, then fight to prevent it across a series of missions while the facility around you falls apart on its own. Runs last about an hour. You won't survive your first. That's the point.",
      "The facility degrades every round. Anomalies escalate on their own. The entropy meter climbs whether you're paying attention or not. You'll spend the whole run deciding what to save and what to let go.",
      "Your first run is survival. Your fifth is strategy. Your tenth is the one where everything you've learned finally comes together.",
    ],
    media: {
      label: "Mission advancement gameplay",
      position: "above",
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
        body: "3 actions per round to investigate, recruit, resupply, or move. Every location has more opportunities than you have time to pursue. The real decision isn't what to do. It's what to ignore. Where you end your turn determines your encounter.",
      },
      {
        title: "Encounter Phase.",
        body: "An event triggers wherever you end your turn. Negotiations. Crises. Creatures that shouldn't exist. Each location telegraphs the type of encounter it holds — but not the specifics.",
      },
      {
        title: "Anomaly Phase.",
        body: "Anomalies count down on their own. At zero, they activate and start roaming the facility. They block paths. They damage locations. They don't stop.",
      },
      {
        title: "Entropy Phase.",
        body: "Quiet at first. Until it isn't. Lockdowns seal off entire wings. Failures cascade from one system to the next. At 100%, the scenario's final threat arrives. It doesn't care how prepared you are.",
      },
    ],
    media: {
      label: "Four-phase round cycle gameplay",
      position: "below",
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
      "Every creature starts behind black bars. You don't know its name. You don't know what it does. You don't know how to hurt it. Your loadout is locked before the fight begins. Match the creature's hidden vulnerabilities and your weapons will tear through it. Miss, and your best gear does almost nothing.",
      "Fighting isn't the only way forward. Observe to reveal hidden traits. Talk to the creature through branching dialogue that can expose weaknesses or make things worse. Contain it, destroy it, or run. Every path is viable. None of them are safe.",
      "Creatures you contain are documented permanently. Every trait revealed. Every vulnerability exposed for all future runs. The next time you face it, you'll be ready.",
    ],
    media: {
      label: "Redaction, trait reveal, and combat",
      position: "below",
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
      "New operatives and scenarios unlock. But the real difference is you. Routes that seemed impossible start making sense. Strategies you couldn't see before become obvious.",
      "Other roguelikes make you stronger. This one makes you dangerous.",
    ],
  },
  {
    id: "key-features",
    title: "Key Features",
    body: [],
    features: [
      "Strategic horror built around the hour-long run. Play it once to see what happens. Play it again because now you know what went wrong.",
      "100+ classified creatures. Hidden traits. Branching dialogue. Multiple resolutions.",
      "A combat system built on information, not stats. Know the creature or lose to it.",
      "Every round has four phases. Only one belongs to you. The other three belong to the facility.",
      "Permanent creature database. Contain it once, know it forever.",
      "Hundreds of narrative encounters, crises, and impossible choices. A different combination every run.",
    ],
  },
];
