import React, { useCallback, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import IFire from "../../types/fireType";
import MapLayerPickerControl from "./MapLayerPickerControl";
import L from "leaflet";
import CustomSliderLayersControl from "./CustomSliderLayersControl";
import "./Map.css";

export interface MapProps {
    fireData: IFire[];
    setFireData: (fireData: IFire[]) => void;
    seed: number;
    counties: string[];
    countyRefresh: number;
}

// Improve performance of using Callback functions
const MemoizedMapLayerPickerControl = React.memo(MapLayerPickerControl);
const MemoizedCustomSliderLayersControl = React.memo(CustomSliderLayersControl);

const Map = (props: MapProps) => {
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(1);
    const [value3, setValue3] = useState(1);
    const [value4, setValue4] = useState(1);
    
    const [map, setMap] = useState<L.Map>()

    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // California position

    const updateValue1 = useCallback((newValue: number) => {setValue1(newValue); },[] );
    const updateValue2 = useCallback((newValue: number) => {setValue2(newValue); },[] );
    const updateValue3 = useCallback((newValue: number) => {setValue3(newValue); },[] );
    const updateValue4 = useCallback((newValue: number) => {setValue4(newValue); },[] );

    
    return (
        <div className="map__container">           
            <MapContainer
                center={defaultPosition}
                zoom={6}
                style={{ height: "100%" }}
                whenCreated={ (mapInstance) => {setMap(mapInstance)}} //get instance of the map
            >

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MemoizedMapLayerPickerControl seed={props.seed} fireData={props.fireData} map={map} counties={props.counties}
                    valueSliderValue={[value1, value2, value3, value4]} countyRefresh={props.countyRefresh}/>
                    
                <MemoizedCustomSliderLayersControl seed={props.seed} setValue = {[updateValue1, updateValue2, updateValue3, updateValue4]} map={map} />

            </MapContainer>
        </div>
    );
};

export default Map;