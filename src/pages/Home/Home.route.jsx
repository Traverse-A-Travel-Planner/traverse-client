import React, { useState, useEffect } from "react";
import MapBox from "./Scenes/MapBox/MapBox";
import SearchBar from "./Scenes/Search Bar/SearchBar";
import SearchResult from "./Scenes/Recommendations/SearchResult";
import "./Home.route.css";
// import { pythonServer } from "../../utils/config";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Databases, Query, ID } from "appwrite";
import appwriteClient from "../../Services/appwriteClient";
import { databaseId } from "../../Services/config";
import { ResizeBox } from "@arco-design/web-react";

import { Notification } from "@arco-design/web-react";

const MemoizedSearchBar = React.memo(SearchBar);
const MemoizedSearchResult = React.memo(SearchResult);

const MapBoxComponent = ({ paneResized }) => {
  return (
    <>
      <div className="mapBox">
        <MapBox paneResized={paneResized} />
      </div>
    </>
  );
};

const Home = () => {
  const db = new Databases(appwriteClient);

  const [paneResized, setPaneResized] = useState(false);
  const [searchResultData, setSearchResultData] = useState([]);
  const [title, setTitle] = useState("Recommended");

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    },
    () => {
      setLat(27.6955136);
      setLong(85.3311488);
    },
    {
      enableHighAccuracy: true,
    }
  );

  async function fetchPlaces() {
    const { documents: places } = await db.listDocuments(databaseId, "places", [
      Query.orderDesc("$createdAt"),
    ]);

    let { documents: favourites } = await db.listDocuments(
      databaseId,
      "favourites",
      [Query.equal("user_id", [localStorage.getItem("userId")])]
    );

    let favouritesPlaceIds = favourites.map((item) => item.place_id);
    let favouritesDOcIds = favourites.map((item) => item.$id);

    const finalData = places.map((item) => {
      let idx = favouritesPlaceIds.indexOf(item.$id);
      if (idx === -1) {
        return { ...item, isFavourite: false };
      } else {
        return {
          ...item,
          isFavourite: true,
          favouriteDocId: favouritesDOcIds[idx],
        };
      }
    });

    setSearchResultData(finalData);
  }

  useEffect(() => {
    fetchPlaces();
  }, [lat, long]);

  async function handleAddFavourites(obj) {
    try {
      if (obj.isFavourite) {
        await db.deleteDocument(databaseId, "favourites", obj.favouriteDocId);
        Notification.success({
          title: "Success",
          content: "Removed from favourites.",
        });
        fetchPlaces();
        return;
      }

      await addFavourite(obj);
    } catch (error) {
      Notification.error({
        title: "Error",
        content: error.message,
      });
    }
  }

  async function addFavourite(obj) {
    await db.createDocument(databaseId, "favourites", ID.unique(), {
      place_id: obj.place_id,
      user_id: obj.user_id,
    });

    await fetchPlaces();
    Notification.success({
      title: "Success",
      content: "Added to favourites.",
    });
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="body-container">
        <div className="main-body">
          <ResizeBox.Split
            direction="horizontal"
            onMovingEnd={() => setPaneResized(!paneResized)}
            style={{
              height: "100%",
              width: "100%",
              border: "1px solid var(--color-border)",
            }}
            max={0.75}
            min={0.275}
            panes={[
              <div className="content">
                <div className="searchBar-container">
                  <MemoizedSearchBar
                    setSearchResultData={setSearchResultData}
                    setTitle={setTitle}
                    lat={lat}
                    long={long}
                  />
                </div>
                <MemoizedSearchResult
                  searchResultData={searchResultData}
                  title={title}
                  handleAddFavourites={handleAddFavourites}
                />
              </div>,
              <MapBoxComponent paneResized={paneResized} />,
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
