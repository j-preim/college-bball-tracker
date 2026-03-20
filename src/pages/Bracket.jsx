import { useMemo, useState } from "react";
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

function isGameComplete(game) {
  const status = String(game?.status || "").toLowerCase();
  return status === "closed" || status === "complete";
}

function getBestSeedForGame(game) {
  const homeSeed = Number(game?.home?.seed ?? 99);
  const awaySeed = Number(game?.away?.seed ?? 99);
  return Math.min(homeSeed, awaySeed);
}

function getWorstSeedForGame(game) {
  const homeSeed = Number(game?.home?.seed ?? 99);
  const awaySeed = Number(game?.away?.seed ?? 99);
  return Math.max(homeSeed, awaySeed);
}

function sortBracketGamesBySeed(games = []) {
  return [...games].sort((a, b) => {
    const bestSeedDiff = getBestSeedForGame(a) - getBestSeedForGame(b);
    if (bestSeedDiff !== 0) return bestSeedDiff;

    const worstSeedDiff = getWorstSeedForGame(a) - getWorstSeedForGame(b);
    if (worstSeedDiff !== 0) return worstSeedDiff;

    const aHome = Number(a?.home?.seed ?? 99);
    const bHome = Number(b?.home?.seed ?? 99);
    if (aHome !== bHome) return aHome - bHome;

    return String(a?.id || "").localeCompare(String(b?.id || ""));
  });
}

export default function Bracket({
  roundsData = [],
  loading = false,
  error = "",
}) {
  const [collapsedRounds, setCollapsedRounds] = useState({});

  const visibleRounds = useMemo(() => {
    return roundsData
      .filter(
        (round) => Array.isArray(round.brackets) && round.brackets.length > 0,
      )
      .map((round) => {
        const normalizedBrackets = round.brackets.map((bracket) => ({
          ...bracket,
          bracketGames: sortBracketGamesBySeed(bracket.bracketGames || []),
        }));

        const allGames = normalizedBrackets.flatMap(
          (bracket) => bracket.bracketGames || [],
        );

        const isComplete =
          allGames.length > 0 && allGames.every((game) => isGameComplete(game));

        return {
          ...round,
          brackets: normalizedBrackets,
          isComplete,
        };
      });
  }, [roundsData]);

  function isRoundCollapsed(roundKey, roundIsComplete) {
    if (Object.prototype.hasOwnProperty.call(collapsedRounds, roundKey)) {
      return collapsedRounds[roundKey];
    }

    return roundIsComplete;
  }

  function toggleRound(roundKey, roundIsComplete) {
    const currentlyCollapsed = isRoundCollapsed(roundKey, roundIsComplete);
    setCollapsedRounds((prev) => ({
      ...prev,
      [roundKey]: !currentlyCollapsed,
    }));
  }

  if (loading) {
    return (
      <div className="container py-3">
        <div className="alert alert-info mb-0">Loading bracket data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-3">
        <div className="alert alert-danger mb-0">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="row g-3">
        {visibleRounds.map((round) => {
          const roundKey = round.roundId || round.roundName;
          const isCollapsed = isRoundCollapsed(roundKey, round.isComplete);

          return (
            <div className="col-12" key={roundKey}>
              <div className="card shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleRound(roundKey, round.isComplete)}
                  className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2"
                  style={{
                    border: "none",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span>{round.roundName}</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    {round.isComplete ? (
                      <span className="badge text-bg-secondary">Complete</span>
                    ) : null}
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: 1,
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {isCollapsed ? "+" : "−"}
                    </span>
                  </div>
                </button>

                {!isCollapsed ? (
                  <div
                    className="card-body"
                    style={{
                      backgroundColor: "#a09b9b",
                      padding: "0.75rem",
                    }}
                  >
                    <div className="row g-2">
                      {round.brackets.map((bracket) => (
                        <div
                          className="col-12 col-lg-6"
                          key={bracket.bracketId || bracket.bracketName}
                        >
                          <div
                            className="border rounded-3 h-100 text-dark"
                            style={{
                              backgroundColor: "#ffffff82",
                              padding: "0.65rem",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                              <h6 className="mb-0">{bracket.bracketName}</h6>
                            </div>

                            <div className="d-grid gap-2">
                              {bracket.bracketGames.map((game) => {
                                const winningSide = getWinningSide(game);

                                return (
                                  <div
                                    className="card bracket-game-card shadow-sm"
                                    key={game.id}
                                  >
                                    <div
                                      className="card-body"
                                      style={{ padding: "0.65rem 0.75rem" }}
                                    >
                                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                                        <span
                                          className="small text-body-secondary"
                                          style={{ lineHeight: 1.2 }}
                                        >
                                          <strong>
                                            {formatDisplayDate(
                                              game.gameDate || game.scheduled,
                                            )}
                                          </strong>{" "}
                                          |{" "}
                                          {formatTournamentTime(
                                            game.scheduledRaw || game.scheduled,
                                          )}
                                        </span>
                                        <span className="badge text-bg-light">
                                          {formatStatusLabel(game.status)}
                                        </span>
                                      </div>

                                      <div
                                        className={`d-flex justify-content-between gap-3 py-1 ${
                                          winningSide === "home"
                                            ? "fw-bold text-success"
                                            : ""
                                        }`}
                                        style={{ lineHeight: 1.2 }}
                                      >
                                        <span>{getTeamLabel(game.home)}</span>
                                        <span>{game.home_points ?? "-"}</span>
                                      </div>

                                      <div
                                        className={`d-flex justify-content-between gap-3 py-1 ${
                                          winningSide === "away"
                                            ? "fw-bold text-success"
                                            : ""
                                        }`}
                                        style={{ lineHeight: 1.2 }}
                                      >
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
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
