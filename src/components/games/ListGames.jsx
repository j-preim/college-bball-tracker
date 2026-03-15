import { useMemo } from "react";
import GameRow from "./GameRow";

function sortGames(games) {
  const statusPriority = {
    inprogress: 0,
    scheduled: 1,
    created: 1,
    "time-tbd": 1,
    if_necessary: 1,
    closed: 2,
    complete: 2,
  };

  return [...games].sort((a, b) => {
    const aPriority = statusPriority[a.status] ?? 1;
    const bPriority = statusPriority[b.status] ?? 1;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    const aDate = new Date(a.scheduledRaw || a.scheduled).getTime();
    const bDate = new Date(b.scheduledRaw || b.scheduled).getTime();

    return aDate - bDate;
  });
}

export default function ListGames({
  gamesData = [],
  bettingData = [],
  selectedDate = "",
  emptyMessage = "No games found.",
  title = "",
}) {
  const filteredGames = useMemo(() => {
    const games = selectedDate
      ? gamesData.filter((game) => game.gameDate === selectedDate)
      : gamesData;

    return sortGames(games);
  }, [gamesData, selectedDate]);

  return (
    <section className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          {title ? <h4 className="mb-1">{title}</h4> : null}
          <div className="text-body-secondary small">
            Hover over team names for more info
          </div>
        </div>

        <div className="small text-body-secondary">
          {filteredGames.length} game{filteredGames.length === 1 ? "" : "s"}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="alert alert-light border">{emptyMessage}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-head">
              <tr>
                <th scope="col">Round</th>
                <th scope="col">Region</th>
                <th scope="col">Tipoff</th>
                <th scope="col">Home</th>
                <th scope="col">Away</th>
                <th scope="col">Spread</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {filteredGames.map((game) => (
                <GameRow
                  key={game.id}
                  game={game}
                  bettingData={bettingData}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}