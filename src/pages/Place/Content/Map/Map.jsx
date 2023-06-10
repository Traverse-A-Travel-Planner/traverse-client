import React, { useEffect } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoieWFtYW4xMzM3IiwiYSI6ImNrd3V4cWRrejFjcnIydXFxcHNjcG9hbHMifQ.0MvUydr2xdlAEM2eVWqEkw";

const PlaceMap = ({ state }) => {
  useEffect(() => {
    const center = [state.placeData.coordinates[1], state.placeData.coordinates[0]];

    setupMap(center)

    async function setupMap(center) {
      const map = new mapboxgl.Map({
        container: "map-place", // container ID
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 14,
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      // Set marker options.
      const markerOptions = {
          color: "rgb(137, 43, 225)",
          draggable: false,
      };

      const marker = new mapboxgl.Marker(markerOptions)
          .setLngLat(center)
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
      })
    }
  }, [state]);

  return (
    <>
      <div id="map-place" style={{ height: "55vh", width: "100%" }} />
    </>
  );
};

export default PlaceMap;