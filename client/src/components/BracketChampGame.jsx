import { useState, useEffect } from "react";

export default function BracketChampGame(props) {
  return (
    <div className="col-2">
      <div className="left top rd3 1-16">
        <div className="row">
          <div className="col">-</div>
        </div>

        <div className="row">
          <div className="col">-</div>
        </div>

        <div className="row">
          <div className="col border-start">-</div>
        </div>

        <div className="row">
          <div className="col border-start">-</div>
        </div>

        <div className="row">
          <div className="col border-start border-bottom">1 UConn</div>
        </div>
      </div>

        <div className="row">
          <div className="col border-start">-</div>
        </div>

        <div className="row">
          <div className="col">-</div>
        </div>

        <div className="row">
          <div className="col">-</div>
        </div>

      <div className="row">
        <div className="col">-</div>
      </div>

      <div className="left top rd3 1-16">
        <div className="row">
          <div className="col">-</div>
        </div>

        <div className="row">
          <div className="col border-start">-</div>
        </div>

        <div className="row">
          <div className="col border-start">-</div>
        </div>

        <div className="row">
          <div className="col border-start border-bottom">5 San Diego St</div>
        </div>
      </div>

      <div className="row">
          <div className="col border-start">-</div>
        </div>

        <div className="row">
          <div className="col">-</div>
        </div>

        <div className="row">
          <div className="col">-</div>
        </div>

        <div className="row">
          <div className="col">-</div>
        </div>

      <div className="left top rd1 6-11">
        <div className="row">
          <div className="col border-bottom">6 BYU</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">11 Duquesne</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">11 Duquesne</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left top rd1 3-14">
        <div className="row">
          <div className="col border-bottom">3 Illinois</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">3 Illinois</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">14 Morehead St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left top rd1 7-10">
        <div className="row">
          <div className="col border-bottom">7 Wash St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">7 Wash St</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">10 Drake</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left top rd1 2-15">
        <div className="row">
          <div className="col border-bottom">2 Iowa St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">2 Iowa St</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">15 S Dakota St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 1-16">
        <div className="row">
          <div className="col border-bottom">1 UNC</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">1 UNC</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">16 Wagner</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 8-9">
        <div className="row">
          <div className="col border-bottom">8 Miss St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">9 Mich St</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">9 Mich St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 5-12">
        <div className="row">
          <div className="col border-bottom">5 St Mary's</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col border-bottom border-start">12 G Canyon</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">12 G Canyon</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 4-13">
        <div className="row">
          <div className="col border-bottom">4 Alabama</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">4 Alabama</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">13 Charleston</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 6-11">
        <div className="row">
          <div className="col border-bottom">6 Clemson</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">6 Clemson</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">11 NM St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 3-14">
        <div className="row">
          <div className="col border-bottom">3 Baylor</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">3 Baylor</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">14 Colgate</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 7-10">
        <div className="row">
          <div className="col border-bottom">7 Dayton</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">7 Dayton</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">10 Nevada</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>

      <div className="left bottom rd1 2-15">
        <div className="row">
          <div className="col border-bottom">2 Arizona</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col border-bottom border-start">2 Arizona</div>
        </div>

        <div className="row">
          <div className="col border-bottom border-end">15 LB St</div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col">-</div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}
