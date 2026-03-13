import { useState, useEffect } from "react";

export default function BracketRight(props) {


  return (
    <div className="col-5 text-end">
      <div className="round-names">
        <div className="row">
          <div className="col">Final 4</div>
          <div className="col">Elite 8</div>
          <div className="col">Sweet 16</div>
          <div className="col">Second Round</div>
          <div className="col">First Round</div>
        </div>
      </div>

      <div className="right top rd1 1-16 mt-2">
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[0].home.seed} {props.firstRound[0].brackets[1].bracketGames[0].home.alias}</div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[0].home.seed} {props.secondRound[0].brackets[1].bracketGames[0].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[0].away.seed} {props.firstRound[0].brackets[1].bracketGames[0].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[1].bracketGames[0].home.seed} {props.sweetSixteen[0].brackets[1].bracketGames[0].home.alias}
          </div>
          <div className="col"></div>
          <div className="col spacer">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 8-9">
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[1].home.seed} {props.firstRound[0].brackets[1].bracketGames[1].home.alias}</div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[0].away.seed} {props.secondRound[0].brackets[1].bracketGames[0].away.alias}
          </div>
          <div className="col">&nbsp;</div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[1].away.seed} {props.firstRound[0].brackets[1].bracketGames[1].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-dark">TBD</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col spacer">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 5-12">
        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[2].home.seed} {props.firstRound[0].brackets[1].bracketGames[2].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[1].away.seed} {props.secondRound[0].brackets[1].bracketGames[1].away.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">{props.firstRound[0].brackets[1].bracketGames[2].away.seed} {props.firstRound[0].brackets[1].bracketGames[2].away.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[1].bracketGames[0].away.seed} {props.sweetSixteen[0].brackets[1].bracketGames[0].away.alias}
          </div>
          <div className="col">&nbsp;</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="right top rd1 4-13">
        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[3].home.seed} {props.firstRound[0].brackets[1].bracketGames[3].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[1].home.seed} {props.secondRound[0].brackets[1].bracketGames[1].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[3].away.seed} {props.firstRound[0].brackets[1].bracketGames[3].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-bottom border-dark">TBD</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 6-11">
        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[4].home.seed} {props.firstRound[0].brackets[1].bracketGames[4].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[2].home.seed} {props.secondRound[0].brackets[1].bracketGames[2].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[4].away.seed} {props.firstRound[0].brackets[1].bracketGames[4].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[1].bracketGames[1].away.seed} {props.sweetSixteen[0].brackets[1].bracketGames[1].away.alias}
          </div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 3-14">
        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[5].home.seed} {props.firstRound[0].brackets[1].bracketGames[5].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[2].away.seed} {props.secondRound[0].brackets[1].bracketGames[2].away.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[5].away.seed} {props.firstRound[0].brackets[1].bracketGames[5].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col border-end border-bottom border-dark">TBD</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 7-10">
        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[6].home.seed} {props.firstRound[0].brackets[1].bracketGames[6].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[3].away.seed} {props.secondRound[0].brackets[1].bracketGames[3].away.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[6].away.seed} {props.firstRound[0].brackets[1].bracketGames[6].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[1].bracketGames[1].home.seed} {props.sweetSixteen[0].brackets[1].bracketGames[1].home.alias}
          </div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 2-15">
        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[1].bracketGames[7].home.seed} {props.firstRound[0].brackets[1].bracketGames[7].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[1].bracketGames[3].home.seed} {props.secondRound[0].brackets[1].bracketGames[3].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[1].bracketGames[7].away.seed} {props.firstRound[0].brackets[1].bracketGames[7].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 1-16">
        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[0].home.seed} {props.firstRound[0].brackets[2].bracketGames[0].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[0].home.seed} {props.secondRound[0].brackets[2].bracketGames[0].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[0].away.seed} {props.firstRound[0].brackets[2].bracketGames[0].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[2].bracketGames[0].home.seed} {props.sweetSixteen[0].brackets[2].bracketGames[0].home.alias}
          </div>
          <div className="col"></div>
          <div className="col spacer">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 8-9">
        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[1].home.seed} {props.firstRound[0].brackets[2].bracketGames[1].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[0].away.seed} {props.secondRound[0].brackets[2].bracketGames[0].away.alias}
          </div>
          <div className="col">&nbsp;</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[1].away.seed} {props.firstRound[0].brackets[2].bracketGames[1].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-bottom border-dark">TBD</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col spacer">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 5-12">
        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[2].home.seed} {props.firstRound[0].brackets[2].bracketGames[2].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[1].away.seed} {props.secondRound[0].brackets[2].bracketGames[1].away.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">{props.firstRound[0].brackets[2].bracketGames[2].away.seed} {props.firstRound[0].brackets[2].bracketGames[2].away.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[2].bracketGames[0].away.seed} {props.sweetSixteen[0].brackets[2].bracketGames[0].away.alias}
          </div>
          <div className="col">&nbsp;</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="right top rd1 4-13">
        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[3].home.seed} {props.firstRound[0].brackets[2].bracketGames[3].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[1].home.seed} {props.secondRound[0].brackets[2].bracketGames[1].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[3].away.seed} {props.firstRound[0].brackets[2].bracketGames[3].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-bottom border-dark">TBD</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 6-11">
        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[4].home.seed} {props.firstRound[0].brackets[2].bracketGames[4].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[2].away.seed} {props.secondRound[0].brackets[2].bracketGames[2].away.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[4].away.seed} {props.firstRound[0].brackets[2].bracketGames[4].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[2].bracketGames[1].away.seed} {props.sweetSixteen[0].brackets[2].bracketGames[1].away.alias}
          </div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 3-14">
        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[5].home.seed} {props.firstRound[0].brackets[2].bracketGames[5].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[2].home.seed} {props.secondRound[0].brackets[2].bracketGames[2].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[5].away.seed} {props.firstRound[0].brackets[2].bracketGames[5].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">TBD</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 7-10">
        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[6].home.seed} {props.firstRound[0].brackets[2].bracketGames[6].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[3].away.seed} {props.secondRound[0].brackets[2].bracketGames[3].away.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[6].away.seed} {props.firstRound[0].brackets[2].bracketGames[6].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
          {props.sweetSixteen[0].brackets[2].bracketGames[1].home.seed} {props.sweetSixteen[0].brackets[2].bracketGames[1].home.alias}
          </div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>

      <div className="right top rd1 2-15">
        <div className="row">
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">{props.firstRound[0].brackets[2].bracketGames[7].home.seed} {props.firstRound[0].brackets[2].bracketGames[7].home.alias}</div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
          {props.secondRound[0].brackets[2].bracketGames[3].home.seed} {props.secondRound[0].brackets[2].bracketGames[3].home.alias}
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
          {props.firstRound[0].brackets[2].bracketGames[7].away.seed} {props.firstRound[0].brackets[2].bracketGames[7].away.alias}
          </div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
