import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// signup assets
import SignupArt from "./signup-art.svg";
import "./signup.route.css";

// importing appwrite functions and constants
import { Account } from "appwrite";
import appwriteClient from "../../Services/appwriteClient";

// arco-design components
import { Message, Notification, Spin, Typography } from "@arco-design/web-react";

// importing components
import Footer from "../../components/Footer/Footer";
import Header from ".././../components/Header/Header";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [name, setFullName] = useState("");

  const [loading, setLoading] = useState(false);

  const account = new Account(appwriteClient);

  const signupHandle = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!email || !password || !username || !name) {
      setLoading(false);

      return Message.error("All the fields are required.");
    }

    try {
      await account.create(username, email, password, name);

      setLoading(false);
      Notification.success({
        title: "Success",
        content: "Signed up successfully!!",
      });

      navigate("/login");
    } catch (error) {
      setLoading(false);
      return Notification.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="signup-form-main-wrapper">
        <div className="img-container">
          <img src={SignupArt} alt="signup art" />
        </div>
        <div className="signup-form-container">
          <div className="signup-form">
            <Typography.Text 
            type="primary"
            className="my-3"
            style={{fontSize: 22}}
            bold
            >
              Explore further. Signup now.
            </Typography.Text>

            <input
              type="text"
              value={name}
              onChange={(e) => setFullName(e.target.value)}
              className="input-fullname"
              placeholder="Full name"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="input-username"
              placeholder="Username"
            />
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
                onClick={(e) => signupHandle(e)}
                type="submit"
                className="submit-btn mb-3"
              >
                Sign Up
              </button>
            </Spin>
          </div>
          <div className="login-div">
            <p>
              Already have an account?  <Link style={{ textDecoration: "none", color: "black" }} to="/login">
               Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
