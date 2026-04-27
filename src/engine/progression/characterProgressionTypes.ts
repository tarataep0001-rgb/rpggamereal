export type ProgressionClassName = "Swordsman" | "Archer" | "Thief" | "Priest" | "Mage";
export type ProgressionGrade = "Common" | "Uncommon" | "Rare" | "Epic";

export type ProgressionCharacter = {
  character_id: string;
  display_name: string;
  class_name: ProgressionClassName;
  level: number;
  current_xp: number;
  is_main_character: boolean;
  legendary_equivalent_multiplier?: 1.85;
  star?: "none-v1a" | 0 | 1 | 2 | 3 | 4 | 5;
};

export type TeammateStarState = {
  character_id: string;
  grade: Exclude<ProgressionGrade, "Epic">;
  current_star: 0 | 1 | 2 | 3 | 4 | 5;
  shards_owned: number;
};

export type SkillLevelState = {
  skill_id: string;
  current_skill_level: number;
};

export type CharacterProgressionInput = {
  effective_level_cap: 50;
  character: ProgressionCharacter;
  xp_gain_preview: number;
  active_skill_ids: string[];
  priority_order: string[];
  skill_levels: SkillLevelState[];
  teammate: TeammateStarState;
  inventory_preview: {
    inventory_slots: number;
    used_inventory_slots: number;
    has_basic_reset_ticket: boolean;
  };
};

export type XpApplyPreview = {
  current_level: number;
  current_xp: number;
  xp_gain: number;
  effective_level_cap: 50;
  next_level_xp_required: number | null;
  level_after: number;
  xp_after: number;
  levels_gained: number;
  xp_discarded_at_cap: number;
  capped: boolean;
};

export type SkillUnlockRow = {
  level: 10 | 20 | 40;
  skill_id: string;
  skill_name_th: string;
  unlocked: boolean;
};

export type SkillUpgradePreview = {
  skill_id: string;
  current_skill_level: number;
  next_skill_level: number | null;
  skill_level_cap: 10;
  required_gold: number;
  required_materials: Array<{ item_id: string; quantity: number }>;
  effect_preview: string;
  mock_only: true;
  no_wld: true;
  no_paid_gem: true;
  no_ledger: true;
};

export type SkillLoadoutValidation = {
  status: "pass" | "fail";
  errors: string[];
  warnings: string[];
};

export type ClassRoadmapStatus = {
  class1: "live-v1a";
  class2: "locked-v1a";
  class3: "schema-only";
  production_status: "NO-GO";
  notes: string[];
};

export type StarUpgradePreview = {
  character_id: string;
  current_star: 0 | 1 | 2 | 3 | 4 | 5;
  next_star: 1 | 2 | 3 | 4 | 5 | null;
  shards_owned: number;
  shards_required: number;
  can_upgrade: boolean;
  extra_shards_stored: number;
  deterministic_no_failure: true;
  shard_exchange_disabled_v1a: true;
};

export type DuplicateShardPreview = {
  grade: Exclude<ProgressionGrade, "Epic">;
  shard_gain: number;
  first_unlock_star: 0;
  extra_shards_after_star5_stored: true;
};

export type ResetTicketPreview = {
  basic_reset_ticket: {
    can_preview: boolean;
    blocked_reason: string | null;
    does_not_reset_level: true;
    does_not_reset_skill_levels: true;
    does_not_reset_gear: true;
    does_not_reset_resources: true;
    does_not_reset_gacha_characters: true;
    does_not_reset_star_levels: true;
    does_not_refund_materials: true;
  };
  advanced_reset_ticket: {
    schema_only: true;
    disabled_until_roadmap: true;
  };
};

export type CharacterProgressionValidationResult = {
  status: "pass" | "fail";
  errors: string[];
  warnings: string[];
  checked_at: string;
};

export type CharacterProgressionResult = {
  xp_preview: XpApplyPreview;
  unlocked_skills: SkillUnlockRow[];
  next_skill_unlock: SkillUnlockRow | null;
  skill_upgrade_preview: SkillUpgradePreview;
  loadout_validation: SkillLoadoutValidation;
  class_roadmap: ClassRoadmapStatus;
  star_preview: StarUpgradePreview;
  duplicate_preview: DuplicateShardPreview;
  reset_ticket_preview: ResetTicketPreview;
  progression_log_preview: {
    log_id: string;
    local_mock_only: true;
    no_wld: true;
    no_paid_gem: true;
    no_ledger: true;
    no_production_authority: true;
  };
  validation: CharacterProgressionValidationResult;
};
