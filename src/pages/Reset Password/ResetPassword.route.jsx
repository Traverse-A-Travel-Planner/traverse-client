import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// reset assets
import "./ResetPassword.route.css";
import forgetPasswordArt from "./forgetPassword.svg"

// importing appwrite functions and constants
import { Account } from "appwrite";
import appwriteClient from "../../Services/appwriteClient";

// arco-design components
import { Notification, Spin, Typography } from "@arco-design/web-react";

// importing custom components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  //   create appwrite Account Instance
  const account = new Account(appwriteClient);

  const loginHandle = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!password || !confirmPassword) {
      setLoading(false);

      return Notification.warning({
        title: "Empty",
        content: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      setLoading(false);

      return Notification.warning({
        title: "Password Incorrect",
        content: "Both passwords must match",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="reset-form-main-wrapper">
        <div className="img-container">
          <img src={forgetPasswordArt} alt="reset art" />
        </div>
        <div className="reset-form-container">
          <div className="reset-form">
            <Typography.Text 
              type="primary"
              className="my-3"
              style={{fontSize: 22}}
              bold
              >
                Reset Password
            </Typography.Text>
            <input
              type="text"
              value={"bibekshhh"}
              disabled
              placeholder={"userID"}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-password"
              placeholder="Enter new password"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-password"
              placeholder="Confirm new password"
            />

            <Spin
              delay={500}
              loading={loading}
              style={{ width: "100%", color: "white", marginRight: 5 }}
            >
              <button
                style={{ width: "100%" }}
                onClick={(e) => loginHandle(e)}
                type="submit"
                className="submit-btn"
              >
                Reset
              </button>
            </Spin>

          </div>
          <div className="login-div">
            <p>
              <Link style={{ textDecoration: "none", color: "black" }} to="/login">Login </Link> on your account
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
