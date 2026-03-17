import { useCallback, useEffect, useMemo, useState } from "react";
import ListGames from "../components/games/ListGames";
import CountTables from "../components/CountTables";
import { getBestAvailableDate, formatDisplayDate } from "../utils/dateHelpers";

const EMPTY_ARRAY = [];

export default function Matchups(props) {
  const [selectedDay, setSelectedDay] = useState("");

  const gameDates = props.gameDates || EMPTY_ARRAY;
  const gamesData = props.gamesData || EMPTY_ARRAY;
  const bettingData = props.bettingData || EMPTY_ARRAY;

  useEffect(() => {
    if (!gameDates.length) {
      setSelectedDay((current) => (current !== "" ? "" : current));
      return;
    }

    const selectedStillExists = gameDates.includes(selectedDay);

    if (selectedStillExists) {
      return;
    }

    const bestDate = getBestAvailableDate(gameDates);
    setSelectedDay((current) => (current !== bestDate ? bestDate : current));
  }, [gameDates, selectedDay]);

  const handleInputChange = useCallback((e) => {
    setSelectedDay(e.target.value);
  }, []);

  const dateOptions = useMemo(() => {
    return gameDates.map((date) => ({
      value: date,
      label: formatDisplayDate(date),
    }));
  }, [gameDates]);

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
          disabled={!gameDates.length}
        >
          {dateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ListGames
        title={listTitle}
        gamesData={gamesData}
        bettingData={bettingData}
        selectedDate={selectedDay}
        emptyMessage="No games found for that date."
      />

      <div className="mt-4">
        <CountTables gamesData={gamesData} selectedDay={selectedDay} />
      </div>
    </div>
  );
}