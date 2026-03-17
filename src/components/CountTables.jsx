import { useMemo } from "react";
import { countSeeds } from "../hooks/countSeeds";
import { countRegions } from "../hooks/countRegions";

export default function CountTables({ gamesData = [], selectedDay = "" }) {
  const filteredGames = useMemo(() => {
    if (!selectedDay) {
      return gamesData;
    }

    return gamesData.filter((game) => game.gameDate === selectedDay);
  }, [gamesData, selectedDay]);

  const seedCounts = useMemo(() => countSeeds(filteredGames), [filteredGames]);
  const regionCounts = useMemo(() => countRegions(filteredGames), [filteredGames]);

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
            <table className="table table-striped table-sm mb-0">
              <thead className="table-head">
                <tr>
                  <th>Seed</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {seedCounts.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center py-3">
                      No seed data for this date.
                    </td>
                  </tr>
                ) : (
                  seedCounts.map((seed) => (
                    <tr key={seed[0]}>
                      <td>{seed[0]}</td>
                      <td>{seed[1]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
      </div>

      <div className="col-12 col-lg-5">
            <table className="table table-striped table-sm mb-0">
              <thead className="table-head">
                <tr>
                  <th>Region</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {regionCounts.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center py-3">
                      No region data for this date.
                    </td>
                  </tr>
                ) : (
                  regionCounts.map((region) => (
                    <tr key={region[0]}>
                      <td>{region[0]}</td>
                      <td>{region[1]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
      </div>
    </div>
  );
}
