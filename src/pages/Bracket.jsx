import { useMemo } from "react";
import { formatStatusLabel } from "../utils/dateHelpers";
import { formatDisplayDate } from "../utils/dateHelpers";
import { formatTournamentTime } from "../utils/dateHelpers";

function getTeamLabel(team) {
  if (!team) {
    return "TBD";
  }

  const seed = team.seed ? `(${team.seed}) ` : "";
  return `${seed}${team.alias || team.name || team.market || "TBD"}`;
}

function getWinningSide(game) {
  if (game?.status !== "closed" && game?.status !== "complete") {
    return "";
  }

  const homePoints = Number(game?.home_points ?? 0);
  const awayPoints = Number(game?.away_points ?? 0);

  if (homePoints === awayPoints) {
    return "";
  }

  return homePoints > awayPoints ? "home" : "away";
}

export default function Bracket({ roundsData = [], loading = false, error = "" }) {
  const visibleRounds = useMemo(
    () => roundsData.filter((round) => Array.isArray(round.brackets) && round.brackets.length > 0),
    [roundsData]
  );

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info mb-0">Loading bracket data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger mb-0">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div className="badge text-bg-light bracket-summary-badge">
          {visibleRounds.length} round{visibleRounds.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="row g-4">
        {visibleRounds.map((round) => (
          <div className="col-12" key={round.roundId || round.roundName}>
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                <span>{round.roundName}</span>
                <span className="small">{round.brackets.reduce((total, bracket) => total + bracket.bracketGames.length, 0)} games</span>
              </div>
              <div className="card-body" style={{backgroundColor: "#a09b9b"}}>
                <div className="row g-3">
                  {round.brackets.map((bracket) => (
                    <div className="col-12 col-xl-6" key={bracket.bracketId || bracket.bracketName}>
                      <div className="border rounded-3 p-3 h-100 text-dark" style={{ backgroundColor: "#ffffff82"}}>
                        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                          <h6 className="mb-0">{bracket.bracketName}</h6>
                          <span className="badge text-bg-secondary">
                            {bracket.bracketGames.length} game{bracket.bracketGames.length === 1 ? "" : "s"}
                          </span>
                        </div>

                        <div className="d-grid gap-3">
                          {bracket.bracketGames.map((game) => {
                            const winningSide = getWinningSide(game);
                            return (
                              <div className="card bracket-game-card shadow-sm" key={game.id}>
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                                    <span className="small text-body-secondary"><strong>{formatDisplayDate(game.gameDate || game.scheduled)}</strong> | {formatTournamentTime(game.scheduledRaw || game.scheduled)}</span>
                                    <span className="badge text-bg-light">{formatStatusLabel(game.status)}</span>
                                  </div>

                                  <div className={`d-flex justify-content-between gap-3 pb-1 ${winningSide === "home" ? "fw-bold text-success" : ""}`}>
                                    <span>{getTeamLabel(game.home)}</span>
                                    <span>{game.home_points ?? "-"}</span>
                                  </div>
                                  <div className={`d-flex justify-content-between gap-3 pb-1 ${winningSide === "away" ? "fw-bold text-success" : ""}`}>
                                    <span>{getTeamLabel(game.away)}</span>
                                    <span>{game.away_points ?? "-"}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
