import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockGuild } from "@/data/mockGuild";
import { calculateMockKillShareDisplay, formatGuildPointFormula } from "@/utils/guild";

export function GuildBossRewardPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Guild Boss Reward" title="Guild Point rules" />
      <div className="space-y-2 text-sm leading-6 text-slate-300">
        <p>Guild Point ใช้ actual_damage เท่านั้น</p>
        <p>{mockGuild.rewardRules.damageToPointFormula}</p>
        <p>{mockGuild.rewardRules.participationReward}</p>
        <p>{mockGuild.rewardRules.killRewardPool}</p>
        <p>{mockGuild.rewardRules.guildExpReward}</p>
        <p>Overkill damage ไม่ถูกนับ</p>
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-amber-100">
        <p>{formatGuildPointFormula(mockGuild.guildBoss.sampleActualDamage)}</p>
        <p>
          Kill share mock:{" "}
          {calculateMockKillShareDisplay(
            1000,
            mockGuild.guildBoss.memberDamage,
            mockGuild.guildBoss.totalGuildDamage,
          )}
        </p>
      </div>
    </GameCard>
  );
}
