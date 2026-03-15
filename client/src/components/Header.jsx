import { Link, useLocation } from "react-router-dom";
import "./header.css";
import bball from "/bball.png";

function isActive(path, pathname) {
  return pathname === path ? "active fw-bold" : "";
}

export default function Header({
  authCookie = "",
  liveGames = 0,
  lastUpdated = "",
  onRefresh = null,
}) {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm header">
      <div className="container">
        <img src={bball} className="logo me-lg-3" alt="Basketball logo" />
        <Link
          className="navbar-brand fw-bold tracker konkhmer-sleokchher-regular me-lg-5"
          to="/"
        >
          College Basketball Tracker
        </Link>

        <button
          className="navbar-toggler justify-content-end"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/", location.pathname)}`}
                to="/"
              >
                Today
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/matchups", location.pathname)}`}
                to="/matchups"
              >
                Matchups
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/bracket", location.pathname)}`}
                to="/bracket"
              >
                Bracket
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/entries", location.pathname)}`}
                to="/entries"
              >
                Entries
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 buttons">
            {liveGames > 0 && (
              <span className="badge text-bg-warning">🔴 {liveGames} Live</span>
            )}

            {lastUpdated && (
              <span className="small text-light-emphasis">
                Updated {lastUpdated}
              </span>
            )}

            {onRefresh && (
              <button
                className="btn btn-sm btn-outline-light"
                onClick={onRefresh}
              >
                Refresh
              </button>
            )}

            <Link
              className="btn btn-sm btn-outline-light"
              to={authCookie ? "/entries" : "/auth"}
            >
              {authCookie ? "My Picks" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
