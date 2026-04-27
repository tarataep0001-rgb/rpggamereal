import type { ScreenId } from "@/types/game";
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

type HomeScreenProps = {
  onNavigate: (screen: ScreenId) => void;
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const stageProgressPreview = processBattleForStageProgress(createMockStageProgressInput());

  return (
    <div className="space-y-4 px-4">
      <HeroStatusCard />
      <SaveStatusPanel />
      <StageProgressSummary compact progress={stageProgressPreview} />
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
