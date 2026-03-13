export default function ScoreDisplay({ game }) {
  const isLive = game.status === "inprogress";
  const isFinal = game.status === "closed" || game.status === "complete";

  if (isLive) {
    return <span className="badge text-bg-warning">In progress</span>;
  }

  if (isFinal) {
    const homePoints =
      typeof game.home_points === "number" ? game.home_points : "-";
    const awayPoints =
      typeof game.away_points === "number" ? game.away_points : "-";

    return (
      <span className="fw-semibold">
        {homePoints} - {awayPoints}
      </span>
    );
  }

  return <span className="text-body-secondary">Upcoming</span>;
}