import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Avatar } from "@arco-design/web-react";

const Sidebar = ({ data }) => {
  const getInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0));
    return initials.join('');
  }

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar">
          <Avatar size={90}>
            {getInitials(data?.full_name)}
          </Avatar>
        </div>
        <div className="role shadow-sm text-muted">User</div>
        <div className="name">{data?.full_name}</div>
        <div className="email text-muted">{data?.email}</div>
      </div>

      <p className="my-2 mt-3 menu-header">Explore</p>

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
