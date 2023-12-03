import React from "react";
import "../css/MarkerMenu.css";
function MarkerMenu({ markers, onMarkerDelete, onDeleteAllMarkers }) {
  return (
    <div>
      <h2>Marker List</h2>
      <button id="delete-all-button" onClick={onDeleteAllMarkers}>
        Delete All Markers
      </button>
      <ul>
        {markers.map((marker, index) => (
          <li key={marker.id}>
            <h4>Marker: {index + 1}</h4>
            <p>
              Latitude: {marker.location[0]}
              <br />
              Longitude: {marker.location[1]}
              <br />
              TimeStamp:{" "}
              {new Date(marker.timeStamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <button onClick={() => onMarkerDelete(marker.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarkerMenu;
