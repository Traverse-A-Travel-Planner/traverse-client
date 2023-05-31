import React, { useEffect } from "react";
import "./MapBox.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoieWFtYW4xMzM3IiwiYSI6ImNrd3V4cWRrejFjcnIydXFxcHNjcG9hbHMifQ.0MvUydr2xdlAEM2eVWqEkw";

const MapBox = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {
      console.log(position);
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([85.3311488, 27.6955136]);
    }

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
      //   .setLngLat(center)
      //   .addTo(map);
    }
  }, []);

  return (
    <>
      <div id="map" style={{ height: "90vh", width: "100%" }} />
    </>
  );
};

export default MapBox;
