import { FutureSkillLockPanel } from "@/components/game/FutureSkillLockPanel";
import { SkillDetailPanel } from "@/components/game/SkillDetailPanel";
import { SkillLibrarySection } from "@/components/game/SkillLibrarySection";
import { SkillLoadoutPanel } from "@/components/game/SkillLoadoutPanel";
import { SkillPriorityRuleCard } from "@/components/game/SkillPriorityRuleCard";
import { SkillSystemReferenceCard } from "@/components/game/SkillSystemReferenceCard";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mockSkills } from "@/data/mockSkills";
import {
  classOrder,
  getSkillsForClass,
  groupSkillsByClass,
  sortEquippedSkillsByPriority,
} from "@/utils/skills";

const equippedSwordsmanSkillIds = [
  "swordsman_slash_01",
  "swordsman_guard_break_02",
  "swordsman_brave_guard_03",
];

export function SkillPriorityScreen() {
  const groupedSkills = groupSkillsByClass(mockSkills);
  const swordsmanSkills = getSkillsForClass(mockSkills, "Swordsman");
  const loadoutSkills = sortEquippedSkillsByPriority(
    mockSkills,
    equippedSwordsmanSkillIds,
  );
  const featuredSkill =
    swordsmanSkills.find((skill) => skill.skill_id === "swordsman_brave_guard_03") ??
    swordsmanSkills[0];

  return (
    <div className="space-y-4 px-4">
      <GameCard className="border-amber-300/25 bg-gradient-to-br from-slate-950/95 to-violet-950/60">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              จัดลำดับสกิล
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Skill Priority
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Class 1 เปิดใช้งานใน V1A. เปลี่ยน Skill Loadout ได้เฉพาะนอก Battle.
            </p>
          </div>
          <FeatureLockBadge label="V1A mock-only" status="schema-only" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FeatureLockBadge label="Class 1 live only" status="enabled" />
          <FeatureLockBadge label="Class 2 locked" status="disabled" />
          <FeatureLockBadge label="Class 3 schema only" status="schema-only" />
        </div>
        <p className="mt-4 rounded-xl border border-sky-300/25 bg-sky-400/10 p-3 text-xs leading-5 text-sky-100">
          Battle จะใช้ Skill Loadout Snapshot ตอนเริ่มต่อสู้. สกิลที่ปลดแล้วแต่ไม่ได้ใส่จะไม่ถูกใช้.
        </p>
      </GameCard>

      <SkillLoadoutPanel skills={loadoutSkills} />

      <SkillDetailPanel skill={featuredSkill} />

      <div className="space-y-4">
        <GameCard>
          <SectionTitle eyebrow="Library" title="Class Skill Library" />
          <p className="text-sm leading-6 text-slate-300">
            Showing the 15 Class 1 skills from local mock data. This is not an
            authoritative skill engine.
          </p>
        </GameCard>
        {classOrder.map((className) => (
          <SkillLibrarySection
            className={className}
            key={className}
            skills={groupedSkills[className]}
          />
        ))}
      </div>

      <SkillPriorityRuleCard />

      <SkillSystemReferenceCard type="normal-attack" />

      <SkillSystemReferenceCard type="mp-cooldown" />

      <FutureSkillLockPanel />

      <GameCard className="border-rose-300/25">
        <SectionTitle eyebrow="Scope" title="Safety / mock-only note" />
        <div className="space-y-2 text-sm leading-6 text-slate-300">
          <p>ข้อมูลนี้เป็น mock สำหรับ prototype เท่านั้น</p>
          <p>ระบบต่อสู้จริงยังไม่ได้เปิดใน Phase นี้</p>
          <p>No server-authoritative skill calculation in this phase.</p>
          <p>No WLD, Paid Gem, withdrawal, blockchain, ledger, or backend behavior.</p>
        </div>
      </GameCard>
    </div>
  );
}
