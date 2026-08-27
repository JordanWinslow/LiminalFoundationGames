# Rulebook Build State — code-verified facts + work plan

Working doc for the comprehensive `/rulebook` rebuild on the marketing site
(`C:\Users\jwins\LiminalFoundation`). Every number below is quoted from the GAME repo
(`C:\Users\jwins\GameMakerProjects\Containment-Breach`) with a file cite. **Do not invent; if a
fact isn't here, re-verify in code before writing it.** On-screen labels only (STRESS not Sanity, etc).

## The creator's spec (features that MUST be explained thoroughly)
1. K-Class Scenario → Missions → Objectives; Side objectives / Entropy objectives.
2. Mission selection ceremony: 3 K-class missions shown; MANY exist per scenario (most never seen);
   all missions grant the SAME possible number of rewards (none "better" — different objectives, lore,
   decisions); decisions impact which final mission you get.
3. Phases: Player → Encounter → Anomaly → Entropy, with the Anomaly phase sub-steps spelled out
   (NPC movement, anomalies appearing by entropy %, SCP movement/behavior, integrity loss, lockdowns).
4. Integrity management + strategy: only PRIMARY locations have integrity; at 0 you lose location
   encounters AND all that location's special actions (shop, gather intel, complete missions, talk NPCs).
5. Entropy gauge / final-threat trigger mechanism.
6. Final Threat: importance + use of contingency items; forced full-power (100% entropy OR 3 failed
   missions OR failed final) vs weakened (completed final mission).
7. Final mission branching: decisions during missions → different endings (= different final missions).
8. Player stats explained in terms of WHERE they apply (tests / combat / elsewhere).
9. Intel use cases. 10. Credits use cases.
11. SCP Database: track threats, view active threats, research with intel BEFORE combat, previously
    contained = always fully revealed (progression); traits alone aren't enough — SCP LORE comes up in
    narrative attacks.
12. SCP Conflict: actions; trait-match damage boost; vulnerability gauge; destroy vs contain strategy
    (destroy usually easier; contain gives benefits IF an open cell; either way a previously-contained
    entity starts revealed next run); NOT all entities aggressive — some turn hostile only once attacked.
13. Containing SCPs; Containment Chambers actions (build cell; destroy contained SCP for immediate
    rewards vs keep for passive effects).
14. Conditions + types with examples.
15. Item types with REAL example stats/effects; DRAW real item cards on the page, clickable to flip
    like in-game; special item abilities; out-of-combat vs in-combat use.
16. Equipping items; slot types; unlocking new slots.
17. Dice test; blood yield; dice abilities (changed by conditions/items); contain test vs skill test.
18. Allies: more than equip — can be talked to, do special combat actions (attack/protect), can be
    sacrificed (Lament) tied to a blood-yield-style die effect to guarantee a success.
19. Roguelike: Clearance — how earned, unlocks characters/scenarios, possible future unlocks.
20. Character bios for the 2 starting characters (Gears, Wheeler) + use their intro background art.
21. Primary-location summary chart: location backgrounds + special actions.

## VERIFIED MECHANICS (file:line)

### Combat / SCP Conflict
- 4 Command Points (CP) per turn. Costs: Attack 2, Defend 2, Observe 2, Talk 2, Use Item 2,
  Give Order 2, Re-equip 2, Contain 4, Run 4, End Turn 0, Ability varies. (GLOBAL_CONSTANTS + CommandPointManager)
- Attack (SCPConflictManager.gml:1712-1768): dice pool = weapon.destroy + 2 (trait match) OR
  ceil(destroy/2) min 1 (no match); + floor(strength/2) + Foundation bonus + condition bonuses.
  Success per die 5-6 normal, 6-only for hard SCPs (destroy>=8), 4-6 for easy (destroy<=2). Successes = strikes.
