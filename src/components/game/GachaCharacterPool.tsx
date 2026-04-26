import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { box1GachaCharacters } from "@/data/mockCharacters";
import type { GachaPoolEntry } from "@/types/game";
import { getPerCharacterRate, groupPoolByGrade } from "@/utils/gacha";

type GachaCharacterPoolProps = {
  pool: GachaPoolEntry[];
};

export function GachaCharacterPool({ pool }: GachaCharacterPoolProps) {
  const grouped = groupPoolByGrade(pool);

  return (
    <GameCard>
      <SectionTitle eyebrow="Character Pool" title="Box 1 character pool" />
      <div className="space-y-5">
        {grouped.map((group) => (
          <div key={group.grade}>
            <p className="mb-2 text-sm font-black text-white">{group.grade}</p>
            <div className="grid gap-3">
              {group.entries.map((entry) => {
                const character = box1GachaCharacters.find(
                  (item) => item.id === entry.character_id,
                );

                return (
                  <article
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                    key={entry.character_id}
                  >
                    <div className="w-16 shrink-0">
                      <ItemIconFrame
                        assetId={entry.character_id}
                        label={character?.displayName ?? entry.character_id}
                        tone={entry.grade === "Rare" ? "gold" : entry.grade === "Uncommon" ? "purple" : "blue"}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-white">
                            {character?.displayName ?? entry.character_id}
                          </p>
                          <p className="text-[11px] text-slate-500">{entry.character_id}</p>
                        </div>
                        <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2 py-1 text-xs text-amber-100">
                          {getPerCharacterRate(entry)}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-300">
                        {character?.baseClass ?? "-"} / {character?.element ?? "-"} / {character?.role ?? "-"}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </GameCard>
  );
}
