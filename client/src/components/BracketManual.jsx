import { useState, useEffect } from "react";
import BracketLeft from "./BracketLeft";
import BracketChampGame from "./BracketChampGame";
import BracketRight from "./BracketRight";

export default function BracketManual(props) {
  return (
    <>
      <div className="container-fluid mt-4 bracket">
        <div className="row">
          <BracketLeft />
          <BracketChampGame />
          <BracketRight />
        </div>
      </div>
    </>
  );
}
