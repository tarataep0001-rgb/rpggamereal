import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

const pathItems = [
  {
    title: "Class 1",
    badge: "LIVE",
    status: "enabled" as const,
    detail: "Live in V1A, selected at Lv1, skills unlock at Lv10 / Lv20 / Lv40",
  },
  {
    title: "Class 2",
    badge: "LOCKED",
    status: "disabled" as const,
    detail:
      "Class 2 ยังไม่เปิดใน V1A. Unlocks in V1B at Lv60. Skill 2/3 require Lv75 / Lv90 future content",
  },
  {
    title: "Class 3",
    badge: "SCHEMA ONLY",
    status: "schema-only" as const,
    detail:
      "Class 3 เป็นโครงข้อมูลเท่านั้น. Unlocks later at Lv120, skills at Lv120 / Lv140 / Lv160 / Lv180",
  },
  {
    title: "Mastery Lv200",
    badge: "FUTURE",
    status: "schema-only" as const,
    detail: "Future mastery placeholder. Not live in V1A",
  },
];

export function ClassPathTimeline() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Class Path" title="Progression timeline" />
      <div className="space-y-3">
        {pathItems.map((item) => (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3" key={item.title}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-white">{item.title}</h3>
              <FeatureLockBadge label={item.badge} status={item.status} />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
