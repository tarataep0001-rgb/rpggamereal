import { LockedFeaturePanel } from "@/components/game/LockedFeaturePanel";
import { lockedShopFeatures } from "@/data/mockShop";

export function LockedShopFeaturePanel() {
  return (
    <LockedFeaturePanel
      eyebrow="Shop locks"
      items={lockedShopFeatures.map((feature) => ({
        label: feature,
        status: feature.includes("Event") ? "schema-only" : "disabled",
        note: feature.includes("Paid")
          ? "ไม่มีการชำระเงินจริง"
          : feature.includes("WLD")
            ? "ไม่มี WLD Payment"
            : undefined,
      }))}
      title="Locked shop features"
    />
  );
}
