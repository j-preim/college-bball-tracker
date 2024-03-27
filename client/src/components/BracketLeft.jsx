import { useState, useEffect } from "react";

export default function BracketLeft(props) {
  return (
    <div className="col-5">
      <div className="round-names text-center">
        <div className="row mb-2">
          <div className="col">First Round</div>
          <div className="col">Second Round</div>
          <div className="col">Sweet 16</div>
          <div className="col">Elite 8</div>
          <div className="col">Final 4</div>
        </div>
      </div>

      <div className="left top rd1 1-16">
        <div className="row">
          <div className="col border-bottom border-dark">1 UConn</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">1 UConn</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">16 Stetson</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col spacer">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">1 UConn</div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left top rd1 8-9">
        <div className="row">
          <div className="col border-bottom border-dark">8 FL Atlantic</div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col border-bottom border-start border-dark">9 Nwestern</div>
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">9 Nwestern</div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col spacer">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-dark">TBD</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left top rd1 5-12">
        <div className="row">
          <div className="col border-bottom border-dark">5 San Diego St</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">5 San Diego St</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">12 UAB</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">5 San Diego St</div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 4-13">
        <div className="row">
          <div className="col border-bottom border-dark">4 Auburn</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">13 Yale</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">13 Yale</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">TBD</div>
        </div>
      </div>

      <div className="left top rd1 6-11">
        <div className="row">
          <div className="col border-bottom border-dark">6 BYU</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">11 Duquesne</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">11 Duquesne</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">3 Illinois</div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 3-14">
        <div className="row">
          <div className="col border-bottom border-dark">3 Illinois</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">3 Illinois</div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">14 Morehead St</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">TBD</div>
          <div className="col border-start border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 7-10">
        <div className="row">
          <div className="col border-bottom border-dark">7 Wash St</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">7 Wash St</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">10 Drake</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">2 Iowa St</div>
          <div className="col border-start border-dark"></div>
          <div className="col border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 2-15">
        <div className="row">
          <div className="col border-bottom border-dark">2 Iowa St</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">2 Iowa St</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">15 S Dakota St</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 1-16">
        <div className="row">
          <div className="col border-bottom border-dark">1 UNC</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">1 UNC</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">16 Wagner</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">1 UNC</div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 8-9">
        <div className="row">
          <div className="col border-bottom border-dark">8 Miss St</div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col border-bottom border-start border-dark">9 Mich St</div>
          <div className="col border-start border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">9 Mich St</div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-end border-dark"></div>
          <div className="col border-bottom border-dark">TBD</div>
          <div className="col border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 5-12">
        <div className="row">
          <div className="col border-bottom border-dark">5 St Mary's</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">12 G Canyon</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">12 G Canyon</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">4 Alabama</div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 4-13">
        <div className="row">
          <div className="col border-bottom border-dark">4 Alabama</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">4 Alabama</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">13 Charleston</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-end border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-end border-dark">TBD</div>
        </div>
      </div>

      <div className="left top rd1 6-11">
        <div className="row">
          <div className="col border-bottom border-dark">6 Clemson</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">6 Clemson</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">11 N Mexico St</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">3 Baylor</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 3-14">
        <div className="row">
          <div className="col border-bottom border-dark">3 Baylor</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">3 Baylor</div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">14 Colgate</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">TBD</div>
          <div className="col border-start border-dark"></div>
        </div>
      </div>

      <div className="left top rd1 7-10">
        <div className="row">
          <div className="col border-bottom border-dark">7 Dayton</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">7 Dayton</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">10 Nevada</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col border-start border-bottom border-dark">2 Arizona</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left top rd1 2-15">
        <div className="row">
          <div className="col border-bottom border-dark">2 Arizona</div>
          <div className="col"></div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start border-dark">2 Arizona</div>
          <div className="col border-start border-dark"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end border-dark">15 L Beach St</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">&nbsp;</div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}