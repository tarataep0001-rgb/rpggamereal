import type { GuildProfile, GuildState } from "@/types/game";

export const guildRolePermissions = [
  {
    role: "Leader",
    permissions: [
      "accept/kick members",
      "promote/demote officer",
      "edit notice",
      "start guild boss",
      "manage settings",
      "disband guild",
      "claim rewards",
    ],
  },
  {
    role: "Officer",
    permissions: [
      "accept members",
      "kick lower role max 3/day",
      "edit notice",
      "start guild boss",
      "claim rewards",
    ],
  },
  {
    role: "Member",
    permissions: ["participate", "claim rewards"],
  },
] as const;

export const guildMembersPreview = [
  { member_id: "guild_member_001", name: "Hero", role: "Leader", power: 18500 },
  { member_id: "guild_member_002", name: "Light Aid", role: "Officer", power: 8200 },
  { member_id: "guild_member_003", name: "Wind Hunter", role: "Member", power: 7600 },
] as const;

export const mockGuild: GuildState & {
  guildPoint: number;
  notice: string;
  activity: string[];
  guildBoss: {
    boss_id: string;
    boss_name: string;
    tierMultiplier: 1;
    entryUsedToday: number;
    entryLimitPerMember: 1;
    sampleActualDamage: number;
    totalGuildDamage: number;
    memberDamage: number;
  };
  rewardRules: {
    damageToPointFormula: string;
    participationReward: string;
    killRewardPool: string;
    guildExpReward: string;
    damageScope: string;
  };
} = {
  name: "Ember Pact",
  level: 3,
  memberLimit: 30,
  members: 18,
  guildPoint: 1240,
  notice: "Mock guild notice: clear Chapter 1-5 and test Guild Boss display only.",
  activity: ["18 members active", "Guild Boss unlocked as mock UI", "WLD Guild Reward disabled"],
  bossConfig: {
    boss_id: "guild_boss_v1a_ember_titan",
    entry_rule: "Guild Boss entry: 1/member/day",
    hp_formula:
      "GuildBossHP = floor(500000 x (1.25^(GuildLevel - 1)) x GuildBossTierMultiplier)",
    point_formula:
      "DamageToGuildPoint = floor(actual_damage / 1000), min 1 if damage > 0, cap 500 per entry",
  },
  bossEntryRule: "Guild Boss entry: 1/member/day",
  bossHpFormula:
    "GuildBossHP = floor(500000 x (1.25^(GuildLevel - 1)) x GuildBossTierMultiplier)",
  guildPointFormula:
    "DamageToGuildPoint = floor(actual_damage / 1000), min 1 if damage > 0, cap 500 per entry",
  wldGuildRewardEnabled: false,
  rolePermissions: guildRolePermissions.map((role) => ({
    role: role.role,
    permissions: [...role.permissions],
  })),
  guildBoss: {
    boss_id: "guild_boss_v1a_ember_titan",
    boss_name: "Ember Titan",
    tierMultiplier: 1,
    entryUsedToday: 0,
    entryLimitPerMember: 1,
    sampleActualDamage: 125000,
    totalGuildDamage: 1000000,
    memberDamage: 125000,
  },
  rewardRules: {
    damageToPointFormula: "floor(actual_damage / 1000), minimum 1 if damage > 0, cap 500",
    participationReward: "+50 Guild Point if damage > 0",
    killRewardPool: "1000 Guild Point split by member damage share",
    guildExpReward: "+500 Guild EXP to guild",
    damageScope: "actual_damage only; overkill_damage does not count",
  },
};

export const guildProfile: GuildProfile = mockGuild;
