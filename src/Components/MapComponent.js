import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import markerImage from "../img/marker.png";
import MarkerMenu from "./MarkerMenu";
import "../css/Map.css";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const TOKEN =
  "pk.eyJ1Ijoidm9sb2R5bXlyMTQzIiwiYSI6ImNscG11NGJmMzBma2Uya21zdWF1YWc1aXoifQ.9ORrXaFlCkZbknrf8R2Opw";

function MapComponent() {
  const [viewPort, setViewport] = useState({
    latitude: 49.84439218978025,
    longitude: 24.027581961719157,
    zoom: 10,
    pitch: 50,
  });
  const [markers, setMarkers] = useState([]);
  const markersCollectionRef = collection(db, "marker");
  const getMarkers = async () => {
    const data = await getDocs(markersCollectionRef);
    const marker = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setMarkers(marker);
  };
  useEffect(() => {
    getMarkers();
  }, []);

  const handleMapClick = async (event) => {
    const newMarker = {
      location: [event.lngLat.lat, event.lngLat.lng],
      timeStamp: new Date().getTime(),
    };
    try {
      await addDoc(markersCollectionRef, newMarker);
      getMarkers();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const changeCoordinates = async (event, markerId) => {
    markers.map(async (marker) => {
      if (marker.id === markerId) {
        const markerDoc = doc(db, "marker", marker.id);
        const newFields = { location: [event.lngLat.lat, event.lngLat.lng] };
        await updateDoc(markerDoc, newFields);
        getMarkers();
      }
    });
  };

  const handleMarkerDelete = async (markerId) => {
    const markerDoc = doc(db, "marker", markerId);
    await deleteDoc(markerDoc);
    getMarkers();
  };
  const handleDeleteAllMarkers = async () => {
    markers.map(async (marker) => {
      const markerDoc = doc(db, "marker", marker.id);
      await deleteDoc(markerDoc);
    });
    getMarkers();
  };

  return (
    <div id="map-container">
      <Map
        id="map"
        {...viewPort}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(evt) => setViewport(evt.viewState)}
        onClick={handleMapClick}
      >
        {markers
          ? markers.map((marker, index) => (
              <div key={marker.id}>
                <Marker
                  longitude={marker.location[1]}
                  latitude={marker.location[0]}
                  anchor="bottom"
                  draggable={true}
                  onDragEnd={(e) => changeCoordinates(e, marker.id)}
                >
                  <div id="marker-popup">{index + 1}</div>
                  <img src={markerImage} alt="marker" width={30} height={30} />
                </Marker>
              </div>
            ))
          : ""}
      </Map>

      <MarkerMenu
        id="menu"
        markers={markers}
        onMarkerDelete={handleMarkerDelete}
        onDeleteAllMarkers={handleDeleteAllMarkers}
      />
    </div>
  );
}
export default MapComponent;
