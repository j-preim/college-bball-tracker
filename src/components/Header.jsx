import React from "react";
import "./header.css";
import bball from "/bball.png";

export default function Header() {
  return (
    <div>
      <header className="d-flex row justify-content-between px-2 p-md-2 p-lg-3 align-items-center">
        <div className="d-flex col-12 col-sm-auto align-items-center justify-content-center">
          <img src={bball} className="logo" />
          <h1 className="konkhmer-sleokchher-regular">&nbsp; College Basketball Tracker &nbsp;</h1>
          <img src={bball} className="logo" />
        </div>
        
        <div className="d-flex col-12 col-sm-auto justify-content-evenly lato-regular navi">
          <a href="/" className="px-2 px-sm-2 px-md-3 px-lg-4">
            Home
          </a>
          <a href="/matchups" className="px-2 px-sm-2 px-md-3 px-lg-4">
            Matchups
          </a>
          <a href="/bracket" className="px-2 px-sm-2 px-md-3 px-lg-4">
            Full Bracket
          </a>
          {/* <a className="px-4">Login</a> */}
        </div>
      </header>
    </div>
  );
}
