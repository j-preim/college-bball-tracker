import { useEffect, useState } from "react";
import ListGames from "../components/games/ListGames";
import CountTables from "../components/CountTables";

export default function Matchups(props) {
  const [selectedDay, setSelectedDay] = useState(
    props.todayFormatted || props.gameDates?.[0] || ""
  );

  useEffect(() => {
    if (!selectedDay && props.gameDates?.length) {
      setSelectedDay(props.gameDates[0]);
    }
  }, [props.gameDates, selectedDay]);

  function handleInputChange(e) {
    setSelectedDay(e.target.value);
  }

  return (
    <div className="container py-3">
      <div className="mb-3">
        <h4 className="mb-2">Select a day</h4>
        <select
          className="form-select"
          value={selectedDay}
          onChange={handleInputChange}
        >
          {props.gameDates?.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <ListGames
        title={selectedDay ? `Games for ${selectedDay}` : "Games"}
        gamesData={props.gamesData || []}
        bettingData={props.bettingData || []}
        selectedDate={selectedDay}
        emptyMessage="No games found for that date."
      />

      <div className="mt-4">
        <CountTables
          gamesData={props.gamesData || []}
          selectedDay={selectedDay}
        />
      </div>
    </div>
  );
}