import React, { useState, useEffect } from "react";
import MapBox from "./Scenes/MapBox/MapBox";
import SearchBar from "./Scenes/Search Bar/SearchBar";
import SearchResult from "./Scenes/Recommendations/SearchResult";
import "./Home.route.css";
// import { pythonServer } from "../../utils/config";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import getPlaces from "./getPlaces";

const Home = () => {
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
      const data = await getPlaces(lat, long)
      if (!data) return

      setSearchResultData(data);
    })()
  }, [lat, long]);

  return (
    <div className="wrapper">
      <Header />
      <div className="body-container">
        <div className="main-body">
          <div className="content">
            <div className="searchBar-container">
              <SearchBar
                setSearchResultData={setSearchResultData}
                setTitle={setTitle} lat={lat} long={long}
              />
            </div>

            <SearchResult searchResultData={searchResultData} title={title} />
          </div>

          <div className="mapBox">
            <MapBox />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
