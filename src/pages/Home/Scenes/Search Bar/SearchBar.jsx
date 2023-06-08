import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./SearchBar.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoieWFtYW4xMzM3IiwiYSI6ImNrd3V4cWRrejFjcnIydXFxcHNjcG9hbHMifQ.0MvUydr2xdlAEM2eVWqEkw";

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  map.addControl(
    new window.MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    "top-left"
  );

  // Set marker options.
  // const marker = new mapboxgl.Marker({
  //   color: "red",
  //   draggable: true,
  // })
  // .setLngLat(center)
  // .addTo(map);
}

const SearchBar = ({
  allPlaces,
  searchResultData,
  setSearchResultData,
  setTitle,
  setMapData,
  lat,
  long,
}) => {
  useEffect(() => {
    const geocoder = new window.MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });

    geocoder.addTo("#geocoder");

    geocoder.on("result", (e) => {
      setupMap(e.result.center);
    });
  }, []);

  const updateTheme = async (theme) => {
    if (theme === "recommended") {
      setSearchResultData(allPlaces);
      setTitle("Recommended");
      setMapData(allPlaces);
      return;
    }

    const newData = allPlaces.filter((item) => item.keyword === theme);
    setTitle(theme);
    setSearchResultData(newData);
    setMapData(newData);
  };

  return (
    <>
      <div id="geocoder"></div>
      <div className="search-buttons">
        <ul>
          <li
            className="search-items"
            onClick={() => updateTheme("recommended")}
          >
            Recommended
          </li>

          <li className="search-items" onClick={() => updateTheme("historic")}>
            Historic
          </li>
          <li className="search-items" onClick={() => updateTheme("religious")}>
            Religious
          </li>
          <li className="search-items" onClick={() => updateTheme("park")}>
            Park
          </li>
          <li className="search-items" onClick={() => updateTheme("nature")}>
            Nature
          </li>
          <li className="search-items" onClick={() => updateTheme("others")}>
            Others
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
