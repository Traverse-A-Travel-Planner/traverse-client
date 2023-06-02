import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar">
          <img
            src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png"
            alt="Avatar"
          />
        </div>
        <div className="role shadow-sm text-muted">User</div>
        <div className="name">{data?.full_name}</div>
        <div className="email text-muted">{data?.email}</div>
      </div>

      <p className="my-2 menu-header">Explore</p>

      <div className="menu">
        <ul>
          <li className="items dashboard">
            <Link style={{ textDecoration: "none", color: "black" }} to="/dashboard">
              <i className="bi bi-house-door"></i> Dashboard
            </Link>
          </li>

          <li className="items favourites">
            <Link style={{ textDecoration: "none", color: "black" }} to="/favourites">
              <i className="bi bi-chat-left-heart"></i> Favourites
            </Link>
          </li>
          <li className="items reviews">
            <Link style={{ textDecoration: "none", color: "black" }} to="/reviews">
              <i className="bi bi-chat-square-text-fill"></i> Reviews
            </Link>
          </li>
          <li className="items trips">
            <Link style={{ textDecoration: "none", color: "black" }} to="/dashboard">
              <i className="bi bi-signpost"></i> Trips
            </Link>
          </li>
          <li className="items settings">
            <Link style={{ textDecoration: "none", color: "black" }} to="/dashboard">
              <i className="bi bi-gear"></i> Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
