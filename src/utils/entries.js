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
    game?.homeTeam ||
    game?.home ||
    game?.teams?.home ||
    game?.competitors?.find((team) => team.homeAway === "home") ||
    null;

  const awayTeam =
    game?.awayTeam ||
    game?.away ||
    game?.teams?.away ||
    game?.competitors?.find((team) => team.homeAway === "away") ||
    null;

  return { homeTeam, awayTeam };
}

function getTeamId(team) {
  return String(
    team?.id ??
      team?.team?.id ??
      team?.uid ??
      ""
  );
}

function getTeamName(team) {
  return (
    team?.name ||
    team?.displayName ||
    team?.team?.displayName ||
    team?.team?.name ||
    ""
  );
}

function getTeamScore(team) {
  const raw =
    team?.score ??
    team?.points ??
    team?.team?.score ??
    null;

  const score = Number(raw);
  return Number.isFinite(score) ? score : null;
}

function inferWinnerId(game) {
  if (game?.winner?.id) return String(game.winner.id);
  if (game?.winningTeamId) return String(game.winningTeamId);
  if (game?.winnerId) return String(game.winnerId);

  const { homeTeam, awayTeam } = getGameTeams(game);

  const homeScore = getTeamScore(homeTeam);
  const awayScore = getTeamScore(awayTeam);

  if (homeScore == null || awayScore == null) return "";

  if (homeScore > awayScore) return getTeamId(homeTeam);
  if (awayScore > homeScore) return getTeamId(awayTeam);

  return "";
}

function inferRoundKey(game) {
  return String(
    game?.roundKey ??
      game?.round ??
      game?.tournamentRound ??
      game?.bracketRound ??
      ""
  );
}

function gameContainsTeam(game, teamId) {
  const { homeTeam, awayTeam } = getGameTeams(game);

  return (
    getTeamId(homeTeam) === String(teamId) ||
    getTeamId(awayTeam) === String(teamId)
  );
}

function getOpponentFromGame(game, pickedTeamId) {
  const { homeTeam, awayTeam } = getGameTeams(game);

  if (getTeamId(homeTeam) === String(pickedTeamId)) return awayTeam;
  if (getTeamId(awayTeam) === String(pickedTeamId)) return homeTeam;

  return null;
}

export function resolveSurvivorPick(pick, games = []) {
  const matchingGame = games.find((game) => {
    if (!gameContainsTeam(game, pick.teamId)) return false;

    if (!pick.roundKey) return true;

    return inferRoundKey(game) === String(pick.roundKey);
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
    eliminatedAt: losingPick?.roundKey ?? null,
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