import React, { useEffect, useState } from "react";
import About from "./About";
import "./Dashboard.route.css";
import { backendUrl } from "../../../utils/config";

const Dashboard = () => {
  const [user_details, setUserDetails] = useState({
    uid: "Loading...",
    username: "Loading...",
    full_name: "Loading...",
    email: "Loading...",
    phone_number: "Loading...",
    role: "Loading...",
    password: "Loading...",
    address: "Loading...",
    gender: "Loading...",
  });

  useEffect(() => {
    async function a() {
      const res = await fetch(backendUrl + "/profile/details", {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();

      setUserDetails(data.data);
    }
    a();
  }, []);

  return (
    <div className="main-body">
      <About data={user_details} />
    </div>
  );
};

export default Dashboard;
