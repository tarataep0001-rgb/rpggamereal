export type Element =
  | "Fire"
  | "Water"
  | "Earth"
  | "Wind"
  | "Light"
  | "Dark"
  | "Neutral";

export type CharacterGrade = "Common" | "Uncommon" | "Rare" | "Epic";
export type GearGrade = "Common" | "Uncommon" | "Rare";
export type ClassTier = 1 | 2 | 3;
export type ClassName = "Swordsman" | "Archer" | "Thief" | "Priest" | "Mage";
export type CharacterRole =
  | "tank"
  | "frontline"
  | "damage"
  | "support"
  | "healer"
  | "magic"
  | "assassin";

export type StatBlock = {
  HP: number;
  ATK: number;
  MAG: number;
  DEF: number;
  RES: number;
  SPD: number;
  ACC: number;
  EVA: number;
  CRIT: number;
  CRIT_DMG: number;
};

export type GrowthStatBlock = StatBlock;

export type FeatureFlags = {
  enableWldWithdraw: false;
  enableWldRewardRanking: false;
  enablePaidGemGacha: false;
  enableBox2: false;
  enableBox3: false;
  enableClass2: false;
  enableClass3: false;
};

export type LaunchStatus = "GO" | "NO-GO";

export type PlayerProfile = {
  playerName: string;
  mainClass: ClassName;
  level: number;
  effectiveLevelCap: 50;
  gold: number;
  freeGem: number;
  paidGem: number;
  paidGemGachaEnabled: false;
  wldWithdrawEnabled: false;
  wldRewardRankingEnabled: false;
  currentChapter: ChapterId;
  highestStageCleared: string;
  idleStage: string;
  inventorySlots: number;
  usedInventorySlots: number;
  mailboxCount: number;
  teamPower: number;
  launchStatus: LaunchStatus;
  featureFlags: FeatureFlags;
};

export type PlayerState = PlayerProfile;

export type CharacterStar = 0 | 1 | 2 | 3 | 4 | 5;

export type CharacterShardState = {
  shardItemId: string;
  owned: number;
  requiredForNextStep: number;
};

export type GameCharacter = {
  id: string;
  displayName: string;
  displayNameTh: string;
  grade: CharacterGrade;
  element: Element;
  baseClass: ClassName;
  role: CharacterRole;
  level: number;
  levelCap: 50;
  gradeMultiplier: number;
  activeSkillSlots: number;
  classPath2: "locked";
  classPath3: "schema-only";
  shardValue: number;
  star: CharacterStar | "none-v1a";
  shardState: CharacterShardState;
  stats: StatBlock;
  power: number;
  formationCell?: CellId;
  starterWeaponId?: string;
  isMainCharacter?: boolean;
};

export type MainCharacter = GameCharacter & {
  id: "main_hero";
  isMainCharacter: true;
  star: "none-v1a";
  starterWeaponId: "gear_sword_t1_common";
};

export type TeammateCharacter = GameCharacter & {
  isMainCharacter?: false;
  star: CharacterStar;
};

export type Character = GameCharacter;

export type SkillType = "attack" | "heal" | "shield" | "buff" | "debuff";
export type TargetType =
  | "single_enemy"
  | "all_enemies"
  | "self"
  | "single_ally"
  | "all_allies";
export type StatusEffect =
  | "none"
  | "def_down"
  | "shield"
  | "acc_up"
  | "eva_up"
  | "heal"
  | "slow"
  | "burn";

export type SkillConfig = {
  skill_id: string;
  skill_name: string;
  class_required: ClassName;
  class_tier: ClassTier;
  unlock_level: number;
  skill_type: SkillType;
  element: Element;
  target_type: TargetType;
  base_coef: number;
  mp_cost: number;
  cooldown: number;
  status_effect: StatusEffect;
  status_chance: number;
  duration: number;
  boss_modifier: number;
  ai_condition: string;
  priority_weight: number;
  use_character_element: boolean;
  ignore_taunt: boolean;
  can_crit: boolean;
  can_miss: boolean;
  description_th: string;
  description_short: string;
  effect_formula: string;
  schemaOnly?: boolean;
  locked?: boolean;
};

