import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getScheduleData } from "../hooks/getInitSched";
import { getBettingData } from "../hooks/getInitBettingLines";

const TournamentDataContext = createContext(null);

const REFRESH_KEY = "mm_last_refresh";
const CACHE_KEY = "mm_tournament_cache";
const REFRESH_MINUTES = 10;
const REFRESH_INTERVAL = REFRESH_MINUTES * 60 * 1000;

function getCachedState() {
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

export function TournamentDataProvider({ children }) {
  const [state, setState] = useState({
    rounds: [],
    games: [],
    gameDates: [],
    bettingData: [],
    loading: true,
    error: "",
    lastUpdated: "",
  });

  const inFlightRef = useRef(null);

  const loadTournamentData = useCallback(async ({ force = false } = {}) => {
    if (inFlightRef.current) {
      return inFlightRef.current;
    }

    const cached = getCachedState();
    const isCacheFresh =
      cached && Date.now() - cached.timestamp < REFRESH_INTERVAL;

    if (!force && isCacheFresh) {
      setState({
        ...cached.data,
        loading: false,
        error: "",
      });
      return cached.data;
    }

    const request = (async () => {
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

        setState(nextState);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            data: nextState,
          })
        );
        localStorage.setItem(REFRESH_KEY, String(Date.now()));

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
        inFlightRef.current = null;
      }
    })();

    inFlightRef.current = request;
    return request;
  }, []);

  useEffect(() => {
    loadTournamentData();

    const intervalId = window.setInterval(() => {
      const lastRefresh = Number(localStorage.getItem(REFRESH_KEY) || 0);

      if (Date.now() - lastRefresh >= REFRESH_INTERVAL) {
        loadTournamentData();
      }
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [loadTournamentData]);

  const liveGames = useMemo(
    () => state.games.filter((game) => game.status === "inprogress"),
    [state.games]
  );

  const completedGames = useMemo(
    () =>
      state.games.filter(
        (game) => game.status === "closed" || game.status === "complete"
      ),
    [state.games]
  );

  const upcomingGames = useMemo(
    () =>
      state.games.filter(
        (game) =>
          game.status !== "closed" &&
          game.status !== "complete" &&
          game.status !== "inprogress"
      ),
    [state.games]
  );

  const value = useMemo(
    () => ({
      ...state,
      liveGames,
      completedGames,
      upcomingGames,
      refreshTournamentData: () => loadTournamentData({ force: true }),
    }),
    [state, liveGames, completedGames, upcomingGames, loadTournamentData]
  );

  return (
    <TournamentDataContext.Provider value={value}>
      {children}
    </TournamentDataContext.Provider>
  );
}

export function useTournamentData() {
  const context = useContext(TournamentDataContext);

  if (!context) {
    throw new Error(
      "useTournamentData must be used within a TournamentDataProvider"
    );
  }

  return context;
}