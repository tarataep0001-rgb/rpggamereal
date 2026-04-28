import type {
  CanAddItemPreview,
  InventoryEngineState,
  InventoryItemType,
  InventoryUsagePreview,
} from "./inventoryTypes";

export const V1A_INVENTORY_BASE_SLOTS = 100;
export const V1A_MAILBOX_MAX_ACTIVE = 100;

export function calculateInventoryUsage(inventory: InventoryEngineState): InventoryUsagePreview {
  const total = Math.max(0, inventory.inventory_slots);
  const used = Math.max(0, inventory.used_inventory_slots);

  return {
    inventory_slots: total,
    used_inventory_slots: used,
    usage_percent: total === 0 ? 0 : Math.min(100, Math.round((used / total) * 100)),
    remaining_slots: Math.max(0, total - used),
    equipment_instance_count: inventory.gear_instances.length,
    material_stack_count: inventory.materials.length,
  };
}

export function getStackLimit(itemType: InventoryItemType): number | "no-slot" | "no-stack" {
  const stackLimits: Record<InventoryItemType, number | "no-slot" | "no-stack"> = {
    equipment: "no-stack",
    material: 9999,
    consumable: 999,
    ticket: 999,
    shard: 9999,
    currency: "no-slot",
  };

  return stackLimits[itemType];
}

export function canAddItemToInventory(
  inventory: InventoryEngineState,
  item: { item_type: InventoryItemType; quantity: number },
): CanAddItemPreview {
  if (item.item_type === "currency") {
    return {
      can_add: true,
      required_slots: 0,
      remaining_slots_after: Math.max(
        0,
        inventory.inventory_slots - inventory.used_inventory_slots,
      ),
      blocked_reason: null,
    };
  }

  const slotsRequired = item.item_type === "equipment" ? item.quantity : 0;
  const remaining = inventory.inventory_slots - inventory.used_inventory_slots;

  return {
    can_add: remaining >= slotsRequired,
    required_slots: slotsRequired,
    remaining_slots_after: Math.max(0, remaining - slotsRequired),
    blocked_reason: remaining >= slotsRequired ? null : "Inventory full.",
  };
}
