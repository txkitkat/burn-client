import { LayersControl, ImageOverlay, LayerGroup } from "react-leaflet";
import CountyBorders from "../CountyBorders"
import vegetationImage from "../../data/WHR13_vegetation.png"
import vegetationLegend from "../../data/WHR13_vegetation_legend.png"

export default function MapLayerPickerControl(props: {seed: number, value: number}) {
    // @ts-ignore
    return (
        <LayersControl>
            <LayersControl.Overlay name="County Borders">
                <CountyBorders />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Vegetation Overlay">
                <LayerGroup>
                    <ImageOverlay url={vegetationImage} bounds={[[42.160435, -124.814949], [32.566587, -113.922004]]} opacity={props.value} />
                    <ImageOverlay url={vegetationLegend} bounds={[[43.07287, -130.92884], [38.669518, -127.03968]]} opacity={props.value} />
                </LayerGroup>
            </LayersControl.Overlay>
            {(props.seed > 1) ? (
            <LayersControl.Overlay name="Burn Window">
                <LayerGroup>
                    <ImageOverlay url={`${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/image`} bounds={[[42.005413, -124.504903], [32.529048, -114.116167]]} opacity={props.value}/>
                    <ImageOverlay url={`${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/legend`} bounds={[[43.07287, -130.92884], [38.669518, -127.03968]]} opacity={props.value} />
                </LayerGroup>
            </LayersControl.Overlay>
            ) : (<></>)}
        </LayersControl>
    );
}
