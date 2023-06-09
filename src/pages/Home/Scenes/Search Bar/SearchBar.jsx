import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./SearchBar.css";
import { Databases, Query } from "appwrite";
import appwriteClient from "../../../../Services/appwriteClient";
import { databaseId } from "../../../../Services/config";

mapboxgl.accessToken =
  "pk.eyJ1IjoieWFtYW4xMzM3IiwiYSI6ImNrd3V4cWRrejFjcnIydXFxcHNjcG9hbHMifQ.0MvUydr2xdlAEM2eVWqEkw";

const db = new Databases(appwriteClient);

function setupMap(center, data) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: center,
    zoom: 7,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  // map.addControl(
  //   new window.MapboxDirections({
  //     accessToken: mapboxgl.accessToken,
  //   }),
  //   "top-left"
  // );

  map.on("click", function (e) {
    // var coordinates = e.lngLat;
    // updateMarker(coordinates);
    // console.log(coordinates)
  });

  // Set marker options.
  const markerOptions = {
    color: "red",
    draggable: true,
  };

  new mapboxgl.Marker(markerOptions).setLngLat(center).addTo(map);

  // function updateMarker(coordinates) {
  //   marker.setLngLat(coordinates);
  // }

  for (let i = 0; i < data?.length; i++) {
    let item = data[i];
    const marker = new mapboxgl.Marker({
      color: "rgb(137, 43, 225)",
    })
      .setLngLat([item.coordinates[1], item.coordinates[0]])
      .addTo(map);

    // Add a click event listener to each marker
    marker.getElement().addEventListener("click", async () => {
      console.log(marker._lngLat);

      // Animate zoom to the location specified by lngLat
      map.flyTo({
        center: marker._lngLat,
        zoom: 14,
        duration: 1000,
        essential: true,
      });

      // Display a popup with the place description
      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([item.coordinates[1], item.coordinates[0]])
        .setHTML(
          `<div class="places-card">
            <div class="image">
                <img src=${item.image[0]} alt="img" />
            </div>
            <div class="card-content">
                <div class="keyword">
                    <p>${item.keyword}</p>
                </div>
                <div class="header-block">
                  ${item.title}
                </div>
                <div class="location-description">
                  ${item.location_description}
                </div>
                <div class="description">
                  ${item.place_description}
                </div>
            </div>
            <div class="footer-block">
                <button class="places-redirect-btn"><a href="#">View</a></button>
            </div>
        </div>`
        )
        .addTo(map);

      popup.addClassName("places-card-popup");
    });
  }
}

const SearchBar = ({
  allPlaces,
  setSearchResultData,
  setTitle,
  setMapData,
  lat,
  long,
}) => {
  const geocoder = new window.MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood",
  });

  const [newGeoCoded, setNewGeoCoded] = useState(0);

  geocoder.on("result", (e) => {
    setNewGeoCoded(e);
  });

  useEffect(() => {
    geocoder.addTo("#geocoder");
  }, []);

  useEffect(() => {
    if (!newGeoCoded) return;
    console.log("hehe", allPlaces);
    setupMap(newGeoCoded.result.center, allPlaces);
  }, [newGeoCoded]);

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
