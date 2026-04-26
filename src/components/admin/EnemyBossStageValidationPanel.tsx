import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { enemyBossStageExport } from "@/config/enemyBossStageExport";
import {
  validateBossConfigV1A,
  validateBossSkillConfigV1A,
  validateEnemyCompositionConfigV1A,
  validateEnemyConfigV1A,
  validateEnemySkillConfigV1A,
  validateStageConfigV1A,
} from "@/utils/configValidation";

const rows = [
  {
    id: "enemy-master",
    label: "Enemy master validation",
    passed: validateEnemyConfigV1A(),
    detail: "Required Chapter 1-5 enemy rows, skill_list references, and asset IDs.",
  },
  {
    id: "enemy-skills",
    label: "Enemy skill template validation",
    passed: validateEnemySkillConfigV1A(),
    detail: "8 enemy skill templates with target, cooldown, status, and asset references.",
  },
  {
    id: "boss",
    label: "Boss config validation",
    passed: validateBossConfigV1A(),
    detail: "15 bosses total: 10 mini-bosses and 5 main bosses.",
  },
  {
    id: "boss-skills",
    label: "Boss skill rows validation",
    passed: validateBossSkillConfigV1A(),
    detail: "Every boss has concrete 2-4 skill rows; no trait-only boss definition.",
  },
  {
    id: "stage",
    label: "Stage config validation",
    passed: validateStageConfigV1A(),
    detail: "150 stages, deterministic generation metadata, and tutorial overrides.",
  },
  {
    id: "composition",
    label: "Enemy composition validation",
    passed: validateEnemyCompositionConfigV1A(),
    detail: "150 composition rows referencing valid stages, enemies, and bosses.",
  },
];

export function EnemyBossStageValidationPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Validation" title="Enemy / Boss / Stage mock validation" />
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
        {enemyBossStageExport.limitations.map((limitation) => (
          <p key={limitation}>- {limitation}</p>
        ))}
        <p>- Config นี้เป็น mock/export-ready foundation</p>
        <p>- ยังไม่ใช่ production config</p>
        <p>- ยังไม่ได้รัน simulation จริง</p>
        <p>- ยังไม่มี battle engine จริง</p>
      </div>
    </GameCard>
  );
}
