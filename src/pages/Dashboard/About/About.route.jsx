import React from "react";
import "./About.route.css";

const About = ({ data }) => {
  console.log(data);
  return (
    <div className="content">
      <div className="url-path">Home / Dashboard / About</div>
      <div className="profile-section">
        <div className="profile-menu-card">
          <ul>
            <li className="items about">About me</li>
            <li className="items">Change Password</li>
            <li className="items">Change Avatar</li>
          </ul>
        </div>
        <div className="profile-content">
          <div className="change-about-section">
            <div className="input-group">
              <p className="text-muted"> Username </p>
              <input
                type="text"
                className="username"
                value={data.username}
                onChange={(e) => {
                  return;
                }}
                disabled
              />

              <p className="text-muted"> Name </p>
              <input
                type="text"
                className="name"
                placeholder="Enter your full name"
                value={data.full_name}
                onChange={(e) => {
                  return;
                }}
              />

              <p className="text-muted"> Gender </p>
              <input
                type="text"
                className="gender"
                placeholder="Select your gender"
                value={data.gender}
                onChange={(e) => {
                  return;
                }}
                disabled
              />

              <div className="inner-input-group">
                <div className="item">
                  <p className="text-muted"> Email </p>
                  <input
                    type="email"
                    className="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => {
                      return;
                    }}
                  />
                </div>
                <div className="item">
                  <p className="text-muted"> Phone </p>
                  <input
                    type="email"
                    className="phone"
                    placeholder="Enter your phone number"
                    value={data.phone_number}
                    onChange={(e) => {
                      return;
                    }}
                  />
                </div>
              </div>

              <p className="text-muted"> Address </p>
              <input
                type="email"
                className="text"
                placeholder="Enter your address"
                value={data.address}
                onChange={(e) => {
                  return;
                }}
              />

              <button
                type="submit"
                className="btn btn-dark submit shadow-none rounded mt-2"
              >
                Change Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
