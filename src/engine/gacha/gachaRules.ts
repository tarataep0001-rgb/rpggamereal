import { gachaConfig, V1A_GACHA_PITY_LIMIT } from "../../config/gachaConfig";
import type { GachaGrade } from "./gachaTypes";

export const GACHA_GRADES: readonly GachaGrade[] = ["Common", "Uncommon", "Rare"];

export const GACHA_DUPLICATE_SHARDS: Record<GachaGrade, number> = {
  Common: 5,
  Uncommon: 10,
  Rare: 20,
};

export const GACHA_STAR_REQUIREMENTS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 20,
  2: 40,
  3: 80,
  4: 120,
  5: 200,
};

export const GACHA_PITY_LIMIT = V1A_GACHA_PITY_LIMIT;
export const GACHA_CONFIG_VERSION = gachaConfig.config_version;
export const GACHA_SOURCE_SPEC = gachaConfig.source_spec;
