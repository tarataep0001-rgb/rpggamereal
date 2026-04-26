import { createConfigMeta } from "@/config/meta";

export const economyConfig = {
  ...createConfigMeta({
    configKey: "economy_config",
    notes:
      "Display/export foundation only. Conversion references are not real exchange, payment, WLD, or ledger logic.",
  }),
  export_id: "economy_config",
  currency: {
    gold: { id: "Gold", enabled: true },
    freeGem: { id: "Free Gem", enabled: true },
    paidGem: { id: "Paid Gem", enabled: false, note: "disabled for V1A paid systems" },
    wld: { id: "WLD", enabled: false, note: "disabled for V1A withdraw/ranking/reward" },
  },
  conversionDisplayReference: {
    wldToGem: "1 WLD = 100 Gem display reference only",
    realConversionImplemented: false,
  },
  inventory: {
    inventory_base_slots: 100,
    mailbox_max_active_mails: 100,
    material_stack_limit: 9999,
    consumable_stack_limit: 999,
    ticket_stack_limit: 999,
    shard_stack_limit: 9999,
  },
  idle: {
    idle_max_hours: 8,
    auto_farm_hours: 2,
    free_auto_farm_per_day: 2,
    extra_auto_farm_prices: [20, 40, 60, 80, 100, 120],
  },
  mp: {
    max_mp: 100,
    battle_start_mp: 0,
    normal_attack_mp_gain: 20,
    mp_gain_action_cap: 40,
  },
  crit: {
    base_crit: 5,
    base_crit_damage_multiplier: 1.5,
    crit_damage_cap: 3.0,
  },
} as const;
