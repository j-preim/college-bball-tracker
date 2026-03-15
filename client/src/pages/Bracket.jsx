export default function Bracket({ roundsData = [], loading = false, error = "" }) {
  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-light border">Loading bracket data...</div>
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
    <div className="container py-4">
      <h2 className="mb-3">Tournament bracket</h2>
      <div className="row g-4">
        {roundsData.map((round) => (
          <div className="col-12" key={round.roundId}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-3">{round.roundName}</h4>
                <div className="row g-3">
                  {round.brackets.map((bracket) => (
                    <div className="col-12 col-xl-6" key={bracket.bracketId}>
                      <div className="border rounded p-3 h-100">
                        <div className="fw-semibold mb-2">{bracket.bracketName}</div>
                        <ul className="list-group list-group-flush">
                          {bracket.bracketGames.length === 0 ? (
                            <li className="list-group-item px-0 text-body-secondary">
                              No games available.
                            </li>
                          ) : (
                            bracket.bracketGames.map((game) => (
                              <li className="list-group-item px-0" key={game.id}>
                                <div className="small text-body-secondary mb-1">
                                  {game.gameDate || "TBD"} · {game.scheduled || "Time TBD"}
                                </div>
                                <div>
                                  {game.away?.seed ? `(${game.away.seed}) ` : ""}
                                  {game.away?.alias || game.away?.name || "TBD"}
                                  {typeof game.away_points === "number" ? ` ${game.away_points}` : ""}
                                </div>
                                <div>
                                  {game.home?.seed ? `(${game.home.seed}) ` : ""}
                                  {game.home?.alias || game.home?.name || "TBD"}
                                  {typeof game.home_points === "number" ? ` ${game.home_points}` : ""}
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
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
