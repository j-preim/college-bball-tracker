import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toTournamentDateKey } from "../src/utils/dateHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

let memoryCache = {
  data: null,
  fetchedAt: 0,
};

function parseTitleParts(title = "", roundName = "") {
  const parts = title
    .split(" - ")
    .map((part) => part.trim())
    .filter(Boolean);

  let region = "National";
  let matchupLabel = title;

  if (parts.length >= 3) {
    region = parts[0];
    matchupLabel = parts[parts.length - 1];
  } else if (parts.length === 2) {
    if (parts[0] !== roundName) {
      region = parts[0];
    }
    matchupLabel = parts[1];
  } else if (parts.length === 1) {
    matchupLabel = parts[0];
  }

  return { region, matchupLabel };
}

function getTeamSeed(team = {}) {
  if (team.seed !== undefined && team.seed !== null) {
    return String(team.seed);
  }

  const seedMatch = String(team.name || "").match(/\((\d+)\)/);
  return seedMatch ? seedMatch[1] : "";
}

function formatGameDate(isoString) {
  if (!isoString) return "";
  return toTournamentDateKey(isoString);
}

function normalizeGame(game, round, bracketInfo = {}) {
  const parsedTitle = parseTitleParts(game.title, round.name);
  const bracketName = parsedTitle.region || "National";

  const home = {
    name: game.home?.name || "TBD Team",
    alias: game.home?.alias || "",
    id: game.home?.id || game.home?.source?.id || "",
    seed: game.home?.seed ?? null,
  };

  const away = {
    name: game.away?.name || "TBD Team",
    alias: game.away?.alias || "",
    id: game.away?.id || game.away?.source?.id || "",
    seed: game.away?.seed ?? null,
  };

  const homePoints = game.home_points ?? game.home?.points ?? 0;
  const awayPoints = game.away_points ?? game.away?.points ?? 0;

  return {
    id: game.id,
    roundId: round.sequence,
    roundName: round.name,
    roundUuid: round.id,

    title: game.title,
    matchupLabel: parsedTitle.matchupLabel,

    bracket: bracketName,
    region: parsedTitle.region,

    status: game.status || "scheduled",
    scheduled: game.scheduled,
    scheduledRaw: game.scheduled,
    gameDate: formatGameDate(game.scheduled),

    home,
    away,

    home_points: homePoints,
    away_points: awayPoints,

    homeTeam: home.name,
    homeAlias: home.alias,
    homeId: home.id,
    homeSeed: home.seed ?? "",
    homeScore: homePoints,

    awayTeam: away.name,
    awayAlias: away.alias,
    awayId: away.id,
    awaySeed: away.seed ?? "",
    awayScore: awayPoints,

    venueName: game.venue?.name || "",
    venueCity: game.venue?.city || "",
    venueState: game.venue?.state || "",
    venueTimezone: game.time_zones?.venue || "",

    bracketId: bracketInfo.id || "",
    bracketName,
    bracketRank: bracketInfo.rank ?? null,
    bracketLocation: bracketInfo.location || "",

    coverage: game.coverage || "",
    neutralSite: Boolean(game.neutral_site),
    conferenceGame: Boolean(game.conference_game),
    trackOnCourt: Boolean(game.track_on_court),

    broadcasts: game.broadcasts || [],
  };
}

function normalizeTournament(data) {
  const rounds = (data.rounds || []).map((round) => {
    let brackets = (round.bracketed || []).map((bracketedItem, bracketIndex) => {
      const bracketInfo = bracketedItem.bracket || {};
      const bracketGames = (bracketedItem.games || []).map((game) =>
        normalizeGame(game, round, bracketInfo)
      );

      return {
        bracketId: bracketInfo.id || `${round.id}-bracket-${bracketIndex}`,
        bracketName: bracketInfo.name || round.name,
        bracketRank: bracketInfo.rank ?? null,
        bracketLocation: bracketInfo.location || "",
        bracketGames,
      };
    });

    if (brackets.length === 0 && Array.isArray(round.games) && round.games.length) {
      brackets = [
        {
          bracketId: round.id,
          bracketName: round.name,
          bracketRank: null,
          bracketLocation: "",
          bracketGames: round.games.map((game) => normalizeGame(game, round)),
        },
      ];
    }

    return {
      roundId: round.sequence,
      roundName: round.name,
      roundUuid: round.id,
      brackets,
    };
  });

  const games = rounds.flatMap((round) =>
    round.brackets.flatMap((bracket) => bracket.bracketGames)
  );

  const gameDates = [...new Set(games.map((game) => game.gameDate).filter(Boolean))].sort();

  return {
    tournament: {
      id: data.id,
      name: data.name,
      location: data.location,
      status: data.status,
      season: data.season || null,
      league: data.league || null,
    },
    rounds,
    games,
    gameDates,
    meta: {
      source: "live",
      generatedAt: new Date().toISOString(),
    },
  };
}

async function readFallbackSchedule() {
  try {
    const fallbackPath = path.join(__dirname, "..", "public", "initSched.json");
    const raw = await fs.readFile(fallbackPath, "utf8");
    const parsed = JSON.parse(raw);

    return {
      ...parsed,
      meta: {
        ...(parsed.meta || {}),
        source: "fallback",
        generatedAt: parsed.meta?.generatedAt || "",
      },
    };
  } catch {
    return null;
  }
}

function getCachedMemoryResponse() {
  if (!memoryCache.data) {
    return null;
  }

  const age = Date.now() - memoryCache.fetchedAt;
  if (age > MEMORY_CACHE_TTL_MS) {
    return null;
  }

  return {
    ...memoryCache.data,
    meta: {
      ...(memoryCache.data.meta || {}),
      source: "memory-cache",
      generatedAt:
        memoryCache.data.meta?.generatedAt ||
        new Date(memoryCache.fetchedAt).toISOString(),
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const cached = getCachedMemoryResponse();

  if (cached) {
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1800");
    return res.status(200).json(cached);
  }

  try {
    const apiUrl = process.env.SPORTRADAR_SCHEDULE_URL;

    if (!apiUrl) {
      return res.status(500).json({
        message: "Missing SPORTRADAR_SCHEDULE_URL",
      });
    }

    const upstreamResponse = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!upstreamResponse.ok) {
      throw new Error(`Sportradar request failed (${upstreamResponse.status})`);
    }

    const data = await upstreamResponse.json();
    const normalized = normalizeTournament(data);

    memoryCache = {
      data: normalized,
      fetchedAt: Date.now(),
    };

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1800");
    return res.status(200).json(normalized);
  } catch (error) {
    const fallback = await readFallbackSchedule();

    if (fallback) {
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
      return res.status(200).json({
        ...fallback,
        meta: {
          ...(fallback.meta || {}),
          fallbackReason:
            error instanceof Error ? error.message : "Unknown upstream error",
        },
      });
    }

    return res.status(500).json({
      message: "Failed to fetch live schedule",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}