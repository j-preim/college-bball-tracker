import { countSeeds } from "../hooks/countSeeds";
import { countRegions } from "../hooks/countRegions";

export default function CountTables({ gamesData = [], selectedDay = "" }) {
  const filteredGames = selectedDay
    ? gamesData.filter((game) => game.gameDate === selectedDay)
    : gamesData;

  const seedCounts = countSeeds(filteredGames);
  const regionCounts = countRegions(filteredGames);

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <table className="table table-striped table-sm mt-2">
          <thead className="table-head">
            <tr>
              <th>Seed</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody className="table-light">
            {seedCounts.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-body-secondary">
                  No seed data for this day.
                </td>
              </tr>
            ) : (
              seedCounts.map(([seed, count]) => (
                <tr key={seed}>
                  <td>{seed}</td>
                  <td>{count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="col-12 col-lg-6">
        <table className="table table-striped table-sm mt-2">
          <thead className="table-head">
            <tr>
              <th>Region</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody className="table-light">
            {regionCounts.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-body-secondary">
                  No region data for this day.
                </td>
              </tr>
            ) : (
              regionCounts.map(([region, count]) => (
                <tr key={region}>
                  <td>{region}</td>
                  <td>{count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
