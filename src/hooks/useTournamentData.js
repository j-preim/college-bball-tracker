import { useCallback, useEffect, useMemo, useState } from "react";
import { getScheduleData } from "./getInitSched";
import { getBettingData } from "./getInitBettingLines";

const REFRESH_KEY = "mm_last_refresh";
const CACHE_KEY = "mm_tournament_cache";
const REFRESH_MINUTES = 60;
const REFRESH_INTERVAL = REFRESH_MINUTES * 60 * 1000;

let memoryCache = null;
let inFlightPromise = null;

function readLocalCache() {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || !parsed?.data) return null;

    return parsed;
  } catch {
    return null;
  }
}

function writeLocalCache(data) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      }),
    );
    localStorage.setItem(REFRESH_KEY, String(Date.now()));
  } catch {
    // ignore cache write failures
  }
}

function isFresh(timestamp) {
  return Date.now() - Number(timestamp || 0) < REFRESH_INTERVAL;
}

export function useTournamentData() {
  const [state, setState] = useState(() => {
    const localCache = readLocalCache();

    if (memoryCache && isFresh(memoryCache.timestamp)) {
      return {
        ...memoryCache.data,
        loading: false,
        error: "",
      };
    }

    if (localCache && isFresh(localCache.timestamp)) {
      memoryCache = localCache;

      return {
        ...localCache.data,
        loading: false,
        error: "",
      };
    }

    return {
      rounds: [],
      games: [],
      gameDates: [],
      bettingData: [],
      loading: true,
      error: "",
      lastUpdated: "",
    };
  });

  const loadTournamentData = useCallback(async ({ force = false } = {}) => {
    const localCache = readLocalCache();
    const freshMemory = memoryCache && isFresh(memoryCache.timestamp);
    const freshLocal = localCache && isFresh(localCache.timestamp);

    if (!force && freshMemory) {
      localStorage.setItem(REFRESH_KEY, String(Date.now()));
      setState({
        ...memoryCache.data,
        loading: false,
        error: "",
      });
      return memoryCache.data;
    }

    if (!force && freshLocal) {
      memoryCache = localCache;
      localStorage.setItem(REFRESH_KEY, String(Date.now()));
      setState({
        ...localCache.data,
        loading: false,
        error: "",
      });
      return localCache.data;
    }

    if (inFlightPromise) {
      const sharedData = await inFlightPromise;
      setState({
        ...sharedData,
        loading: false,
        error: "",
      });
      return sharedData;
    }

    inFlightPromise = (async () => {
      try {
        setState((prev) => ({
          ...prev,
          loading: prev.games.length === 0,
          error: "",
        }));

        const [scheduleData, bettingData] = await Promise.all([
          getScheduleData(),
          getBettingData().catch(() => ({ sport_events: [] })),
        ]);

        const nextState = {
          rounds: scheduleData.rounds || [],
          games: scheduleData.games || [],
          gameDates: scheduleData.gameDates || [],
          bettingData: bettingData?.sport_events || [],
          loading: false,
          error: "",
          lastUpdated: new Date().toLocaleTimeString(),
        };

        memoryCache = {
          timestamp: Date.now(),
          data: nextState,
        };

        writeLocalCache(nextState);
        setState(nextState);

        return nextState;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to load tournament data.",
        }));
        throw error;
      } finally {
        inFlightPromise = null;
      }
    })();

    return inFlightPromise;
  }, []);

  useEffect(() => {
    loadTournamentData();

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;

      const lastRefresh = Number(localStorage.getItem(REFRESH_KEY) || 0);

      if (Date.now() - lastRefresh >= REFRESH_INTERVAL) {
        loadTournamentData();
      }
    }, REFRESH_INTERVAL);

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      const lastRefresh = Number(localStorage.getItem(REFRESH_KEY) || 0);

      if (Date.now() - lastRefresh >= REFRESH_INTERVAL) {
        loadTournamentData();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
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
    refreshTournamentData: () => loadTournamentData({ force: true }),
  };
}
