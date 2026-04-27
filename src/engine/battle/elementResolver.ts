import type { Element } from "../../types/game";

const advantage: Partial<Record<Element, Element>> = {
  Fire: "Wind",
  Wind: "Earth",
  Earth: "Water",
  Water: "Fire",
};

export function getElementModifier(attacker: Element, defender: Element): number {
  if (attacker === "Neutral" || defender === "Neutral") return 1;
  if ((attacker === "Light" && defender === "Dark") || (attacker === "Dark" && defender === "Light")) return 1.5;
  if (advantage[attacker] === defender) return 1.25;
  if (advantage[defender] === attacker) return 0.75;
  return 1;
}

export function formatElementModifier(modifier: number) {
  return `${modifier.toFixed(2)}x`;
}
