import { useEffect, useState } from "react";
import ListGames from "../components/games/ListGames";
import CountTables from "../components/CountTables";

export default function Matchups({
  gamesData = [],
  gameDates = [],
  bettingData = [],
  loading = false,
  error = "",
  defaultDate = "",
}) {
  const [selectedDay, setSelectedDay] = useState(defaultDate || gameDates[0] || "");

  useEffect(() => {
    if (!selectedDay && gameDates.length) {
      setSelectedDay(defaultDate || gameDates[0]);
    }
  }, [defaultDate, gameDates, selectedDay]);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-light border">Loading tournament data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{error}</div>
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
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {gameDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <ListGames
        title={selectedDay ? `Games for ${selectedDay}` : "Games"}
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
