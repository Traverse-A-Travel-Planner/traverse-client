import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification, Spin } from "@arco-design/web-react";

import { Account } from "appwrite";
import appwriteClient from "../../utils/appwriteClient";

import LoginArt from "./artt.svg";
import "./login.route.css";
import Header from ".././../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Login = ({ logStatus }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  //   create appwrite Account Instance
  const account = new Account(appwriteClient);

  const loginHandle = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!email || !password) {
      setLoading(false);

      return Notification.error({
        title: "Error",
        content: "All fields are required.",
      });
    }

    try {
      const response = await account.createEmailSession(email, password);

      Notification.success({
        title: "Success",
        content: "Login successful.",
      });

      logStatus.setLoggedIn(true);
      localStorage.setItem("userId", response.userId);

      navigate("/");
    } catch (error) {
      setLoading(false);
      Notification.error({
        title: "Warning",
        content: error.message,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="login-form-main-wrapper">
        <div className="img-container">
          <img src={LoginArt} alt="login art" />
        </div>
        <div className="login-form-container">
          <div className="login-form">
            <h3 className="org-name">Traverse</h3>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-email"
              placeholder="Phone number, user or email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-password"
              placeholder="Password"
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
                Login
              </button>
            </Spin>

            <div className="hr-container">
              <hr className="or-hr" data-content="OR" />
            </div>

            <button className="forgot-password">Forgot password?</button>
          </div>
          <div className="signup-div">
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
