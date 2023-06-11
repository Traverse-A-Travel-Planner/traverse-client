import React, { useState, useEffect } from "react";
import { ResizeBox, Notification, Message } from "@arco-design/web-react";

// importing components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MapBox from "./Scenes/MapBox/MapBox";
import SearchBar from "./Scenes/Search Bar/SearchBar";
import SearchResult from "./Scenes/Recommendations/SearchResult";

// importing appwrite functions, libs, and constants
import { Databases, Query, ID } from "appwrite";
import appwriteClient from "../../Services/appwriteClient";
import { databaseId } from "../../Services/config";

// importing styles
import "./Home.route.css";

const MemoizedSearchBar = React.memo(SearchBar);

// re-renering mapbox component when pane resized
const MapBoxComponent = ({ paneResized, data }) => {
  return (
    <>
      <div className="mapBox">
        <MapBox paneResized={paneResized} rawData={data} />
      </div>
    </>
  );
};

const Home = () => {
  const db = new Databases(appwriteClient);

  const [paneResized, setPaneResized] = useState(false);
  const [allPlaces, setAllPlaces] = useState([])
  const [searchResultData, setSearchResultData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [title, setTitle] = useState("Recommended");

  const [mapDataLoading, setMapDataLoading] = useState(true)

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

  const fetchMapPlaces = async () => {
    try{
      const { documents: places } = await db.listDocuments(databaseId, "places", [
        Query.orderDesc("$createdAt"),
      ]);

      setMapData(places);
      setAllPlaces(places)
      setMapDataLoading(false)
      return places;
    } catch (error) {
      setMapDataLoading(false)
      Message.error("Something went wrong")
    }
  };

  const fetchFavouritesPlaces = async () => {
    try {
      let places = mapData;

      if (!places || !places.length) {
        places = await fetchMapPlaces();
      }

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
    } catch {
      Message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!lat || !long) return;
    fetchFavouritesPlaces();
  }, [lat, long, mapData]);

  async function handleAddFavourites(obj) {
    try {
      if (obj.isFavourite) {
        await db.deleteDocument(databaseId, "favourites", obj.favouriteDocId);
        Notification.success({
          title: "Success",
          content: "Removed from favourites.",
        });

        await fetchMapPlaces();
        setTitle("recommended");
        await fetchFavouritesPlaces();
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
    try {
      await db.createDocument(databaseId, "favourites", ID.unique(), {
        place_id: obj.place_id,
        user_id: obj.user_id,
      });

      Notification.success({
        title: "Success",
        content: "Added to favourites.",
      });

      await fetchMapPlaces();
      await fetchFavouritesPlaces();
      return;
    } catch (error) {
      Notification.error({
        title: "Error",
        content: error.message,
      });
    }
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
                    allPlaces={allPlaces}
                    setSearchResultData={setSearchResultData}
                    setTitle={setTitle}
                    setMapData={setMapData}
                  />
                </div>
                <SearchResult
                  searchResultLoading={mapDataLoading}
                  searchResultData={searchResultData}
                  title={title}
                  handleAddFavourites={handleAddFavourites}
                />
              </div>,
              <MapBoxComponent paneResized={paneResized} data={mapData} />,
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
