import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { mockGuild } from "@/data/mockGuild";
import { formatNumber } from "@/utils/formatting";

export function GuildOverviewCard() {
  return (
    <GameCard className="border-amber-300/20 bg-gradient-to-br from-slate-950/95 via-indigo-950/55 to-slate-950/95">
      <div className="flex gap-4">
        <div className="w-20 shrink-0">
          <ItemIconFrame assetId="bg_guild_hall" label="Guild hall" tone="gold" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <SectionTitle eyebrow="Guild / กิลด์" title={mockGuild.name} />
            <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
              V1A mock only
            </span>
          </div>
          <p className="text-sm text-slate-300">{mockGuild.notice}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <StatBadge label="Guild Level" value={mockGuild.level} tone="gold" />
        <StatBadge label="Members" value={`${mockGuild.members}/${mockGuild.memberLimit}`} tone="blue" />
        <StatBadge label="Guild Point" value={formatNumber(mockGuild.guildPoint)} tone="purple" />
        <StatBadge label="WLD Reward" value="disabled" tone="red" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <FeatureLockBadge label="จำกัดสมาชิก V1A = 30" status="enabled" />
        <FeatureLockBadge label="Roadmap scaling" status="schema-only" />
        <FeatureLockBadge label="WLD Guild Reward" status="disabled" />
      </div>
    </GameCard>
  );
}
