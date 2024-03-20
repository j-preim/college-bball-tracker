import { useEffect, useState } from 'react';

export default function ListGames(props) {
  let todaysGames = [];

  function getTodaysGames() {
  for (let i = 0; i < props.gamesData.length; i++) {
    let dateTime = new Date(props.gamesData[i].scheduled);
    let gameDateFormatted = dateTime.toLocaleDateString();
    console.log(gameDateFormatted)

    if (gameDateFormatted === props.date) {
      todaysGames.push(props.gamesData[i]);
      console.log("pushed")
    }
  }
}

useEffect(() => {
  if ((todaysGames = [])) {
    getTodaysGames();
  }
}, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Home</th>
            <th>Away</th>
          </tr>
        </thead>

        <tbody>
          {props.gamesData.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
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
