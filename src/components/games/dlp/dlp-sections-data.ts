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
      "The SCP Foundation operates in secret, containing supernatural anomalies that would end human civilization if exposed. You are an operative deployed into a Foundation site where containment has already failed. Anomalies are loose. The facility is degrading. People are dying. Your job isn't to win -- it's to decide what you're willing to lose.",
    detail: [
      "Dead Letter Protocol is a turn-based horror management game about impossible choices. There are no jumpscares. The horror is slower, heavier -- the dread of watching entropy climb while you decide whether to investigate the breach in Containment Block C or rush to Medical Bay where a researcher just stopped responding. Every round is triage. Every decision costs something you can't get back.",
      "Every playthrough procedurally generates a unique narrative. Randomized SCP placements, branching encounters, emergent crises, and missions drawn from a larger pool ensure no two operations tell the same story. A 40-60 minute campaign delivers a complete arc of investigation, containment, and survival -- and the stories it generates are the kind you describe to people afterward.",
      "Over 30 SCPs drawn directly from the SCP Wiki, each with lore-accurate mechanics, unique combat behaviors, and original dialogue. The game is built for players who have never heard of the SCP Foundation and for longtime fans who have read every entry. No prior knowledge required -- but if you recognize what you're fighting before the redaction lifts, you'll feel it.",
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
      "Each round follows a four-phase cycle designed to ratchet tension. You act. A narrative event unfolds. Anomalies escalate. The facility decays. Then the cycle begins again -- except now everything is a little worse than before.",
    detail: [
      "During the Player Phase, you navigate the facility map, choosing where to go and what to prioritize: investigate a location, shop for equipment, manage your inventory, talk to Foundation staff, or pursue mission objectives. You never have enough time to do everything you need to, and the three phases that follow don't wait for you to be ready.",
      "The Encounter Phase triggers a procedural narrative event at your current location. The Anomaly Phase advances every active SCP threat -- countdowns tick, entities activate, containment situations deteriorate. The Entropy Phase degrades the facility itself: lockdowns engage, systems fail, and the entropy meter pushes closer to critical. Every phase that isn't the Player Phase is the situation getting worse.",
      "The structure is the horror. You can see what's coming. You know entropy will climb. You know the anomalies are getting closer. And you know you don't have enough rounds to handle all of it. The question every cycle asks: what are you willing to sacrifice this round?",
    ],
    images: [],
  },
  {
    index: "003",
    label: "Encounters",
    category: "Operations",
    categoryVariant: "active",
    title: "Encounters & The Arbiter's Bones",
    summary:
      "Every round, a procedural narrative encounter unfolds at your location. A researcher's last transmission. An anomalous object that wasn't there a moment ago. A locked door that's warm to the touch. Some encounters reward curiosity. Some offer choices with no good answer. When the outcome hangs in the balance, the Arbiter's Bones decide.",
    detail: [
      "Encounters are the narrative heart of every operation -- self-contained vignettes that deliver atmosphere, worldbuilding, and tangible consequences. Some are quiet and strange. Others force immediate decisions with lasting impact. Bad outcomes only happen when you choose to take a risk or fail a skill test -- the game never punishes you for showing up. But it always rewards curiosity. And it always makes you pay for ambition.",
      "The Arbiter's Bones are the game's dice system. When a situation calls for a skill test, you roll against your operative's stats -- defense, agility, willpower, knowledge, or your contain and destroy ratings. The system is fully transparent: difficulty, successes needed, and every modifier visible before you commit. Some tests offer partial success -- not enough to win, but enough to survive. Critical failures don't just fail. They make things worse.",
      "Encounters draw from dozens of location-specific and general pools, blending the SCP Foundation's signature atmosphere of bureaucratic absurdity, existential dread, and dark humor. One round you're reading a passive-aggressive memo about break room etiquette. The next you're deciding whether to open a door that's breathing.",
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
      "When you encounter an SCP, combat begins -- but this isn't about dealing damage. Every anomaly starts redacted. Its name is black bars. Its designation reads SCP-[REDACTED]. Its weaknesses are hidden. You have to get close enough to learn what you're fighting. And everything you learn, you learn the hard way.",
    detail: [
      "Each SCP has four hidden traits that define its vulnerabilities. You reveal them through observation, successful conversation, and deploying items with matching properties. Each trait uncovered peels back the redaction, shifts the tactical balance, and brings you closer to identifying the anomaly. Items with matching traits are devastating. Mismatched equipment barely scratches it. The difference between preparation and improvisation is the difference between containment and a body count.",
      "Your options each turn: ATTACK toward the destroy threshold. DEFEND against incoming harm. OBSERVE to build the vulnerability gauge and uncover hidden traits. USE ITEM to deploy your equipment. TALK to engage the anomaly in branching dialogue -- a conversation that can reveal critical intelligence, shift the vulnerability gauge, or backfire catastrophically. Sometimes the SCP initiates a Decision: a narrative choice forced on you mid-combat where every option has a cost and hesitation isn't one of them.",
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
      "Entropy is the game's dread clock. It doesn't tick down to a boss fight -- it ticks up toward catastrophic, irreversible failure. Every round, the facility gets worse. Lockdowns seal off critical locations. Systems fail in sequence. The entropy meter is always visible, always climbing. You can slow it. You can never stop it.",
    detail: [
      "At low entropy, the facility is unstable but manageable -- flickering systems, unreliable communications, minor anomalous disturbances. As it climbs, the consequences escalate: lockdowns deny access to locations you need, cascading failures trigger across multiple wings, and entropy phase events grow increasingly catastrophic. At 100%, the facility is lost and everyone still inside it.",
      "The Anomaly Phase compounds the pressure. Every active SCP threat advances: countdowns tick toward activation, entities test their containment, and the threats you've been ignoring grow more dangerous. The facility spans over ten distinct locations -- containment blocks, research labs, medical bays, armories, the command center -- each offering resources you need and harboring threats you can't afford to ignore.",
      "This is the core dilemma that defines every operation: everything demands your attention and you don't have enough time. Investigate the anomaly or repair the failing containment system? Shop for better equipment or pursue a time-sensitive objective? Help the researcher trapped in the locked-down wing or accept the loss and focus on the mission? Dead Letter Protocol never asks you to make easy choices. It asks you to live with hard ones.",
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
      "Each campaign is a K-Class scenario -- a specific way the world might end. Five missions are drawn from a larger pool, each a self-contained operation with its own objectives, narrative, and moral weight. No two campaigns follow the same path. No mission tells you everything you need to know.",
    detail: [
      "K-Class scenarios define the apocalypse you're trying to prevent -- the specific containment catastrophe that frames every decision you make. Within each scenario, five missions are randomly selected from a pool of eight. Every mission is self-contained: its own briefing, its own objectives, its own resolution. Every playthrough assembles a different combination of crises, and you can never predict exactly what the next operation will demand.",
      "Objectives range from direct containment operations to investigations with moral weight. Some are timed -- fail to complete them within a round limit and they auto-fail, often with consequences that ripple through the rest of your operation. Optional objectives reward thoroughness. Side missions emerge from NPC conversations and entropy events, tempting you with additional rewards when you can least afford the time to pursue them.",
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
      "Over 30 SCPs drawn directly from the SCP Wiki. Each starts behind Foundation redaction -- black bars hiding everything that matters. Discover traits through observation, conversation, and investigation. Watch the redaction peel away. And when the black bars finally lift to reveal what you've been fighting -- understand why it was classified in the first place.",
    detail: [
      "The database tracks every anomaly you encounter during the operation -- which traits you've revealed, what worked, and how the encounter ended. Partially redacted entries show exactly what you still need to discover. Fully revealed entries give you the complete tactical picture and the name behind the black bars.",
      "Trait discovery is the investigation mechanic at the heart of containment. Each SCP's four traits define its vulnerabilities, and every trait you uncover during combat or exploration makes your equipment more effective and your strategy more precise. The moment of revelation -- when the last trait clicks and the SCP's true identity emerges from behind the redaction -- is one of the game's most powerful moments for newcomers and a moment of dark recognition for fans who already know what it is.",
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
      "Six item types displayed as tactical cards: weapons, equipment, consumables, allies, utilities, and technology. Trait matching determines everything in combat -- a weapon aligned with an SCP's vulnerabilities can end the threat. A mismatched loadout is a death sentence disguised as preparation.",
    detail: [
      "Items follow a strict classification. Weapons and combat utilities carry traits and destroy or contain values -- your tools for directly engaging anomalies. Equipment provides passive stat bonuses while equipped. Consumables offer powerful one-time effects when you need them most. Allies fight alongside you with their own health, abilities, and dialogue. Every item is displayed as a card showing its type, traits, stats, and combat role at a glance.",
      "Foundation personnel populate the facility -- researchers, security staff, and specialists who respond to the state of the crisis. Talk to them for intel, warnings, and sometimes help you didn't expect. Facility shops let you spend credits on new equipment, and the right acquisition before a dangerous mission can mean the difference between a contained anomaly and an empty hallway where your team used to be.",
      "Successful operations unlock new content for future campaigns: additional operatives with unique specializations and new K-Class scenarios that change the threat landscape. Each campaign tells a complete story. The unlocks don't make you more powerful -- they give you new nightmares to survive.",
    ],
    images: [],
  },
];
