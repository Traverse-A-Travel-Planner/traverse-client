import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// arco design configurations
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';

// appwrite libs
import { Account } from "appwrite";
import appwriteClient from "./Services/appwriteClient";

// importing stles
import "./App.css"
import "@arco-design/web-react/dist/css/arco.css"
import 'mapbox-gl/dist/mapbox-gl.css';


// import page routing components
import Home from "./pages/Home/Home.route.jsx";
import Login from "./pages/Login/login.route.jsx";
import Signup from "./pages/Signup/signup.route.jsx";
import Dashboard from "./pages/Dashboard/About/Dashboard.route.jsx";
import Favourites from "./pages/Dashboard/Favourites/Favourites.route.jsx";
import PageNotFound from "./pages/PageNotFound/pageNotFound.jsx";
import Changepassword from "./pages/Dashboard/Actions/ChangePassword/Changepassword.jsx";
import ListReviews from "./pages/Dashboard/Reviews/ListReviews";
import Contributions from "./pages/Dashboard/Contributions/Contributions";
import PlaceSpecificPage from "./pages/Place/Place.route";
import ShareTrip from "./pages/Share Trip/ShareTrip.route";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_details, setUserDetails] = useState({
    uid: "Loading...",
    username: "Loading...",
    full_name: "Loading...",
    email: "Loading...",
  });

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        const account = new Account(appwriteClient);

        let uid = localStorage.getItem("userId");
        let userData = await account.get(uid);
        let { $id, name, email } = userData;
        setUserDetails({ uid, username: $id, full_name: name, email });
      }
    })();
  }, [loggedIn]);
  
  useEffect(() => {
    const token = localStorage.getItem("cookieFallback");
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <div className="app-wrapper">
        {loggedIn === true ? (
          <BrowserRouter>
            <Outlet />
              <div className="main">
              <ConfigProvider locale={enUS}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard data={user_details} />} />
                  <Route path="/favourites" element={<Favourites data={user_details} />} />
                  <Route path="/reviews" element={<ListReviews data={user_details} />} />
                  <Route path="/changePassword" element={<Changepassword data={user_details} />} />
                  <Route path="/contribute" element={<Contributions data={user_details}/>} />
                  <Route path="/shareTrip" element={<ShareTrip data={user_details} />} />

                  <Route path="/place" element={<PlaceSpecificPage />} />

                  {/* 👇️ only match this when no other routes match */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </ConfigProvider>
              </div>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login logStatus={{ loggedIn, setLoggedIn }} />} />
              <Route path="/signup" element={<Signup />} />

              {/* 👇️ only match this when no other routes match */}
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
};

export default App;