- Vulnerability gauge 0-100, label "CONTAINMENT POSSIBLE" at 100 unlocks Contain. Observe +10 (+15 new
  trait), Talk +10/+15/+5, decisions +10/+5, some items. Previously-contained head start +50. (SCPConflictManager:132-238)
- Destroy (SCPConflictManager:1585-1651): credits (scps.csv col 14 destroyRewards) + integrity +1
  (restoreIntegrity(1) @1616 — REAL) + clearance. Destroy code COMMENT says "fully revealed future runs"
  but that is A LIE — destroying does NOT pre-reveal.
- Contain (containSCPFromTest:2245-2286): knowledge test; needs open cell (else CellSelectionModal to
  sacrifice one); clearance (less than destroy).
- FUTURE-RUN "fully documented" = CONTAIN ONLY (TraitDiscoveryManager:50 → scr_meta_was_contained). The
  +50 vulnerability head start is CONTAIN-ONLY too (SCPConflictManager:189). NEVER "contained or destroyed".
  Failure = PURGE counter-attack (damage = scp.contain, ignores defense/ally), can retry (purge bonus carries).
- Passive SCPs: scp.passive flag; don't attack first; first Attack → "HAS BECOME HOSTILE", then normal.
  Talk blocked once a passive SCP has been provoked. (SCPConflictManager:1660-1672)
- Run 4CP, not guaranteed, only if not at start location. Pre-encounter SNEAK (free, uses movement
  points): success → escape, movement restored; fail → combat. (GLOBAL_CONSTANTS:268-303)

### Dice / Skill tests (obj_SkillTestController)
- Dice pool = max(1, BaseStat + EQP + FND - Difficulty) + conditions, then + BloodYield + PurgeBonus, cap 10.
- Faces: 1 = LOCKED FAIL, 2-4 nothing, 5 = success, 6 = LOCKED success. Locked can't be re-rolled (Annul unlocks).
- Character ability can change one die face; conditions can add/override die-face effects (dice abilities).
- Pre-roll: Clone (+5% entropy → +2 dice), Clarity (-1 intel → reroll first 1). Contain test replaces
  Clone with PURGE (sacrifice matching-trait item → +2 dice).
- Post-roll: Anchor (-300cr lock a die), Lament (sacrifice 1 ally → +1 guaranteed success = "BLOOD YIELD"),
  Impose (-1 max stress → +1 reroll), Annul (-300cr unlock a die). Shift = reroll unlocked dice.
- Containment test: base stat ALWAYS knowledge; difficulty = scp.contain; fail = PURGE. Narrative test:
  stat set by the event; fail = event-specific.
- K-Class NEUTRALIZE test: knowledge; EXPLOIT (research data → -1 success needed); ADAPT (research data →
  turn first two 1s into 6s).

### Allies
- Recruited at D-Class Dormitories (RECRUIT, 1 action); have stat requirements (green met/red unmet).
- Equip in a slot. In combat: Give Order (2CP) → Attack or Protect (protect only for support allies).
  Ally attack rolls like player; Protect halves next SCP hit, ally takes 1 dmg. Allies can be TALKED to
  (talk responses by ally health state). Per-ally special deaths (resurrect, phase, stress). Lament
  sacrifices an ally in a skill test for +1 guaranteed success.
- Real allies: MTF Operative (id 23, 1200cr, allyHealth 3, req defense:2), SCP-076-2 Able (id 076,
  1200cr, allyHealth 2, req strength:2). (items.csv)

