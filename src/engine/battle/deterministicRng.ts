export type DeterministicRng = {
  nextFloat(): number;
  rollPercent(chancePercent: number): boolean;
  nextInt(maxExclusive: number): number;
};

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function createDeterministicRng(seed: string): DeterministicRng {
  let state = hashSeed(seed) || 1;

  function nextRaw() {
    state = Math.imul(1664525, state) + 1013904223;
    return state >>> 0;
  }

  return {
    nextFloat() {
      return nextRaw() / 0x100000000;
    },
    rollPercent(chancePercent: number) {
      return this.nextFloat() * 100 < chancePercent;
    },
    nextInt(maxExclusive: number) {
      if (maxExclusive <= 0) return 0;
      return Math.floor(this.nextFloat() * maxExclusive);
    },
  };
}
