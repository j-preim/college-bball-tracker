import { toTournamentDateKey } from "../src/utils/dateHelpers.js";

const ESPN_SCOREBOARD_BASE =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard";

function normalizeTeamName(name = "") {
  return String(name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s&-]/g, "")
    .replace(/&/g, "and")
    .replace(/\bsaint\b/g, "st")
    .replace(/\bstate\b/g, "st")
    .replace(/\buniversity\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const TEAM_ALIASES = {
  uconn: "connecticut",
  "ole miss": "mississippi",
  smu: "southern methodist",
  byu: "brigham young",
  vcu: "virginia commonwealth",
  "st marys": "saint marys",
  "st mary's": "saint marys",
  unc: "north carolina",
  utsa: "texas san antonio",
  "uc san diego": "california san diego",
  "southern miss": "southern mississippi",
};

function canonicalizeTeamName(name = "") {
  const normalized = normalizeTeamName(name);
  return TEAM_ALIASES[normalized] || normalized;
}

function extractCompetitors(event) {
  const competition = event?.competitions?.[0];
  const competitors = competition?.competitors || [];

  const home = competitors.find((team) => team.homeAway === "home");
  const away = competitors.find((team) => team.homeAway === "away");

  return { competition, home, away };
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(num) ? num : null;
}

function extractSpread(event) {
  const competition = event?.competitions?.[0];
  const directOdds = competition?.odds?.[0] || event?.odds?.[0] || null;

  if (!directOdds) {
    return {
      provider: "ESPN",
      spread: null,
      details: null,
    };
  }

  return {
    provider: "ESPN",
    spread:
      parseNumber(directOdds.spread) ??
      parseNumber(directOdds.details?.match(/([+-]?\d+(\.\d+)?)/)?.[1]),
    details: directOdds.details || null,
  };
}

function normalizeEspnEvent(event) {
  const { competition, home, away } = extractCompetitors(event);

  return {
    espnEventId: event?.id || "",
    name: event?.name || "",
    shortName: event?.shortName || "",
    status: event?.status?.type?.name || event?.status?.type?.state || "",
    scheduled: competition?.date || event?.date || "",
    gameDate: toTournamentDateKey(competition?.date || event?.date || ""),
    homeTeam: home?.team?.displayName || home?.team?.shortDisplayName || "",
    awayTeam: away?.team?.displayName || away?.team?.shortDisplayName || "",
    homeTeamKey: canonicalizeTeamName(
      home?.team?.displayName || home?.team?.shortDisplayName || "",
    ),
    awayTeamKey: canonicalizeTeamName(
      away?.team?.displayName || away?.team?.shortDisplayName || "",
    ),
    odds: extractSpread(event),
  };
}

async function fetchEspnScoreboardForDate(dateKey) {
  const compactDate = String(dateKey).replaceAll("-", "");
  const url = `${ESPN_SCOREBOARD_BASE}?dates=${compactDate}&groups=50&limit=200`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`ESPN odds request failed (${response.status}) for ${dateKey}`);
  }

  const json = await response.json();
  const events = Array.isArray(json?.events) ? json.events : [];

  return events.map(normalizeEspnEvent);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const datesParam = req.query.dates || "";
    const dates = String(datesParam)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    if (!dates.length) {
      return res.status(200).json({
        events: [],
        meta: { provider: "ESPN", generatedAt: new Date().toISOString() },
      });
    }

    const settled = await Promise.allSettled(
      [...new Set(dates)].map((date) => fetchEspnScoreboardForDate(date)),
    );

    const events = settled.flatMap((result) =>
      result.status === "fulfilled" ? result.value : [],
    );

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=900");
    return res.status(200).json({
      events,
      meta: {
        provider: "ESPN",
        requestedDates: dates,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to load ESPN spread data.",
    });
  }
}