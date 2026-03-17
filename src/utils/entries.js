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
  return {
    homeTeam: game?.home || null,
    awayTeam: game?.away || null,
  };
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

function normalizeDate(value = "") {
  return String(value).slice(0, 10);
}

function comparePicksByDate(a, b) {
  const aDate = normalizeDate(a?.pickDate);
  const bDate = normalizeDate(b?.pickDate);

  if (aDate < bDate) return -1;
  if (aDate > bDate) return 1;

  const aPickedAt = String(a?.pickedAt || "");
  const bPickedAt = String(b?.pickedAt || "");

  if (aPickedAt < bPickedAt) return -1;
  if (aPickedAt > bPickedAt) return 1;

  return 0;
}

function normalizeTeamId(teamId) {
  return String(teamId ?? "");
}

function validateEntryPicks(entry) {
  const picks = [...(entry?.picks || [])].sort(comparePicksByDate);
  const validationByKey = {};
  const usedTeams = new Map();
  const usedDates = new Map();

  for (const pick of picks) {
    const pickDate = normalizeDate(pick?.pickDate);
    const teamId = normalizeTeamId(pick?.teamId);
    const pickKey = `${pickDate}__${teamId}__${pick?.pickedAt || ""}`;

    const issues = [];

    if (!pickDate) {
      issues.push({
        code: "missing_pick_date",
        message: "Pick date is missing.",
      });
    }

    if (!teamId) {
      issues.push({
        code: "missing_team_id",
        message: "Team ID is missing.",
      });
    }

    const priorDateForTeam = usedTeams.get(teamId);
    if (teamId && priorDateForTeam && priorDateForTeam !== pickDate) {
      issues.push({
        code: "reused_team",
        message: `Team was already used on ${priorDateForTeam}.`,
      });
    }

    const priorTeamForDate = usedDates.get(pickDate);
    if (pickDate && priorTeamForDate) {
      issues.push({
        code: "duplicate_date",
        message: `Entry already has a pick for ${pickDate}.`,
      });
    }

    if (teamId && !usedTeams.has(teamId)) {
      usedTeams.set(teamId, pickDate);
    }

    if (pickDate && !usedDates.has(pickDate)) {
      usedDates.set(pickDate, teamId);
    }

    validationByKey[pickKey] = issues;
  }

  return validationByKey;
}

function getPickValidationKey(pick) {
  return `${normalizeDate(pick?.pickDate)}__${normalizeTeamId(pick?.teamId)}__${pick?.pickedAt || ""}`;
}

export function resolveEntryPick(pick, games = []) {
  const targetDate = normalizeDate(pick?.pickDate);

  const matchingGame = games.find((game) => {
    const gameDate = normalizeDate(game?.gameDate || game?.scheduled);

    return gameContainsTeam(game, pick?.teamId) && gameDate === targetDate;
  });

  if (!matchingGame) {
    return {
      ...pick,
      gameId: null,
      opponentName: "",
      result: "pending",
      statusLabel: "No matchup found",
      gameStatus: "",
    };
  }

  const opponent = getOpponentFromGame(matchingGame, pick?.teamId);

  if (!isFinalStatus(matchingGame.status)) {
    return {
      ...pick,
      gameId: matchingGame.id ?? null,
      opponentName: getTeamName(opponent),
      result: "pending",
      statusLabel: "Pending",
      gameStatus: matchingGame.status,
    };
  }

  const winnerId = inferWinnerId(matchingGame);
  const won = winnerId === String(pick?.teamId);

  return {
    ...pick,
    gameId: matchingGame.id ?? null,
    opponentName: getTeamName(opponent),
    result: won ? "won" : "lost",
    statusLabel: won ? "Advanced" : "Eliminated",
    gameStatus: matchingGame.status,
  };
}

export function resolveEntry(entry, games = []) {
  const sortedPicks = [...(entry?.picks || [])].sort(comparePicksByDate);
  const validationByKey = validateEntryPicks(entry);

  const resolvedPicks = sortedPicks.map((pick) => {
    const resolvedPick = resolveEntryPick(pick, games);
    const validationIssues = validationByKey[getPickValidationKey(pick)] || [];

    return {
      ...resolvedPick,
      validationIssues,
      isValid: validationIssues.length === 0,
    };
  });

  let eliminatedAt = null;
  let isActive = true;

  for (const pick of resolvedPicks) {
    if (pick.result === "lost") {
      eliminatedAt = pick.pickDate;
      isActive = false;
      break;
    }
  }

  const effectivePicks = [];
  let entryAlive = true;

  for (const pick of resolvedPicks) {
    if (!entryAlive) break;

    effectivePicks.push(pick);

    if (pick.result === "lost") {
      entryAlive = false;
    }
  }

  const currentPick =
    effectivePicks.find((pick) => pick.result === "pending") ||
    effectivePicks[effectivePicks.length - 1] ||
    null;

  const invalidPicks = resolvedPicks.filter((pick) => !pick.isValid);
  const hasValidationErrors = invalidPicks.length > 0;

  return {
    ...entry,
    picks: effectivePicks,
    allResolvedPicks: resolvedPicks,
    isActive,
    eliminatedAt,
    currentPick,
    hasValidationErrors,
    invalidPicks,
  };
}

export function resolveSurvivorEntries(entries = [], games = []) {
  return entries.map((entry) => resolveEntry(entry, games));
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
