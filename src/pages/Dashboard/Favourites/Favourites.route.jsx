import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// importing styles
import "./Favourites.route.css";
import "../css/dashboardGeneric.css";

// importing appwrite libs and configs
import appwriteClient from "../../../Services/appwriteClient";
import { databaseId } from "../../../Services/config";
import { Databases, Query } from "appwrite";

// importing custom components
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { capitalizeFirstCharacter } from "../../../Services/helper";

// arco-design components
import { Notification, Spin, Typography } from "@arco-design/web-react";

const Favourites = ({ data }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const db = new Databases(appwriteClient);

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

        if (placeIdArray.length <= 0) {
          setLoading(false);
          return;
        }

        const { documents: favPlaces } = await db.listDocuments(
          databaseId,
          "places",
          [Query.equal("$id", placeIdArray), Query.orderDesc("$createdAt")]
        );

        console.log(favPlaces);
        setLoading(false);
        setFavourites(favPlaces);
      } catch (error) {
        setLoading(false);
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
              {loading === true ? (
                <Spin />
              ) : favourites.length === 0 ? (
                <Typography.Title className="ms-4 pb-3" heading={6} bold>
                  No favourite place added yet
                </Typography.Title>
              ) : (
                favourites.map((item) => {
                  return (
                    <div className="favourites-item" key={item.$id}>
                      <div className="image">
                        <img src={item.image[0]} alt="travel place" loading="lazy"/>
                      </div>
                      <div className="text-container">
                        <div className="title">{item.title}</div>
                        <div className="description text-muted">
                          {item.place_description.slice(0, 65)}...
                        </div>
                        <div className="keyword">
                          {capitalizeFirstCharacter(item.keyword)}
                        </div>

                        <div className="button-container">
                          <button
                            onClick={() => navigate(`/place?id=${item.$id}`)}
                            className="btn btn-dark shadow-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
