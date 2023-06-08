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
    console.log("MapBox Data: ", data)
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
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: 1.5,
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
        marker.getElement().addEventListener("click", async () => {
          console.log(marker._lngLat)

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
          
          popup.addClassName('places-card-popup');
        });
      }

      return () => {
        map.remove()
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
