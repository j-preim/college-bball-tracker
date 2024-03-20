import React from "react";
import "./header.css";
import bball from "/bball.png";

export default function Header() {
  return (
    <div>
      <header className="d-flex row justify-content-between p-3 align-items-center">
        <div className="d-flex col-auto align-items-center">
          <img src={bball} className="logo" />
          <h1 className="konkhmer-sleokchher-regular">&nbsp; <strong>Project Payday Tracker</strong> &nbsp;</h1>
          <img src={bball} className="logo" />
        </div>
        
        <div className="d-flex col justify-content-end lato-regular">
          <a href="/" className="px-4">
            Home
          </a>
          <a href="/matchups" className="px-4">
            Matchups
          </a>
          <a href="/bracket" className="px-4">
            Full Bracket
          </a>
          {/* <a className="px-4">Login</a> */}
        </div>
      </header>
    </div>
  );
}
