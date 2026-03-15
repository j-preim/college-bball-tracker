import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import { Home, Matchups, Bracket, Entries, Auth } from "./pages";
import { useTournamentData } from "./hooks/useTournamentData";

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
    defaultDate,
    refreshTournamentData,
  } = useTournamentData();

  useEffect(() => {
    const cookie = Cookie.get("auth_cookie") ?? "";
    setAuthCookie(cookie);
  }, []);

  return (
    <BrowserRouter>
      <Header
        authCookie={authCookie}
        liveGames={liveGames.length}
        onRefresh={refreshTournamentData}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              roundsData={rounds}
              gamesData={games}
              gameDates={gameDates}
              bettingData={bettingData}
              loading={loading}
              error={error}
              selectedDate={defaultDate}
              refreshTournamentData={refreshTournamentData}
            />
          }
        />
        <Route
          path="/matchups"
          element={
            <Matchups
              roundsData={rounds}
              gamesData={games}
              gameDates={gameDates}
              bettingData={bettingData}
              loading={loading}
              error={error}
              defaultDate={defaultDate}
            />
          }
        />
        <Route
          path="/bracket"
          element={
            <Bracket
              roundsData={rounds}
              gamesData={games}
              gameDates={gameDates}
              bettingData={bettingData}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/entries" element={<Entries authCookie={authCookie} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
