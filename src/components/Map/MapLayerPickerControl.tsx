import { LayersControl, ImageOverlay, LayerGroup } from "react-leaflet";
import CountyBorders from "../CountyBorders"
import vegetationImage from "../../data/WHR13_vegetation.png"
import IFire from "../../types/fireType";
import Fire from "../Fire";
import { useState } from "react";
import BurnWindowLegend from "./BurnWindowLegend";
import VegetationLegend from "./VegetationLegend";

export default function MapLayerPickerControl(props: {seed: number, value: number, fireData: IFire[], map: any}) {
    const [vegetationTypeLegend, setVegetationTypeLegend] = useState(false);
    const [burnWindowLegend, setBurnWindowLegend] = useState(false);

    // @ts-ignore
    return (
        <LayersControl>
            <LayersControl.Overlay name="Fires">
                <LayerGroup>
                    {props.fireData.map((fire, i) => <Fire key={i} latLon={[fire["latitude"], fire["longitude"]]}
                                                           burnArea={fire["acres"]}
                                                           name={fire["name"]} day={fire["day"]} month={fire["month"]} year={fire["year"]} county={fire["county"]} />)}

                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="County Borders">
                <CountyBorders />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Vegetation Overlay">
                <LayerGroup eventHandlers={{
                        add: (e) => {setVegetationTypeLegend(true);},
                        remove: (e) => {setVegetationTypeLegend(false);},
                    }}>
                    <ImageOverlay url={vegetationImage} bounds={[[42.040435, -125.354949], [32.506587, -114.352004]]} opacity={props.value} />
                    <VegetationLegend map = {props.map} isOn = {vegetationTypeLegend}/>
                </LayerGroup>
            </LayersControl.Overlay>
            {(props.seed > 1) ? (
            <LayersControl.Overlay name="Burn Window">
                <LayerGroup eventHandlers={{
                        add: (e) => {setBurnWindowLegend(true);},
                        remove: (e) => {setBurnWindowLegend(false);},
                    }}>
                    {/*Image bounds below work for svg image created by burn-window*/}
                    <ImageOverlay url={`${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/image`} bounds={[[43.40287, -127.624903], [31.029048, -111.356167]]} opacity={props.value}/>
                    {/*Image bounds below work for png image created by burn-window*/}
                    {/*<ImageOverlay url={`${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/image`} bounds={[[42.00287, -124.524903], [32.499048, -114.106167]]} opacity={props.value}/>*/}
                    {/*<ImageOverlay url={`${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/legend`} bounds={[[38.07287, -131.52884], [32.669518, -125.03968]]} opacity={props.value}/>*/}
                    <BurnWindowLegend map = {props.map} isOn = {burnWindowLegend}/>
                </LayerGroup>
            </LayersControl.Overlay>
            ) : 
            (<BurnWindowLegend map = {props.map} isOn = {false}/>)}
        </LayersControl>
    );
}
