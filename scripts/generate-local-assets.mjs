import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outRoot = path.join(process.cwd(), "public", "assets", "generated");

const gradeColors = {
  Common: { a: "#94a3b8", b: "#334155", glow: "#cbd5e1" },
  Uncommon: { a: "#22c55e", b: "#0f766e", glow: "#86efac" },
  Rare: { a: "#8b5cf6", b: "#b45309", glow: "#fde68a" },
  Epic: { a: "#f59e0b", b: "#7c3aed", glow: "#fef3c7" },
};

const elementColors = {
  Fire: "#ef4444",
  Water: "#38bdf8",
  Earth: "#a3e635",
  Wind: "#5eead4",
  Light: "#fef3c7",
  Dark: "#a78bfa",
  Neutral: "#cbd5e1",
};

const classGlyphs = {
  Swordsman: "M116 58 L140 82 L86 150 L62 126 Z M65 134 L78 147 L52 170 L42 160 Z",
  Archer: "M62 60 C132 76 132 144 62 160 M74 66 C116 82 116 138 74 154 M78 110 L158 84 M78 110 L158 136",
  Thief: "M92 58 L118 58 L108 142 L82 172 L96 118 Z M126 74 L150 98 L110 152",
  Priest: "M106 52 L106 170 M78 78 L134 78 M88 112 C94 96 118 96 124 112 C132 136 80 136 88 112 Z",
  Mage: "M104 52 L118 120 L98 172 L86 116 Z M122 70 L146 94 L122 118 L98 94 Z",
};

const skillGlyphs = {
  attack: "M50 142 C82 86 122 62 164 56 C142 90 110 126 62 162 Z",
  debuff: "M64 70 L150 70 L128 154 L86 154 Z M82 92 L132 132 M132 92 L82 132",
  shield: "M106 52 L154 72 C150 128 130 156 106 172 C82 156 62 128 58 72 Z",
  buff: "M106 54 L120 96 L164 96 L128 122 L142 166 L106 140 L70 166 L84 122 L48 96 L92 96 Z",
  heal: "M88 58 H124 V92 H158 V128 H124 V162 H88 V128 H54 V92 H88 Z",
};

const equipmentGlyphs = {
  sword: classGlyphs.Swordsman,
  bow: classGlyphs.Archer,
  dagger: classGlyphs.Thief,
  staff: classGlyphs.Mage,
  heavy_armor: "M72 58 H140 L154 92 L134 170 H78 L58 92 Z M82 82 H130 V144 H82 Z",
  light_armor: "M76 62 H136 L148 104 L126 166 H86 L64 104 Z M88 84 H124 L132 112 L106 148 L80 112 Z",
  robe: "M82 56 H130 L150 170 H62 Z M92 78 H120 L126 146 H86 Z",
  helmet: "M62 112 C62 74 88 56 106 56 C124 56 150 74 150 112 V142 H62 Z M76 112 H136",
  gloves: "M78 70 L106 92 L90 164 L54 144 Z M118 92 L146 70 L158 144 L122 164 Z",
  boots: "M70 62 H108 V142 H154 V164 H64 Z M112 72 H140 V132 H112 Z",
  necklace: "M64 64 C72 132 140 132 148 64 M106 132 L126 164 H86 Z",
  ring: "M106 64 C138 64 164 90 164 122 C164 154 138 180 106 180 C74 180 48 154 48 122 C48 90 74 64 106 64 Z M106 88 C87 88 72 103 72 122 C72 141 87 156 106 156 C125 156 140 141 140 122 C140 103 125 88 106 88 Z",
  charm: "M106 50 L154 82 L144 146 L106 174 L68 146 L58 82 Z M106 82 L128 98 L122 132 L106 148 L90 132 L84 98 Z",
};

const uiGlyphs = {
  hero: classGlyphs.Swordsman,
  starter: classGlyphs.Priest,
  chapter: "M46 152 C82 86 118 74 166 58 C150 104 174 132 132 174 C96 190 66 178 46 152 Z",
  icon: "M106 46 L134 82 L178 86 L146 116 L158 160 L106 136 L54 160 L66 116 L34 86 L78 82 Z",
  portrait: classGlyphs.Swordsman,
  ui: "M54 70 H158 C174 70 186 82 186 98 V154 C186 170 174 182 158 182 H54 C38 182 26 170 26 154 V98 C26 82 38 70 54 70 Z M48 98 H164 M48 128 H128",
  bg: "M38 154 C62 98 94 78 124 106 C146 60 184 66 190 130 C194 170 156 190 106 182 C74 176 48 172 38 154 Z",
  frame: "M50 50 H162 V162 H50 Z M72 72 H140 V140 H72 Z",
  card: "M46 64 H166 C176 64 184 72 184 82 V158 C184 168 176 176 166 176 H46 C36 176 28 168 28 158 V82 C28 72 36 64 46 64 Z",
  vfx: "M54 156 C92 120 72 88 126 50 C118 90 162 94 138 146 C170 132 172 166 134 182 C96 196 70 178 54 156 Z",
};

