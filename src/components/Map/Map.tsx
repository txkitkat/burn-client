import React from "react";
import {LatLngExpression} from "leaflet";
import {MapContainer, TileLayer} from "react-leaflet";

import "./Map.css";

const Map = () => {
    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // Paris position

    return (
        <div className="map__container">
            <MapContainer
                center={defaultPosition}
                zoom={7}
                style={{height: "100vh"}}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default Map;
