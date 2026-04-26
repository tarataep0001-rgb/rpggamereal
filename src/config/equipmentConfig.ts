import { createConfigMeta } from "@/config/meta";
import { equipmentTemplates } from "@/data/mockEquipment";

export const equipmentConfig = {
  ...createConfigMeta({
    configKey: "equipment_config",
    notes:
      "Equipment export foundation references generated 78 V1A templates. Epic, crafting, and set bonus are disabled/schema-only.",
  }),
  export_id: "equipment_config",
  families: [
    "sword",
    "bow",
    "dagger",
    "staff",
    "heavy_armor",
    "light_armor",
    "robe",
    "helmet",
    "gloves",
    "boots",
    "necklace",
    "ring",
    "charm",
  ],
  slots: ["Weapon", "Armor", "Helmet", "Gloves", "Boots", "Necklace", "Ring", "Charm"],
  tiers: [
    { tier: 1, chapterRange: "Chapter 1-3" },
    { tier: 2, chapterRange: "Chapter 4-5" },
  ],
  liveGrades: ["Common", "Uncommon", "Rare"],
  disabled: {
    epicNormalDrop: true,
    setBonusSchemaOnly: true,
    craftingSchemaOnly: true,
  },
  gearRule: {
    gear_template_id: "family + tier + grade",
    gearInstanceStores: "gear_level_snapshot",
    equipmentMainStatUses: "RequiredLevel = gear_level_snapshot",
  },
  templateCount: equipmentTemplates.length,
  templateIds: equipmentTemplates.map((template) => template.gear_template_id),
} as const;