### Phases (PhaseManager.gml; obj_AnomalyPhaseController)
Player → Encounter → Anomaly → Entropy. ANOMALY sub-steps in order:
1 sensor calibration; 2 anomaly countdowns; 3 animate countdowns (decrement turnsToExecute);
4 execute ready anomalies (anomaly→SCP, +5% entropy each); 5 spawn NEW anomalies (roll scaled by
entropy %); 6 movement: anomalies step toward target, SCPs move by behavior type (PLAYER pathfind ≤4
hops, RANDOM by speed, FACILITY seek un-breached primary, HUNTER track killable NPCs); 7 lockdown
countdown; 8 integrity drain (1 per SCP present at a primary loc, +1 if anomaly_speed flag);
9 NPC death check (30%/SCP kills a non-shop NPC); 10 NPC arrivals/departures; then ENTROPY phase.
LOCKDOWN: location flag isLockedDown + lockdownTurnsRemaining; blocks anomalies/SCPs entering AND player
travel; auto-lifts at 0; set by missions/events.

### Integrity (FacilityLocation.gml)
- Only PRIMARY locations; start 3, max 3. Lose 1 per SCP present each Anomaly phase (+1 anomaly_speed).
- At 0: if Containment Chambers → ALL contained SCPs released to random primaries, cells OPEN.
  Otherwise → entropy +5%, all NPCs at that location cleared, location isCompromised(): during Encounter
  phase it's skipped; during Player phase grayed out — no encounters/missions/shopping/intel/NPC talk.
- Restore via item effects "integrity" (restoreIntegrity), capped at 3.

### Entropy + Final Threat trigger (UIManager.gml; KClassScenario.gml; scr_trigger_kclass_threat)
- Entropy 0-100% (stored 0-1, UIManager:68). CORRECTED 2026-07-06 (earlier "+5% per anomaly→SCP" was
  FALSE — verified in code): the ONLY facility +5% is a primary-location BREACH (Integrity→0,
  FacilityLocation:474/479). Other entropy gains come from harmful events (doBadStuff), Entropy-phase
  crises, conditions (Ontological Fracture = double_entropy_gain x2), the Clone dice option
  (obj_SkillTestController:1278 +5%), and mission consequences. NO passive per-cycle rise. Conditions
  half_entropy_gain (÷2) / Dimensional Anchor (-1/turn). Lowered by: Command Center GATHER_INTEL chance
  (-10%, GLOBAL_CONSTANTS:1836), items (Item:382), mission rewards (Objective:149), doGoodStuff events.
- Higher entropy: spawn chance = clamp(entropy%*100 + 15, 20, 100) per Anomaly phase
  (scr_begin_anomaly_phase:18); Entropy-phase crisis tier scales easy→worldending.
- Containment roll base stat = KNOWLEDGE (scr_start_skill_test:72 stat:"knowledge"); the SCP
  speed+perception+destroy+contain only sets REQUIRED SUCCESSES tier, not the pool. Difficulty=scp.contain.
- Attack rolls dice internally (irandom_range, SCPConflictManager:1744) but NOT via the obj_SkillTest
  dice panel — player sees narrative hit/miss, no interactive dice. Say "resolves on its own", never "no dice".
- Destroy restores 1 integrity to combat location (SCPConflictManager:1616 restoreIntegrity(1)) + credits +
  clearance. Contain = clearance + held-SCP passive (getFoundationBonusForSCPConflict / getContainDestroyBonus).
- FULL-POWER threat (Path A): entropy hits 100%, OR 3 missions failed (scenario.failedMissions>=3), OR
  final mission failed. WEAKENED (Path B): final mission COMPLETED. Full power loads scenario.failureSCPId
  (SCP-610 scenario default "610_prime"), cinematic reveal, combat.

### Missions / Objectives (Mission.gml, Objective.gml, KClassScenario.gml)
- Objective fields: isOptional, activateOnStart, successCondition.type (manual/visit/scp_destroy/
  scp_contain/talk_npc/entropy_below/entropy_above), turnLimit (timed → auto-fail applies consequences),
  rewards, consequences. Required objectives (isOptional=false) gate completion; optional = bonus.
- Mission selection ceremony (obj_MissionSelectionUI): pool = scenario.possibleMissions (many, e.g. 12+
  for 610); each event shows UP TO 3 random; selected removed from pool. All same reward pool — none
  strictly better; differ by objectives/lore/decisions.
