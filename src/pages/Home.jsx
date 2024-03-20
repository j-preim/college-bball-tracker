import { useEffect, useState } from "react";
import ListGames from "../components/ListGames";
import initSchedDb from "../../public/initialSchedule2024.json";

export default function Home(props) {
  

  return (
    <>
      <div className="p-3">
        <h4 className="lato-regular">Today's Matchups ({props.todayFormatted}):</h4>
      </div>

      <div> 
        <ListGames
          gamesData={props.getGamesForDay(props.todayFormatted, props.gamesData)}
        />
      </div>
    </>
  );
}
