import { useState, useEffect } from "react";
import BracketLeft from "./BracketLeft";
import BracketChampGame from "./BracketChampGame";
import BracketRight from "./BracketRight";

export default function BracketManual(props) {

  const [firstRound, setFirstRound] = useState([props.roundsData[1]]);
  const [secondRound, setSecondRound] = useState([props.roundsData[2]]);
  const [sweetSixteen, setSweetSixteen] = useState([props.roundsData[3]]);

  function getGames(round, bracket) {
    let games = [];
    let data = props.roundsData;
    for (let i = 0; i < data.length; i++) {
      if (data[i].roundName === round) {
        for (let x = 0; x < data[i].brackets.length; x++) {
          if (data[i].brackets[x].bracketRank === bracket) {
            games = data[i].brackets[x].bracketGames;
          }
        }
      }
    }

    games.sort((a, b) =>
    (a.title > b.title ? 1 : b.title > a.title ? -1 : 0)
  );
    return games;
  }

  function selectedTeams(id) {
    for (let i = 0; i < props.currentEntry.teams.length; i++) {
      if (id === props.currentEntry.teams[i]){
        console.log(props.currentEntry.teams[i])
        return "selectedTeam"
      }
      return "";
    }
  }

  return (
    <>
      <div className="container-fluid mt-2 bracket">
        <div className="row">
          <BracketLeft firstRound={firstRound} secondRound={secondRound} sweetSixteen={sweetSixteen} currentEntry={props.currentEntry}/>
          <BracketChampGame />
          <BracketRight firstRound={firstRound} secondRound={secondRound} sweetSixteen={sweetSixteen} />
        </div>
      </div>
    </>
  );
}