- Decision tracks: containment / understanding / annihilation; chatter <<addDecisionPoint(track)>>.
  After 3 missions completed, final mission chosen by highest track (tie → 3-card pick; all 0 → containment
  "The Heart"). final_1 Heart=containment, final_2 Severance=understanding, final_3 Fire=annihilation.

### Items (items.csv; Item.gml; CardSlotsManager)
- CSV cols: id,title,type,uses,destroy,contain,tags,description,cost,effects,spriteId,isRareItem,[ally
  cols 12-19],attackDescription,soundEffect,combatAnimation,combatSE,combatDescription,hitNarratives,
  missNarratives,defendNarratives,allyProtectNarrative,allyMissNarrative,blockNarrative,useChatterFile,
  useChatterNode,combatUsable,subcategory(contingency).
- Real examples:
  - Weapon: Plasma Cutter (id5, 1300cr, destroy5, traits artifact/reality_bending/resilient, rare).
    Bare Fists (id1, destroy1, traits alive/spatial/biological).
  - Equipment: Hazmat Suit (id17, 800cr, effects defense:>1,strength:>1,health:>1).
    SCP-268 Cap of Negligence (id46, 1100cr, agility:>2,defense:<1).
  - Consumable: Adrenaline Injector (id21, 500cr, 1 use, health:+3,stress:-2).
    SCP-330 Bag of Candy (id51, 500cr, 2 uses, health:+3,stress:+1).
  - Utility: Containment Foam Grenade (id6, 800cr, destroy1/contain3, 4 uses, alive/hostile/amorphous).
    EMP Grenade (id19, 700cr, destroy4, 3 uses, mechanical/artifact/hostile).
  - Ally: MTF Operative (id23, 1200cr, allyHealth3, req defense:2, destroy2/contain2 humanoid/sapient/hostile).
  - Technology: Reality Anchor (id25, 1500cr, destroy3/contain5, 3 uses, transient/spatial/reality_bending, rare).
    SCRAMBLE Goggles (id62, 1200cr, destroy1/contain2, memetic/cognitohazard/mind_affecting).
  - Contingency: Emergency Quarantine Protocols (id84, 800cr, contain15, countermeasure).
    Delta-7 Field Report (id78, field_report, tag "Tendrils track heat at 0.3m per second").
- Traits XOR effects. Effect syntax e.g. defense:>1 (+1), defense:<1 (-1), health:+3, stress:-2.
- Special abilities: combatUsable (col33, default true); useChatterFile+useChatterNode → out-of-combat
  chatter use. Examples: SCP-662 Silver Bell (ring_bell, combatUsable FALSE), SCP-1499 Gas Mask
  (put_on_mask, combatUsable TRUE), SCP-184 Architect (DISPLACE).
- Card FRONT: type icon, name, cost, traits/effects grid (+ destroy/contain badges, ally health).
  BACK: type badge, description/lore (grey), effect icons. Sprites spr_ItemCardFront/BackLARGE,
  spr_ItemCardContain/Destroy, spr_ItemCardAllyHealth.
- Slots (CardSlotsManager): 0 weapon, 1 equipment, 2-3 any, 4-7 locked. Unlock a locked slot at
  Engineering UPGRADES = 20,000 credits FIXED (GLOBAL_CONSTANTS:1875).

### Conditions (scr_create_condition_by_id.gml) — 31 total, real roster
- INJURY (red): Lacerations (-1 hp/turn), Concussion (knowledge-2, 5t), Chemical Burns (defense-1,
  -1hp/turn, 4t), Internal Bleeding (-2hp/turn), Ruptured Eardrum (charisma-2, 6t), Severed Hands
  (strength-100,agility-100), Overexertion (strength-1,defense-1, 1t).
