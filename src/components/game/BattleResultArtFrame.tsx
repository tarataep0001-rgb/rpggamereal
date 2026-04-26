import Image from "next/image";
import { getLocalAssetImagePath } from "@/data/localAssetImages";

type BattleResultArtFrameProps = {
  assetId: string;
  label: string;
  tone?: "victory" | "defeat" | "neutral";
};

const toneClasses: Record<NonNullable<BattleResultArtFrameProps["tone"]>, string> = {
  victory: "border-amber-300/45 from-amber-300/25 via-sky-500/15 to-violet-500/20",
  defeat: "border-rose-300/45 from-rose-500/20 via-slate-950 to-violet-950/30",
  neutral: "border-sky-300/35 from-sky-400/20 via-violet-500/15 to-slate-950",
};

export function BattleResultArtFrame({
  assetId,
  label,
  tone = "neutral",
}: BattleResultArtFrameProps) {
  const imagePath = getLocalAssetImagePath(assetId);

  return (
    <div className="space-y-2">
      <div
        className={`relative flex aspect-[16/9] min-h-36 items-center justify-center overflow-hidden rounded-3xl border bg-gradient-to-br ${toneClasses[tone]}`}
      >
        {imagePath ? (
          <Image
            alt={label}
            className="object-cover"
            fill
            loading="eager"
            sizes="100vw"
            src={imagePath}
            unoptimized
          />
        ) : (
          <p className="text-sm font-bold text-white">{label}</p>
        )}
      </div>
      <p className="text-[11px] text-slate-500">
        asset_id: {assetId} / {imagePath ? "generated-local-svg" : "placeholder"}
      </p>
    </div>
  );
}
