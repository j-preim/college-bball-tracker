import { useEffect, useState, useRef } from "react";
import { getTeamStats } from "../hooks/getTeamStats";
import { Popover } from "bootstrap";

export default function ListGames(props) {
  function formatTime(dateTime) {
    let oldDateTime = new Date(dateTime);
    let oldTime = oldDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return oldTime; 
  }

  function PopoverDemo(props) {
    const popoverRef = useRef();

    useEffect(() => {
      const teamStats = getTeamStats(props.team.id);
      var popover = new Popover(popoverRef.current, {
        html: true,
        content: `
        Seed: ${props.team.seed} <br />
        Overall Record: ${teamStats.wins}-${teamStats.losses} <br />
        Home Record: ${teamStats.home_wins}-${teamStats.home_losses} <br />
        Away Record: ${teamStats.away_wins}-${teamStats.away_losses} <br />
        RPI Rank: ${teamStats.rank} <br />
        RPI: ${teamStats.rpi} <br />
        Strength of Sched: ${teamStats.sos} <br />
        `,
        title: `<h6>${props.team.name}</h6>`,
        trigger: "hover",
        delay: { "show": 300, "hide": 0 },
      });
    });

    return (
      <span className="teamNamePopover" ref={popoverRef}>
        {props.team.name}
      </span>
    );
  }

  return (
    <>
      <table className="table table-striped table-sm">
      <caption className="text-start text-light caption">Hover over team names for more info</caption>
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
            <tr
              key={game.id}
              className={game.status === "inprogress" ? "table-warning" : ""}
            >
              <td>{game.roundName}</td>
              <td>{game.bracket}</td>
              <td>{formatTime(game.scheduled)}</td>
              <td
                className={
                  game.home_points
                    ? game.home_points > game.away_points
                      ? "border border-success table-success"
                      : "border border-danger table-danger"
                    : ""
                }
              >
                <span className="seed">{game.home.seed}</span> &nbsp;
                <PopoverDemo team={game.home} />
              </td>
              <td
                className={
                  game.away_points
                    ? game.home_points > game.away_points
                      ? "border border-danger table-danger"
                      : "border border-success table-success"
                    : ""
                }
              >
                <span className="seed">{game.away.seed}</span> &nbsp;
                <PopoverDemo team={game.away} />
              </td>
              <td>
                {game.status === "inprogress" ? "In progress" : game.status === "closed" ? `${game.home_points} - ${game.away_points}` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
