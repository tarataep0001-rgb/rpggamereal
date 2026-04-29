import type { ScreenId } from "@/types/game";
import { CharacterProgressSummary } from "@/components/game/CharacterProgressSummary";
import { GachaHomeSummary } from "@/components/game/GachaHomeSummary";
import { IdleMissionSummary } from "@/components/game/IdleMissionSummary";
import { SaveStatusPanel } from "@/components/game/SaveStatusPanel";
import { SaveWarningPanel } from "@/components/game/SaveWarningPanel";
import { StageProgressSummary } from "@/components/game/StageProgressSummary";
import {
  CurrencySummaryCard,
  HeroStatusCard,
  IdleRewardCard,
  LockedFeaturePanel,
  MainCharacterPreviewCard,
  ProgressionCard,
  QuickActionGrid,
  ReadinessStatusPanel,
  TeamSnapshotCard,
} from "@/components/game/HomeDashboardCards";
import { createMockStageProgressInput, processBattleForStageProgress } from "@/engine/progression";
import { createMockCharacterProgressionInput, processCharacterProgressionPreview } from "@/engine/progression";

type HomeScreenProps = {
  onNavigate: (screen: ScreenId) => void;
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const stageProgressPreview = processBattleForStageProgress(createMockStageProgressInput());
  const characterProgressionPreview = processCharacterProgressionPreview(createMockCharacterProgressionInput());

  return (
    <div className="space-y-4 px-4">
      <HeroStatusCard />
      <SaveStatusPanel />
      <CharacterProgressSummary compact progression={characterProgressionPreview} />
      <StageProgressSummary compact progress={stageProgressPreview} />
      <GachaHomeSummary onNavigate={onNavigate} />
      <IdleMissionSummary onNavigate={onNavigate} />
      <CurrencySummaryCard />
      <MainCharacterPreviewCard />
      <TeamSnapshotCard onNavigate={onNavigate} />
      <ProgressionCard />
      <IdleRewardCard onNavigate={onNavigate} />
      <QuickActionGrid onNavigate={onNavigate} />
      <LockedFeaturePanel />
      <SaveWarningPanel />
      <ReadinessStatusPanel />
    </div>
  );
}
