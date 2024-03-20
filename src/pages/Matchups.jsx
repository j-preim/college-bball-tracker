import { useEffect, useState } from "react";
import ListGames from "../components/ListGames";

// const [selectedDay, setSelectedDay] = useState();


export default function Matchups(props) {
  return (
    <div>
      <ListGames gamesData={getGamesForDay(todayFormatted, props.gamesData)} />
    </div>
  );
}