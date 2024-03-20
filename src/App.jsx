import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { Home, Matchups, Bracket } from "./pages"
import initSchedDb from "../public/initialSchedule2024.json";
import { getGamesForDay } from "./hooks/getGamesForDay"
import './App.css'

function App() {
  let rounds = [];
  let games = [];
  
  const [count, setCount] = useState(0)
  const [initSched, setinitSched] = useState(initSchedDb);
  const [roundsData, setRoundsData] = useState(rounds);
  const [gamesData, setGamesData] = useState(games);
  const [todaysGames, setTodaysGames] = useState([]);

  const today = new Date();
  const todayFormatted = today.toLocaleDateString();

  let gameDate = new Date(initSched.rounds[0].bracketed[0].games[0].scheduled);
  let gameDateFormatted = gameDate.toLocaleDateString();

  function getRounds() {
    for (let i = 0; i < initSched.rounds.length; i++) {
      let round = {};
      let roundName = initSched.rounds[i].name;
      let roundId = initSched.rounds[i].id;
      let roundBrackets;
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
      let roundDates = [];

      for (let x = 0; x < roundBrackets.length; x++) {
        let bracket = {};
        let bracketName = roundBrackets[x].bracket.name;

        let bracketId = roundBrackets[x].bracket.id;
        let bracketGames = roundBrackets[x].games;

        for (let y = 0; y < bracketGames.length; y++) {
          let rawDate = new Date(bracketGames[y].scheduled);
          let formattedDate = rawDate.toLocaleString();

          bracketGames[y].scheduled = formattedDate;
          bracketGames[y].bracket = bracketName.slice(0, bracketName.indexOf(" "));

          games.push(bracketGames[y]);

          if (roundDates.indexOf(formattedDate) === -1) {
            roundDates.push(rawDate.toLocaleDateString());
          }
        }

        bracket = {
          bracketName: bracketName,
          bracketId: bracketId,
          bracketGames: bracketGames,
        };
        brackets.push(bracket);
      }

      round = {
        roundName: roundName,
        roundId: roundId,
        brackets: brackets,
        roundDates: roundDates,
      };
      rounds.push(round);
    }

    console.log(games);
    setRoundsData(rounds);
    setGamesData(games);
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
          <Route path="/" element={<Home todayFormatted={todayFormatted} gamesData={gamesData} getGamesForDay={getGamesForDay} />} />
          <Route path="/matchups" element={<Matchups gamesData={gamesData} getGamesForDay={getGamesForDay} />} />
          <Route path="/bracket" element={<Bracket />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </div>
  )
}

export default App
