import { useEffect, useState } from 'react';

export default function ListGames(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Region</th>
            <th>Tipoff</th>
            <th>Home</th>
            <th>Away</th>
          </tr>
        </thead>

        <tbody>
          {props.gamesData.map((game) => (
            <tr key={game.id}>
              <td>{game.roundName}</td>
              <td>{game.bracket}</td>
              <td>{game.scheduled}</td>
              <td>
                {game.home.seed} {game.home.name}
              </td>
              <td>
                {game.away.seed} {game.away.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
