import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Favourites.route.css";
import { backendUrl } from "../../../utils/config";

const Favourites = () => {
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
      <Sidebar data={user_details} />

      <div className="content">
        <div className="url-path">Home / Favourites</div>
        <div className="favourites-section">
          <p className="favourites-header">My Favourites</p>
          <div className="favourites-content">
            <div className="favourites-item">
              <div className="image">
                <img src="https://lp-cms-production.imgix.net/2019-06/813869da84003e9ab623499ae2465723-bodhnath-stupa.jpg?q=40&w=2000&auto=format" alt="travel place"/>
              </div>
              <div className="text-container">
                <div className="title">Bouddhanath Stupa</div>
                <div className="description text-muted">
                  One of the most lightseeing place in Kathmandu. Many visitors
                  comes to visit this place.
                </div>
                <div className="price">NPR 250</div>
                <div className="checked-in text-success">
                  <i className="bi bi-check-circle"></i> Checked-in
                </div>

                <div className="button-container">
                  <button
                    className="btn btn-dark shadow-sm"
                    id="view-favourites-btn"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>

            <div className="favourites-item">
              <div className="image">
                <img src="https://lp-cms-production.imgix.net/2019-06/813869da84003e9ab623499ae2465723-bodhnath-stupa.jpg?q=40&w=2000&auto=format" alt="img" />
              </div>
              <div className="text-container">
                <div className="title">Bouddhanath Stupa</div>
                <div className="description text-muted">
                  One of the most lightseeing place in Kathmandu. Many visitors
                  comes to visit this place.
                </div>
                <div className="price">NPR 250</div>

                <div className="button-container">
                  <button
                    className="btn btn-dark shadow-sm"
                    id="view-favourites-btn"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>

            <div className="favourites-item">
              <div className="image">
                <img src="https://lp-cms-production.imgix.net/2019-06/813869da84003e9ab623499ae2465723-bodhnath-stupa.jpg?q=40&w=2000&auto=format" alt="img"/>
              </div>
              <div className="text-container">
                <div className="title">Bouddhanath Stupa</div>
                <div className="description text-muted">
                  One of the most lightseeing place in Kathmandu. Many visitors
                  comes to visit this place.
                </div>
                <div className="price">NPR 250</div>
                <div className="checked-in text-success">
                  <i className="bi bi-check-circle"></i> Checked-in
                </div>

                <div className="button-container">
                  <button
                    className="btn btn-dark shadow-sm"
                    id="view-favourites-btn"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>

            <div className="favourites-item">
              <div className="image">
                <img src="https://lp-cms-production.imgix.net/2019-06/813869da84003e9ab623499ae2465723-bodhnath-stupa.jpg?q=40&w=2000&auto=format" alt="img"/>
              </div>
              <div className="text-container">
                <div className="title">Bouddhanath Stupa</div>
                <div className="description text-muted">
                  One of the most lightseeing place in Kathmandu. Many visitors
                  comes to visit this place.
                </div>
                <div className="price">NPR 250</div>
                <div className="checked-in text-success">
                  <i className="bi bi-check-circle"></i> Checked-in
                </div>

                <div className="button-container">
                  <button
                    className="btn btn-dark shadow-sm"
                    id="view-favourites-btn"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>

            <div className="favourites-item">
              <div className="image">
                <img src="https://lp-cms-production.imgix.net/2019-06/813869da84003e9ab623499ae2465723-bodhnath-stupa.jpg?q=40&w=2000&auto=format" alt="img"/>
              </div>
              <div className="text-container">
                <div className="title">Bouddhanath Stupa</div>
                <div className="description text-muted">
                  One of the most lightseeing place in Kathmandu. Many visitors
                  comes to visit this place.
                </div>
                <div className="price">NPR 250</div>

                <div className="button-container">
                  <button
                    className="btn btn-dark shadow-sm"
                    id="view-favourites-btn"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>

            <div className="favourites-item">
              <div className="image">
                <img src="https://lp-cms-production.imgix.net/2019-06/813869da84003e9ab623499ae2465723-bodhnath-stupa.jpg?q=40&w=2000&auto=format" alt="img"/>
              </div>
              <div className="text-container">
                <div className="title">Bouddhanath Stupa</div>
                <div className="description text-muted">
                  One of the most lightseeing place in Kathmandu. Many visitors
                  comes to visit this place.
                </div>
                <div className="price">NPR 250</div>

                <div className="button-container">
                  <button
                    className="btn btn-dark shadow-sm"
                    id="view-favourites-btn"
                  >
                    Plan Trip
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

export default Favourites;
