import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { mockGuild } from "@/data/mockGuild";
import { calculateMockGuildBossHp } from "@/utils/guild";
import { formatNumber } from "@/utils/formatting";

export function GuildBossPanel() {
  const bossHp = calculateMockGuildBossHp(
    mockGuild.level,
    mockGuild.guildBoss.tierMultiplier,
  );

  return (
    <GameCard>
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="portrait_guild_boss_v1a" label={mockGuild.guildBoss.boss_name} tone="red" />
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle eyebrow="Guild Boss" title={mockGuild.guildBoss.boss_name} />
          <p className="text-sm text-slate-300">Guild Boss เข้าได้ 1 ครั้งต่อวัน</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatBadge label="Boss HP" value={formatNumber(bossHp)} tone="red" />
        <StatBadge label="Guild Level" value={mockGuild.level} tone="gold" />
        <StatBadge
          label="Entry"
          value={`${mockGuild.guildBoss.entryUsedToday}/${mockGuild.guildBoss.entryLimitPerMember}`}
          tone="blue"
        />
        <StatBadge label="WLD Reward" value="disabled" tone="red" />
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-400">{mockGuild.bossHpFormula}</p>
    </GameCard>
  );
}
