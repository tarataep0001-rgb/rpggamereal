import { mockPlayer } from "@/data/mockPlayer";

export const mockIdle = {
  idleStage: mockPlayer.idleStage,
  highestThreeStarStage: mockPlayer.idleStage,
  idleStageGlobalIndex: 5,
  maxIdleHours: 8,
  accumulatedHours: 5.5,
  xpReady: 1240,
  goldReady: 2180,
  materialPreview: [
    { item_id: "mat_stone_lv1", display_name: "Stone Lv1", quantity: 8 },
    {
      item_id: "mat_enhancement_powder",
      display_name: "Enhancement Powder",
      quantity: 22,
    },
    {
      item_id: "mat_skill_book_fragment",
      display_name: "Skill Book Fragment",
      quantity: 3,
    },
    { item_id: "mock_gear_chest", display_name: "Gear Chest mock chance", quantity: 1 },
  ],
  autoFarmFreePerDay: 2,
  autoFarmUsedToday: 1,
  extraAutoFarmPrices: [20, 40, 60, 80, 100, 120],
  deployedTeamSnapshot: [
    {
      character_id: "main_hero",
      display_name: "Hero",
      cell_id: "front_center",
      xp_share_percent: 100,
      capped: false,
    },
    {
      character_id: "ch_common_priest_light_aid",
      display_name: "Light Aid Priest",
      cell_id: "back_center",
      xp_share_percent: 100,
      capped: false,
    },
    {
      character_id: "ch_common_archer_wind_shot",
      display_name: "Wind Shot Archer",
      cell_id: "back_top",
      xp_share_percent: 100,
      capped: false,
    },
  ],
  undeployedPreview: [
    {
      character_id: "ch_common_thief_dark_cut",
      display_name: "Dark Cut Thief",
      xp_share_percent: 0,
    },
  ],
  safetyNotes: [
    "ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น",
    "ระบบจริงต้องคำนวณจาก server/config version",
    "ไม่มี WLD Reward ใน V1A",
    "ยังไม่มีการรัน simulation จริง",
  ],
} as const;
