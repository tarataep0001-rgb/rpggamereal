import { EnhancementLogPreview } from "@/components/game/EnhancementLogPreview";
import { EnhancementPreviewPanel } from "@/components/game/EnhancementPreviewPanel";
import { EnhancementSuccessTable } from "@/components/game/EnhancementSuccessTable";
import { EquipmentActionPreview } from "@/components/game/EquipmentActionPreview";
import { EquipmentSlotGrid } from "@/components/game/EquipmentSlotGrid";
import { GearItemCard } from "@/components/game/GearItemCard";
import { InventoryActionDebugPanel } from "@/components/game/InventoryActionDebugPanel";
import { InventorySummaryCard } from "@/components/game/InventorySummaryCard";
import { InventoryValidationPanel } from "@/components/game/InventoryValidationPanel";
import { ItemIconFrame } from "@/components/game/ItemIconFrame";
import { MailboxOverflowPanel } from "@/components/game/MailboxOverflowPanel";
import { MaterialStackCard } from "@/components/game/MaterialStackCard";
import { SalvageRulePanel } from "@/components/game/SalvageRulePanel";
import { TransferPreviewPanel } from "@/components/game/TransferPreviewPanel";
import { FeatureLockBadge } from "@/components/ui/FeatureLockBadge";
import { GameCard } from "@/components/ui/GameCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBadge } from "@/components/ui/StatBadge";
import { equipmentSlots } from "@/data/mockEquipment";
import { mockInventory } from "@/data/mockInventory";
import { mockPlayer } from "@/data/mockPlayer";
import { createMockInventoryInput, processInventoryPreview } from "@/engine/inventory";
import { formatNumber } from "@/utils/formatting";
import { getStackLimitByItemType } from "@/utils/inventory";

export function InventoryScreen() {
  const inventoryPreview = processInventoryPreview(createMockInventoryInput());

  return (
    <div className="space-y-4 px-4">
      <InventorySummaryCard
        mailboxCount={mockInventory.mailboxCount}
        mailboxMaxActive={mockInventory.mailboxMaxActive}
        totalSlots={mockInventory.inventorySlots}
        usedSlots={mockInventory.usedInventorySlots}
      />

      <GameCard>
        <SectionTitle eyebrow="Currency" title="Currency does not use inventory slots" />
        <div className="grid grid-cols-2 gap-3">
          <StatBadge label="Gold" value={formatNumber(mockPlayer.gold)} tone="gold" />
          <StatBadge label="Free Gem" value={formatNumber(mockPlayer.freeGem)} tone="blue" />
          <StatBadge label="Paid Gem" value={`${mockPlayer.paidGem} / disabled`} tone="red" />
          <StatBadge label="WLD" value="disabled in V1A" tone="red" />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Currency must not count as an inventory slot. Paid Gem payment, wallet, WLD,
          withdrawal, ledger, and production money logic are not implemented.
        </p>
      </GameCard>

      <EquipmentActionPreview result={inventoryPreview} />

      <div className="grid gap-4 xl:grid-cols-2">
        <EnhancementPreviewPanel result={inventoryPreview} />
        <EnhancementSuccessTable />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <EnhancementLogPreview result={inventoryPreview} />
        <TransferPreviewPanel result={inventoryPreview} />
      </div>

      <InventoryValidationPanel result={inventoryPreview} />

      <GameCard>
        <SectionTitle eyebrow="Equipment / ช่องอุปกรณ์" title="Equipped slots" />
        <EquipmentSlotGrid
          equippedItems={mockInventory.equippedItems}
          slots={equipmentSlots}
        />
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Gear Inventory" title="Equipment instances" />
        <div className="grid gap-3">
          {mockInventory.gearInstances.map((item) => (
            <GearItemCard item={item} key={item.gear_instance_id} />
          ))}
        </div>
      </GameCard>

      <GameCard>
        <SectionTitle eyebrow="Materials / วัสดุ" title="Stacked inventory" />
        <div className="grid gap-3">
          {[...mockInventory.materials, ...mockInventory.tickets, ...mockInventory.shards].map(
            (item) => (
              <MaterialStackCard item={item} key={item.item_id} />
            ),
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
          <span>Materials: {getStackLimitByItemType("material")}</span>
          <span>Consumables: {getStackLimitByItemType("consumable")}</span>
          <span>Tickets: {getStackLimitByItemType("ticket")}</span>
          <span>Shards: {getStackLimitByItemType("shard")}</span>
          <span>Equipment: {getStackLimitByItemType("equipment")}</span>
          <span>Currency: {getStackLimitByItemType("currency")}</span>
        </div>
      </GameCard>

      <SalvageRulePanel />

      <GameCard>
        <SectionTitle eyebrow="Locked systems" title="Crafting and set bonus" />
        <div className="flex gap-4">
          <div className="w-16 shrink-0">
            <ItemIconFrame assetId="icon_item_locked" label="Locked item" tone="purple" />
          </div>
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <p>Crafting ยังไม่เปิดใน V1A</p>
            <p>Set Bonus ยังไม่เปิดใน V1A</p>
            <p>Epic gear ไม่ดรอปปกติใน V1A</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FeatureLockBadge label="Crafting" status="schema-only" />
          <FeatureLockBadge label="Set Bonus" status="schema-only" />
          <FeatureLockBadge label="Epic gear normal drop" status="disabled" />
        </div>
      </GameCard>

      <MailboxOverflowPanel
        mailboxCount={mockInventory.mailboxCount}
        mailboxMaxActive={mockInventory.mailboxMaxActive}
        mails={mockInventory.mailboxPreview}
        normalMailExpiryDays={mockInventory.normalMailExpiryDays}
        overflowMailExpiryDays={mockInventory.overflowMailExpiryDays}
      />

      <InventoryActionDebugPanel result={inventoryPreview} />
    </div>
  );
}
