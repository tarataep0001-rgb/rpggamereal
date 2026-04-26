import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { classSkillFormationExport } from "@/config/classSkillFormationExport";
import {
  validateClassConfigV1A,
  validateFormationConfigV1A,
  validateSkillConfigV1A,
} from "@/utils/configValidation";

const rows = [
  {
    id: "class",
    label: "Class config validation",
    passed: validateClassConfigV1A(),
    detail: "5 live Class 1 rows, starter weapons, Class 2/3 locked, x1.85 multiplier.",
  },
  {
    id: "skill",
    label: "Skill config validation",
    passed: validateSkillConfigV1A(),
    detail: "15 Class 1 skills, required fields, asset IDs, DEF/MAG shield formula checks.",
  },
  {
    id: "formation",
    label: "Formation config validation",
    passed: validateFormationConfigV1A(),
    detail: "9 cells, 5 patterns, priority order, Cross Formation, team size 1-6.",
  },
];

export function ClassSkillFormationValidationPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Validation" title="Class / Skill / Formation mock validation" />
      <div className="space-y-2 text-sm">
        {rows.map((row) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" key={row.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-white">{row.label}</span>
              <span className={row.passed ? "text-emerald-100" : "text-rose-100"}>
                {row.passed ? "PASS" : "FAIL"}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{row.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm text-amber-100">
        {classSkillFormationExport.limitations.map((limitation) => (
          <p key={limitation}>- {limitation}</p>
        ))}
        <p>- ยังไม่ได้รัน simulation จริง</p>
        <p>- ยังไม่มี battle engine จริง</p>
        <p>- ยังไม่ใช่ production config</p>
      </div>
    </GameCard>
  );
}
