import Image from "next/image";
import { getLocalAssetImagePath } from "@/data/localAssetImages";
import { mockAssets } from "@/data/mockAssets";

type CharacterArtFrameProps = {
  assetId: string;
  label: string;
  tone?: "gold" | "blue" | "purple";
};

const toneClasses: Record<NonNullable<CharacterArtFrameProps["tone"]>, string> = {
  gold: "from-amber-300/25 via-violet-500/20 to-sky-500/20 border-amber-300/35",
  blue: "from-sky-300/25 via-blue-500/20 to-violet-500/20 border-sky-300/35",
  purple: "from-violet-300/25 via-fuchsia-500/20 to-amber-500/20 border-violet-300/35",
};

export function CharacterArtFrame({
  assetId,
  label,
  tone = "gold",
}: CharacterArtFrameProps) {
  const asset = mockAssets.find((item) => item.asset_id === assetId);
  const imagePath = getLocalAssetImagePath(assetId);

  return (
    <div className="space-y-2">
      <div
        className={`relative flex aspect-[4/5] min-h-36 items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br ${toneClasses[tone]}`}
      >
        {imagePath ? (
          <Image
            alt={label}
            className="object-cover"
            fill
            loading="eager"
            sizes="112px"
            src={imagePath}
            unoptimized
          />
        ) : (
          <div className="text-center">
            <div className="text-4xl">◇</div>
            <p className="mt-2 text-xs font-bold text-white">{label}</p>
          </div>
        )}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-[11px] leading-5 text-slate-300">
        <p>asset_id: {assetId}</p>
        <p>status: {imagePath ? "generated-local-svg" : asset?.status ?? "placeholder"}</p>
      </div>
    </div>
  );
}
