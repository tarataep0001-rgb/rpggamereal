import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { guildRolePermissions } from "@/data/mockGuild";

export function GuildRolePermissionPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Roles" title="Guild role permissions" />
      <div className="grid gap-3">
        {guildRolePermissions.map((role) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-3" key={role.role}>
            <p className="font-black text-white">{role.role}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {role.permissions.map((permission) => (
                <span
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-300"
                  key={permission}
                >
                  {permission}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
