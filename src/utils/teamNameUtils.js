export function normalizeTeamName(name = "") {
  return String(name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^\w\s()-]/g, "")
    .replace(/\bsaint\b/g, "st")
    .replace(/\bstate\b/g, "st")
    .replace(/\buniversity\b/g, "")
    .replace(/[()]/g, " ")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const TEAM_ALIASES = {
  uconn: "connecticut",
  conn: "connecticut",

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
  "miami fl": "miami fl",
  "miami florida": "miami",
  "miami florida": "miami fl",
  "miami oh": "miami oh",
  "miami ohio": "miami oh",

  "texas and m": "texas a&m",
  "texas am": "texas a&m",
  "texas a and m": "texas a&m",
  "texas a&m": "texas a&m",

  "southern cal": "usc",
  usc: "usc",

  penn: "pennsylvania",
  tcu: "texas christian",
  "south florida": "south florida",
  "michigan state": "michigan state",
  "north dakota state": "north dakota state",
  "north carolina": "north carolina",
  "ohio state": "ohio state",
  wisconsin: "wisconsin",
  nebraska: "nebraska",
  kennesaw: "kennesaw state",
  idaho: "idaho",
  siena: "siena",
  mcneese: "mcneese",
  hawaii: "hawaii",
  "hawaii rainbow warriors": "hawaii",
  vcu: "virginia commonwealth",

  liu: "long island university",
  liu: "liu",
  ucla: "ucla",
  ucf: "central florida",
  "california baptist": "cal baptist",
  "kennesaw state": "kennesaw state",
  "wright state": "wright state",
  "iowa state": "iowa state",
  "tennessee state": "tennessee state",
  "utah state": "utah state",
  iowa: "iowa",
  umbc: "umbc",
  lehigh: "lehigh",
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
