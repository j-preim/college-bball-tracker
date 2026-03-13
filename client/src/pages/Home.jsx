import ListGames from "../components/games/ListGames";

export default function Home(props) {
  const todayFormatted =
    props.todayFormatted || new Date().toLocaleDateString();

  return (
    <div className="container py-3">
      <ListGames
        title={`Today's games (${todayFormatted})`}
        gamesData={props.gamesData || []}
        bettingData={props.bettingData || []}
        selectedDate={todayFormatted}
        emptyMessage="No games scheduled for today."
      />
    </div>
  );
}