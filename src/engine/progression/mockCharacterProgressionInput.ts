import type { CharacterProgressionInput } from "./characterProgressionTypes";

export function createMockCharacterProgressionInput(): CharacterProgressionInput {
  return {
    effective_level_cap: 50,
    character: {
      character_id: "main_hero",
      display_name: "Hero",
      class_name: "Swordsman",
      level: 12,
      current_xp: 280,
      is_main_character: true,
      legendary_equivalent_multiplier: 1.85,
      star: "none-v1a",
    },
    xp_gain_preview: 1280,
    active_skill_ids: ["swordsman_slash_01"],
    priority_order: ["swordsman_slash_01"],
    skill_levels: [
      {
        skill_id: "swordsman_slash_01",
        current_skill_level: 2,
      },
    ],
    teammate: {
      character_id: "ch_common_priest_light_aid",
      grade: "Common",
      current_star: 0,
      shards_owned: 14,
    },
    inventory_preview: {
      inventory_slots: 100,
      used_inventory_slots: 32,
      has_basic_reset_ticket: true,
    },
  };
}
