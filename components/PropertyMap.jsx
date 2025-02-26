// "use client";
// import Map from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

// const PropertyMap = ({ property }) => {
//   return (
//     <Map
//       // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
//       mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
//      // mapLib={import('mapbox-gl')}
//       initialViewState={{
//         longitude: -100,
//         latitude: 40,
//         zoom: 3.5,
//       }}
//       style={{ width: 600, height: 400 }}
//       mapStyle="mapbox://styles/mapbox/streets-v9"
//     />
//   );
// };

// export default PropertyMap;
"use client";
import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7128, // Default: New York City
    longitude: -74.006,
    zoom: 10
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewport((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom:12
        }));
      },
      (error) => console.error("Geolocation Error:", error)
    );
  }, []);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
      initialViewState={viewport}
      {...viewport}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={viewport.longitude} latitude={viewport.latitude} />
    </Map>
  );
};

export default PropertyMap;
