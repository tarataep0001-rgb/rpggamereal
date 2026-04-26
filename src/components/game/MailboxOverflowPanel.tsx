import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { MailboxPreviewItem } from "@/data/mockInventory";

type MailboxOverflowPanelProps = {
  mailboxCount: number;
  mailboxMaxActive: number;
  normalMailExpiryDays: number;
  overflowMailExpiryDays: number;
  mails: readonly MailboxPreviewItem[];
};

export function MailboxOverflowPanel({
  mailboxCount,
  mailboxMaxActive,
  normalMailExpiryDays,
  overflowMailExpiryDays,
  mails,
}: MailboxOverflowPanelProps) {
  return (
    <GameCard>
      <SectionTitle eyebrow="Mailbox / กล่องจดหมาย" title="Overflow safety rules" />
      <div className="mb-4 flex gap-3">
        <div className="w-16 shrink-0">
          <ItemIconFrame assetId="icon_mailbox" label="Mailbox" tone="purple" />
        </div>
        <div className="text-sm leading-6 text-slate-300">
          <p>
            Active mails: {mailboxCount}/{mailboxMaxActive}
          </p>
          <p>Normal mail expires after {normalMailExpiryDays} days.</p>
          <p>Overflow mail expires after {overflowMailExpiryDays} days.</p>
        </div>
      </div>
      <div className="grid gap-2">
        {mails.map((mail) => (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm"
            key={mail.mail_id}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{mail.title}</p>
              <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-2 py-0.5 text-[11px] text-sky-100">
                {mail.source}
              </span>
            </div>
            <p className="mt-1 text-slate-300">{mail.attachment}</p>
            <p className="mt-1 text-xs text-slate-500">
              expires in {mail.expires_in_days} days / {mail.claimable ? "claimable" : "notice only"}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-amber-100">
        ถ้ากระเป๋าเต็ม ระบบจะส่งของไปกล่องจดหมาย ถ้ากล่องจดหมายเต็มด้วย จะไม่รับของบางส่วนและจะแจ้งให้เคลียร์พื้นที่
      </p>
      <p className="mt-2 text-xs text-rose-100">WLD/ledger reward never goes to mailbox.</p>
    </GameCard>
  );
}
