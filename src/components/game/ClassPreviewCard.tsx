import type { ClassPreview } from "@/data/mockCharacters";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { CharacterArtFrame } from "./CharacterArtFrame";

type ClassPreviewCardProps = {
  item: ClassPreview;
  active: boolean;
};

export function ClassPreviewCard({ item, active }: ClassPreviewCardProps) {
  return (
    <article
      className={`rounded-2xl border p-3 ${
        active
          ? "border-amber-300/40 bg-amber-400/10"
          : "border-white/10 bg-slate-900/80"
      }`}
    >
      <div className="grid grid-cols-[80px_1fr] gap-3">
        <CharacterArtFrame assetId={item.assetId} label={item.className} tone="blue" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black text-white">{item.className}</h3>
            <FeatureLockBadge
              label={active ? "Selected" : "Preview"}
              status={active ? "enabled" : "schema-only"}
            />
          </div>
          <p className="mt-1 text-sm text-slate-300">{item.classNameTh}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{item.roleSummary}</p>
          <p className="mt-2 text-xs text-amber-100">
            Starter: {item.starterWeaponId}
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Core: {item.coreStats.join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
}
