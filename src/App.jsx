import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import { Home, Matchups, Bracket, Entries, Auth } from "./pages";
import { useTournamentData } from "./hooks/useTournamentData";
import { getTodayDateString } from "./utils/dateHelpers";

import "./App.css";

export default function App() {
  const [authCookie, setAuthCookie] = useState("");
  const {
    rounds,
    games,
    gameDates,
    bettingData,
    loading,
    error,
    liveGames,
    lastUpdated,
    refreshTournamentData,
  } = useTournamentData();

  useEffect(() => {
    const cookie = Cookie.get("auth_cookie") ?? "";
    setAuthCookie(cookie);
  }, []);

  const sharedProps = {
    roundsData: rounds,
    gamesData: games,
    gameDates,
    bettingData,
    loading,
    error,
    refreshTournamentData,
    todayFormatted: getTodayDateString(),
  };

  return (
    <BrowserRouter>
      <Header
        authCookie={authCookie}
        liveGames={liveGames.length}
        lastUpdated={lastUpdated}
        onRefresh={refreshTournamentData}
      />

      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/matchups" element={<Matchups {...sharedProps} />} />
        <Route path="/bracket" element={<Bracket {...sharedProps} />} />
        <Route path="/entries" element={<Entries {...sharedProps} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
