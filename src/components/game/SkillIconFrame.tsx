import Image from "next/image";
import { getLocalAssetImagePath } from "@/data/localAssetImages";
import { mockAssets } from "@/data/mockAssets";

type SkillIconFrameProps = {
  assetId: string;
  label: string;
};

export function SkillIconFrame({ assetId, label }: SkillIconFrameProps) {
  const asset = mockAssets.find((item) => item.asset_id === assetId);
  const imagePath = getLocalAssetImagePath(assetId);

  return (
    <div className="space-y-2">
      <div className="relative flex aspect-square min-h-16 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/20 via-violet-500/20 to-sky-500/20">
        {imagePath ? (
          <Image
            alt={label}
            className="object-cover"
            fill
            loading="eager"
            sizes="72px"
            src={imagePath}
            unoptimized
          />
        ) : (
          <div className="text-center">
            <div className="text-2xl">✦</div>
            <p className="mt-1 text-[10px] font-bold text-white">{label}</p>
          </div>
        )}
      </div>
      <p className="text-[10px] leading-4 text-slate-500">
        {assetId} / {imagePath ? "generated-local-svg" : asset?.status ?? "placeholder"}
      </p>
    </div>
  );
}