- AFFLICTION (purple): Cognitohazard (face5→locked fail), Paranoia (charisma-3, false warnings),
  Anomalous Corrosion (-500cr/turn, +25% shop), Psychic Bleed (willpower-2,maxstress-2), Ontological
  Fracture (double entropy gain), Hive Mind Intrusion (willpower-3, weaken scp). Item-tied: Mutation
  Stage I (strength+1), Mutation Stage II (strength+2,agility-25), Musical Compulsion (-1hp/turn,1t).
- AUGMENTATION (yellow): Precognition (base_rerolls+1, dodge), Eidetic Imprint (knowledge+3, trait
  reveal), Dimensional Anchor (-1 entropy/turn, entropy-immune), Threat Instinct (defense+3, dodge2),
  Anomalous Resilience (maxhealth+3,maxstress+2), Eldritch Insight (face2→locked success, scp_sense).
- PROVISION (green): Cognitive Stabilizers (willpower+3,5t), Field Inoculation (maxhealth+2), Combat
  Stims (strength+2,agility+25,+2 combat pts,4t), Tactical Overlay (knowledge+2,rerolls+1,5t), SCP-500
  Euphoria (maxhp+3,maxstress+3,willpower+2,+2hp/turn,3t).
- ENTROPY (orange, facility edicts): Heightened Alert (defense-1,agility-1,willpower-1,3t),
  Communications Blackout (knowledge-2, hides stress, 4t), Quarantine Protocol (agility-1,defense-1,
  free medical, 4t).
- MOOD (slate, display-only, derived from health/stress): Fit for Duty, Fatigued, Uneasy, Exhausted,
  Anxious, Breaking Down.
- Removal: AUGMENT action (Engineering, 1 action — augments a consumable AND removes negative
  conditions, GLOBAL_CONSTANTS:1739); item effects (removeCondition); narrative <<removeCondition()>>.
  NOT a Medical Bay decontamination. Medical Bay action = REST (heal). NO 3-step decon.

### Containment Chambers (ContainmentCells.gml)
- Build Cell: LOCKED1 = 10,000cr, LOCKED2 = 25,000cr (getNextCellCost). Destroy contained SCP →
  immediate CREDITS (per-SCP destroyRewards). Keep → passive: equipped items sharing a contained SCP's
  trait count at FULL destroy/contain value (CardSlotsManager.getContainDestroyBonus).

### Clearance (FoundationRecord.gml:493-579)
- Contain: safe 150 / euclid 175 / keter 200. Destroy: 75 / 90 / 100. +50 first-time SCP bonus.
- Mission completed: 150 base, +50 all objectives, +100 first-time. Failed = 0.
- Spent to unlock operatives/scenarios. Tutorial completion unlocks SCP-610 scenario.

### Operatives (PlayableCharacter.gml)
- Gears (free): Containment Specialist. H10 Stress12 Agi2 Str2 Def2 Actions3 Cha0 Kno4 Wil4. Unique die
  face4 CLINICAL CALM +1 stress. Ability COMPOSE (1 action, +2 stress). Combat ASSESS (2CP, +3 intel).
  Start item Gears Logbook. Sprite spr_Characters__Doctor_Charles_Gears.
- Wheeler (free): Antimemetics Director. H8 Stress11 Agi3 Str1 Def1 Actions4 Cha2 Kno4 Wil2. Unique die
  face5 TOTAL RECALL +2 intel. Ability MNESTIC (1 action, +1 intel). Combat RECALL (2CP, +3 intel).
  Start item Class W Mnestics. Sprite spr_Characters__Chief_Marion_Wheeler.
- Mann (2000 clearance): Field Surgeon, high health. Light (3500): Site Director, high charisma/defense.

