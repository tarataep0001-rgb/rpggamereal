export const exportOrder = [
  "economy_config + feature_flags_config",
  "class / skill / formation configs",
  "equipment / item / material / drop configs",
  "enemies / enemy_skills",
  "boss / boss_skills",
  "stages / enemy_compositions",
  "gacha / shop / mission / guild / admin / region / ui / tutorial configs",
] as const;

export const universalValidationChecks = [
  "unique ID check",
  "missing reference check",
  "numeric min/max bound check",
  "disabled-feature reference check",
  "schema_version present",
  "config_version present",
  "effective_at present",
  "generated_at present",
  "checksum/hash present",
] as const;

export const v1aAcceptanceChecklist = [
  "Class 1 skill rows",
  "150 stage rows",
  "enemy composition rows",
  "enemy master rows",
  "enemy skill rows",
  "15 boss rows",
  "boss skill rows 2-4 per boss",
  "78 equipment template rows",
  "material/item rows",
  "drop tables",
  "gacha Box 1 pool",
  "shop prices",
  "mission rewards",
  "guild boss config",
  "admin thresholds",
  "region policy default restricted",
  "tutorial flow",
  "UI copy/error messages",
].map((label) => ({
  id: label.toLowerCase().replaceAll(" ", "_").replaceAll("/", "_"),
  label,
  status: "mock / incomplete",
}));
