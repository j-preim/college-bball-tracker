import { useState, useEffect } from "react";
import BracketLeft from "./BracketLeft";

export default function BracketManual(props) {
  return (
    <>
      <div className="container-fluid mt-4 bracket">
        <div className="row">
          <BracketLeft />
        </div>
      </div>
    </>
  );
}
