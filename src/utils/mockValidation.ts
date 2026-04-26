import type { FeatureFlags, GachaBox, StageNode, ValidationStatus } from "@/types/game";
import { equipmentTemplates } from "@/data/mockEquipment";
import { gachaBoxes } from "@/data/mockGacha";
import { mockStages } from "@/data/mockStages";
import { v1aFeatureFlags } from "@/data/mockAdmin";

export type MockValidationResult = {
  id: string;
  label: string;
  status: ValidationStatus;
  detail: string;
};

export function validateUniqueIds(items: { id?: string }[]): boolean {
  const ids = items.map((item) => item.id).filter((id): id is string => Boolean(id));
  return new Set(ids).size === ids.length;
}

export function validateStageCount(stages: StageNode[]): boolean {
  return stages.length === 150;
}

export function validateGachaRatesTotal100(box: GachaBox): boolean {
  if (!box.enabled) {
    return true;
  }

  return Object.values(box.rates).reduce((sum, rate) => sum + rate, 0) === 100;
}

export function validateEquipmentTemplateCount78(): boolean {
  return equipmentTemplates.length === 78;
}

export function validateV1AFeatureFlagsDisabled(flags: FeatureFlags): boolean {
  return (
    !flags.enableWldWithdraw &&
    !flags.enableWldRewardRanking &&
    !flags.enablePaidGemGacha &&
    !flags.enableBox2 &&
    !flags.enableBox3 &&
    !flags.enableClass2 &&
    !flags.enableClass3
  );
}

export const mockValidationResults: MockValidationResult[] = [
  {
    id: "stage-count",
    label: "Stage count 150",
    status: validateStageCount(mockStages) ? "pass" : "fail",
    detail: `${mockStages.length} generated stage rows`,
  },
  {
    id: "gacha-rates",
    label: "Live gacha rates total 100",
    status: gachaBoxes.every(validateGachaRatesTotal100) ? "pass" : "fail",
    detail: "Disabled boxes are ignored for rate total enforcement",
  },
  {
    id: "equipment-count",
    label: "Equipment template count 78",
    status: validateEquipmentTemplateCount78() ? "pass" : "fail",
    detail: `${equipmentTemplates.length} generated templates`,
  },
  {
    id: "feature-flags",
    label: "V1A sensitive feature flags disabled",
    status: validateV1AFeatureFlagsDisabled(v1aFeatureFlags) ? "pass" : "fail",
    detail: "WLD, Paid Gem, Box 2/3, Class 2/3 all disabled",
  },
];
