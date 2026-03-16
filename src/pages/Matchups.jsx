import { useEffect, useState } from "react";
import ListGames from "../components/games/ListGames";
import CountTables from "../components/CountTables";
import { getBestAvailableDate, getTodayDateString } from "../utils/dateHelpers";

export default function Matchups(props) {
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    if (!gameDates.length) {
      if (selectedDay !== "") {
        setSelectedDay("");
      }
      return;
    }
    
    const bestDate = getBestAvailableDate(
      props.gameDates || [],
      props.todayFormatted || getTodayDateString()
    );

    const selectedStillExists = props.gameDates.includes(selectedDay);

    if (!selectedDay || !selectedStillExists) {
      setSelectedDay(bestDate);
    }
  }, [props.gameDates, props.todayFormatted, selectedDay]);

  function handleInputChange(e) {
    setSelectedDay(e.target.value);
  }

  if (props.loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info mb-0">Loading matchup data...</div>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger mb-0">{props.error}</div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="mb-3">
        <h4 className="mb-2">Select a day</h4>
        <select
          className="form-select"
          value={selectedDay}
          onChange={handleInputChange}
          disabled={!props.gameDates?.length}
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
        <CountTables gamesData={props.gamesData || []} selectedDay={selectedDay} />
      </div>
    </div>
  );
}
