import React from "react";
import { useNavigate } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();

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
          <li
            className="items dashboard"
            onClick={() => window.location.assign("/dashboard")}
          >
            <i className="bi bi-house-door"></i> Dashboard
          </li>
          <li className="items settings">
            <i className="bi bi-gear"></i> Settings
          </li>
          <li
            className="items favourites"
            onClick={() => window.location.assign("/favourites")}
          >
            <i className="bi bi-chat-left-heart"></i> Favourites
          </li>
          <li className="items reviews">
            <i className="bi bi-chat-square-text-fill"></i> Reviews
          </li>
          <li
            className="items trips"
            onClick={() => window.location.assign("/trips")}
          >
            <i className="bi bi-signpost"></i> Trips
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
