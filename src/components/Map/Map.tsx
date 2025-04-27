import React, { useCallback, useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import IFire from "../../types/fireType";
import MapLayerPickerControl from "./MapLayerPickerControl";
import L from "leaflet";
import CustomSliderLayersControl from "./CustomSliderLayersControl";
import fireCursorIcon from './assets/firecursor.png'
import "./Map.css";
import { ModelStage } from "../../enums/modelStage";

export interface MapProps {
    fireData: IFire[];
    setFireData: (fireData: IFire[]) => void;
    seed: number;
    counties: string[];
    countyRefresh: number;
    modelStage: ModelStage;
    handleSelectLocation: (latitude: number, longitude: number) => void;
}

// Improve performance of using Callback functions
const MemoizedMapLayerPickerControl = React.memo(MapLayerPickerControl);
const MemoizedCustomSliderLayersControl = React.memo(CustomSliderLayersControl);

const fireCursor = `url(${fireCursorIcon}) 14 14, auto`;

const Map = (props: MapProps) => {
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(1);
    const [value3, setValue3] = useState(1);
    const [value4, setValue4] = useState(1);
    const [value5, setValue5] = useState(1);

    
    const [map, setMap] = useState<L.Map>()

    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // California position

    const updateValue1 = useCallback((newValue: number) => {setValue1(newValue); },[] );
    const updateValue2 = useCallback((newValue: number) => {setValue2(newValue); },[] );
    const updateValue3 = useCallback((newValue: number) => {setValue3(newValue); },[] );
    const updateValue4 = useCallback((newValue: number) => {setValue4(newValue); },[] );
    const updateValue5 = useCallback((newValue: number) => {setValue5(newValue); },[] );
    
    const handleGetLocation = (latlng: L.LatLng) => {
        if (props.modelStage === ModelStage.SelectingLocation) {
            console.log("Clicking");
            const lat = latlng.lat;
            const lon = latlng.lng;
            props.handleSelectLocation(lat, lon);
        }
    }

    useEffect(() => {
        if (!map)
            return;

        const container = map.getContainer();
        if (props.modelStage === ModelStage.SelectingLocation) {
            container.classList.add("selecting-cursor");
            console.log(container.className)
        } else {
            container.classList.remove("selecting-cursor");
            console.log(container.className)
        }

        const handleClick = (e: L.LeafletMouseEvent) => {
            handleGetLocation(e.latlng)
        }

        map.on('click', handleClick);

        return () => {
            map.off('click', handleClick);
        };
    }, [map, props.modelStage]);

    return (
        <div>           
            <MapContainer
                className="map__container"
                center={defaultPosition}
                zoom={6}
                whenCreated={ (mapInstance) => {setMap(mapInstance)}} //get instance of the map
            >

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MemoizedMapLayerPickerControl seed={props.seed} fireData={props.fireData} map={map} counties={props.counties}
                    valueSliderValue={[value1, value2, value3, value4, value5]} countyRefresh={props.countyRefresh} />
                    
                <MemoizedCustomSliderLayersControl seed={props.seed} setValue = {[updateValue1, updateValue2, updateValue3, updateValue4, updateValue5]} map={map} />

            </MapContainer>
        </div>
    );
};

export default Map;