import type {
  InventoryActionCharacter,
  InventoryEngineInput,
  InventoryEngineState,
  InventoryGearInstance,
} from "./inventoryTypes";

const starterSword: InventoryGearInstance = {
  gear_instance_id: "gear_inst_starter_sword_001",
  gear_template_id: "gear_sword_t1_common",
  display_name: "ดาบเหล็กฝึกหัด",
  family: "sword",
  slot: "Weapon",
  tier: 1,
  grade: "Common",
  gear_level_snapshot: 12,
  required_min_level: 1,
  class_restriction: ["Swordsman"],
  main_stat_type: "ATK",
  bind_type: "account_inventory_unbound",
  equipped: true,
  locked: true,
  enhance_level: 0,
  live_in_v1a: true,
};

const bowPreview: InventoryGearInstance = {
  gear_instance_id: "gear_inst_bow_002",
  gear_template_id: "gear_bow_t1_common",
  display_name: "ธนูเหล็กฝึกหัด",
  family: "bow",
  slot: "Weapon",
  tier: 1,
  grade: "Common",
  gear_level_snapshot: 8,
  required_min_level: 1,
  class_restriction: ["Archer"],
  main_stat_type: "ATK",
  bind_type: "account_bound",
  equipped: false,
  locked: false,
  enhance_level: 10,
  live_in_v1a: true,
};

const staffPreview: InventoryGearInstance = {
  gear_instance_id: "gear_inst_staff_003",
  gear_template_id: "gear_staff_t1_common",
  display_name: "คทาเหล็กฝึกหัด",
  family: "staff",
  slot: "Weapon",
  tier: 1,
  grade: "Common",
  gear_level_snapshot: 9,
  required_min_level: 1,
  class_restriction: ["Priest", "Mage"],
  main_stat_type: "MAG",
  bind_type: "account_bound",
  equipped: false,
  locked: false,
  enhance_level: 6,
  live_in_v1a: true,
};

const lockedArmor: InventoryGearInstance = {
  gear_instance_id: "gear_inst_heavy_armor_004",
  gear_template_id: "gear_heavy_armor_t1_common",
  display_name: "เกราะหนักเหล็กฝึกหัด",
  family: "heavy_armor",
  slot: "Armor",
  tier: 1,
  grade: "Common",
  gear_level_snapshot: 10,
  required_min_level: 1,
  class_restriction: ["Swordsman"],
  main_stat_type: "DEF",
  bind_type: "account_bound",
  equipped: false,
  locked: true,
  enhance_level: 0,
  live_in_v1a: true,
};

export const mockInventoryEngineState: InventoryEngineState = {
  inventory_slots: 100,
  used_inventory_slots: 99,
  mailbox: {
    active_mail_count: 3,
    max_active_mails: 100,
    normal_mail_expiry_days: 30,
    overflow_mail_expiry_days: 7,
  },
  equipped_items: {
    Weapon: starterSword.gear_instance_id,
  },
  gear_instances: [starterSword, bowPreview, staffPreview, lockedArmor],
  materials: [
    { item_id: "mat_stone_lv1", quantity: 128, item_type: "material" },
    { item_id: "mat_stone_lv2", quantity: 36, item_type: "material" },
    { item_id: "mat_enhancement_powder", quantity: 420, item_type: "material" },
    { item_id: "mat_transfer_stone", quantity: 2, item_type: "material" },
    { item_id: "mat_antibreak_fragment", quantity: 19, item_type: "material" },
  ],
  feature_locks: {
    crafting_enabled: false,
    set_bonus_enabled: false,
    epic_normal_drop_enabled: false,
  },
};

export const mockInventoryCharacter: InventoryActionCharacter = {
  character_id: "main_hero",
  class_name: "Swordsman",
  level: 12,
};

export function createMockInventoryInput(): InventoryEngineInput {
  return {
    inventory: mockInventoryEngineState,
    character: mockInventoryCharacter,
    selected_gear_instance_id: bowPreview.gear_instance_id,
    transfer_target_gear_instance_id: staffPreview.gear_instance_id,
    target_enhance_level: 11,
    reward_preview_items: [
      {
        item_id: "gear_ring_t1_common_preview",
        item_type: "equipment",
        quantity: 1,
      },
      {
        item_id: "gear_charm_t1_common_preview",
        item_type: "equipment",
        quantity: 1,
      },
      {
        item_id: "gold_preview",
        item_type: "currency",
        quantity: 500,
      },
    ],
  };
}
