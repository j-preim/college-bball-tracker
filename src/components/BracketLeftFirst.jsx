import { useState, useEffect } from "react";

export default function BracketLeftFirst(props) {


  return (
    <>
        <div className="col-2 me-4">
          {/* <div className="row mb-2">First Round</div> */}

          {props.getGames("First Round", 1).map((game) => (
            <div className="game" key={game.id}>
              <div className="row border-bottom border-dark">{game.home.seed} {game.home.alias}</div>
              <div className="row">&nbsp;</div>
              <div className="row border-bottom border-end border-dark">
              {game.away.seed} {game.away.alias}
              </div>
              <div className="row">&nbsp;</div>
            </div>
          ))}

          {props.getGames("First Round", 4).map((game) => (
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
