export type InventoryGearGrade = "Common" | "Uncommon" | "Rare" | "Epic";
export type InventoryGearSlot =
  | "Weapon"
  | "Armor"
  | "Helmet"
  | "Gloves"
  | "Boots"
  | "Necklace"
  | "Ring"
  | "Charm";
export type InventoryClassName = "Swordsman" | "Archer" | "Thief" | "Priest" | "Mage";
export type InventoryItemType =
  | "equipment"
  | "material"
  | "consumable"
  | "ticket"
  | "shard"
  | "currency";
export type GearBindType =
  | "none"
  | "account_bound"
  | "character_bound"
  | "account_inventory_unbound";

export type InventoryMaterialStack = {
  item_id: string;
  quantity: number;
  item_type: Exclude<InventoryItemType, "equipment" | "consumable" | "currency">;
};

export type InventoryGearInstance = {
  gear_instance_id: string;
  gear_template_id: string;
  display_name: string;
  grade: InventoryGearGrade;
  tier: 1 | 2;
  slot: InventoryGearSlot;
  family: string;
  gear_level_snapshot: number;
  required_min_level: number;
  class_restriction: InventoryClassName[] | "any";
  main_stat_type: string;
  bind_type: GearBindType;
  equipped: boolean;
  locked: boolean;
  enhance_level: number;
  live_in_v1a: boolean;
};

export type InventoryMailboxPreview = {
  active_mail_count: number;
  max_active_mails: number;
  normal_mail_expiry_days: 30;
  overflow_mail_expiry_days: 7;
};

export type InventoryEngineState = {
  inventory_slots: number;
  used_inventory_slots: number;
  mailbox: InventoryMailboxPreview;
  gear_instances: InventoryGearInstance[];
  equipped_items: Partial<Record<InventoryGearSlot, string>>;
  materials: InventoryMaterialStack[];
  feature_locks: {
    crafting_enabled: boolean;
    set_bonus_enabled: boolean;
    epic_normal_drop_enabled: boolean;
  };
};

export type InventoryActionCharacter = {
  character_id: string;
  class_name: InventoryClassName;
  level: number;
};

export type InventoryRewardItem = {
  item_id: string;
  item_type: InventoryItemType;
  quantity: number;
};

export type InventoryEngineInput = {
  inventory: InventoryEngineState;
  character: InventoryActionCharacter;
  selected_gear_instance_id: string;
  transfer_target_gear_instance_id: string;
  target_enhance_level: number;
  reward_preview_items: InventoryRewardItem[];
};

export type InventoryValidationResult = {
  status: "valid" | "warning" | "invalid";
  errors: string[];
  warnings: string[];
  checked_at: string;
};

export type InventoryUsagePreview = {
  inventory_slots: number;
  used_inventory_slots: number;
  remaining_slots: number;
  usage_percent: number;
  equipment_instance_count: number;
  material_stack_count: number;
};

export type CanAddItemPreview = {
  can_add: boolean;
  required_slots: number;
  remaining_slots_after: number;
  blocked_reason: string | null;
};

export type MailboxOverflowPreview = {
  action: "mailbox_overflow_preview";
  reward_item_count: number;
  required_slots: number;
  available_inventory_slots: number;
  overflow_slots: number;
  can_fit_inventory: boolean;
  can_overflow_to_mailbox: boolean;
  blocked_before_partial_reward: boolean;
  mailbox_count_after_preview: number;
  notes: string[];
};

export type EquipmentActionPreview = {
  action: "equip_preview" | "unequip_preview";
  gear_instance_id: string;
  slot: InventoryGearSlot;
  can_equip?: boolean;
  can_unequip?: boolean;
  blocked_reasons: string[];
  preview_only: true;
};

export type EnhancementBand = {
  label: string;
  min_target: number;
  max_target: number;
  success_rate: number;
  failure_rule: string;
  stone_tier: "Stone Lv1" | "Stone Lv2" | "Stone Lv3" | "Mystic Stone";
  schema_only?: true;
};

export type EnhancementPreview = {
  action: "enhancement_preview";
  gear_instance_id: string;
  current_enhance_level: number;
  target_enhance_level: number;
  success_rate: number;
  failure_rule: string;
  required_stone: string;
  gold_cost: number;
  anti_break_note: string | null;
  materials_spent: Array<{ item_id: string; quantity: number }>;
  log_preview: {
    target_enhance_level: number;
    materials_spent: Array<{ item_id: string; quantity: number }>;
    gold_spent: number;
    success_rate_snapshot: number;
    rng_roll: "placeholder";
    result: "placeholder";
    item_snapshot_before: string;
    item_snapshot_after: string;
  };
  no_wld: true;
  no_paid_gem: true;
  no_ledger: true;
};

export type SalvagePreview = {
  action: "salvage_preview";
  gear_instance_id: string;
  can_salvage: boolean;
  blocked_reasons: string[];
  result_items: Array<{ item_id: string; quantity: number }>;
  log_preview: {
    salvage_log_required_real_system: true;
    destroys_source_item_real_system: true;
    preview_only: true;
    no_wld: true;
    no_paid_gem: true;
    no_ledger: true;
  };
};

export type TransferPreview = {
  action: "transfer_preview";
  source_gear_instance_id: string;
  target_gear_instance_id: string;
  can_transfer: boolean;
  blocked_reasons: string[];
  required_materials: Array<{ item_id: "mat_transfer_stone"; quantity: 1 }>;
  transfer_level_preview: number;
  result_summary: string;
  log_preview: {
    transfer_log_required_real_system: true;
    does_not_duplicate_item: true;
    preview_only: true;
    no_wld: true;
    no_paid_gem: true;
    no_ledger: true;
  };
};

export type InventoryEngineResult = {
  preview_id: string;
  selected_gear: InventoryGearInstance;
  usage: InventoryUsagePreview;
  equip_preview: EquipmentActionPreview;
  unequip_preview: EquipmentActionPreview;
  enhancement_preview: EnhancementPreview;
  salvage_preview: SalvagePreview;
  transfer_preview: TransferPreview;
  mailbox_preview: MailboxOverflowPreview;
  validation: InventoryValidationResult;
  safety_notes: string[];
};
