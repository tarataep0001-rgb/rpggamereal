import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { classSkillFormationExport } from "@/config/classSkillFormationExport";

export function ClassSkillFormationExportPanel() {
  return (
    <GameCard className="border-violet-300/20 bg-gradient-to-br from-slate-950/95 via-violet-950/40 to-slate-950/95">
      <SectionTitle
        eyebrow="Export Class / Skill / Formation"
        title="Class / Skill / Formation Export Status"
      />
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Class 1 live</p>
          <p className="text-xl font-black text-white">
            {classSkillFormationExport.class_config.live_class_1_count}/5
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Class 1 skills</p>
          <p className="text-xl font-black text-white">
            {classSkillFormationExport.skill_config.live_class_1_skill_count}/15
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Formation patterns</p>
          <p className="text-xl font-black text-white">
            {classSkillFormationExport.formation_config.formation_pattern_count}/5
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-slate-400">Canonical cells</p>
          <p className="text-xl font-black text-white">
            {classSkillFormationExport.formation_config.canonical_cell_count}/9
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
        <p>Class 1 เปิดใช้งานใน V1A</p>
        <p>Class 2 ยังไม่เปิดใน V1A</p>
        <p>Class 3 เป็นโครงข้อมูลเท่านั้น</p>
        <p>Skill Config นี้เป็น mock/export-ready foundation</p>
        <p>Formation Config นี้เป็น mock/export-ready foundation</p>
      </div>
    </GameCard>
  );
}
