import React, { useEffect, useState } from "react";
import About from "./About";
import "./Dashboard.route.css";
import Header from "../../../components/Header/Header";

import { Account } from "appwrite";
import appwriteClient from "../../../utils/appwriteClient";

const Dashboard = () => {
  const [user_details, setUserDetails] = useState({
    uid: "Loading...",
    username: "Loading...",
    full_name: "Loading...",
    email: "Loading...",
  });

  const account = new Account(appwriteClient);

  useEffect(() => {
    (async () => {
      let uid = localStorage.getItem("userId");
      let userData = await account.get(uid);
      let { $id, name, email } = userData;
      setUserDetails({ uid, username: $id, full_name: name, email });
    })();
  }, []);

  return (
    <div className="main-body">
      <Header />
      <About data={user_details} />
    </div>
  );
};

export default Dashboard;
