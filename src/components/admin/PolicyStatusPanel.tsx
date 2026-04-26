import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { policyDocuments } from "@/data/mockPolicy";

export function PolicyStatusPanel() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Policy / Legal" title="เอกสาร policy ยังเป็น placeholder" />
      <div className="grid gap-2">
        {policyDocuments.map((document) => (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm" key={document.id}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{document.name}</p>
              <span className="text-rose-100">reviewed: {String(document.reviewed)}</span>
            </div>
            <p className="mt-1 text-slate-400">
              status: {document.status} / version: {document.version} / required before {document.requiredBefore}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-amber-100">
        Policy documents are placeholders until reviewed. Real-money, Paid Gem, WLD withdraw, WLD ranking, and WLD reward features cannot go live until reviewed and versioned. ยังไม่มี legal review จริง.
      </p>
    </GameCard>
  );
}
