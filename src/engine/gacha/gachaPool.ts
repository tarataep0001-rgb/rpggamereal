import type { GachaDeterministicRng } from "./gachaRng";
import type { GachaGrade, GachaInput, GachaRollResult } from "./gachaTypes";

export function resolveGradeRoll(input: {
  rates: Record<GachaGrade, number>;
  rng: GachaDeterministicRng;
}): { grade: GachaGrade; roll: number } {
  const roll = input.rng.nextFloat() * 100;

  if (roll < input.rates.Common) {
    return { grade: "Common", roll };
  }

  if (roll < input.rates.Common + input.rates.Uncommon) {
    return { grade: "Uncommon", roll };
  }

  return { grade: "Rare", roll };
}

export function resolveCharacterRoll(input: {
  grade: GachaGrade;
  gachaInput: GachaInput;
  rng: GachaDeterministicRng;
}): GachaRollResult {
  const entries = input.gachaInput.box.pool.filter((entry) => entry.grade === input.grade);
  const rollIndex = input.rng.nextInt(entries.length);
  const selectedEntry = entries[rollIndex] ?? entries[0];
  const character = input.gachaInput.character_pool.find(
    (candidate) => candidate.character_id === selectedEntry.character_id,
  );

  if (!selectedEntry || !character) {
    throw new Error(`Missing gacha character for grade ${input.grade}.`);
  }

  return {
    grade: input.grade,
    character_id: selectedEntry.character_id,
    character,
    grade_roll: null,
    character_roll_index: rollIndex,
    guaranteed_by_pity: false,
  };
}
