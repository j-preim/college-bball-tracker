import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookie from "js-cookie";
import Header from "./components/Header";
import { Home, Matchups, Bracket, Entries, Auth } from "./pages";
import initSchedDb from "../public/initSched.json";
import { getGamesForDay } from "./hooks/getGamesForDay";
import "./App.css";

export default function App() {
  function verifyUser() {
    const cookie = Cookie.get("auth_cookie");
  }

  useEffect(() => {
    verifyUser();
  }, []);

  let rounds = [];
  let games = [];
  let gameDatesArray = [];

  const [count, setCount] = useState(0);
  const [initSched, setinitSched] = useState(initSchedDb);
  const [roundsData, setRoundsData] = useState(rounds);
  const [gamesData, setGamesData] = useState(games);
  const [gameDates, setGameDates] = useState(gameDatesArray);

  const today = new Date();
  const todayFormatted = today.toLocaleDateString();

  function getRounds() {
    for (let i = 0; i < initSched.rounds.length; i++) {
      let round = {};
      let roundName = initSched.rounds[i].name;
      let roundId = initSched.rounds[i].id;
      let roundBrackets;
      let roundTeams = [];

      if (roundName === "Final Four" || roundName === "National Championship") {
        roundBrackets = [
          {
            bracket: { id: roundName, name: roundName },
            games: initSched.rounds[i].games,
          },
        ];
      } else {
        roundBrackets = initSched.rounds[i].bracketed;
      }

      let brackets = [];
      let roundDates = new Set();

      for (let x = 0; x < roundBrackets.length; x++) {
        let bracket = {};
        let bracketName = roundBrackets[x].bracket.name;

        let bracketId = roundBrackets[x].bracket.id;
        let bracketGames = roundBrackets[x].games;
        bracketGames.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );

        let bracketRank = roundBrackets[x].bracket.rank;

        for (let y = 0; y < bracketGames.length; y++) {
          let rawDate = new Date(bracketGames[y].scheduled);
          let formattedDateTime = rawDate.toLocaleString();
          let formattedDate = rawDate.toLocaleDateString();

          bracketGames[y].scheduled = formattedDateTime;
          bracketGames[y].bracket = bracketName.slice(
            0,
            bracketName.indexOf(" ")
          );
          bracketGames[y].roundName = roundName;

          games.push(bracketGames[y]);

          roundTeams.push({
            date: bracketGames[y].scheduled,
            home: bracketGames[y].home,
            away: bracketGames[y].away,
          });

          if (!roundDates.has(formattedDate)) {
            roundDates.add(formattedDate);
          }
          if (gameDatesArray.indexOf(formattedDate) === -1) {
            gameDatesArray.push(formattedDate);
          }
        }

        bracket = {
          bracketName: bracketName,
          bracketId: bracketId,
          bracketRank: bracketRank,
          bracketGames: bracketGames,
        };
        brackets.push(bracket);
      }

      brackets.sort((a, b) =>
          a.bracketRank - b.bracketRank
        );

      round = {
        roundName: roundName,
        roundId: roundId,
        brackets: brackets,
        roundDates: roundDates,
        roundTeams: roundTeams,
      };
      rounds.push(round);
    }

    setRoundsData(rounds);
    setGamesData(games);
    setGameDates(gameDatesArray.sort());
    // console.log(rounds);
  }

  useEffect(() => {
    if ((rounds = []) && (games = [])) {
      getRounds();
    }
  }, []);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                todayFormatted={todayFormatted}
                gamesData={gamesData}
                getGamesForDay={getGamesForDay}
              />
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/entries"
            element={
              <Entries
                todayFormatted={todayFormatted}
                gamesData={gamesData}
                roundsData={roundsData}
                getGamesForDay={getGamesForDay}
              />
            }
          />
          <Route
            path="/matchups"
            element={
              <Matchups
                todayFormatted={todayFormatted}
                gamesData={gamesData}
                getGamesForDay={getGamesForDay}
                gameDates={gameDates}
              />
            }
          />
          <Route path="/bracket" element={<Bracket />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
