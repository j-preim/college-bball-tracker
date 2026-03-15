import ListGames from "../components/games/ListGames";

export default function Home({
  gamesData = [],
  bettingData = [],
  loading = false,
  error = "",
  selectedDate = "",
  refreshTournamentData,
}) {
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
        {refreshTournamentData ? (
          <button className="btn btn-outline-primary" onClick={refreshTournamentData}>
            Try again
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="container py-3">
      <ListGames
        title={selectedDate ? `Games for ${selectedDate}` : "Games"}
        gamesData={gamesData}
        bettingData={bettingData}
        selectedDate={selectedDate}
        emptyMessage="No games scheduled for the selected day."
      />
    </div>
  );
}
