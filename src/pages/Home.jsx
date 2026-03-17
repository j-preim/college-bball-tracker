import ListGames from "../components/games/ListGames";
import {
  getBestAvailableDate,
  getTodayDateString,
  formatDisplayDate,
} from "../utils/dateHelpers";

export default function Home(props) {
  const todayFormatted = props.todayFormatted || getTodayDateString();
  const selectedDate = getBestAvailableDate(props.gameDates || []);
  const isFallbackDate =
    Boolean(selectedDate) && selectedDate !== todayFormatted;

  if (props.loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info mb-0">Loading tournament data...</div>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger mb-3">{props.error}</div>
        <button
          className="btn btn-primary"
          onClick={props.refreshTournamentData}
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container py-3">
      {isFallbackDate ? (
        <div className="alert alert-secondary">
          No games were found for today, so this view is showing the next
          available slate on <strong>{formatDisplayDate(selectedDate)}</strong>.
        </div>
      ) : (
        <h4>Games for {formatDisplayDate(selectedDate)}</h4>
      )}

      <ListGames
        title={
          selectedDate
            ? `Games for ${formatDisplayDate(selectedDate)}`
            : "Tournament games"
        }
        gamesData={props.gamesData || []}
        bettingData={props.bettingData || []}
        selectedDate={selectedDate}
        emptyMessage="No games scheduled for this date."
      />
    </div>
  );
}
