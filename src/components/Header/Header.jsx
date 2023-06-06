import React from "react";
import { Dropdown, Menu, Button, Divider, Typography } from '@arco-design/web-react';
import { Link } from "react-router-dom";

import "./Header.css";

import {handleLogout} from "../../Services/helper"

const dropList = (
  <Menu>
    <Menu.Item key='1'>
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Home
      </Link>
    </Menu.Item>
    <Menu.Item key='2'>
      <Link style={{ textDecoration: "none", color: "black" }} to="/dashboard">
          Profile
      </Link>
    </Menu.Item>
    <Menu.Item key='3'>
      <Link style={{ textDecoration: "none", color: "black" }} to="/contribute">
        Contribute
      </Link>
    </Menu.Item>
    <Divider style={{ margin: '4px 0' }} />
    <Menu.Item key='4' onClick={handleLogout}>
      <Typography.Text type='error'>
        <i className="bi bi-box-arrow-left me-2"></i>
        Logout
      </Typography.Text>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
      <Link style={{ textDecoration: "none", color: "#892be1" }} to="/">
        Traverse
      </Link>
      </div>
      <div className="center">
        <ul>
          <li className="header-items">
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </Link>
          </li>
          <li className="header-items"> 
            <Link style={{ textDecoration: "none", color: "black" }} to="/favourites">
              Favourites
            </Link>
          </li>
          <li className="header-items">Featured</li>
          <li className="header-items"> 
            <Link style={{ textDecoration: "none", color: "black" }} to="/contribute">
              Contribute
            </Link>
          </li>
          <li className="header-items"><a href="#traverse-footer">Contact</a></li>
        </ul>
      </div>

      <div className="profile">
        <div className="btn-group">
          <Dropdown droplist={dropList} trigger='click' position='br'>
            <Button type='text' className="header-dropwdown-btn">
              <i className="bi bi-list"></i>
              <i className="bi bi-person-circle"></i>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
