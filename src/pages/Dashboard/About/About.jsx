import React from "react";
import "./About.css";

import Sidebar from "../../../components/Sidebar/Sidebar";
import ProfileMenuCard from "../components/Profile Menu Card/ProfileMenuCard";

const About = ({ data }) => {
  console.log(data);
  return (
    <div className="dashboard-content about">
      <Sidebar data={data} />

      <div className="content">
        <div className="url-path">Home / Dashboard / About</div>
        <div className="profile-section">
          <ProfileMenuCard />
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
                  class="dashboard-form-submit-btn mt-2"
                  >
                  <i className="bi bi-folder2-open me-1"></i> Save details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
