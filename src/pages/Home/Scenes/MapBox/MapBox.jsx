import React, { useEffect, useMemo } from "react";
import "./MapBox.css";
import mapboxgl from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  "pk.eyJ1IjoieWFtYW4xMzM3IiwiYSI6ImNrd3V4cWRrejFjcnIydXFxcHNjcG9hbHMifQ.0MvUydr2xdlAEM2eVWqEkw";

const MapBox = ({paneResized, rawData}) => {
  const data = useMemo(() => {
    return rawData;
  }, [rawData]);

  useEffect(() => {
    if (data.length === 0) return

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([85.3311488, 27.6955136]);
    }

    function setupMap(center) {
      function animateZoom(map, targetZoom, duration) {
        const startZoom = map.getZoom();
        const zoomIncrement = (targetZoom - startZoom) / (duration / 16);
        let currentZoom = startZoom;
  
        const interval = setInterval(() => {
          currentZoom += zoomIncrement;
          map.setZoom(currentZoom);
  
          if (currentZoom >= targetZoom) {
            map.setZoom(targetZoom);
            clearInterval(interval);
          }
        }, 16);
      }

      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: 1.5,
      });

      setTimeout(() => {
        animateZoom(map, 14, 1000);
      }, 2000);

      // const nav = new mapboxgl.NavigationControl();
      // map.addControl(nav);

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

      new mapboxgl.Marker(markerOptions)
        .setLngLat(center)
        .addTo(map);

      // function updateMarker(coordinates) {
      //   marker.setLngLat(coordinates);
      // }

      for (let i = 0; i < data?.length; i++) {
        let item = data[i];
        const marker = new mapboxgl.Marker()
          .setLngLat([item.coordinates[1], item.coordinates[0]])
          .addTo(map);

        // Add a click event listener to each marker
        marker.getElement().addEventListener("click", () => {
          // Display a popup with the place description
          new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat([item.coordinates[1], item.coordinates[0]])
            .setHTML(
              `<div>
              ${item.title}
              <hr />
              ${item.location_description}
              <hr />
              ${item.place_description.slice(0, 100)}...
              </div>`
            )
            .addTo(map);
        });
      }
    }
  }, [paneResized, data]);

  return (
    <>
      <div id="map" style={{ height: "90vh", width: "100%" }} />
    </>
  );
};

export default MapBox;
