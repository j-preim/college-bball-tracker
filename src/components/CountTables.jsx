import { useEffect, useState } from "react";
import { countSeeds } from "../hooks/countSeeds";
import { countRegions } from "../hooks/countRegions";

export default function CountTables(props) {

  return (
    <div className="row">
    <div className="col-4 mx-auto">
      <table className="table table-striped table-sm mt-4">
        <thead className="table-head">
          <tr>
            <th>Seed</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody className="table-light">
          {countSeeds(props.gamesData).map((seed) => (
            <tr key={seed[0]}>
              <td>{seed[0]}</td>
              <td>{seed[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

<div className="col-4 mx-auto">
<table className="table table-striped table-sm mt-4">
  <thead className="table-head">
    <tr>
      <th>Region</th>
      <th>Count</th>
    </tr>
  </thead>

  <tbody className="table-light">
    {countRegions(props.gamesData).map((region) => (
      <tr key={region[0]}>
        <td>{region[0]}</td>
        <td>{region[1]}</td> 
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>
  );
}
