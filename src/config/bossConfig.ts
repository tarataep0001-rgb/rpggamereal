import { createConfigMeta } from "@/config/meta";
import type { ChapterId, Element, StageType } from "@/types/game";

const configMeta = createConfigMeta({
  configKey: "boss_config",
  notes:
    "Boss config exports exactly 15 V1A bosses. Trait rows are paired with boss skill rows; no battle engine is implemented.",
  status: "validated_mock",
});

export type BossExportRow = {
  boss_id: string;
  display_name_th: string;
  chapter: ChapterId;
  stage_id: string;
  boss_type: Extract<StageType, "mini-boss" | "main-boss">;
  element: Element;
  role: string;
  multiplier_band: string;
  trait: string;
  phase_rules: string[];
  skill_list: string[];
  summon_rule: string;
  rage_rule: string;
  drop_table_id: string;
  asset_id: string;
  live_in_v1a: true;
  schema_only: false;
  config_version: string;
};

const bossSeedRows = [
  ["boss_ch1_10_main", "ราชาหมาป่าเพลิง", 1, "1-10", "main-boss", "Fire", "tutorial main boss", "no heavy anti-player trait"],
  ["boss_ch2_10_mini", "ผู้คุมลุ่มน้ำ", 2, "2-10", "mini-boss", "Water", "river guard mini-boss", "minor sustain pressure"],
  ["boss_ch2_20_main", "เจ้าแห่งเถ้าธารา", 2, "2-20", "main-boss", "Fire", "ash river main boss", "burn pressure"],
  ["boss_ch3_10_mini", "ผู้พิทักษ์หิน", 3, "3-10", "mini-boss", "Earth", "stone tank mini-boss", "high DEF"],
  ["boss_ch3_20_mini", "เงาลมลอบโจมตี", 3, "3-20", "mini-boss", "Wind", "assassin mini-boss", "backline pressure"],
  ["boss_ch3_30_main", "มหาศิลาแห่งหุบเขา", 3, "3-30", "main-boss", "Earth", "stone valley main boss", "control pressure"],
  ["boss_ch4_10_mini", "นักเวทย์บึงน้ำ", 4, "4-10", "mini-boss", "Water", "water mage mini-boss", "magic damage"],
  ["boss_ch4_20_mini", "หินพิทักษ์ธารา", 4, "4-20", "mini-boss", "Earth", "guardian mini-boss", "shield pressure"],
  ["boss_ch4_30_mini", "ผู้อัญเชิญบึง", 4, "4-30", "mini-boss", "Earth", "summoner mini-boss", "summon placeholder"],
  ["boss_ch4_40_main", "เจ้าบึงธาราหิน", 4, "4-40", "main-boss", "Water", "swamp stone main boss", "phase sustain"],
  ["boss_ch5_10_mini", "อัศวินแสง", 5, "5-10", "mini-boss", "Light", "light mini-boss", "balanced light pressure"],
  ["boss_ch5_20_mini", "เงาวิหาร", 5, "5-20", "mini-boss", "Dark", "dark mini-boss", "debuff pressure"],
  ["boss_ch5_30_mini", "ผู้รักษาแสง", 5, "5-30", "mini-boss", "Light", "healer mini-boss", "healing pressure"],
  ["boss_ch5_40_mini", "ผู้คุมเงา", 5, "5-40", "mini-boss", "Dark", "controller mini-boss", "control pressure"],
  ["boss_ch5_50_main", "เจ้าแสงและเงา", 5, "5-50", "main-boss", "Dark", "chapter 5 main boss", "light/dark phase pressure"],
] as const;

function dropTableId(chapter: ChapterId, bossType: "mini-boss" | "main-boss") {
  return bossType === "mini-boss" ? `drop_ch${chapter}_mini_boss` : `drop_ch${chapter}_main_boss`;
}

function bossAssetId(chapter: ChapterId, bossType: "mini-boss" | "main-boss") {
  return `portrait_boss_ch${chapter}_${bossType === "mini-boss" ? "mini" : "main"}`;
}

function skillIds(bossId: string, bossType: "mini-boss" | "main-boss") {
  const base = [`${bossId}_basic_attack`, `${bossId}_signature_skill`, `${bossId}_phase_skill`];
  return bossType === "main-boss" ? [...base, `${bossId}_rage_skill`] : base;
}

export const bossRows: BossExportRow[] = bossSeedRows.map(
  ([boss_id, display_name_th, chapter, stage_id, boss_type, element, role, trait]) => ({
    boss_id,
    display_name_th,
    chapter,
    stage_id,
    boss_type,
    element,
    role,
    multiplier_band: boss_type === "main-boss" ? "main_boss_v1a_1.60_to_2.20" : "mini_boss_v1a_1.25_to_1.55",
    trait,
    phase_rules: ["phase_70", "phase_40", "phase_20"],
    skill_list: skillIds(boss_id, boss_type),
    summon_rule: boss_id.includes("summoner") || boss_id.includes("ch4_30") ? "schema placeholder optional minions" : "none",
    rage_rule: boss_type === "main-boss" ? "phase_20 enables rage_skill" : "none",
    drop_table_id: dropTableId(chapter, boss_type),
    asset_id: bossAssetId(chapter, boss_type),
    live_in_v1a: true,
    schema_only: false,
    config_version: configMeta.config_version,
  }),
);

export const bossConfig = {
  ...configMeta,
  export_id: "boss_config",
  rows: bossRows,
  bossCount: bossRows.length,
} as const;
