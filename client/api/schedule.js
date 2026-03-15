function normalizeStatus(rawStatus) {
  if (!rawStatus) return "scheduled";

  const status = String(rawStatus).toLowerCase();

  if (
    status.includes("inprogress") ||
    status.includes("in progress") ||
    status === "live"
  ) {
    return "inprogress";
  }

  if (
    status.includes("closed") ||
    status.includes("complete") ||
    status.includes("completed") ||
    status.includes("final")
  ) {
    return "closed";
  }

  if (status.includes("time") && status.includes("tbd")) {
    return "time-tbd";
  }

  return "scheduled";
}

function safeNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

/**
 * Replace this mapper with the exact Sportradar response fields you receive.
 * The goal is to return the same top-level shape your app already expects.
 */
function normalizeSportradarSchedule(rawData) {
  // Adjust these based on the real Sportradar payload
  const rawGames = rawData?.games || rawData?.sport_events || [];

  const games = rawGames.map((game, index) => {
    const scheduled = game.scheduled || game.start_time || game.startDate || "";
    const scheduledDate = scheduled ? new Date(scheduled) : null;

    const homeTeam =
      game.home?.name ||
      game.home_team?.name ||
      game.competitors?.find((c) => c.home_away === "home")?.name ||
      "TBD";

    const awayTeam =
      game.away?.name ||
      game.away_team?.name ||
      game.competitors?.find((c) => c.home_away === "away")?.name ||
      "TBD";

    const homeSeed =
      game.home?.seed ??
      game.home_team?.seed ??
      game.competitors?.find((c) => c.home_away === "home")?.seed ??
      null;

    const awaySeed =
      game.away?.seed ??
      game.away_team?.seed ??
      game.competitors?.find((c) => c.home_away === "away")?.seed ??
      null;

    const homeScore =
      safeNumber(
        game.home?.points ??
          game.home_team?.points ??
          game.scoring?.home_points ??
          game.competitors?.find((c) => c.home_away === "home")?.score
      ) ?? 0;

    const awayScore =
      safeNumber(
        game.away?.points ??
          game.away_team?.points ??
          game.scoring?.away_points ??
          game.competitors?.find((c) => c.home_away === "away")?.score
      ) ?? 0;

    const roundName =
      game.round?.name ||
      game.tournament?.round ||
      game.phase ||
      "Tournament";

    const roundId =
      game.round?.number ||
      game.round?.id ||
      game.round_number ||
      roundName;

    const region =
      game.region?.name ||
      game.bracket?.name ||
      game.conference?.name ||
      "National";

    return {
      id: game.id || game.sport_event?.id || `game-${index}`,
      gameDate: scheduledDate ? scheduledDate.toLocaleDateString() : "",
      scheduled,
      scheduledRaw: scheduled,
      status: normalizeStatus(
        game.status ||
          game.status_name ||
          game.sport_event_status?.status ||
          game.sport_event_status?.match_status
      ),
      roundId,
      roundName,
      region,
      homeTeam,
      awayTeam,
      homeSeed,
      awaySeed,
      homeScore,
      awayScore,
      venue:
        game.venue?.name || game.sport_event?.venue?.name || "",
      raw: game,
    };
  });

  const gameDates = [...new Set(games.map((game) => game.gameDate).filter(Boolean))];

  const roundsMap = new Map();

  for (const game of games) {
    const roundKey = String(game.roundId);

    if (!roundsMap.has(roundKey)) {
      roundsMap.set(roundKey, {
        roundId: game.roundId,
        roundName: game.roundName,
        brackets: [],
      });
    }
  }

  const rounds = Array.from(roundsMap.values());

  return {
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
    const apiKey = process.env.SPORTRADAR_API_KEY;
    const apiUrl = process.env.SPORTRADAR_SCHEDULE_URL;

    if (!apiKey || !apiUrl) {
      return res.status(500).json({
        message: "Missing SPORTRADAR_API_KEY or SPORTRADAR_SCHEDULE_URL",
      });
    }

    const separator = apiUrl.includes("?") ? "&" : "?";
    const requestUrl = `${apiUrl}${separator}api_key=${apiKey}`;

    const upstreamResponse = await fetch(requestUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!upstreamResponse.ok) {
      return res.status(upstreamResponse.status).json({
        message: `Sportradar request failed (${upstreamResponse.status})`,
      });
    }

    const rawData = await upstreamResponse.json();
    const normalized = normalizeSportradarSchedule(rawData);

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");

    return res.status(200).json(normalized);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch Sportradar schedule",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}