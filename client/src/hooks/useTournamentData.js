import { useCallback, useEffect, useMemo, useState } from "react";
import { getScheduleData } from "./getInitSched";
import { getBettingData } from "./getInitBettingLines";

function safeDateString(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

function safeDateTimeString(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
}

function normalizeBettingLines(rawBettingData) {
  if (!rawBettingData || !Array.isArray(rawBettingData.sport_events)) {
    return [];
  }

  return rawBettingData.sport_events.map((event) => ({
    ...event,
  }));
}

function normalizeSchedule(rawScheduleData) {
  if (!rawScheduleData || !Array.isArray(rawScheduleData.rounds)) {
    return {
      rounds: [],
      games: [],
      gameDates: [],
    };
  }

  const normalizedRounds = [];
  const normalizedGames = [];
  const allDates = new Set();

  for (const rawRound of rawScheduleData.rounds) {
    const roundName = rawRound?.name ?? "Unknown Round";
    const roundId = rawRound?.id ?? crypto.randomUUID();

    const roundBrackets =
      roundName === "Final Four" || roundName === "National Championship"
        ? [
            {
              bracket: { id: roundName, name: roundName, rank: 999 },
              games: Array.isArray(rawRound.games) ? rawRound.games : [],
            },
          ]
        : Array.isArray(rawRound.bracketed)
        ? rawRound.bracketed
        : [];

    const brackets = [];
    const roundDates = new Set();
    const roundTeams = [];

    for (const rawBracket of roundBrackets) {
      const bracketName = rawBracket?.bracket?.name ?? "Unknown Bracket";
      const bracketId = rawBracket?.bracket?.id ?? crypto.randomUUID();
      const bracketRank = rawBracket?.bracket?.rank ?? 999;

      const bracketGames = Array.isArray(rawBracket.games)
        ? [...rawBracket.games]
        : [];

      bracketGames.sort((a, b) => {
        const aTitle = a?.title ?? "";
        const bTitle = b?.title ?? "";
        return aTitle.localeCompare(bTitle);
      });

      const normalizedBracketGames = bracketGames.map((game) => {
        const formattedDate = safeDateString(game?.scheduled);
        const formattedDateTime = safeDateTimeString(game?.scheduled);

        if (formattedDate) {
          allDates.add(formattedDate);
          roundDates.add(formattedDate);
        }

        const normalizedGame = {
          ...game,
          scheduledRaw: game?.scheduled ?? "",
          scheduled: formattedDateTime,
          gameDate: formattedDate,
          bracket: bracketName.includes(" ")
            ? bracketName.slice(0, bracketName.indexOf(" "))
            : bracketName,
          bracketName,
          bracketRank,
          roundName,
        };

        normalizedGames.push(normalizedGame);

        roundTeams.push({
          date: normalizedGame.scheduled,
          home: normalizedGame.home ?? null,
          away: normalizedGame.away ?? null,
        });

        return normalizedGame;
      });

      brackets.push({
        bracketName,
        bracketId,
        bracketRank,
        bracketGames: normalizedBracketGames,
      });
    }

    brackets.sort((a, b) => a.bracketRank - b.bracketRank);

    normalizedRounds.push({
      roundName,
      roundId,
      brackets,
      roundDates: [...roundDates],
      roundTeams,
    });
  }

  return {
    rounds: normalizedRounds,
    games: normalizedGames,
    gameDates: [...allDates].sort((a, b) => new Date(a) - new Date(b)),
  };
}

export function useTournamentData() {
  const [state, setState] = useState({
    rounds: [],
    games: [],
    gameDates: [],
    bettingData: [],
    loading: true,
    error: "",
  });

  const loadTournamentData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: "",
    }));

    try {
      const [scheduleData, bettingData] = await Promise.all([
        getScheduleData(),
        getBettingData(),
      ]);

      const normalizedSchedule = normalizeSchedule(scheduleData);
      const normalizedBettingData = normalizeBettingLines(bettingData);

      setState({
        rounds: normalizedSchedule.rounds,
        games: normalizedSchedule.games,
        gameDates: normalizedSchedule.gameDates,
        bettingData: normalizedBettingData,
        loading: false,
        error: "",
      });
    } catch (error) {
      setState({
        rounds: [],
        games: [],
        gameDates: [],
        bettingData: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load tournament data.",
      });
    }
  }, []);

  useEffect(() => {
    loadTournamentData();
  }, [loadTournamentData]);

  const derived = useMemo(() => {
    const liveGames = state.games.filter((game) => game.status === "inprogress");
    const completedGames = state.games.filter(
      (game) => game.status === "closed" || game.status === "complete"
    );
    const upcomingGames = state.games.filter(
      (game) =>
        game.status !== "inprogress" &&
        game.status !== "closed" &&
        game.status !== "complete"
    );

    return {
      liveGames,
      completedGames,
      upcomingGames,
    };
  }, [state.games]);

  return {
    ...state,
    ...derived,
    refreshTournamentData: loadTournamentData,
  };
}