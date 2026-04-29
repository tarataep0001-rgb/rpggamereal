import { gachaConfig } from "../../config/gachaConfig";
import { ACTIVE_SOURCE_SPEC } from "../../config/meta";
import { box1GachaCharacters } from "../../data/mockCharacters";
import { gachaBoxes } from "../../data/mockGacha";
import type { GachaInput, GachaRosterEntry } from "./gachaTypes";
import { GACHA_CONFIG_VERSION } from "./gachaRules";

type MockGachaInputOptions = {
  seed?: string;
  pullsSinceLastRare?: number;
  ownedCharacterIds?: string[];
  state?: {
    teammates: Array<{
      characterId: string;
      grade?: string;
      star: number;
      shardsOwned: number;
      unlocked: boolean;
    }>;
    gacha: {
      pity: {
        pullsSinceLastRare: number;
      };
    };
    player: {
      freeGem: number;
    };
  };
};

function createRoster(options: MockGachaInputOptions): GachaRosterEntry[] {
  const ownedIds = new Set(
    options.state
      ? options.state.teammates.filter((teammate) => teammate.unlocked).map((teammate) => teammate.characterId)
      : options.ownedCharacterIds ?? ["ch_common_priest_light_aid"],
  );

  return box1GachaCharacters.map((character) => {
    const savedEntry = options.state?.teammates.find((teammate) => teammate.characterId === character.id);

    return {
      character_id: character.id,
      grade: character.grade === "Epic" ? "Rare" : character.grade,
      current_star: normalizeStar(savedEntry?.star ?? (character.star === "none-v1a" ? 0 : character.star)),
      shards_owned: savedEntry?.shardsOwned ?? character.shardState.owned,
      unlocked: ownedIds.has(character.id),
    };
  });
}

function normalizeStar(value: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (value <= 0) return 0;
  if (value >= 5) return 5;
  return value as 1 | 2 | 3 | 4;
}

export function createMockGachaInput(options: MockGachaInputOptions = {}): GachaInput {
  const box = gachaBoxes.find((candidate) => candidate.id === "box_1_v1a") ?? gachaBoxes[0];
  const pullsSinceLastRare =
    options.pullsSinceLastRare ?? options.state?.gacha.pity.pullsSinceLastRare ?? box.pityState.currentCounter;
  const freeTestGem = options.state?.player.freeGem ?? 1240;

  return {
    box,
    seed: options.seed ?? `phase21-local-mock-${pullsSinceLastRare}`,
    pity_state: {
      pulls_since_last_rare: pullsSinceLastRare,
      pity_limit: 30,
    },
    currency_state: {
      free_test_gem: freeTestGem,
      paid_gem: 0,
    },
    roster: createRoster(options),
    character_pool: box1GachaCharacters.map((character) => ({
      character_id: character.id,
      display_name: character.displayName,
      display_name_th: character.displayNameTh,
      grade: character.grade === "Epic" ? "Rare" : character.grade,
      element: character.element,
      class_name: character.baseClass,
      role: character.role,
      asset_id: character.id,
    })),
    config_versions: {
      gacha_config: GACHA_CONFIG_VERSION,
      source_spec: ACTIVE_SOURCE_SPEC,
    },
    mode: "local_mock_preview",
  };
}

export const mockGachaEngineInput = createMockGachaInput({
  seed: "phase21-gacha-seed",
  pullsSinceLastRare: gachaConfig.box1.pity_limit - 1,
});
