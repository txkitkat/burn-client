import React, { useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import Fire from "../Fire";
import IFire from "../../types/fireType";
import MapLayerPickerControl from "./MapLayerPickerControl";
import { Slider, Typography } from "@material-ui/core";

import "./Map.css";

export interface MapProps {
    fireData: IFire[];
    setFireData: (fireData: IFire[]) => void;
    seed: number;
}

const Map = (props: MapProps) => {
    const [value, setValue] = useState(1);

    const changeOpacity = (e: React.ChangeEvent<any>, value: any) => {
        setValue(value);
    };

    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // California position

    //    console.log(props.fireData);

    return (
        <div className="map__container">
            <div 
                style={{ position: 'absolute', backgroundColor: "white", padding: 10, 
                borderRadius:'2px', borderStyle: 'solid', borderColor: 'rgba(105,105,105,0.5)', borderWidth: '2px',
                zIndex: 450, width: 125, top: 675, left: 250, }} >
                <Typography variant={"body1"}>
                    Opacity
                </Typography>
                <Slider value={value} min={0} max={1} step={0.1} 
                    onChange={(e, val) => changeOpacity(e, val)} valueLabelDisplay="auto" 
                />
            </div>
            <MapContainer
                center={defaultPosition}
                zoom={6}
                style={{ height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <MapLayerPickerControl seed={props.seed} value = {value} fireData={props.fireData}/>
            </MapContainer>
        </div>
    );
};

export default Map;