import React, {useEffect, useState} from "react";
import {LatLngExpression} from "leaflet";
import {MapContainer, TileLayer} from "react-leaflet";
import callService from "../../service/CallService";
import Fire from "../Fire";
import IFire from "../../types/fireType";
import "./Map.css";


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
                <LayersControl.Overlay checked name="Draw a circle">
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