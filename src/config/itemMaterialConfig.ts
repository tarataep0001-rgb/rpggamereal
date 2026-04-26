import { createConfigMeta } from "@/config/meta";

export const itemMaterialConfig = {
  ...createConfigMeta({
    configKey: "item_material_config",
    notes:
      "Item/material export skeleton for V1A and later schema-only materials. No inventory backend is implemented.",
  }),
  export_id: "item_material_config",
  materialIds: [
    "mat_stone_lv1",
    "mat_stone_lv2",
    "mat_stone_lv3_schema",
    "mat_mystic_stone_schema",
    "mat_enhancement_powder",
    "mat_skill_book",
    "mat_skill_book_fragment",
    "mat_class_book",
    "mat_class_emblem_fragment",
    "mat_transfer_stone",
    "mat_antibreak_fragment",
    "mat_antibreak_charm_schema",
  ],
  fragmentConversion: [
    { from: "Skill Book Fragment", count: 10, to: "Skill Book x1" },
    { from: "Class Emblem Fragment", count: 10, to: "Class Emblem x1" },
    { from: "Anti-break Fragment", count: 20, to: "Anti-break Charm x1" },
    { from: "Advanced Emblem Fragment", count: 20, to: "Advanced Emblem x1" },
  ],
  salvage: {
    Common: "Enhancement Powder x10",
    Uncommon: "Enhancement Powder x25",
    Rare: "Enhancement Powder x60",
  },
} as const;
