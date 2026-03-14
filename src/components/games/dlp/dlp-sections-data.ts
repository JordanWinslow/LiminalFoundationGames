export interface DLPSection {
  index: string;
  label: string;
  category: string;
  categoryVariant: "classified" | "active" | "pending" | "default";
  title: string;
  summary: string;
  detail: string[];
  images: { src: string; alt: string; caption: string }[];
}

export const dlpSections: DLPSection[] = [
  {
    index: "001",
    label: "Briefing",
    category: "Classified Briefing",
    categoryVariant: "classified",
    title: "What Is Dead Letter Protocol?",
    summary:
      "A turn-based crisis management game where your job isn't to win -- it's to decide what you're willing to lose. Beyond any government's reach, a secret organization contains the most dangerous supernatural threats on Earth. You just accepted a position you can't quit. Welcome to Site-19.",
    detail: [
      "Investigate anomalies, contain threats, and make morally questionable decisions as entropy tears your facility apart. Choose your apocalypse: every scenario pits you against a different existential threat, and every playthrough is a unique procedurally generated narrative of survival or catastrophic failure.",
      "No jumpscares. No grinding. Just the mounting pressure of a facility falling apart faster than you can hold it together. Every decision costs something. Every round, the list of things you can't afford to lose gets shorter.",
      "100+ nightmarish entities drawn from the SCP Wiki, each with hidden traits, unique dialogue, and multiple paths to resolution -- observe, fight, contain, or talk. Built for players who have never heard of the SCP Foundation and for longtime fans who have read every entry.",
    ],
    images: [],
  },
  {
    index: "002",
    label: "Operation Cycle",
    category: "Operations",
    categoryVariant: "active",
    title: "The Four-Phase Round",
    summary:
      "Each round follows a four-phase cycle. You act. A narrative event unfolds. Anomalies escalate. The facility decays. Then the cycle begins again -- except now everything is worse than before.",
    detail: [
      "During the Player Phase, you navigate the facility map, choosing what to prioritize: investigate a location, shop for equipment, talk to Foundation staff, or pursue mission objectives. You never have enough time to do everything, and the three phases that follow don't wait for you.",
      "The Encounter Phase triggers a procedural narrative event at your location. The Anomaly Phase advances every active SCP threat -- countdowns tick, entities activate, containment deteriorates. The Entropy Phase degrades the facility itself: lockdowns engage, systems fail, and the entropy meter pushes closer to critical. Every phase that isn't yours is the situation getting worse.",
    ],
    images: [],
  },
  {
    index: "003",
    label: "Encounters",
    category: "Operations",
    categoryVariant: "active",
    title: "Encounters & Fate Dice",
    summary:
      "Every round, a procedural encounter unfolds at your location. A researcher's last transmission. An anomalous object that wasn't there a moment ago. A locked door that's warm to the touch. When the outcome hangs in the balance, the Fate dice decide.",
    detail: [
      "Encounters are self-contained narrative vignettes that deliver atmosphere, worldbuilding, and tangible consequences. Some are quiet and strange. Others force immediate decisions with lasting impact. The game never punishes you for showing up -- but it always makes you pay for ambition.",
      "The Fate dice system lets you change predetermined outcomes -- at a cost. When a situation calls for a skill test, you roll against your operative's stats with full transparency: difficulty, modifiers, and consequences all visible before you commit.",
      "Encounters blend the SCP Foundation's signature atmosphere of bureaucratic absurdity, existential dread, and dark humor. One round you're reading a passive-aggressive memo about break room etiquette. The next you're deciding whether to open a door that's breathing.",
    ],
    images: [],
  },
  {
    index: "004",
    label: "SCP Containment",
    category: "Threat Assessment",
    categoryVariant: "classified",
    title: "SCP Containment & Combat",
    summary:
      "When you encounter an SCP, combat begins. Every anomaly starts redacted -- its name is black bars, its designation reads SCP-[REDACTED], its weaknesses are hidden. You have to get close enough to learn what you're fighting. And everything you learn, you learn the hard way.",
    detail: [
      "Each SCP has hidden traits that define its vulnerabilities. Reveal them through observation, successful conversation, and deploying items with matching properties. Items with matching traits are devastating. Mismatched equipment barely scratches it. The difference between preparation and improvisation is the difference between containment and a body count.",
      "Your options each turn: ATTACK toward the destroy threshold. DEFEND against incoming harm. OBSERVE to uncover hidden traits and build the vulnerability gauge. USE ITEM to deploy your equipment. TALK to engage the anomaly in branching dialogue -- a conversation that can reveal critical intelligence, shift the vulnerability gauge, or backfire catastrophically. Sometimes the SCP initiates a Decision: a narrative choice forced on you mid-combat where every option has a cost.",
      "Two paths to resolution: destroy the anomaly by overwhelming it, or contain it by building the vulnerability gauge to 100% and executing a containment protocol. Every SCP fights differently based on its real Wiki lore. Every SCP can talk to you. And some of the things they say will make you wish they couldn't.",
    ],
    images: [],
  },
  {
    index: "005",
    label: "Entropy",
    category: "Threat Assessment",
    categoryVariant: "classified",
    title: "Entropy & The Collapsing Facility",
    summary:
      "Entropy is the game's dread clock. It doesn't tick down to a boss fight -- it ticks up toward irreversible failure. Every round, the facility gets worse. You can slow it. You can never stop it.",
    detail: [
      "At low entropy, the facility is unstable but manageable. As it climbs, lockdowns seal critical locations, cascading failures trigger across multiple wings, and entropy events grow catastrophic. At 100%, the facility is lost and everyone still inside it. The facility spans containment blocks, research labs, medical bays, armories, and the command center -- each offering resources you need and harboring threats you can't afford to ignore.",
      "Reinforce the breach or pursue the objective. Recruit an ally or stockpile for what's coming. Spend the round investigating or pray that ignoring the anomaly doesn't cost you the mission. Everything demands your attention and you don't have enough time.",
    ],
    images: [],
  },
  {
    index: "006",
    label: "Missions",
    category: "Mission Intel",
    categoryVariant: "pending",
    title: "Missions & Objectives",
    summary:
      "Each campaign is a K-Class scenario -- a specific way the world might end. Missions are drawn from a larger pool, each a self-contained operation with its own objectives, narrative, and moral weight. No two campaigns follow the same path.",
    detail: [
      "K-Class scenarios define the apocalypse you're trying to prevent. Within each scenario, missions are randomly selected from a larger pool. Every playthrough assembles a different combination of crises. Some objectives are timed -- fail to complete them and they auto-fail, with consequences that ripple through your operation. Save an innocent life or stop an outbreak? The game always makes you choose.",
      "Win by completing enough missions and keeping entropy under control. Lose by letting your health, your composure, or the facility reach zero. The game doesn't expect you to save everyone. It expects you to decide who you can't.",
    ],
    images: [],
  },
  {
    index: "007",
    label: "SCP Database",
    category: "Mission Intel",
    categoryVariant: "pending",
    title: "The SCP Database",
    summary:
      "100+ entities drawn from the SCP Wiki. Each starts behind Foundation redaction -- black bars hiding everything that matters. Discover traits through observation, conversation, and investigation. When the black bars finally lift, understand why it was classified in the first place.",
    detail: [
      "The database tracks every anomaly you encounter -- which traits you've revealed, what worked, and how the encounter ended. Each trait you uncover makes your equipment more effective in combat and your strategy more precise. The moment the last trait clicks and the SCP's true identity emerges from behind the redaction is one of the game's most powerful moments.",
      "The game never assumes you know the SCP universe. Every anomaly can be fully understood through in-game investigation alone. But players who recognize the signs -- who know what it means when the lights flicker a certain way, or when something offers to cure you -- will feel the dread before the reveal confirms it.",
    ],
    images: [],
  },
  {
    index: "008",
    label: "Arsenal",
    category: "Requisition",
    categoryVariant: "active",
    title: "Arsenal, Personnel & Legacy",
    summary:
      "Tactical item cards across six types: weapons, equipment, consumables, allies, utilities, and technology. Trait matching determines everything in combat -- a weapon aligned with an SCP's vulnerabilities can end the threat. A mismatched loadout is a death sentence disguised as preparation.",
    detail: [
      "Weapons and combat utilities carry traits and destroy or contain values -- your tools for directly engaging anomalies. Equipment provides passive stat bonuses. Consumables offer powerful one-time effects when you need them most. Allies fight alongside you with their own health, abilities, and dialogue. Facility shops let you spend credits on new equipment, and the right acquisition before a dangerous fight can mean the difference between a contained anomaly and a body count.",
      "Legacy progression unlocks new operatives, apocalyptic scenarios, and builds a database of every nightmare you've survived. Each campaign tells a complete story. The unlocks don't make you more powerful -- they give you new nightmares to survive.",
    ],
    images: [],
  },
];
