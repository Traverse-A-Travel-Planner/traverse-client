import React from "react";
import "./Header.css";
import { handleLogout } from "../../../../utils/helper";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header shadow">
      <div className="logo">Traverse</div>
      <div className="center">
        <ul>
          <li className="header-items">
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </Link>
          </li>
          <li className="header-items"> <Link style={{ textDecoration: "none", color: "black" }} to="/trips">
          Trips
        </Link></li>
          <li className="header-items">Guide</li>
          <li className="header-items">Contact</li>
        </ul>
      </div>

      <div className="profile">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-list"></i>
            <i className="bi bi-person-circle"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/dashboard">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Community
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li onClick={handleLogout}>
              <a className="dropdown-item text-danger" href="#">
                <b>Logout</b>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
