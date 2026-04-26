import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { auditEventTypes, auditLogPreview } from "@/data/mockAdmin";

export function AuditLogPreview() {
  return (
    <GameCard>
      <SectionTitle eyebrow="Audit Logs" title="Audit event preview" />
      <div className="mb-4 flex flex-wrap gap-2">
        {auditEventTypes.map((event) => (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-slate-300" key={event}>
            {event}
          </span>
        ))}
      </div>
      <div className="grid gap-3">
        {auditLogPreview.map((log) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm" key={log.request_id}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">{log.eventType}</p>
              <span className="text-xs text-slate-400">{log.status}</span>
            </div>
            <p className="mt-1 text-slate-300">{log.timestamp} / {log.adminRole}</p>
            <p className="text-slate-300">target: {log.target}</p>
            <p className="text-slate-400">reason: {log.reason}</p>
            <p className="text-xs text-slate-500">{log.request_id}</p>
          </article>
        ))}
      </div>
    </GameCard>
  );
}
