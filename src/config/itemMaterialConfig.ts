import { createConfigMeta } from "@/config/meta";

const configMeta = createConfigMeta({
  configKey: "item_material_config",
  notes:
    "Item/material config foundation. Fragment conversion is config-only; no inventory backend or conversion engine is implemented.",
  status: "validated_mock",
});

export type ItemTypeExport =
  | "Material"
  | "Consumable"
  | "Ticket"
  | "Character Shard"
  | "Currency";

export type MaterialExportRow = {
  item_id: string;
  display_name_th: string;
  item_type: ItemTypeExport;
  stack_limit: number | "no_inventory_slot";
  live_in_v1a: boolean;
  schema_only: boolean;
  conversion_rule?: string;
  asset_id: string;
  config_version: string;
};

export type FragmentConversionRow = {
  conversion_id: string;
  from_item_id: string;
  from_quantity: number;
  to_item_id: string;
  to_quantity: number;
  live_in_v1a: boolean;
  schema_only: boolean;
  rules: string[];
  config_version: string;
};

export const stackLimitConfig = {
  Material: 9999,
  Consumable: 999,
  Ticket: 999,
  "Character Shard": 9999,
  Currency: "no_inventory_slot",
} as const;

export const materialRows: MaterialExportRow[] = [
  {
    item_id: "mat_stone_lv1",
    display_name_th: "หินเสริมพลัง Lv1",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    asset_id: "icon_mat_stone_lv1",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_stone_lv2",
    display_name_th: "หินเสริมพลัง Lv2",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    asset_id: "icon_mat_stone_lv2",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_stone_lv3_schema",
    display_name_th: "หินเสริมพลัง Lv3",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    asset_id: "icon_mat_stone_lv2",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_mystic_stone_schema",
    display_name_th: "หินลึกลับ",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    asset_id: "icon_mat_stone_lv2",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_enhancement_powder",
    display_name_th: "ผงเสริมพลัง",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    asset_id: "icon_mat_enhancement_powder",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_skill_book",
    display_name_th: "ตำราสกิล",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    asset_id: "icon_mat_skill_book",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_skill_book_fragment",
    display_name_th: "เศษตำราสกิล",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    conversion_rule: "10 fragments convert to mat_skill_book x1",
    asset_id: "icon_mat_skill_book_fragment",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_class_book",
    display_name_th: "ตำราอาชีพ",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    asset_id: "icon_mat_skill_book",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_class_emblem_schema",
    display_name_th: "ตราอาชีพ",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    asset_id: "icon_mat_class_emblem_fragment",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_class_emblem_fragment",
    display_name_th: "เศษตราอาชีพ",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    conversion_rule: "10 fragments convert to mat_class_emblem_schema x1",
    asset_id: "icon_mat_class_emblem_fragment",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_transfer_stone",
    display_name_th: "หินถ่ายโอน",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    asset_id: "icon_mat_transfer_stone",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_antibreak_fragment",
    display_name_th: "เศษเครื่องรางกันแตก",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: true,
    schema_only: false,
    conversion_rule: "20 fragments convert to mat_antibreak_charm_schema x1",
    asset_id: "icon_mat_antibreak_fragment",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_antibreak_charm_schema",
    display_name_th: "เครื่องรางกันแตก",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    asset_id: "icon_antibreak_charm_locked",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_advanced_emblem_schema",
    display_name_th: "ตราขั้นสูง",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    asset_id: "icon_mat_class_emblem_fragment",
    config_version: configMeta.config_version,
  },
  {
    item_id: "mat_advanced_emblem_fragment_schema",
    display_name_th: "เศษตราขั้นสูง",
    item_type: "Material",
    stack_limit: 9999,
    live_in_v1a: false,
    schema_only: true,
    conversion_rule: "20 fragments convert to mat_advanced_emblem_schema x1",
    asset_id: "icon_mat_class_emblem_fragment",
    config_version: configMeta.config_version,
  },
];

export const fragmentConversionRows: FragmentConversionRow[] = [
  {
    conversion_id: "convert_skill_book_fragment_to_skill_book",
    from_item_id: "mat_skill_book_fragment",
    from_quantity: 10,
    to_item_id: "mat_skill_book",
    to_quantity: 1,
    live_in_v1a: true,
    schema_only: false,
    rules: ["conversion consumes fragments", "real system creates conversion_log", "partial fragments remain stored"],
    config_version: configMeta.config_version,
  },
  {
    conversion_id: "convert_class_emblem_fragment_to_class_emblem",
    from_item_id: "mat_class_emblem_fragment",
    from_quantity: 10,
    to_item_id: "mat_class_emblem_schema",
    to_quantity: 1,
    live_in_v1a: false,
    schema_only: true,
    rules: ["conversion consumes fragments", "real system creates conversion_log", "partial fragments remain stored"],
    config_version: configMeta.config_version,
  },
  {
    conversion_id: "convert_antibreak_fragment_to_antibreak_charm",
    from_item_id: "mat_antibreak_fragment",
    from_quantity: 20,
    to_item_id: "mat_antibreak_charm_schema",
    to_quantity: 1,
    live_in_v1a: false,
    schema_only: true,
    rules: ["conversion consumes fragments", "real system creates conversion_log", "partial fragments remain stored"],
    config_version: configMeta.config_version,
  },
  {
    conversion_id: "convert_advanced_emblem_fragment_to_advanced_emblem",
    from_item_id: "mat_advanced_emblem_fragment_schema",
    from_quantity: 20,
    to_item_id: "mat_advanced_emblem_schema",
    to_quantity: 1,
    live_in_v1a: false,
    schema_only: true,
    rules: [
      "conversion consumes fragments",
      "real system creates conversion_log",
      "Advanced Emblem remains schema/future unless feature flag enables it",
    ],
    config_version: configMeta.config_version,
  },
];

export const salvageConfig = {
  live_in_v1a: true,
  returns: {
    Common: { item_id: "mat_enhancement_powder", quantity: 10 },
    Uncommon: { item_id: "mat_enhancement_powder", quantity: 25 },
    Rare: { item_id: "mat_enhancement_powder", quantity: 60 },
    Epic: { item_id: "mat_enhancement_powder", quantity: 150, schema_only: true },
  },
  rules: [
    "Salvage is live in V1A",
    "Crafting is disabled/schema only in V1A",
    "Salvage destroys source item in real system",
    "Real system must create salvage_log",
    "equipped/locked items cannot be salvaged",
    "this phase is local/mock config only",
  ],
} as const;

export const itemMaterialConfig = {
  ...configMeta,
  export_id: "item_material_config",
  stackLimitConfig,
  materialRows,
  materialIds: materialRows.map((row) => row.item_id),
  fragmentConversionRows,
  fragmentConversion: fragmentConversionRows,
  salvage: salvageConfig,
  mailboxRoutingRules: {
    wld_or_ledger_reward_uses_mailbox: false,
    note: "No WLD/ledger item is routed to mailbox in V1A config foundation.",
  },
} as const;
