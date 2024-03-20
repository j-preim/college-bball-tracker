import { useEffect, useState } from "react";
import ListGames from "../components/ListGames";
import initSchedDb from "../../public/initialSchedule2024.json";
import { getGamesForDay } from "../hooks/getGamesForDay";

export default function Home() {
  let rounds = [];
  let games = [];

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
          // let game = {};
          // let gameTitle = bracketGames[y].title;
          // let gameId = bracketGames[y].id;
          // let gameHomeTeam = bracketGames[y].home;
          // let gameAwayTeam = bracketGames[y].away;

          // game = {
          //   gameId: gameId,
          // }
          // games.push(game);

          let rawDate = new Date(bracketGames[y].scheduled);
          let formattedDate = rawDate.toLocaleString();

          bracketGames[y].scheduled = formattedDate;

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

  function getTodaysGames(gamesData) {
    for (let i = 0; i < allGames.length; i++) {
      let dateTime = new Date(allGames[i].scheduled);
      let gameDateFormatted = dateTime.toLocaleDateString();
      console.log(gameDateFormatted);

      if (gameDateFormatted === props.date) {
        todaysGames.push(allGames[i]);
        console.log("pushed");
      }
    }
  }

  useEffect(() => {
    if ((rounds = []) && (games = [])) {
      getRounds();
    }
  }, []);

  return (
    <>
      <div className="p-3">
        <h4 className="lato-regular">Today's Matchups ({todayFormatted}):</h4>
      </div>

      <div> 
        <ListGames
          gamesData={getGamesForDay(todayFormatted, gamesData)}
        />
      </div>
    </>
  );
}
