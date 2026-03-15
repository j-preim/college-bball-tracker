import { useMemo } from "react";

function normalizeRoundLabel(roundName) {
  if (!roundName) return "Round";
  return roundName;
}

function getTeamName(team) {
  return team?.alias || team?.market && team?.name
    ? `${team.market ? `${team.market} ` : ""}${team.name ?? ""}`.trim()
    : team?.name || "TBD";
}

function getSeed(team) {
  return team?.seed ?? "-";
}

function getGameWinnerSide(game) {
  const homePoints =
    typeof game?.home_points === "number" ? game.home_points : null;
  const awayPoints =
    typeof game?.away_points === "number" ? game.away_points : null;

  if (homePoints === null || awayPoints === null) return null;
  if (homePoints === awayPoints) return null;

  return homePoints > awayPoints ? "home" : "away";
}

function getStatusLabel(game) {
  if (game?.status === "inprogress") return "LIVE";
  if (game?.status === "closed" || game?.status === "complete") return "FINAL";
  return "UPCOMING";
}

function formatTipoff(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function groupRounds(roundsData) {
  return (roundsData || []).map((round) => ({
    roundName: normalizeRoundLabel(round.roundName),
    games:
      round?.brackets?.flatMap((bracket) =>
        (bracket?.bracketGames || []).map((game) => ({
          ...game,
          bracketName: bracket?.bracketName || game?.bracketName || "Bracket",
          bracketRank: bracket?.bracketRank ?? game?.bracketRank ?? 999,
        }))
      ) || [],
  }));
}

function BracketGameCard({ game }) {
  const winnerSide = getGameWinnerSide(game);

  const homeClass =
    winnerSide === "home"
      ? "border-success bg-success-subtle"
      : winnerSide === "away"
      ? "border-danger bg-danger-subtle"
      : "";

  const awayClass =
    winnerSide === "away"
      ? "border-success bg-success-subtle"
      : winnerSide === "home"
      ? "border-danger bg-danger-subtle"
      : "";

  const homePoints =
    typeof game?.home_points === "number" ? game.home_points : "-";
  const awayPoints =
    typeof game?.away_points === "number" ? game.away_points : "-";

  return (
    <div className="card shadow-sm mb-3 bracket-game-card">
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge text-bg-dark">{game?.bracketName || "Region"}</span>
          <span
            className={`badge ${
              game?.status === "inprogress"
                ? "text-bg-warning"
                : game?.status === "closed" || game?.status === "complete"
                ? "text-bg-secondary"
                : "text-bg-light"
            }`}
          >
            {getStatusLabel(game)}
          </span>
        </div>

        <div className="small text-body-secondary mb-2">
          {formatTipoff(game?.scheduledRaw || game?.scheduled)}
        </div>

        <div
          className={`d-flex justify-content-between align-items-center border rounded px-2 py-2 mb-2 ${homeClass}`}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill text-bg-light border">
              {getSeed(game?.home)}
            </span>
            <span className="fw-medium">{getTeamName(game?.home)}</span>
          </div>
          <div className="fw-bold">{homePoints}</div>
        </div>

        <div
          className={`d-flex justify-content-between align-items-center border rounded px-2 py-2 ${awayClass}`}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill text-bg-light border">
              {getSeed(game?.away)}
            </span>
            <span className="fw-medium">{getTeamName(game?.away)}</span>
          </div>
          <div className="fw-bold">{awayPoints}</div>
        </div>
      </div>
    </div>
  );
}

function RoundColumn({ round }) {
  return (
    <div className="col-12 col-md-6 col-xl">
      <div className="card h-100 shadow-sm">
        <div className="card-header text-center fw-bold">
          {round.roundName}
        </div>
        <div className="card-body">
          {round.games.length === 0 ? (
            <div className="text-body-secondary small">No games available.</div>
          ) : (
            round.games.map((game) => (
              <BracketGameCard key={game.id} game={game} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function Bracket({
  roundsData = [],
  gamesData = [],
  loading = false,
  error = "",
}) {
  const groupedRounds = useMemo(() => groupRounds(roundsData), [roundsData]);

  const totalGames = gamesData.length;
  const liveGames = gamesData.filter((game) => game.status === "inprogress").length;
  const finalGames = gamesData.filter(
    (game) => game.status === "closed" || game.status === "complete"
  ).length;

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info">Loading bracket...</div>
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
    <div className="container-fluid py-3">
      <div className="container mb-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h2 className="mb-1">Tournament Bracket</h2>
            <div className="text-body-secondary">
              Responsive round-by-round bracket view
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <span className="badge text-bg-dark">Games: {totalGames}</span>
            <span className="badge text-bg-warning">Live: {liveGames}</span>
            <span className="badge text-bg-secondary">Final: {finalGames}</span>
          </div>
        </div>
      </div>

      {groupedRounds.length === 0 ? (
        <div className="container">
          <div className="alert alert-light border">
            No bracket data available yet.
          </div>
        </div>
      ) : (
        <div className="row g-3 px-2 px-md-3">
          {groupedRounds.map((round) => (
            <RoundColumn key={round.roundName} round={round} />
          ))}
        </div>
      )}
    </div>
  );
}