import React from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import Fire from "../Fire";
import IFire from "../../types/fireType";
import MapLayerPickerControl from "./MapLayerPickerControl";

import "./Map.css";

export interface MapProps {
    fireData: IFire[];
    setFireData: (fireData: IFire[]) => void;
    seed: number;
}

const Map = (props: MapProps) => {
    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // California position

    //    console.log(props.fireData);

    return (
        <div className="map__container">
            <MapContainer
                center={defaultPosition}
                zoom={6}
                style={{ height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {props.fireData.map((fire, i) => <Fire key={i} latLon={[fire["latitude"], fire["longitude"]]}
                    burnArea={fire["acres"]}
                    name={fire["name"]} day={fire["day"]} month={fire["month"]} year={fire["year"]} county={fire["county"]} />)}

                <MapLayerPickerControl seed={props.seed}/>
            </MapContainer>
        </div>
    );
};

export default Map;