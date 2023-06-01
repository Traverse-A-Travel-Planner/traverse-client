import React from "react";
import "./Changepassword.css"
import "../../css/dashboardGeneric.css"
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Header from "../../../../components/Header/Header";

const Changepassword = ({data}) => {
  return (
    <div className="main-body">
      <Header />
      <div className="dashboard-content">
        <Sidebar data={data} />
        <div class="content">
            <div class="url-path">Home / Dashboard / Password</div>
            <div class="profile-section">
              <div class="profile-menu-card">
                <ul>
                  <li class="items">About me</li>
                  <li class="items change-password">Change Password</li>
                  <li class="items">Change Avatar</li>
                </ul>
              </div>
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
                      class="btn btn-dark submit shadow-none rounded mt-2"
                    >
                      Change Password
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