const characters = [
  ["main_hero", "Hero", "Epic", "Fire", "Swordsman"],
  ["ch_common_sword_fire_guard", "Fire Guard", "Common", "Fire", "Swordsman"],
  ["ch_common_archer_wind_shot", "Wind Shot", "Common", "Wind", "Archer"],
  ["ch_common_thief_dark_cut", "Dark Cut", "Common", "Dark", "Thief"],
  ["ch_common_priest_light_aid", "Light Aid", "Common", "Light", "Priest"],
  ["ch_common_mage_fire_spark", "Fire Spark", "Common", "Fire", "Mage"],
  ["ch_uncommon_sword_earth_guard", "Earth Guard", "Uncommon", "Earth", "Swordsman"],
  ["ch_uncommon_archer_fire_burst", "Fire Burst", "Uncommon", "Fire", "Archer"],
  ["ch_uncommon_thief_wind_dash", "Wind Dash", "Uncommon", "Wind", "Thief"],
  ["ch_uncommon_priest_water_care", "Water Care", "Uncommon", "Water", "Priest"],
  ["ch_uncommon_mage_water_wave", "Water Wave", "Uncommon", "Water", "Mage"],
  ["ch_rare_sword_light_vanguard", "Light Vanguard", "Rare", "Light", "Swordsman"],
  ["ch_rare_archer_wind_hunter", "Wind Hunter", "Rare", "Wind", "Archer"],
  ["ch_rare_thief_dark_stalker", "Dark Stalker", "Rare", "Dark", "Thief"],
  ["ch_rare_priest_light_oracle", "Light Oracle", "Rare", "Light", "Priest"],
  ["ch_rare_mage_earth_sage", "Earth Sage", "Rare", "Earth", "Mage"],
];

const skills = [
  ["swordsman_slash_01", "Fan Pha", "Swordsman", "Neutral", "attack"],
  ["swordsman_guard_break_02", "Guard Break", "Swordsman", "Neutral", "debuff"],
  ["swordsman_brave_guard_03", "Brave Guard", "Swordsman", "Neutral", "shield"],
  ["archer_precise_shot_01", "Precise Shot", "Archer", "Neutral", "attack"],
  ["archer_arrow_rain_02", "Arrow Rain", "Archer", "Neutral", "attack"],
  ["archer_eagle_eye_03", "Eagle Eye", "Archer", "Neutral", "buff"],
  ["thief_quick_stab_01", "Quick Stab", "Thief", "Neutral", "attack"],
  ["thief_backstab_02", "Backstab", "Thief", "Dark", "attack"],
  ["thief_smoke_step_03", "Smoke Step", "Thief", "Dark", "buff"],
  ["priest_light_smite_01", "Light Smite", "Priest", "Light", "attack"],
  ["priest_minor_heal_02", "Minor Heal", "Priest", "Light", "heal"],
  ["priest_holy_shield_03", "Holy Shield", "Priest", "Light", "shield"],
  ["mage_fire_bolt_01", "Fire Bolt", "Mage", "Fire", "attack"],
  ["mage_frost_wave_02", "Frost Wave", "Mage", "Water", "debuff"],
  ["mage_arcane_burst_03", "Arcane Burst", "Mage", "Neutral", "attack"],
];

