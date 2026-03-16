function parseTitleParts(title = "", roundName = "") {
  const parts = title.split(" - ").map((part) => part.trim()).filter(Boolean);

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

function normalizeGame(game, round) {
  const { region, matchupLabel } = parseTitleParts(game.title, round.name);

  return {
    id: game.id,
    roundId: round.sequence,
    roundName: round.name,
    title: game.title,
    matchupLabel,
    region,
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

    coverage: game.coverage || "",
    neutralSite: Boolean(game.neutral_site),
    conferenceGame: Boolean(game.conference_game),
    trackOnCourt: Boolean(game.track_on_court),

    raw: game,
  };
}

function normalizeTournament(data) {
  const rounds = (data.rounds || []).map((round) => {
    const bracket = round.bracketed
      const bracketGames = (bracket || []).map((game) =>
        normalizeGame(game, round)
    );

    return {
      roundId: round.sequence,
      roundName: round.name,
      roundUuid: round.id,
      brackets: [
        {
          bracketId: round.id,
          bracketName: round.name,
          bracketGames,
        },
      ],
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
    // const apiKey = process.env.SPORTRADAR_API_KEY;
    const apiUrl = process.env.SPORTRADAR_SCHEDULE_URL;

    // if (!apiKey || !apiUrl) {
    //   return res.status(500).json({
    //     message: "Missing SPORTRADAR_API_KEY or SPORTRADAR_SCHEDULE_URL",
    //   });
    // }

    // const separator = apiUrl.includes("?") ? "&" : "?";
    // const requestUrl = `${apiUrl}${separator}api_key=${apiKey}`;

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