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
  return new Date(isoString).toLocaleDateString();
}

function formatTipoff(isoString) {
  if (!isoString) return "TBD";

  return new Date(isoString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function normalizeGame(game, round, bracketInfo = {}) {
  const parsedTitle = parseTitleParts(game.title, round.name);
  const bracketName = bracketInfo.name || parsedTitle.region || "National";

  return {
    id: game.id,
    roundId: round.sequence,
    roundName: round.name,
    roundUuid: round.id,

    title: game.title,
    matchupLabel: parsedTitle.matchupLabel,
    region: bracketName,

    status: game.status || "scheduled",
    scheduled: formatTipoff(game.scheduled),
    scheduledRaw: game.scheduled,
    gameDate: formatGameDate(game.scheduled),

    homeTeam: game.home?.name || "TBD Team",
    homeAlias: game.home?.alias || "",
    homeId: game.home?.id || game.home?.source?.id || "",
    homeSeed: getTeamSeed(game.home),
    homeScore: game.home_points ?? 0,

    awayTeam: game.away?.name || "TBD Team",
    awayAlias: game.away?.alias || "",
    awayId: game.away?.id || game.away?.source?.id || "",
    awaySeed: getTeamSeed(game.away),
    awayScore: game.away_points ?? 0,

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

    raw: game,
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

  const gameDates = [...new Set(games.map((game) => game.gameDate).filter(Boolean))]
    .sort((a, b) => new Date(a) - new Date(b));

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
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
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
      return res.status(upstreamResponse.status).json({
        message: `Sportradar request failed (${upstreamResponse.status})`,
      });
    }

    const data = await upstreamResponse.json();
    const normalized = normalizeTournament(data);

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");

    return res.status(200).json(normalized);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch live schedule",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}