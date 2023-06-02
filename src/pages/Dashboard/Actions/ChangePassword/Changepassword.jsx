import React from "react";
import "./Changepassword.css"
import "../../css/dashboardGeneric.css"
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Header from "../../../../components/Header/Header";
import ProfileMenuCard from "../../components/Profile Menu Card/ProfileMenuCard";

const Changepassword = ({data}) => {
  return (
    <div className="main-body">
      <Header />
      <div className="dashboard-content about">
        <Sidebar data={data} />
        <div class="content">
            <div class="url-path">Home / Dashboard / Password</div>
            <div class="profile-section">
              <ProfileMenuCard />
              <div class="profile-content">
                <div class="change-password-section">
                  <div class="input-group">
                    <p class="text-muted"> Old Pssword</p>
                    <input
                      type="password"
                      class="old-password"
                      placeholder="Enter your previous password"
                    />

                    <p class="text-muted">New Password</p>
                    <input
                      type="password"
                      class="new-password"
                      placeholder="Enter your new password"
                    />

                    <p class="text-muted">Confirm New Password</p>
                    <input
                      type="password"
                      class="confirm-new-password"
                      placeholder="Confirm your new password"
                    />

                    <button
                      type="submit"
                      class="dashboard-form-submit-btn mt-2"
                      >
                      <i className="bi bi-folder2-open me-1"></i> Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
