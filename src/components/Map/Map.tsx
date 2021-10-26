import React,{useEffect,useState} from "react";
import {Icon, LatLngExpression} from "leaflet";
import { MapContainer, TileLayer, useMap} from "react-leaflet";
import callService from "../../service/CallService";
import Fire from "../Fire";
import IFire from "../../types/fireType";
import MapLayerPickerControl from "./MapLayerPickerControl";

//import * as fireData from "./data/Rxfires.json";
import "./Map.css";

export const icon = new Icon({                                                            
    iconUrl: "/icon.jpg",
    iconSize: [25,25]
});


function MyComponent() {
//const map = useMapEvents({
//    click: () => {map.getCenter()},
//    locationfound: (location) => {console.log('location found: ', location)},
//})
const map = useMap()
console.log('center of the map: ', map.getCenter())
return null
}

const Map = (props : any) => {
    const [fireData, setFireData] = useState<IFire[]>([]);
    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // California position
    let fires : any;

     async function fetchData() {
        try {
                const response: any = await callService(props.method, props.params);
                   
                if(response.data.hasOwnProperty("_embedded"))
                    fires = response.data._embedded.fires;
                else
                    fires = response.data;  
 
                setFireData(fires);
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="map__container">
            <MapContainer
                center={defaultPosition}
                zoom={7}
                style={{height: "100%"}}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {fireData.map((fire, i) => <Fire key={i} latLon={[fire["latitude"], fire["longitude"]]}
                                                 burnArea={fire["acres"]}
                                                 name={fire["name"]} date={fire["date"]}/>)}

                <MapLayerPickerControl/>
                <MyComponent/> 

            </MapContainer>
        </div>
    );
};

export default Map;