const equipmentFamilies = [
  "sword",
  "bow",
  "dagger",
  "staff",
  "heavy_armor",
  "light_armor",
  "robe",
  "helmet",
  "gloves",
  "boots",
  "necklace",
  "ring",
  "charm",
];
const tiers = [1, 2];
const grades = ["Common", "Uncommon", "Rare"];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svgCard({ id, title, subtitle, grade, accent, glyph, kind }) {
  const colors = gradeColors[grade] ?? gradeColors.Common;
  const safeId = id.replaceAll("_", "-");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-labelledby="title-${safeId} desc-${safeId}">
  <title id="title-${safeId}">${escapeXml(title)}</title>
  <desc id="desc-${safeId}">Original local SVG placeholder for ${escapeXml(kind)} asset ${escapeXml(id)}. No external or copyrighted asset.</desc>
  <defs>
    <radialGradient id="bg-${safeId}" cx="35%" cy="22%" r="80%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.95"/>
      <stop offset="0.42" stop-color="${colors.a}" stop-opacity="0.86"/>
      <stop offset="1" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="frame-${safeId}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${colors.glow}"/>
      <stop offset="0.52" stop-color="${colors.a}"/>
      <stop offset="1" stop-color="${colors.b}"/>
    </linearGradient>
    <filter id="shadow-${safeId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="256" height="256" rx="32" fill="url(#bg-${safeId})"/>
  <rect x="14" y="14" width="228" height="228" rx="26" fill="none" stroke="url(#frame-${safeId})" stroke-width="8"/>
  <circle cx="200" cy="54" r="22" fill="${colors.glow}" opacity="0.22"/>
  <circle cx="48" cy="198" r="34" fill="${accent}" opacity="0.12"/>
  <g filter="url(#shadow-${safeId})">
    <path d="${glyph}" fill="#f8fafc" opacity="0.94"/>
    <path d="${glyph}" fill="none" stroke="${colors.glow}" stroke-width="4" opacity="0.55"/>
  </g>
  <rect x="38" y="202" width="180" height="24" rx="12" fill="#020617" opacity="0.45"/>
  <text x="128" y="219" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#e5e7eb">${escapeXml(subtitle)}</text>
</svg>
`;
}

function getUiGlyph(assetId) {
  const prefix = assetId.split("_")[0];
  return uiGlyphs[prefix] ?? uiGlyphs.icon;
}

function getUiAccent(assetId) {
  if (assetId.includes("fire") || assetId.includes("gold")) return "#f59e0b";
  if (assetId.includes("water") || assetId.includes("frost") || assetId.includes("blue")) return "#38bdf8";
  if (assetId.includes("earth") || assetId.includes("stone")) return "#84cc16";
  if (assetId.includes("wind")) return "#5eead4";
  if (assetId.includes("light") || assetId.includes("holy")) return "#fde68a";
  if (assetId.includes("dark") || assetId.includes("shadow")) return "#a78bfa";
  if (assetId.includes("locked") || assetId.includes("boss")) return "#fb7185";
  return "#8b5cf6";
}

async function extractMockAssetIds() {
  const source = await readFile(path.join(process.cwd(), "src", "data", "mockAssets.ts"), "utf8");
  const prefixes = ["hero_", "starter_", "chapter_", "icon_", "portrait_", "ui_", "bg_", "frame_", "card_", "vfx_"];
  const matches = [...source.matchAll(/"([a-z0-9]+(?:_[a-z0-9]+)+)"/g)]
    .map((match) => match[1])
    .filter((value) => prefixes.some((prefix) => value.startsWith(prefix)));

  return [...new Set(matches)].sort();
}

async function writeSvg(folder, id, svg) {
  const dir = path.join(outRoot, folder);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${id}.svg`);
  await writeFile(filePath, svg, "utf8");
  return `/assets/generated/${folder}/${id}.svg`;
}

const manifest = {
  generated_at: new Date().toISOString(),
  generator: "scripts/generate-local-assets.mjs",
  safety_note:
    "Original local SVG placeholders only. No external, copyrighted, paid, WLD, payment, or production-money asset behavior.",
  characters: [],
  skills: [],
  equipment: [],
  uiParts: [],
};

for (const [id, name, grade, element, className] of characters) {
  const pathName = await writeSvg(
    "characters",
    id,
    svgCard({
      id,
      title: name,
      subtitle: `${className} / ${grade}`,
      grade,
      accent: elementColors[element],
      glyph: classGlyphs[className],
      kind: "character",
    }),
  );
  manifest.characters.push({ id, name, grade, element, className, path: pathName });
}

for (const [id, name, className, element, skillType] of skills) {
  const pathName = await writeSvg(
    "skills",
    id,
    svgCard({
      id,
      title: name,
      subtitle: `${className} / ${skillType}`,
      grade: "Rare",
      accent: elementColors[element],
      glyph: skillGlyphs[skillType],
      kind: "skill",
    }),
  );
  manifest.skills.push({ id, name, className, element, skillType, path: pathName });
}

for (const family of equipmentFamilies) {
  for (const tier of tiers) {
    for (const grade of grades) {
      const id = `gear_${family}_t${tier}_${grade.toLowerCase()}`;
      const pathName = await writeSvg(
        "equipment",
        id,
        svgCard({
          id,
          title: id,
          subtitle: `T${tier} / ${grade}`,
          grade,
          accent: tier === 1 ? "#38bdf8" : "#f59e0b",
          glyph: equipmentGlyphs[family],
          kind: "equipment",
        }),
      );
      manifest.equipment.push({ id, family, tier, grade, path: pathName });
    }
  }
}

for (const id of await extractMockAssetIds()) {
  const pathName = await writeSvg(
    "ui",
    id,
    svgCard({
      id,
      title: id.replaceAll("_", " "),
      subtitle: "UI asset",
      grade: id.includes("rare") || id.includes("boss") ? "Rare" : "Uncommon",
      accent: getUiAccent(id),
      glyph: getUiGlyph(id),
      kind: "ui/icon",
    }),
  );
  manifest.uiParts.push({ id, path: pathName });
}

await writeFile(
  path.join(outRoot, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(
  `Generated ${manifest.characters.length} character, ${manifest.skills.length} skill, ${manifest.equipment.length} equipment, and ${manifest.uiParts.length} UI SVG assets.`,
);
