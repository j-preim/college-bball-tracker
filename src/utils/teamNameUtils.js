export function normalizeTeamName(name = "") {
  return String(name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\bsaint\b/g, "st")
    .replace(/\buniversity\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const TEAM_ALIASES = {
  uconn: "connecticut",
  "ole miss": "mississippi",
  smu: "southern methodist",
  byu: "brigham young",
  vcu: "virginia commonwealth",
  unc: "north carolina",
  utsa: "texas san antonio",
  "uc san diego": "california san diego",
  "st marys": "st marys",
  "saint marys": "st marys",
  "st marys ca": "st marys",
  "saint marys california": "st marys",
  "st johns": "st johns",
  "saint johns": "st johns",
  "miss st": "mississippi state",
  "mississippi st": "mississippi state",
  "nc state": "north carolina state",
  pitt: "pittsburgh",
  "miami fl": "miami",
  "texas am": "texas a&m",
  "texas a and m": "texas a&m",
  "texas a&m": "texas a&m",
  "southern cal": "usc",
  usc: "usc",
};

export function canonicalizeTeamName(name = "") {
  const normalized = normalizeTeamName(name);
  return TEAM_ALIASES[normalized] || normalized;
}

export function buildTeamLookup(rows = [], key = "team") {
  return Object.fromEntries(
    rows
      .filter((row) => row?.[key])
      .map((row) => [canonicalizeTeamName(row[key]), row]),
  );
}
