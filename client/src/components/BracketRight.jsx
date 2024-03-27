import { useState, useEffect } from "react";

export default function BracketRight(props) {
  return (
    <div className="col-5 text-end">
      <div className="round-names text-center">
        <div className="row mb-2">
          <div className="col">Final 4</div>
          <div className="col">Elite 8</div>
          <div className="col">Sweet 16</div>
          <div className="col">Second Round</div>
          <div className="col">First Round</div>
        </div>
      </div>

      <div className="right top rd1 1-16">
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-dark">Houston 1</div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            Houston 1
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Longwood 16
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
            Houston 1
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
          <div className="col border-bottom border-dark">Nebraska 8</div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
            TX A&M 9
          </div>
          <div className="col">&nbsp;</div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            TX A&M 9
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
          <div className="col border-bottom border-dark">Wisconsin 5</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            J Madison 12
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">J Madison 12</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
            Duke 4
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
          <div className="col border-bottom border-dark">Duke 4</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
            Vermont 13
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Duke 4
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
          <div className="col border-bottom border-dark">TX Tech 6</div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            NC State 11
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            NC State 11
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
            NC State 11
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
          <div className="col border-bottom border-dark">Kentucky 3</div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
            Oakland 14
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Oakland 14
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
          <div className="col border-bottom border-dark">Florida 7</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            Colorado 10
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Colorado 10
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
            Marquette 2
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
          <div className="col border-bottom border-dark">Marquette 2</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
            Marquette 2
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Western KY 15
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
          <div className="col border-bottom border-dark">Purdue 1</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            Purdue 1
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Grambling St 16
          </div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
            Purdue 1
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
          <div className="col border-bottom border-dark">Utah St 8</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
            Utah St 8
          </div>
          <div className="col">&nbsp;</div>
        </div>

        <div className="row">
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            TCU 9
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
          <div className="col border-bottom border-dark">Gonzaga 5</div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            Gonzaga 5
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">McNeese 12</div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
            Gonzaga 5
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
          <div className="col border-bottom border-dark">Kansas 4</div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-end border-dark">
            Kansas 4
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Samford 13
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
          <div className="col border-bottom border-dark">S Carolina 6</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            Oregon 11
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Oregon 11
          </div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-bottom border-dark">
            Creighton 3
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
          <div className="col border-bottom border-dark">Creighton 3</div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
            Creighton 3
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Akron 14
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
          <div className="col border-bottom border-dark">Texas 7</div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-end border-dark">
            Texas 7
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            Col St 10
          </div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-end border-bottom border-dark">
            Tennessee 2
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
          <div className="col border-bottom border-dark">Tennessee 2</div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-end border-dark">
            Tennessee 2
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">
            St Peter's 15
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
