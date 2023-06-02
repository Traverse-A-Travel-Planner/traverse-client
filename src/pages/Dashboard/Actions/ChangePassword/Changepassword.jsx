import React, { useState } from "react";
import "./Changepassword.css";
import "../../css/dashboardGeneric.css";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Header from "../../../../components/Header/Header";
import ProfileMenuCard from "../../components/Profile Menu Card/ProfileMenuCard";
import { Notification } from "@arco-design/web-react";

import { Account } from "appwrite";
import appwriteClient from "../../../../utils/appwriteClient";

const Changepassword = ({ data }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const account = new Account(appwriteClient);

  const handleChangePassword = async () => {
    try {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        Notification.error({
          title: "Error",
          content: "All fields are required.",
        });
        return;
      }

      if (newPassword !== confirmNewPassword) {
        Notification.error({
          title: "Error",
          content: "Password do not match.",
        });
        return;
      }

      await account.updatePassword(newPassword, currentPassword);

      Notification.success({
        title: "Success",
        content: "Password updated successfully.",
      });

    } catch (error) {
      Notification.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  return (
    <div className="main-body">
      <Header />
      <div className="dashboard-content about">
        <Sidebar data={data} />
        <div className="content">
          <div className="url-path">Dashboard / Password</div>
          <div className="profile-section">
            <ProfileMenuCard />
            <div className="profile-content">
              <div className="change-password-section">
                <div className="input-group">
                  <p className="text-muted"> Old Pssword</p>
                  <input
                    type="password"
                    className="old-password"
                    placeholder="Enter your previous password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />

                  <p className="text-muted">New Password</p>
                  <input
                    type="password"
                    className="new-password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <p className="text-muted">Confirm New Password</p>
                  <input
                    type="password"
                    className="confirm-new-password"
                    placeholder="Confirm your new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="dashboard-form-submit-btn mt-2"
                    onClick={handleChangePassword}
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
