import { LayersControl, ImageOverlay } from "react-leaflet";
import CountyBorders from "../CountyBorders"
import vegetationImage from "../../data/WHR13_vegetation.png"
import vegetationLegend from "../../data/WHR13_vegetation_legend.png"

export default function MapLayerPickerControl(props: {seed: number}) {
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
            {(props.seed > 1) ? (
            <LayersControl.Overlay name="Burn Window">
                <ImageOverlay url={`${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/image`} bounds={[[42.005413, -124.504903], [32.529048, -114.116167]]} opacity={0.4} />
            </LayersControl.Overlay>
            ) : (<></>)}
        </LayersControl>
    );
}
