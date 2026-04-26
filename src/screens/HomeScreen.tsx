import type { ScreenId } from "@/types/game";
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

type HomeScreenProps = {
  onNavigate: (screen: ScreenId) => void;
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="space-y-4 px-4">
      <HeroStatusCard />
      <CurrencySummaryCard />
      <MainCharacterPreviewCard />
      <TeamSnapshotCard onNavigate={onNavigate} />
      <ProgressionCard />
      <IdleRewardCard onNavigate={onNavigate} />
      <QuickActionGrid onNavigate={onNavigate} />
      <LockedFeaturePanel />
      <ReadinessStatusPanel />
    </div>
  );
}
