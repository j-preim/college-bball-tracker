function normalizeStatus(status = "") {
  return String(status).toLowerCase();
}

function isFinalStatus(status = "") {
  const normalized = normalizeStatus(status);

  return (
    normalized === "closed" ||
    normalized === "complete" ||
    normalized === "completed" ||
    normalized === "final"
  );
}

function getGameTeams(game) {
  const homeTeam =
    game?.home ||
    null;

  const awayTeam =
    game?.away ||
    null;

  return { homeTeam, awayTeam };
}

function getTeamId(team) {
  return String(team?.id ?? "");
}

function getTeamName(team) {
  return team?.name || team?.alias || "";
}

function getHomeScore(game) {
  const score = Number(game?.home_points ?? game?.homeScore ?? NaN);
  return Number.isFinite(score) ? score : null;
}

function getAwayScore(game) {
  const score = Number(game?.away_points ?? game?.awayScore ?? NaN);
  return Number.isFinite(score) ? score : null;
}

function inferWinnerId(game) {
  if (game?.winner?.id) return String(game.winner.id);
  if (game?.winningTeamId) return String(game.winningTeamId);
  if (game?.winnerId) return String(game.winnerId);

  const { homeTeam, awayTeam } = getGameTeams(game);
  const homeScore = getHomeScore(game);
  const awayScore = getAwayScore(game);

  if (homeScore == null || awayScore == null) return "";

  if (homeScore > awayScore) return getTeamId(homeTeam);
  if (awayScore > homeScore) return getTeamId(awayTeam);

  return "";
}

function gameContainsTeam(game, teamId) {
  return (
    String(game?.homeId) === String(teamId) ||
    String(game?.awayId) === String(teamId) ||
    String(game?.home?.id) === String(teamId) ||
    String(game?.away?.id) === String(teamId)
  );
}

function getOpponentFromGame(game, pickedTeamId) {
  const { homeTeam, awayTeam } = getGameTeams(game);

  if (String(homeTeam?.id) === String(pickedTeamId)) return awayTeam;
  if (String(awayTeam?.id) === String(pickedTeamId)) return homeTeam;

  return null;
}

function matchesRound(game, pick) {
  if (pick.roundId != null) {
    return Number(game?.roundId) === Number(pick.roundId);
  }

  if (pick.roundName) {
    return String(game?.roundName) === String(pick.roundName);
  }

  return true;
}

export function resolveSurvivorPick(pick, games = []) {
  const matchingGame = games.find((game) => {
    if (!gameContainsTeam(game, pick.teamId)) return false;
    return matchesRound(game, pick);
  });

  if (!matchingGame) {
    return {
      ...pick,
      gameId: null,
      opponentName: "",
      result: "pending",
    };
  }

  const opponent = getOpponentFromGame(matchingGame, pick.teamId);

  if (!isFinalStatus(matchingGame.status)) {
    return {
      ...pick,
      gameId: matchingGame.id ?? null,
      opponentName: getTeamName(opponent),
      result: "pending",
    };
  }

  const winnerId = inferWinnerId(matchingGame);

  return {
    ...pick,
    gameId: matchingGame.id ?? null,
    opponentName: getTeamName(opponent),
    result: winnerId === String(pick.teamId) ? "won" : "lost",
  };
}

export function resolveSurvivorEntry(entry, games = []) {
  const resolvedPicks = (entry.picks || []).map((pick) =>
    resolveSurvivorPick(pick, games)
  );

  const losingPick = resolvedPicks.find((pick) => pick.result === "lost");
  const currentPick =
    resolvedPicks.find((pick) => pick.result === "pending") ||
    resolvedPicks[resolvedPicks.length - 1] ||
    null;

  return {
    ...entry,
    picks: resolvedPicks,
    isActive: !losingPick,
    eliminatedAt: losingPick?.roundName || losingPick?.roundId || null,
    currentPick,
  };
}

export function resolveSurvivorEntries(entries = [], games = []) {
  return entries.map((entry) => resolveSurvivorEntry(entry, games));
}

export function getSurvivorSummary(entries = []) {
  const totalEntries = entries.length;
  const activeEntries = entries.filter((entry) => entry.isActive).length;
  const eliminatedEntries = totalEntries - activeEntries;

  return {
    totalEntries,
    activeEntries,
    eliminatedEntries,
  };
}