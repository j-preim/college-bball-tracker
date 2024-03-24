import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import useVerifyUser from "../hooks/useVerifyUser";
import "./header.css";
import bball from "/bball.png";

export default function Header() {
  const { isLoggedIn, logout } = useVerifyUser();

  return (
    <div>
      <header className="d-flex row justify-content-between px-2 p-md-2 p-lg-3 align-items-center">
        <div className="d-flex col-12 col-sm-auto align-items-center justify-content-center">
          <img src={bball} className="logo" />
          <h1 className="konkhmer-sleokchher-regular">
            &nbsp; <a href="/">College Basketball Tracker</a> &nbsp;
          </h1>
          <img src={bball} className="logo" />
        </div>

        <div className="d-flex col-12 col-sm-auto justify-content-evenly lato-regular navi">
          <div className="px-2 px-sm-2 px-md-3 px-lg-4">
            {isLoggedIn === true ? (
              <div className="dropdown">
                <a
                  className="dropdown-toggle navi-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a href="/entries" className="dropdown-item">
                      My Entries
                    </a>
                  </li>
                  <li>
                    <a onClick={logout} href="#" className="dropdown-item">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <a href="/auth" className="navi-link">
                Login
              </a>
            )}
          </div>

          <a href="/matchups" className="px-2 px-sm-2 px-md-3 px-lg-4 navi-link">
            Matchups
          </a>

          <a href="/bracket" className="px-2 px-sm-2 px-md-3 px-lg-4 navi-link">
            Full Bracket
          </a>
        </div>
      </header>
    </div>
  );
}
