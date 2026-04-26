import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { enemyBossStageExport } from "@/config/enemyBossStageExport";

export function EnemyBossStageExportPanel() {
  return (
    <GameCard className="border-rose-300/20 bg-gradient-to-br from-slate-950/95 via-rose-950/30 to-slate-950/95">
      <SectionTitle
        eyebrow="Export Enemy / Boss / Stage"
        title="Enemy / Boss / Stage Export Status"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Enemy Master</p>
          <p className="text-xl font-black text-white">
            {enemyBossStageExport.enemy_config.enemy_master_count}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Enemy Skill Template</p>
          <p className="text-xl font-black text-white">
            {enemyBossStageExport.enemy_skill_config.enemy_skill_template_count}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Boss 15 ตัว</p>
          <p className="text-xl font-black text-white">
            {enemyBossStageExport.boss_config.boss_count}/15
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Boss Skill Rows</p>
          <p className="text-xl font-black text-white">
            {enemyBossStageExport.boss_skill_config.boss_skill_row_count}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Stage 150 Rows</p>
          <p className="text-xl font-black text-white">
            {enemyBossStageExport.stage_config.stage_row_count}/150
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Enemy Composition</p>
          <p className="text-xl font-black text-white">
            {enemyBossStageExport.enemy_composition_config.enemy_composition_row_count}/150
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        <p>Tutorial Override: {enemyBossStageExport.stage_config.tutorial_override_count} rows</p>
        <p>Config นี้เป็น mock/export-ready foundation</p>
        <p>ยังไม่ใช่ production config</p>
        <p>ยังไม่ได้รัน simulation จริง</p>
        <p>ยังไม่มี battle engine จริง</p>
      </div>
    </GameCard>
  );
}
