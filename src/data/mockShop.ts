export type ShopCurrency = "Gold" | "Free/Test Gem" | "Guild Point";

export type MockShopItem = {
  item_id: string;
  display_name: string;
  section: "gold" | "gem" | "guild";
  currency: ShopCurrency;
  price: number;
  stock: string;
  unlock_condition: string;
  asset_id: string;
  locked: boolean;
  note: string;
};

export const goldShopItems: MockShopItem[] = [
  {
    item_id: "shop_gold_stone_lv1",
    display_name: "Stone Lv1",
    section: "gold",
    currency: "Gold",
    price: 500,
    stock: "20/day",
    unlock_condition: "V1A live",
    asset_id: "icon_mat_stone_lv1",
    locked: false,
    note: "Daily stock uses Bangkok business date.",
  },
  {
    item_id: "shop_gold_stone_lv2",
    display_name: "Stone Lv2",
    section: "gold",
    currency: "Gold",
    price: 2000,
    stock: "10/day",
    unlock_condition: "Unlock after Chapter 4",
    asset_id: "icon_mat_stone_lv2",
    locked: false,
    note: "Available after Chapter 4 progress.",
  },
  {
    item_id: "shop_gold_skill_book",
    display_name: "Skill Book",
    section: "gold",
    currency: "Gold",
    price: 1500,
    stock: "5/day",
    unlock_condition: "V1A live",
    asset_id: "icon_mat_skill_book",
    locked: false,
    note: "Mock purchase button is display-only.",
  },
  {
    item_id: "shop_gold_powder_100",
    display_name: "Enhancement Powder x100",
    section: "gold",
    currency: "Gold",
    price: 1000,
    stock: "10/day",
    unlock_condition: "V1A live",
    asset_id: "icon_mat_enhancement_powder",
    locked: false,
    note: "Mock purchase button is display-only.",
  },
];

export const gemShopItems: MockShopItem[] = [
  {
    item_id: "shop_gem_inventory_expansion_20",
    display_name: "Inventory Expansion +20",
    section: "gem",
    currency: "Free/Test Gem",
    price: 50,
    stock: "scaling price",
    unlock_condition: "Starts 50 Gem, +25 each purchase, max 200 Gem",
    asset_id: "icon_inventory_expansion",
    locked: false,
    note: "Paid Gem payment is not implemented.",
  },
  {
    item_id: "shop_gem_basic_reset_ticket",
    display_name: "Basic Reset Ticket",
    section: "gem",
    currency: "Free/Test Gem",
    price: 150,
    stock: "daily limit mock",
    unlock_condition: "V1A mock display",
    asset_id: "icon_reset_ticket",
    locked: false,
    note: "No real purchase path.",
  },
  {
    item_id: "shop_gem_transfer_stone",
    display_name: "Transfer Stone",
    section: "gem",
    currency: "Free/Test Gem",
    price: 100,
    stock: "daily limit mock",
    unlock_condition: "V1A mock display",
    asset_id: "icon_transfer_stone",
    locked: false,
    note: "No real purchase path.",
  },
  {
    item_id: "shop_gem_antibreak_charm",
    display_name: "Anti-break Charm",
    section: "gem",
    currency: "Free/Test Gem",
    price: 500,
    stock: "hidden",
    unlock_condition: "Hidden until +41 content",
    asset_id: "icon_antibreak_charm_locked",
    locked: true,
    note: "Feature is locked for V1A.",
  },
];

export const guildShopItems: MockShopItem[] = [
  {
    item_id: "guild_shop_stone_lv1",
    display_name: "Stone Lv1",
    section: "guild",
    currency: "Guild Point",
    price: 50,
    stock: "weekly stock",
    unlock_condition: "V1A guild shop preview",
    asset_id: "icon_mat_stone_lv1",
    locked: false,
    note: "Guild Shop weekly stock resets Monday 00:00 Asia/Bangkok.",
  },
  {
    item_id: "guild_shop_stone_lv2",
    display_name: "Stone Lv2",
    section: "guild",
    currency: "Guild Point",
    price: 120,
    stock: "weekly stock",
    unlock_condition: "V1A guild shop preview",
    asset_id: "icon_mat_stone_lv2",
    locked: false,
    note: "Mock only.",
  },
  {
    item_id: "guild_shop_skill_book",
    display_name: "Skill Book",
    section: "guild",
    currency: "Guild Point",
    price: 80,
    stock: "weekly stock",
    unlock_condition: "V1A guild shop preview",
    asset_id: "icon_mat_skill_book",
    locked: false,
    note: "Mock only.",
  },
  {
    item_id: "guild_shop_transfer_stone",
    display_name: "Transfer Stone",
    section: "guild",
    currency: "Guild Point",
    price: 300,
    stock: "weekly stock",
    unlock_condition: "V1A guild shop preview",
    asset_id: "icon_transfer_stone",
    locked: false,
    note: "Mock only.",
  },
  {
    item_id: "guild_shop_antibreak_fragment",
    display_name: "Anti-break Fragment",
    section: "guild",
    currency: "Guild Point",
    price: 250,
    stock: "weekly stock",
    unlock_condition: "V1A guild shop preview",
    asset_id: "icon_mat_antibreak_fragment",
    locked: false,
    note: "Anti-break Charm = 20 fragments when feature live.",
  },
];

export const shopResetTimes = [
  "Gold Shop daily stock resets 00:00 Asia/Bangkok",
  "Gem Shop purchase limits reset 00:00 Asia/Bangkok",
  "Guild Shop weekly stock resets Monday 00:00 Asia/Bangkok",
  "Daily stock uses Bangkok business date",
] as const;

export const lockedShopFeatures = [
  "Anti-break Charm hidden until +41 content",
  "Paid shop disabled",
  "WLD shop disabled",
  "Event shop follows event_config and is not live in V1A",
] as const;
