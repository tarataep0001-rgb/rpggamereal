import Image from "next/image";
import { getLocalAssetImagePath } from "@/data/localAssetImages";

type ItemIconFrameProps = {
  assetId: string;
  label: string;
  tone?: "gold" | "blue" | "purple" | "green" | "red";
};

const toneClasses: Record<NonNullable<ItemIconFrameProps["tone"]>, string> = {
  gold: "from-amber-300/30 via-yellow-500/15 to-slate-900",
  blue: "from-sky-300/25 via-blue-500/15 to-slate-900",
  purple: "from-violet-300/25 via-purple-500/15 to-slate-900",
  green: "from-emerald-300/25 via-teal-500/15 to-slate-900",
  red: "from-rose-300/25 via-red-500/15 to-slate-900",
};

export function ItemIconFrame({ assetId, label, tone = "gold" }: ItemIconFrameProps) {
  const imagePath = getLocalAssetImagePath(assetId);

  return (
    <div className="space-y-1">
      <div
        className={`relative flex aspect-square min-h-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${toneClasses[tone]}`}
      >
        {imagePath ? (
          <Image
            alt={label}
            className="object-cover"
            fill
            loading="eager"
            sizes="80px"
            src={imagePath}
            unoptimized
          />
        ) : (
          <span className="text-2xl font-black text-white/80">◇</span>
        )}
      </div>
      <p className="truncate text-[10px] text-slate-500">
        {assetId} / {imagePath ? "generated-local-svg" : "placeholder"}
      </p>
    </div>
  );
}
