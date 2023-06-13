import React from "react";
import "./About.css";

// importing custom components
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProfileMenuCard from "../components/Profile Menu Card/ProfileMenuCard";

const About = ({ data }) => {
  return (
    <div className="dashboard-content about">
      <Sidebar data={data} />

      <div className="content">
        <div className="url-path">Dashboard / About</div>
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
                </div>

                <button
                  type="submit"
                  className="dashboard-form-submit-btn mt-2"
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
