import { useCallback, useEffect, useMemo, useState } from "react";
import { getScheduleData } from "./getInitSched";
import { getBettingData } from "./getInitBettingLines";

export function useTournamentData() {
  const [state, setState] = useState({
    rounds: [],
    games: [],
    gameDates: [],
    bettingData: [],
    loading: true,
    error: "",
    lastUpdated: "",
  });

  const loadTournamentData = useCallback(async () => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: "",
      }));

      const [scheduleData, bettingData] = await Promise.all([
        getScheduleData(),
        getBettingData().catch(() => ({ sport_events: [] })),
      ]);

      setState({
        rounds: scheduleData.rounds || [],
        games: scheduleData.games || [],
        gameDates: scheduleData.gameDates || [],
        bettingData: bettingData?.sport_events || [],
        loading: false,
        error: "",
        lastUpdated: new Date().toLocaleTimeString({
          hour: "numeric",
          minute: "2-digit",
        }),
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
        lastUpdated: "",
      });
    }
  }, []);

  const REFRESH_KEY = "mm_last_refresh";

  useEffect(() => {
    loadTournamentData();

    const refreshMinutes = 10;
    const refreshInterval = refreshMinutes * 60 * 1000;

    const intervalId = window.setInterval(() => {
      const lastRefresh = Number(localStorage.getItem(REFRESH_KEY) || 0);

      if (Date.now() - lastRefresh > refreshInterval) {
        localStorage.setItem(REFRESH_KEY, Date.now());
        loadTournamentData();
      }
    }, refreshInterval);

    return () => window.clearInterval(intervalId);
  }, [loadTournamentData]);

  const liveGames = useMemo(
    () => state.games.filter((game) => game.status === "inprogress"),
    [state.games],
  );

  const completedGames = useMemo(
    () =>
      state.games.filter(
        (game) => game.status === "closed" || game.status === "complete",
      ),
    [state.games],
  );

  const upcomingGames = useMemo(
    () =>
      state.games.filter(
        (game) =>
          game.status !== "closed" &&
          game.status !== "complete" &&
          game.status !== "inprogress",
      ),
    [state.games],
  );

  return {
    ...state,
    liveGames,
    completedGames,
    upcomingGames,
    refreshTournamentData: loadTournamentData,
  };
}
