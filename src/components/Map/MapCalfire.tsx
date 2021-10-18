import React,{useEffect,useState} from "react";
import {Icon, LatLngBounds, LatLngBoundsExpression, LatLngBoundsLiteral, LatLngExpression, LatLngTuple} from "leaflet";
import {LayersControl, MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, FeatureGroup, Rectangle} from "react-leaflet";
import BurnService from "../../service/burnService";
import Fire from "../Fire";
import IFire from "../../types/fireType";

//import * as fireData from "./data/Rxfires.json";
import "./Map.css";

export const icon = new Icon({                                                            
    iconUrl: "/icon.jpg",
    iconSize: [25,25]
});
const center = [36.7783, -119.4179];
const rectangle = [
  [36.7783, -119.4179],
  [37.2783, -118.9179], 
];

//const fireData = require("Rxfires.json");

const MapCalfire = () => {

    const [fireData, setfireData] = useState<IFire[]>([]);
    const defaultPosition: LatLngExpression = [36.7783, -119.4179]; // California position

    useEffect(()=>{
      async function fetchData(){
        //default fetch all fires
        const response : any =  await BurnService.getAll();
        const fires= response.data._embedded.fires;
        setfireData(fires);

      }fetchData();
    },[]);


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
                <LayersControl>
                <LayersControl.Overlay name="Put a marker">
                    <Marker position={center as LatLngTuple}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Draw a circle">
                    <LayerGroup>
                    <Circle
                        center={center as LatLngTuple}
                        pathOptions={{ fillColor: 'blue' }}
                        radius={200}
                    />
                    <Circle
                        center={center as LatLngTuple}
                        pathOptions={{ fillColor: 'red' }}
                        radius={100}
                        stroke={false}
                    />
                    <LayerGroup>
                        <Circle
                        center={[51.51, -0.08]}
                        pathOptions={{ color: 'green', fillColor: 'green' }}
                        radius={100}
                        />
                    </LayerGroup>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Draw rectangle">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                    <Popup>Popup in FeatureGroup</Popup>
                    <Circle center={[51.51, -0.06]} radius={200} />
                    <Rectangle bounds={rectangle as LatLngBoundsLiteral} />
                    </FeatureGroup>
      </LayersControl.Overlay>
                </LayersControl>

                  {fireData.map((fire,i) =>  <Fire key={i} latLon={[fire["latitude"], fire["longitude"]]} burnArea={fire["acres"]}
                                        name={fire["name"]} date={fire["date"]}/>)} 
            </MapContainer>
        </div>
    );
};

class DropDownMenu extends L.Control{
    onAdd(map: L.Map): HTMLImageElement {
        console.log('reached in onAdd');
        let img: HTMLImageElement = L.DomUtil.create('img') as HTMLImageElement;

        img.src = './logo192.png';
        img.style.width = '200px';
        return img;
    }

    onRemove(map: L.Map) {
        // Nothing to do here
    }
};

export const putDropDownMenu = function() {
    console.log('retuening new DropDown object');
    let opts: any = { position: 'bottomleft' };
    (new DropDownMenu(opts)).addTo(L.map('root'));
}

//map = L.map('root');

//dropDownMenu({ position: 'bottomleft' }).addTo(map);
//         <Circle center={[36.7783, -119.4179]} radius={10000} fillColor="red" color="red"/>
export default MapCalfire;