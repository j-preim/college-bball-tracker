import { useEffect, useState } from "react";
import ListGames from "../components/ListGames";
import CountTables from "../components/CountTables";


export default function Matchups(props) {

  const [selectedDay, setSelectedDay] = useState(props.todayFormatted);

  function handleInputChange(e) {
    setSelectedDay(e.target.value)
  }

  return (
    <>
    <div className="p-3">
        <label htmlFor="dates"><h4 className="lato-regular headline">Select a day:&nbsp;</h4></label>
        <select name="dates" value={selectedDay} onChange={handleInputChange}>
        {props.gameDates.map((date) => (
          <option value={date} key={date}>{date}</option>
        ))}
        </select>
      </div>
    <div>
      
      <ListGames gamesData={props.getGamesForDay(selectedDay, props.gamesData)} />
    </div>
    <div>
      <CountTables gamesData={props.getGamesForDay(selectedDay, props.gamesData)} />
    </div>
    </>
  );
}