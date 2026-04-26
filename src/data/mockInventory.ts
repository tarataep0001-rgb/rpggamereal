import { equipmentTemplates } from "@/data/mockEquipment";
import type { GearGrade, GearSlot, StatBlock, Substat } from "@/types/game";

export type InventoryGearItem = {
  gear_instance_id: string;
  gear_template_id: string;
  display_name: string;
  grade: GearGrade;
  tier: 1 | 2;
  slot: GearSlot;
  family: string;
  gear_level_snapshot: number;
  main_stat_type: keyof StatBlock;
  bind_state: "account_inventory_unbound" | "account_bound" | "character_bound";
  equipped: boolean;
  locked: boolean;
  substats: Array<{ stat: Substat; value: number }>;
  note: string;
};

export type InventoryMaterial = {
  item_id: string;
  display_name: string;
  quantity: number;
  max_stack: number;
  item_type: "material" | "ticket" | "shard";
  asset_id: string;
};

export type MailboxPreviewItem = {
  mail_id: string;
  title: string;
  source: "normal" | "overflow";
  attachment: string;
  expires_in_days: number;
  claimable: boolean;
};

function requireTemplate(gearTemplateId: string) {
  const template = equipmentTemplates.find(
    (item) => item.gear_template_id === gearTemplateId,
  );

  if (!template) {
    throw new Error(`Missing mock equipment template: ${gearTemplateId}`);
  }

  return template;
}

function gear(
  gearTemplateId: string,
  gearInstanceId: string,
  gearLevelSnapshot: number,
  options: {
    equipped?: boolean;
    locked?: boolean;
    bindState?: InventoryGearItem["bind_state"];
    substats: InventoryGearItem["substats"];
    note: string;
  },
): InventoryGearItem {
  const template = requireTemplate(gearTemplateId);

  return {
    gear_instance_id: gearInstanceId,
    gear_template_id: template.gear_template_id,
    display_name: template.display_name_th,
    grade: template.grade,
    tier: template.tier,
    slot: template.slot,
    family: template.family,
    gear_level_snapshot: gearLevelSnapshot,
    main_stat_type: template.main_stat_type,
    bind_state: options.bindState ?? "account_bound",
    equipped: options.equipped ?? false,
    locked: options.locked ?? false,
    substats: options.substats,
    note: options.note,
  };
}

export const mockInventory = {
  inventorySlots: 100,
  usedInventorySlots: 32,
  mailboxCount: 3,
  mailboxMaxActive: 100,
  normalMailExpiryDays: 30,
  overflowMailExpiryDays: 7,
  equippedItems: [
    gear("gear_sword_t1_common", "gear_inst_starter_sword_001", 12, {
      equipped: true,
      locked: true,
      bindState: "account_inventory_unbound",
      substats: [
        { stat: "ATK", value: 4 },
        { stat: "ACC", value: 2 },
      ],
      note: "V1A starter weapon equipped before stage 1-1.",
    }),
  ],
  gearInstances: [
    gear("gear_sword_t1_common", "gear_inst_starter_sword_001", 12, {
      equipped: true,
      locked: true,
      bindState: "account_inventory_unbound",
      substats: [
        { stat: "ATK", value: 4 },
        { stat: "ACC", value: 2 },
      ],
      note: "Equipped starter weapon.",
    }),
    gear("gear_bow_t1_common", "gear_inst_bow_002", 8, {
      substats: [
        { stat: "ATK", value: 3 },
        { stat: "CRIT", value: 1 },
      ],
      note: "Common backline weapon preview.",
    }),
    gear("gear_staff_t1_common", "gear_inst_staff_003", 9, {
      substats: [
        { stat: "MAG", value: 4 },
        { stat: "RES", value: 2 },
      ],
      note: "Priest/Mage starter-family weapon.",
    }),
    gear("gear_heavy_armor_t1_common", "gear_inst_heavy_armor_004", 10, {
      locked: true,
      substats: [
        { stat: "DEF", value: 3 },
        { stat: "HP", value: 25 },
      ],
      note: "Locked item cannot be salvaged.",
    }),
    gear("gear_light_armor_t1_uncommon", "gear_inst_light_armor_005", 14, {
      substats: [
        { stat: "EVA", value: 3 },
        { stat: "SPD", value: 1 },
      ],
      note: "Uncommon armor example.",
    }),
    gear("gear_ring_t2_rare", "gear_inst_ring_006", 34, {
      substats: [
        { stat: "CRIT", value: 4 },
        { stat: "ACC", value: 4 },
      ],
      note: "Tier 2 rare accessory for Chapter 4-5 preview.",
    }),
    gear("gear_charm_t2_rare", "gear_inst_charm_007", 38, {
      substats: [
        { stat: "CRIT_DMG", value: 8 },
        { stat: "RES", value: 5 },
      ],
      note: "Tier 2 rare charm preview.",
    }),
  ],
  materials: [
    {
      item_id: "mat_stone_lv1",
      display_name: "Stone Lv1",
      quantity: 128,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_stone_lv1",
    },
    {
      item_id: "mat_stone_lv2",
      display_name: "Stone Lv2",
      quantity: 36,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_stone_lv2",
    },
    {
      item_id: "mat_enhancement_powder",
      display_name: "Enhancement Powder",
      quantity: 420,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_enhancement_powder",
    },
    {
      item_id: "mat_skill_book",
      display_name: "Skill Book",
      quantity: 4,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_skill_book",
    },
    {
      item_id: "mat_skill_book_fragment",
      display_name: "Skill Book Fragment",
      quantity: 67,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_skill_book_fragment",
    },
    {
      item_id: "mat_class_emblem_fragment",
      display_name: "Class Emblem Fragment",
      quantity: 12,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_class_emblem_fragment",
    },
    {
      item_id: "mat_transfer_stone",
      display_name: "Transfer Stone",
      quantity: 2,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_transfer_stone",
    },
    {
      item_id: "mat_antibreak_fragment",
      display_name: "Anti-break Fragment",
      quantity: 19,
      max_stack: 9999,
      item_type: "material",
      asset_id: "icon_mat_antibreak_fragment",
    },
  ] satisfies InventoryMaterial[],
  tickets: [
    {
      item_id: "ticket_box1_single",
      display_name: "Box 1 Single Ticket",
      quantity: 3,
      max_stack: 999,
      item_type: "ticket",
      asset_id: "icon_gacha_box_1",
    },
  ] satisfies InventoryMaterial[],
  shards: [
    {
      item_id: "shard_ch_common_priest_light_aid",
      display_name: "Priest Light Aid Shard",
      quantity: 14,
      max_stack: 9999,
      item_type: "shard",
      asset_id: "portrait_starter_priest_light",
    },
  ] satisfies InventoryMaterial[],
  mailboxPreview: [
    {
      mail_id: "mail_login_001",
      title: "Daily login mock reward",
      source: "normal",
      attachment: "Gold x500",
      expires_in_days: 30,
      claimable: true,
    },
    {
      mail_id: "mail_overflow_002",
      title: "Inventory overflow item",
      source: "overflow",
      attachment: "Stone Lv1 x12",
      expires_in_days: 7,
      claimable: true,
    },
    {
      mail_id: "mail_notice_003",
      title: "Prototype notice",
      source: "normal",
      attachment: "No attachment",
      expires_in_days: 30,
      claimable: false,
    },
  ] satisfies MailboxPreviewItem[],
} as const;
