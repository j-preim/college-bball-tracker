import { useEffect, useState } from "react";
import { countSeeds } from "../hooks/countSeeds";

export default function ListGames(props) {
  
function formatTime(dateTime) {
  let oldDateTime = new Date(dateTime);
  let oldTime = oldDateTime.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})
  return oldTime;
}


  return (
    <>
      <table className="table table-striped table-sm">
        <thead className="table-head">
          <tr>
            <th>Round</th>
            <th>Region</th>
            <th>Tipoff</th>
            <th>Home</th>
            <th>Away</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody className="table-light">
          {props.gamesData.map((game) => (
            <tr key={game.id} className={(game.status === "inprogress" ? "table-warning" : "")}>
              <td>{game.roundName}</td>
              <td>{game.bracket}</td>
              <td>{formatTime(game.scheduled)}</td>
              <td className={(game.home_points) ? ((game.home_points > game.away_points) ? "border border-success table-success" : "border border-danger table-danger") : ""}>
                <span className="seed">{game.home.seed}</span> &nbsp;
                {game.home.name}
              </td>
              <td className={(game.away_points) ? ((game.home_points > game.away_points) ? "border border-danger table-danger" : "border border-success table-success") : ""}>
                <span className="seed">{game.away.seed}</span> &nbsp;
                {game.away.name}
              </td>
              <td>
                {game.home_points} - {game.away_points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
