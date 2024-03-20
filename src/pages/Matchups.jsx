import { useEffect, useState } from "react";
import ListGames from "../components/ListGames";


export default function Matchups(props) {

  const [selectedDay, setSelectedDay] = useState(props.todayFormatted);

  function handleInputChange(e) {
    setSelectedDay(e.target.value)
    console.log(e.target.value)
    console.log(selectedDay)
  }

  return (
    <>
    <div className="p-3">
        <label htmlFor="dates"><h4 className="lato-regular">Select a day:</h4></label>
        <select name="dates" value={selectedDay} onChange={handleInputChange}>
        {props.gameDates.map((date) => (
          <option value={date} key={date}>{date}</option>
        ))}
        </select>
      </div>
    <div>
      <ListGames gamesData={props.getGamesForDay(selectedDay, props.gamesData)} />
    </div>
    </>
  );
}