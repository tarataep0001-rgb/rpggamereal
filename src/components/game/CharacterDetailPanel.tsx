import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { mainCharacter } from "@/data/mockCharacters";
import { CharacterArtFrame } from "./CharacterArtFrame";

export function CharacterDetailPanel() {
  return (
    <GameCard className="border-amber-300/25 bg-gradient-to-br from-slate-950/95 to-violet-950/60">
      <SectionTitle eyebrow="ตัวละครหลัก" title={mainCharacter.displayName} />
      <div className="grid grid-cols-[112px_1fr] gap-4">
        <CharacterArtFrame
          assetId="portrait_main_swordsman_hero"
          label="Swordsman"
          tone="gold"
        />
        <div className="min-w-0 space-y-3">
          <div>
            <p className="text-sm font-bold text-white">
              อาชีพหลัก: {mainCharacter.baseClass}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              {mainCharacter.role} / {mainCharacter.element}
            </p>
          </div>
          <ProgressBar
            label={`Lv ${mainCharacter.level} / Cap ${mainCharacter.levelCap}`}
            max={mainCharacter.levelCap}
            value={mainCharacter.level}
          />
          <div className="flex flex-wrap gap-2">
            <FeatureLockBadge label="Class 1 เปิดใช้งานใน V1A" status="enabled" />
            <FeatureLockBadge label="No Star system" status="disabled" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <StatBadge
          label="Multiplier"
          value={`x${mainCharacter.gradeMultiplier}`}
          tone="gold"
        />
        <StatBadge
          label="Starter"
          value={mainCharacter.starterWeaponId}
          tone="blue"
        />
      </div>

      <p className="mt-4 rounded-xl border border-amber-300/25 bg-amber-400/10 p-3 text-sm leading-6 text-amber-50">
        ตัวละครหลักไม่มีระบบดาวใน V1A และต้องอยู่ในทีมเสมอ
      </p>
    </GameCard>
  );
}
