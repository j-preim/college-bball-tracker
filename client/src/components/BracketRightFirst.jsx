import { useState, useEffect } from "react";

export default function BracketRightFirst(props) {


  return (
    <>
        <div className="col">
          <div className="row mb-2">First Round</div>

          {props.getGames("First Round", 2).map((game) => (
            <div className="game" key={game.id}>
              <div className="row border-bottom border-dark">{game.home.seed} {game.home.alias}</div>
              <div className="row border-bottom border-end border-dark">
              {game.away.seed} {game.away.alias}
              </div>
              <div className="row">&nbsp;</div>
            </div>
          ))}

          {props.getGames("First Round", 3).map((game) => (
            <div className="game" key={game.id}>
              <div className="row border-bottom border-dark">{game.home.seed} {game.home.alias}</div>
              <div className="row border-bottom border-end border-dark">
              {game.away.seed} {game.away.alias}
              </div>
              <div className="row">&nbsp;</div>
            </div>
          ))}
        </div>
    </>
  );
}
