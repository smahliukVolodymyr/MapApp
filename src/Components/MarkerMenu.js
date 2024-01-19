import React from "react";
import "../css/MarkerMenu.css";
function MarkerMenu({ markers, onMarkerDelete, onDeleteAllMarkers }) {
  return (
    <div>
      <h2>Marker List</h2>
      <button id="delete-all-button" onClick={onDeleteAllMarkers}>
        Delete All Markers
      </button>
      {markers.map((marker, index) => {
        const formattedDate = new Date(marker.timeStamp).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
        );
        return (
          <li key={marker.id}>
            <h4>Marker: {index + 1}</h4>
            <p>
              Latitude: {marker.location[0]}
              <br />
              Longitude: {marker.location[1]}
              <br />
              TimeStamp: {formattedDate}
            </p>
            <button onClick={() => onMarkerDelete(marker.id)}>Delete</button>
          </li>
        );
      })}
    </div>
  );
}

export default MarkerMenu;
