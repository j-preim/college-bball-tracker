import { useState, useEffect } from "react";

export default function BracketManual(props) {
  return (
    <>
      <div className="container-fluid mt-5 bg-dark">
          <div className="col-5">
          <div className="row">
            <div className="col">UConn</div>
            <div className="col">2</div>
            <div className="col">3</div>
            <div className="col">4</div>
            <div className="col">5</div>
          </div>

          <div className="row">
            <div className="col">1</div>
            <div className="col">2</div>
            <div className="col">3</div>
            <div className="col">4</div>
            <div className="col">5</div>
          </div>

          <div className="row">
            <div className="col">Stetson</div>
            <div className="col">2</div>
            <div className="col">3</div>
            <div className="col">4</div>
            <div className="col">5</div>
          </div>

          <div className="row">
            <div className="col">1</div>
            <div className="col">2</div>
            <div className="col">3</div>
            <div className="col">4</div>
            <div className="col">5</div>
          </div>

        </div>
      </div>
    </>
  );
}
