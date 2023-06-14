import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// login assets
import LoginArt from "./login-art.svg";
import "./login.route.css";

// importing appwrite functions and constants
import { Account } from "appwrite";
import appwriteClient from "../../Services/appwriteClient";

// arco-design components
import { Notification, Spin, Typography } from "@arco-design/web-react";

// importing custom components
import Header from ".././../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ForgetPassword from "./Forget Password/ForgetPassword";

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

      // updating logged in status
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
            <Typography.Text 
              type="primary"
              className="my-3"
              style={{fontSize: 22}}
              bold
              >
                Login to continue..
            </Typography.Text>
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

            <ForgetPassword />
          </div>
          <div className="signup-div">
            <p>
              Don't have an account? <Link style={{ textDecoration: "none", color: "black" }} to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
