import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./SearchBar.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoieWFtYW4xMzM3IiwiYSI6ImNrd3V4cWRrejFjcnIydXFxcHNjcG9hbHMifQ.0MvUydr2xdlAEM2eVWqEkw";

function setupMap(center, data) {
  const map = new mapboxgl.Map({
    container: "home-map", // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: center,
    zoom: 7,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  // Set marker options.
  const markerOptions = {
    color: "red",
    draggable: true,
  };

  new mapboxgl.Marker(markerOptions).setLngLat(center).addTo(map);

  for (let i = 0; i < data?.length; i++) {
    let item = data[i];
    const marker = new mapboxgl.Marker({
      color: "rgb(137, 43, 225)",
    })
      .setLngLat([item.coordinates[1], item.coordinates[0]])
      .addTo(map);

    // Add a click event listener to each marker
    marker.getElement().addEventListener("click", async () => {
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
  setMapData
}) => {
  const [newGeoCoded, setNewGeoCoded] = useState(0);
  const [activeTheme, setActiveTheme] = useState("recommended");

  const themes = [
    { id: "recommended", label: "Recommended" },
    { id: "historic", label: "Historic" },
    { id: "religious", label: "Religious" },
    { id: "park", label: "Park" },
    { id: "nature", label: "Nature" },
    { id: "others", label: "Others" }
  ];

  useEffect(() => {
    const geocoder = new window.MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "country,region,place,postcode,locality,neighborhood",
    });

    geocoder.on("result", (e) => {
      setNewGeoCoded(e);
    });

    geocoder.addTo("#geocoder");

  }, []);

  useEffect(() => {
    if (!newGeoCoded) return;
    setupMap(newGeoCoded.result.center, allPlaces);
  }, [newGeoCoded, allPlaces]);

  const updateTheme = async (theme) => {
    setActiveTheme(theme);

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
        {
          themes.map((theme) => (
            <li
              key={theme.id}
              className={`places-theme-filter-btn ${activeTheme === theme.id ? "active" : ""}`}
              onClick={() => {
                updateTheme(theme.id)
              }}
            >
              {theme.label}
            </li>
          ))
        }
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
