<<<<<<< HEAD
import React, {useEffect, useState} from "react";
import {LatLngExpression} from "leaflet";
import {MapContainer, TileLayer} from "react-leaflet";
import callService from "../../service/CallService";
import Fire from "../Fire";
import IFire from "../../types/fireType";
import "./Map.css";

=======
import React,{useEffect,useState} from "react";
import {Icon, LatLngExpression} from "leaflet";
import { MapContainer, TileLayer, useMap, useMapEvents} from "react-leaflet";
import BurnService from "../../service/burnService";
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

const Map = () => {
>>>>>>> 0c92b8e (Added Drawer on the right)

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

<<<<<<< HEAD
    useEffect(() => {
        fetchData();
    }, []);
=======
    useEffect(()=>{
      async function fetchData(){
        //default fetch all fires
        const response : any =  await BurnService.getAll();
        const fires= response.data._embedded.fires;
        setfireData(fires);

      }fetchData();
    },[]);
    

>>>>>>> 0c92b8e (Added Drawer on the right)

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
<<<<<<< HEAD
<<<<<<< HEAD

                {fireData.map((fire, i) => <Fire key={i} latLon={[fire["latitude"], fire["longitude"]]}
                                                 burnArea={fire["acres"]}
                                                 name={fire["name"]} date={fire["date"]}/>)}

=======
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
>>>>>>> f814fff (Added Navbar with Filtering Links)
=======
                <MapLayerPickerControl/>
                <MyComponent/> 
                {
                  fireData.map((fire: IFire,i: number) =>  <Fire key={i} latLon={[fire["latitude"], fire["longitude"]]} burnArea={fire["acres"]}
                                        name={fire["name"]} date={fire["date"]}/>)}  
>>>>>>> 0c92b8e (Added Drawer on the right)
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

export default Map;