export type SkillLoadout = {
  characterId: string;
  skillIds: string[];
};

export type Skill = SkillConfig;

export type CellId =
  | "front_top"
  | "front_center"
  | "front_bottom"
  | "middle_top"
  | "middle_center"
  | "middle_bottom"
  | "back_top"
  | "back_center"
  | "back_bottom";

export type FormationCellId = CellId;

export type FormationUnit = {
  characterId: string;
  cellId: CellId;
};

export type FormationSnapshot = {
  snapshotId: string;
  units: FormationUnit[];
  createdFor: "mock-ui";
};

export type FormationPattern =
  | "front-guard"
  | "backline-focus"
  | "balanced-line"
  | "cross-formation"
  | "assassin-spread";

export type FormationBonus = {
  id: FormationPattern;
  name: string;
  effect: string;
  active: boolean;
  priority: number;
  statModifiers: Partial<Record<keyof StatBlock | "MP_GAIN", number>>;
};

export type ChapterId = 1 | 2 | 3 | 4 | 5;
export type StageType = "normal" | "elite" | "mini-boss" | "main-boss";

export type Chapter = {
  id: ChapterId;
  title: string;
  elementTheme: string;
};

export type StageGenerationMeta = {
  stage_generation_version: string;
  enemy_pool_version: string;
  stage_config_version: string;
};

export type StageNode = {
  stage_id: string;
  chapter: ChapterId;
  stage_number: number;
  global_stage_index: number;
  recommended_level: number;
  recommended_power: number;
  stage_type: StageType;
  enemy_composition_id: string;
  element_theme: string;
  drop_table_id: string;
  first_clear_reward_formula: string;
  star_chest_reward: string;
  unlock_requirement: string;
  stage_generation_version: string;
  enemy_composition_seed: string;
  enemy_pool_version: string;
  stage_config_version: string;
  tutorial_override?: string;
  star_rating: 0 | 1 | 2 | 3;
  locked: boolean;
};

export type Stage = StageNode;

export type EnemyType = "normal" | "elite" | "boss";

export type EnemyConfig = {
  enemy_id: string;
  display_name: string;
  enemy_type: EnemyType;
  element: Element;
  base_stats: StatBlock;
  skill_ids: string[];
};

export type EnemySkillConfig = {
  enemy_skill_id: string;
  display_name: string;
  element: Element;
  target_type: TargetType;
  base_coef: number;
  status_effect: StatusEffect;
};

export type BossConfig = EnemyConfig & {
  boss_id: string;
  chapter: ChapterId;
  anti_player_trait: "none" | "light" | "standard";
};

export type BossSkillConfig = EnemySkillConfig & {
  boss_skill_id: string;
};

export type EnemyComposition = {
  enemy_composition_id: string;
  enemy_ids: string[];
  note: string;
};

export type GearFamily =
  | "sword"
  | "bow"
  | "dagger"
  | "staff"
  | "heavy_armor"
  | "light_armor"
  | "robe"
  | "helmet"
  | "gloves"
  | "boots"
  | "necklace"
  | "ring"
  | "charm";

export type GearSlot =
  | "Weapon"
  | "Armor"
  | "Helmet"
  | "Gloves"
  | "Boots"
  | "Necklace"
  | "Ring"
  | "Charm";

export type EquipmentSlotName = GearSlot;
export type GearTier = 1 | 2;
export type Substat = keyof StatBlock;
export type ItemBindType = "none" | "account_bound" | "character_bound";

