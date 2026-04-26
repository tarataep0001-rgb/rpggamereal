import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const battleRules = [
  "MaxMP = 100",
  "Battle Start MP = 0",
  "Normal Attack Coef = 1.00",
  "Base CRIT = 5%",
  "Base CRIT_DMG = 150%",
  "Crit Damage Cap = 300%",
  "cooldown starts after skill use",
  "cooldown decreases when owner finishes own action",
];

const resultRules = [
  "Win when all required enemies/main boss are defeated according to stage rule.",
  "Lose when all deployed player units are dead or turn limit is reached.",
  "If simultaneous KO leaves no player unit alive after action resolution, V1A counts as loss.",
  "Rewards, guild contribution, ranking damage, and mission progress use actual_hp_damage only.",
  "Overkill damage can be logged but does not count for V1A rewards.",
];

const xpRules = [
  "deployed alive at battle end = 100% XP",
  "died but revived and alive at end = 100% XP",
  "deployed dead at battle end = 70% XP",
  "undeployed = 0%",
  "level-capped units get no extra XP in V1A",
];

export function BattleRuleReference() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Rules" title="Battle Rule Reference" />
      <div className="grid gap-3 lg:grid-cols-3">
        {[["Combat", battleRules], ["Result", resultRules], ["XP", xpRules]].map(
          ([title, rows]) => (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3" key={title as string}>
              <p className="mb-2 text-sm font-bold text-white">{title as string}</p>
              <div className="space-y-2 text-xs leading-5 text-slate-300">
                {(rows as string[]).map((rule) => (
                  <p key={rule}>{rule}</p>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </GameCard>
  );
}
