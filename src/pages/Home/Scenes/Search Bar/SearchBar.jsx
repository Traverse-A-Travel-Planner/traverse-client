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

const SearchBar = ({ setSearchResultData, setTitle, lat, long }) => {
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
    // let url = "";
    // if(theme === "recommended") {
    //   url = `${pythonServer}/${lat}/${long}`
    // } else {
    //   url = `${pythonServer}/${theme}`
    // }
    // const res = await fetch(url);
    // const data = await res.json();

    // if (!data || typeof data === "string") return toast.error("Server error.");

    // setSearchResultData(data);
    // setTitle(theme);

    // const map = new mapboxgl.Map({
    //   container: "map",
    //   style: "mapbox://styles/mapbox/streets-v9",
    //   zoom: 5.5,
    //   center: [84.124, 28.3949],
    // });

    // for (let i = 0; i < data.length; i++) {
      // const popup_html = `
      //       <img src="${data[i].image}" 
      //       alt="image of ${data[i].name}" 
      //       style="height: 50px; width: 50px"> 
      //       <br>
      //       ${data[i].name}<br>
      //       ${data[i].location}<br>
      //       ${data[i].des}<br>
      // `;  
      // const popup = new mapboxgl.Popup({
      //   offset: 25,
      //   closeButton: false,
      // }).setHTML(popup_html);

      // const marker = new mapboxgl.Marker()
      //   .setLngLat([data[i].cords[1], data[i].cords[0]])
      //   .setPopup(popup)
      //   .addTo(map);
    // }
  };

  return (
    <>
      <div id="geocoder"></div>
      <div className="search-buttons">
        <ul>
          <li className="search-items" onClick={() => updateTheme("recommended")}>Recommended</li>

          <li className="search-items" onClick={() => updateTheme("historic")}>
            Historic
          </li>
          <li className="search-items" onClick={() => updateTheme("religious")}>
            Religious
          </li>
          <li className="search-items" onClick={() => updateTheme("park")}>
            Park
          </li>
          <li className="search-items" onClick={() => updateTheme("temple")}>
            Temple
          </li>
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
