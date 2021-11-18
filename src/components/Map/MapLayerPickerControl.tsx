import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";
import { LayersControl, Marker, Popup, LayerGroup, Circle, FeatureGroup, Rectangle, ImageOverlay } from "react-leaflet";
import CountyBorders from "../CountyBorders"
import vegetationImage from "../../data/WHR13_vegetation.png"
import vegetationLegend from "../../data/WHR13_vegetation_legend.png"

const center = [36.7783, -119.4179];
const rectangle = [
    [36.7783, -119.4179],
    [37.2783, -118.9179],
];

export default function MapLayerPickerControl() {
    // @ts-ignore
    return (
        <LayersControl>
            <LayersControl.Overlay name="County Borders">
                <CountyBorders />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Vegetation Overlay">
                <ImageOverlay url={vegetationImage} bounds={[[42.160435, -124.814949], [32.566587, -113.922004]]} opacity={0.75} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Vegetation Legend">
                <ImageOverlay url={vegetationLegend} bounds={[[43.07287, -130.92884], [38.669518, -127.03968]]} opacity={1} />
            </LayersControl.Overlay>
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
    );
}
