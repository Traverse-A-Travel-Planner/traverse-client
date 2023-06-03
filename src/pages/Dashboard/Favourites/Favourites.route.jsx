import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Favourites.route.css";
import "../css/dashboardGeneric.css";
import Header from "../../../components/Header/Header";

import appwriteClient from "../../../utils/appwriteClient";
import { databaseId } from "../../../utils/config";

import { Databases, Query } from "appwrite";
import { Notification } from "@arco-design/web-react";

const Favourites = ({ data }) => {
  const db = new Databases(appwriteClient);

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const { documents: allFavItems } = await db.listDocuments(
          databaseId,
          "favourites",
          [
            Query.equal("user_id", localStorage.getItem("userId")),
            Query.orderDesc("$createdAt"),
          ]
        );

        let placeIdArray = allFavItems.map((item) => item.place_id);

        if (placeIdArray.length <= 0) return;

        const { documents: favPlaces } = await db.listDocuments(
          databaseId,
          "places",
          [Query.equal("$id", placeIdArray), Query.orderDesc("$createdAt")]
        );

        setFavourites(favPlaces);
      } catch (error) {
        Notification.error({
          title: "Error",
          content: error.message,
        });
      }
    })();
  }, []);

  return (
    <div className="main-body">
      <Header />

      <div className="dashboard-content favourites">
        <Sidebar data={data} />
        <div className="content">
          <div className="url-path">Dashboard / Favourites</div>
          <div className="favourites-section">
            <p className="favourites-header">My Favourites</p>
            <div className="favourites-content">
              {favourites.length === 0 ? (
                <h1>No favourite place added yet.</h1>
              ) : (
                ""
              )}
              {favourites &&
                favourites.map((item) => {
                  return (
                    <div className="favourites-item" key={item.$id}>
                      <div className="image">
                        <img src={item.image[0]} alt="travel place" />
                      </div>
                      <div className="text-container">
                        <div className="title">{item.title}</div>
                        <div className="description text-muted">
                          {item.place_description.slice(0, 65)}...
                        </div>
                        <div className="keyword">{item.keyword}</div>

                        <div className="button-container">
                          <button
                            className="btn btn-dark shadow-sm"
                            id="view-favourites-btn"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