### Primary locations + special action + background sprite
- Medical Bay (spr_MedicalBay): REST — heal health/stress, heal allies.
- Armory (spr_Armory): SHOP — weapons + utility.
- Security Department (spr_SecurityDepartment): SHOP — equipment + utility.
- Command Center (spr_CommandCenter): GATHER INTEL.
- Research & Development (spr_ResearchAndDevelopment): RESEARCH.
- Engineering & Maintenance (spr_EngAndMaint): UPGRADES — unlock slot (20k), augment items.
- Containment Chambers (spr_ContainmentChambers): VIEW CELLS — build/destroy/keep.
- D-Class Dormitories (spr_DClassDorms): RECRUIT allies.
- Exit (spr_Exit): TRAVEL to external mission locations.

### Intel use cases
Research SCPs in SCP Database (reveal 1 intel / research 1 intel), Command Center gather-intel briefings,
R&D research bonuses, Stabilize in investigations (1 intel resets Risk), Clarity dice mitigation (-1 intel),
some events. (Sources of intel: rewards + Gears ASSESS / Wheeler MNESTIC/RECALL abilities.)

### Credits use cases
Shops (Armory weapons/utility, Security equipment/utility), Build Cell (10k/25k), Unlock slot (20k),
Augment items (Engineering), Anchor/Annul dice mitigations (-300 each). Start credits 20,000.

## PROGRESS (update on resume)
DONE (build green, tsc+eslint clean):
- Conditions section NEW, wired at R-10 (conditions-section.tsx). Renumber done: Investigations R-11,
  Missions R-12, Improving R-13, Final Threat R-14, Clearance R-15. Client + all index props updated.
- Skill Tests (R-09) rebuilt: die faces, all mitigations incl Lament/Blood Yield, dice abilities,
  contain-vs-narrative.
- Encounters (R-08): added Give Order/ally, passive-SCP rule, destroy-vs-contain strategy, prior reveal,
  Containment Chambers block (build 10k/25k, keep passive, destroy for credits, breach releases all).
- Missions (R-12): objective types (required/optional/side/entropy), timed fail, reward-parity ceremony.
- Clearance (R-15): real earn numbers + unlock costs table.
ASSETS COPIED & READY: public/images/rulebook/locations/{medical-bay,armory,security,command-center,
  research,engineering,containment-chambers,dclass-dorms,exit}.png; characters/wheeler.png (+ existing
  gears.png); items/item-{5,17,21,6,19,23,25,84,46,51}.png. NOTE: no character intro-background art
  exists in project — use portraits. (locations/ also has stale research-dev.png dup of research.png.)
DONE (batch 2 — build green, tsc+eslint clean, npm run build passes, /rulebook prerenders):
  1. Items (R-06): NEW client component item-card.tsx — click-to-flip cards, one per type (Plasma Cutter,
     Hazmat Suit, Adrenaline Injector, Containment Foam Grenade, MTF Operative, Reality Anchor, Emergency
     Quarantine Protocols) w/ real traits/effects/destroy/contain/uses/HP/req from items.csv. Front=stats,
     back=description. Plus 7-type table, traits-XOR-effects callout, 8-slot equip diagram (20k unlock),
     in-vs-out-of-combat use note (Gas Mask/Silver Bell).
  2. Locations (R-05): primary-location chart — 9 background sprites w/ overlaid special-action label +
     service line + breach-consequences note.
  3. Operative (R-02): Gears + Wheeler bio showcase (portraits; die/ability/combat/start item);
     stat descriptions rewritten to say WHERE each applies (combat vs tests vs movement).
  4. Resources (R-03): Credits + Intel use-case lists; Integrity card + callout rewritten w/ full
     breach consequences (lose action/encounters/shop/intel/NPCs/mission) + defend-key-locations strategy.
  5. Cycles & Phases (R-04): "Inside the Anomaly Phase" 6-step ordered grid + Lockdown note callout.
  6. SCPs & Research (R-07): "track active threats" note + "traits are only half of it / lore in
     narrative attacks" warning. (Verified: Command Center GATHER_INTEL has entropy-reduction chance.)
  7. Final Threat (R-14): reviewed — accurate (contingency 3 kinds, weakened-vs-full-power, EXPLOIT/ADAPT).
