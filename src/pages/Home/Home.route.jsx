import React, { useState, useEffect } from "react";
import MapBox from "./Scenes/MapBox/MapBox";
import SearchBar from "./Scenes/Search Bar/SearchBar";
import SearchResult from "./Scenes/Recommendations/SearchResult";
import "./Home.route.css";
// import { pythonServer } from "../../utils/config";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { Databases, Query } from "appwrite";
import appwriteClient from "../../utils/appwriteClient";
import { databaseId } from "../../utils/config";
import { ResizeBox } from "@arco-design/web-react";

const MemoizedSearchBar = React.memo(SearchBar);
const MemoizedSearchResult = React.memo(SearchResult);

const MapBoxComponent = ({paneResized}) => {
  return(
    <>
    <div className="mapBox">
      <MapBox paneResized={paneResized}/>
    </div>
    </>
  )
}

const Home = () => {
  const [paneResized, setPaneResized] = useState(false)
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

  useEffect(() => {
    (async () => {
      const db = new Databases(appwriteClient);
      const response = await db.listDocuments(databaseId, "places", [ Query.orderDesc("$createdAt") ]);
      setSearchResultData(response.documents);
    })();
  }, [lat, long]);

  return (
    <div className="wrapper">
      <Header />
      <div className="body-container">
        <div className="main-body">
          <ResizeBox.Split
            direction="horizontal"
            onMovingEnd={() => setPaneResized(!paneResized)
            }
            style={{
              height: '100%',
              width: '100%',
              border: '1px solid var(--color-border)',
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
                <MemoizedSearchResult searchResultData={searchResultData} title={title} />
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