export type EquipmentTemplate = {
  gear_template_id: string;
  display_name_th: string;
  family: GearFamily;
  slot: GearSlot;
  tier: GearTier;
  grade: GearGrade;
  required_min_level: number;
  class_restriction: ClassName[] | "any";
  main_stat_type: keyof StatBlock;
  bind_type: ItemBindType;
  schema_only: false;
};

export type EquipmentInstance = {
  gear_instance_id: string;
  gear_template_id: string;
  gear_level_snapshot: number;
  equipped: boolean;
  note?: string;
};

export type EquipmentItem = EquipmentTemplate & EquipmentInstance;

export type GachaPoolEntry = {
  character_id: string;
  grade: Exclude<CharacterGrade, "Epic">;
  ratePercent: number;
  weightWithinGrade: number;
};

export type GachaPityState = {
  pityLimit: 30;
  currentCounter: number;
  guaranteedGrade: "Rare";
  resetOnGrade: "Rare";
};

export type GachaLogPreview = {
  logId: string;
  boxId: string;
  resultCharacterId: string;
  grade: Exclude<CharacterGrade, "Epic">;
  pityCounterBefore: number;
  pityCounterAfter: number;
};

export type GachaBox = {
  id: string;
  name: string;
  enabled: boolean;
  currency: "Free/Test Gem" | "Paid Gem";
  singlePullEnabled: boolean;
  multiPullEnabled: boolean;
  rates: Record<Exclude<CharacterGrade, "Epic">, number>;
  pool: GachaPoolEntry[];
  pityState: GachaPityState;
  pityRule: string;
  paidGemDisabled: boolean;
};

export type InventoryItem = {
  item_id: string;
  display_name: string;
  quantity: number;
  max_stack: number;
};

export type MaterialItem = InventoryItem & {
  material_family: "enhancement_powder" | "shard" | "ticket";
};

export type MailboxItem = {
  mail_id: string;
  title: string;
  claimable: boolean;
  expires_at: string;
};

export type GuildRole = "Leader" | "Officer" | "Member";

export type GuildRolePermission = {
  role: GuildRole;
  permissions: string[];
};

export type GuildBossConfig = {
  boss_id: string;
  entry_rule: string;
  hp_formula: string;
  point_formula: string;
};

export type GuildProfile = {
  name: string;
  level: number;
  memberLimit: 30;
  members: number;
  bossConfig: GuildBossConfig;
  wldGuildRewardEnabled: false;
  rolePermissions: GuildRolePermission[];
};

export type GuildState = GuildProfile & {
  bossEntryRule: string;
  bossHpFormula: string;
  guildPointFormula: string;
};

export type AdminRole =
  | "support_admin"
  | "game_admin"
  | "finance_admin"
  | "owner_admin"
  | "super_admin";
export type RiskSeverity = "low" | "medium" | "high" | "critical";
export type FeatureFlagStatus = "enabled" | "disabled" | "schema-only" | "internal-test";
export type FeatureStatus = FeatureFlagStatus;

export type LaunchGateItem = {
  id: string;
  label: string;
  status: LaunchStatus;
  reason: string;
};

export type ExportChecklistItem = {
  id: string;
  label: string;
  status: ValidationStatus;
};

export type SafetyFlag = {
  id: string;
  label: string;
  status: FeatureFlagStatus;
  detail: string;
};

export type AdminPanel = {
  id: string;
  title: string;
  status: FeatureFlagStatus;
  detail: string;
};

export type ConfigMeta = {
  schema_version: string;
  config_version: string;
  effective_at: string;
  generated_at: string;
  checksum: string;
};

export type ValidationStatus = "pass" | "warn" | "fail" | "not-run";

export type NavTab =
  | "home"
  | "character"
  | "team"
  | "stage"
  | "gacha"
  | "inventory"
  | "guild"
  | "admin";

export type SecondaryScreen =
  | "skills"
  | "battle"
  | "idle"
  | "shop"
  | "export"
  | "launch";

export type ScreenId = NavTab | SecondaryScreen;
