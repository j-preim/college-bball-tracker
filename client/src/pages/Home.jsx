import { useEffect, useState } from "react";
import ListGames from "../components/ListGames";

export default function Home(props) {
  

  return (
    <>
      <div className="p-3 pb-2 headline">
        <h4 className="lato-regular">Today's games ({props.todayFormatted}):</h4>
      </div>

      <div> 
        <ListGames
          gamesData={props.getGamesForDay(props.todayFormatted, props.gamesData)}
        />
      </div>
    </>
  );
}
