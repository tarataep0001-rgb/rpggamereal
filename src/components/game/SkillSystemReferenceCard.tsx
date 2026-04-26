import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const normalAttackRules = [
  "NormalAttackCoef = 1.00",
  "NormalAttackType = physical_damage",
  "Uses ATK",
  "Element = character element if available, otherwise neutral",
  "Grants +20 MP",
  "Can crit/miss unless config says otherwise",
];

const mpCooldownRules = [
  "MaxMP = 100",
  "Battle Start MP = 0",
  "MP cannot exceed MaxMP",
  "All unlocked/equipped skills start cooldown 0 unless initial_cooldown configured",
  "Cooldown starts after use",
  "Cooldown decreases when owner finishes own action",
];

type SkillSystemReferenceCardProps = {
  type: "normal-attack" | "mp-cooldown";
};

export function SkillSystemReferenceCard({ type }: SkillSystemReferenceCardProps) {
  const rows = type === "normal-attack" ? normalAttackRules : mpCooldownRules;

  return (
    <GameCard>
      <SectionTitle
        eyebrow={type === "normal-attack" ? "Normal Attack" : "MP / Cooldown"}
        title={type === "normal-attack" ? "Normal attack reference" : "Resource reference"}
      />
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        {rows.map((row) => (
          <p key={row}>{row}</p>
        ))}
      </div>
    </GameCard>
  );
}