ALL creator-spec items (1-21) now covered. Full build passes; TOC = 15 entries.

DONE (batch 3 — 2026-07-06, structural reorg + accuracy pass; build green):
- NEW Entropy section at R-02 (own section between Objective and Operative) — it's the difficulty clock,
  what raises/lowers it, harder-as-it-climbs, 100%=forced full-power threat. entropy-section.tsx.
- Resources (now R-04) STRIPPED to Credits + Intel only (each with earn + spend). Health/Stress removed
  (they're operative stats). Entropy + Integrity removed (own section / Locations).
- Integrity MOVED into Locations (R-06) as a subsection w/ integrity-3→integrity-0 gauge + Chambers-breach
  danger callout (removed the duplicate from Combat).
- FIXED FALSE INFO: round anomaly step no longer claims anomaly→SCP adds +5% entropy (only breaches do);
  progression "Manage Entropy" tip reworded (no passive rise). Skill Tests lede dropped "never attacks"
  (creator: don't say what dice AREN'T for). Combat "no dice" → "resolves on its own". Contain reward
  wording corrected (keep-for-passive or cash-in-later, not vague "rewards later"). "Two outcomes" now
  "two WINNING outcomes (you can also flee)".
- Full renumber R-01..R-16 (16 sections). Combat TOC label stays "Combat".
Section order now: Objective, Entropy, Operative, Resources, Cycles & Phases, Locations(+Integrity),
Items, SCPs & Research, Combat, Skill Tests, Conditions, Investigations, Missions, Improving, Final Threat, Clearance.

## WEBSITE BUILD PLAN (order)
Current page: 14 sections R-01..R-14 in src/components/rulebook/. Reuse SectionShell, SubLabel, Callout,
StatBlock, SpriteFigure, FlowDiagram, MediaClip/Screenshot, sprite-figure.
Planned changes:
- Operative: add Gears + Wheeler bio showcase w/ intro background art; stats table gains a "WHERE IT
  APPLIES" column. (assets: character intro bg)
- Resources: add full Intel + Credits use-case lists; expand Integrity (consequences + restore) + strategy.
- Cycles & Phases: expand Anomaly phase into its ordered sub-steps; define Lockdown.
- Locations: add a primary-location chart w/ background sprites + special action. (assets: 9 bg sprites)
- Items: MAJOR — interactive flip cards (front/back) built from real item data; item-type table w/ real
  examples; special abilities (in vs out of combat); slots + unlock. (assets: item art sprites)
- SCPs & Research: add "lore matters in narrative attacks", track/view active threats, prior-contained reveal.
- Combat: add Give Order/ally actions, passive-SCP rule, destroy-vs-contain strategy, prior-contained reveal.
- NEW Conditions section: 6 categories w/ real examples + how removed (Augment). Insert after Combat/Skill Tests.
- Skill Tests: add Blood Yield (Lament), dice abilities (conditions/items/character die), contain-vs-narrative.
- Containment Chambers: build cell / destroy-for-credits / keep-for-passive. (in Combat or new subsection)
- Missions: add objectives/side/entropy objectives, ceremony (3 of many, reward parity), decision→final branching.
- Final Threat: contingency item use, full-power vs weakened arrival, neutralize EXPLOIT/ADAPT.
- Clearance: real earn amounts + unlock costs + future-unlocks note.
Verify after each batch: eslint, tsc, npm run build, page 200, new assets 200.

## Asset gathering TODO (copy read-only from game sprites/ into public/images/rulebook/)
- 9 location background sprites (find PNG frame path under sprites/spr_*/).
- Wheeler character art + Gears/Wheeler intro backgrounds.
- Item art sprites for the ~10 example items (spr_item_* by spriteId).
- Condition category could be color-only (no sprite needed).
