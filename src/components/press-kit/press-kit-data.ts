export interface PressAsset {
  src: string;
  filename: string;
  label: string;
  type: "image" | "video" | "gif";
}

export interface PressCategory {
  id: string;
  title: string;
  description: string;
  youtubeUrl?: string;
  assets: PressAsset[];
}

export const pressCategories: PressCategory[] = [
  {
    id: "branding",
    title: "Branding & Logos",
    description:
      "Official game icon, library logo, and hero banner for store listings and editorial use.",
    assets: [
      {
        src: "/press-kit/branding/game-icon.png",
        filename: "game-icon.png",
        label: "Game Icon",
        type: "image",
      },
      {
        src: "/press-kit/branding/library-logo.png",
        filename: "library-logo.png",
        label: "Library Logo",
        type: "image",
      },
      {
        src: "/press-kit/branding/library-hero.png",
        filename: "library-hero.png",
        label: "Library Hero Banner",
        type: "image",
      },
    ],
  },
  {
    id: "capsules",
    title: "Capsule Art",
    description:
      "Store capsule images in vertical, horizontal, and compact formats.",
    assets: [
      {
        src: "/press-kit/capsules/vertical-capsule.png",
        filename: "vertical-capsule.png",
        label: "Vertical Capsule",
        type: "image",
      },
      {
        src: "/press-kit/capsules/main-capsule.png",
        filename: "main-capsule.png",
        label: "Main Capsule (Horizontal)",
        type: "image",
      },
      {
        src: "/press-kit/capsules/small-capsule.png",
        filename: "small-capsule.png",
        label: "Small Capsule",
        type: "image",
      },
    ],
  },
  {
    id: "screenshots",
    title: "Screenshots",
    description:
      "In-game screenshots showcasing combat, investigation, containment, and base management.",
    assets: [
      {
        src: "/press-kit/screenshots/combat-1.png",
        filename: "combat-1.png",
        label: "Combat Encounter 1",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/combat-2.png",
        filename: "combat-2.png",
        label: "Combat Encounter 2",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/combat-3.png",
        filename: "combat-3.png",
        label: "Combat Encounter 3",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/combat-4.png",
        filename: "combat-4.png",
        label: "Combat Encounter 4",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/dice-contain.png",
        filename: "dice-contain.png",
        label: "Containment Roll",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/fail-objective.png",
        filename: "fail-objective.png",
        label: "Failed Objective",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/gaining-items.png",
        filename: "gaining-items.png",
        label: "Item Acquisition",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/hard-decisions.png",
        filename: "hard-decisions.png",
        label: "Difficult Choices",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/investigate-1.png",
        filename: "investigate-1.png",
        label: "Investigation Phase",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/map.png",
        filename: "map.png",
        label: "Facility Map",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/mission-selection.png",
        filename: "mission-selection.png",
        label: "Mission Selection",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/recruit-shop.png",
        filename: "recruit-shop.png",
        label: "Recruit Shop",
        type: "image",
      },
      {
        src: "/press-kit/screenshots/scp-database.png",
        filename: "scp-database.png",
        label: "SCP Database",
        type: "image",
      },
    ],
  },
  {
    id: "promotional",
    title: "Promotional Art",
    description:
      "Streaming overlays, social banners, and tall-format promotional artwork.",
    assets: [
      {
        src: "/press-kit/promotional/streaming-left.png",
        filename: "streaming-overlay-left.png",
        label: "Streaming Overlay (Left)",
        type: "image",
      },
      {
        src: "/press-kit/promotional/streaming-right.png",
        filename: "streaming-overlay-right.png",
        label: "Streaming Overlay (Right)",
        type: "image",
      },
      {
        src: "/press-kit/promotional/promotional-tall.png",
        filename: "promotional-art-tall.png",
        label: "Tall Promotional Art",
        type: "image",
      },
    ],
  },
  {
    id: "gameplay-clips",
    title: "Gameplay Clips",
    description:
      "Short gameplay clips available as high-quality video (.mp4) and social-ready animated GIF formats.",
    assets: [
      {
        src: "/press-kit/videos/redaction.mp4",
        filename: "redaction-gameplay.mp4",
        label: "Redaction (Video)",
        type: "video",
      },
      {
        src: "/press-kit/videos/redaction-social.gif",
        filename: "redaction-social.gif",
        label: "Redaction (Social GIF)",
        type: "gif",
      },
      {
        src: "/press-kit/videos/combat.mp4",
        filename: "combat-gameplay.mp4",
        label: "Combat (Video)",
        type: "video",
      },
      {
        src: "/press-kit/videos/combat-social.gif",
        filename: "combat-social.gif",
        label: "Combat (Social GIF)",
        type: "gif",
      },
      {
        src: "/press-kit/videos/game-end.mp4",
        filename: "game-end-gameplay.mp4",
        label: "Game End (Video)",
        type: "video",
      },
      {
        src: "/press-kit/videos/game-end-social.gif",
        filename: "game-end-social.gif",
        label: "Game End (Social GIF)",
        type: "gif",
      },
      {
        src: "/press-kit/videos/mission-advancement.mp4",
        filename: "mission-advancement-gameplay.mp4",
        label: "Mission Advancement (Video)",
        type: "video",
      },
      {
        src: "/press-kit/videos/mission-advancement-social.gif",
        filename: "mission-advancement-social.gif",
        label: "Mission Advancement (Social GIF)",
        type: "gif",
      },
      {
        src: "/press-kit/videos/phases.mp4",
        filename: "phases-gameplay.mp4",
        label: "Game Phases (Video)",
        type: "video",
      },
      {
        src: "/press-kit/videos/phases-social.gif",
        filename: "phases-social.gif",
        label: "Game Phases (Social GIF)",
        type: "gif",
      },
    ],
  },
  {
    id: "trailer",
    title: "Trailer",
    description:
      "Official announcement trailer. Download the file directly or embed from YouTube.",
    youtubeUrl: "https://youtu.be/iaC9YpJQjuM",
    assets: [
      {
        src: "/press-kit/trailer/announcement-trailer-compressed.mp4",
        filename: "announcement-trailer.mp4",
        label: "Announcement Trailer (Download)",
        type: "video",
      },
    ],
  },
];
