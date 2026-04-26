import type {
  ClassName,
  EquipmentInstance,
  EquipmentItem,
  EquipmentTemplate,
  GearFamily,
  GearGrade,
  GearSlot,
  GearTier,
  StatBlock,
} from "@/types/game";

type GearFamilyMeta = {
  family: GearFamily;
  slot: GearSlot;
  displayNameTh: string;
  classRestriction: ClassName[] | "any";
  mainStatType: keyof StatBlock;
};

const familyMeta: GearFamilyMeta[] = [
  { family: "sword", slot: "Weapon", displayNameTh: "ดาบ", classRestriction: ["Swordsman"], mainStatType: "ATK" },
  { family: "bow", slot: "Weapon", displayNameTh: "ธนู", classRestriction: ["Archer"], mainStatType: "ATK" },
  { family: "dagger", slot: "Weapon", displayNameTh: "มีดสั้น", classRestriction: ["Thief"], mainStatType: "ATK" },
  { family: "staff", slot: "Weapon", displayNameTh: "คทา", classRestriction: ["Priest", "Mage"], mainStatType: "MAG" },
  { family: "heavy_armor", slot: "Armor", displayNameTh: "เกราะหนัก", classRestriction: ["Swordsman"], mainStatType: "DEF" },
  { family: "light_armor", slot: "Armor", displayNameTh: "เกราะเบา", classRestriction: ["Archer", "Thief"], mainStatType: "EVA" },
  { family: "robe", slot: "Armor", displayNameTh: "เสื้อคลุม", classRestriction: ["Priest", "Mage"], mainStatType: "RES" },
  { family: "helmet", slot: "Helmet", displayNameTh: "หมวก", classRestriction: "any", mainStatType: "HP" },
  { family: "gloves", slot: "Gloves", displayNameTh: "ถุงมือ", classRestriction: "any", mainStatType: "ACC" },
  { family: "boots", slot: "Boots", displayNameTh: "รองเท้า", classRestriction: "any", mainStatType: "SPD" },
  { family: "necklace", slot: "Necklace", displayNameTh: "สร้อยคอ", classRestriction: "any", mainStatType: "RES" },
  { family: "ring", slot: "Ring", displayNameTh: "แหวน", classRestriction: "any", mainStatType: "CRIT" },
  { family: "charm", slot: "Charm", displayNameTh: "เครื่องราง", classRestriction: "any", mainStatType: "CRIT_DMG" },
];

const tiers: GearTier[] = [1, 2];
const grades: GearGrade[] = ["Common", "Uncommon", "Rare"];

export const equipmentSlots: GearSlot[] = [
  "Weapon",
  "Armor",
  "Helmet",
  "Gloves",
  "Boots",
  "Necklace",
  "Ring",
  "Charm",
];

export const equipmentTemplates: EquipmentTemplate[] = familyMeta.flatMap((meta) =>
  tiers.flatMap((tier) =>
    grades.map((grade) => ({
      gear_template_id: `gear_${meta.family}_t${tier}_${grade.toLowerCase()}`,
      display_name_th: `${meta.displayNameTh} T${tier} ${grade}`,
      family: meta.family,
      slot: meta.slot,
      tier,
      grade,
      required_min_level: tier === 1 ? 1 : 31,
      class_restriction: meta.classRestriction,
      main_stat_type: meta.mainStatType,
      bind_type: "account_bound",
      schema_only: false,
    })),
  ),
);

export const equipmentInstances: EquipmentInstance[] = [
  {
    gear_instance_id: "inst_hero_sword_001",
    gear_template_id: "gear_sword_t1_common",
    gear_level_snapshot: 12,
    equipped: true,
    note: "Starter weapon",
  },
  {
    gear_instance_id: "inst_hero_armor_001",
    gear_template_id: "gear_heavy_armor_t1_common",
    gear_level_snapshot: 10,
    equipped: true,
  },
  {
    gear_instance_id: "inst_ring_001",
    gear_template_id: "gear_ring_t1_uncommon",
    gear_level_snapshot: 8,
    equipped: false,
  },
];

export const mockEquipment: EquipmentItem[] = equipmentInstances.flatMap((instance) => {
  const template = equipmentTemplates.find(
    (item) => item.gear_template_id === instance.gear_template_id,
  );

  return template ? [{ ...template, ...instance }] : [];
});

export const stackRules = [
  "Equipment no stack",
  "Materials 9999",
  "Consumables 999",
  "Tickets 999",
  "Shards 9999",
  "Currency no inventory slot",
];

export const salvageRules: Record<GearGrade, string> = {
  Common: "Enhancement Powder x10",
  Uncommon: "Enhancement Powder x25",
  Rare: "Enhancement Powder x60",
};

export const equipmentSystemLocks = {
  crafting: "disabled/schema only in V1A",
  setBonus: "disabled/schema only in V1A",
};
