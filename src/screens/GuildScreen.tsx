import { GuildBossPanel } from "@/components/game/GuildBossPanel";
import { GuildBossRewardPanel } from "@/components/game/GuildBossRewardPanel";
import { GuildOverviewCard } from "@/components/game/GuildOverviewCard";
import { GuildRolePermissionPanel } from "@/components/game/GuildRolePermissionPanel";
import { GuildShopPreview } from "@/components/game/GuildShopPreview";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { guildMembersPreview, mockGuild } from "@/data/mockGuild";

export function GuildScreen() {
  return (
    <div className="space-y-4 px-4">
      <GuildOverviewCard />

      <GameCard>
        <SectionTitle eyebrow="Overview" title="Guild activity mock" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>จำกัดสมาชิก V1A = 30 fixed.</p>
          <p>Roadmap scaling schema: every 5 guild levels adds +5 members, max 50, disabled in V1A.</p>
          {mockGuild.activity.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {guildMembersPreview.map((member) => (
            <div
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
              key={member.member_id}
            >
              <span className="font-semibold text-white">{member.name}</span>
              <span className="text-slate-300">{member.role} / Power {member.power}</span>
            </div>
          ))}
        </div>
      </GameCard>

      <GuildRolePermissionPanel />
      <GuildBossPanel />
      <GuildBossRewardPanel />
      <GuildShopPreview />

      <GameCard>
        <SectionTitle eyebrow="Safety / Scope" title="Guild prototype constraints" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>ระบบกิลด์นี้เป็น mock สำหรับ prototype เท่านั้น</p>
          <p>No real guild backend.</p>
          <p>WLD Guild Reward ยังไม่เปิดใน V1A.</p>
          <p>No authoritative contribution calculation.</p>
          <p>No simulation pass claimed.</p>
        </div>
      </GameCard>
    </div>
  );
}
