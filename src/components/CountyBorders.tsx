import {GeoJSON, LayerGroup} from "react-leaflet";
import borderData from "../data/California_County_Boundaries.json";
import Legend from "./Map/Legend";
import {useState} from "react";
import CountyLegend from "./Map/CountyLegend";

function CountyBorders(props: { counties: string[]; countyRefresh: number, map: any }) {
    const countyBorders: any = borderData;

    let map = new Map<string, string>();
    props.counties.forEach((s: string) => {
        const ls = s.split(/\s{2,}/);
        map.set(ls[0], ls[1]);
    });

    function gradient(left: string, right: string, x: number) {
        let r = byteLinear(left[1] + left[2], right[1] + right[2], x);
        let g = byteLinear(left[3] + left[4], right[3] + right[4], x);
        let b = byteLinear(left[5] + left[6], right[5] + right[6], x);
        return "#" + r + g + b;
    }

    // left, right are hex values from 00 to FF, x is real number in range 0 to 1
    function byteLinear(left: string, right: string, x: number): string {
        // @ts-ignore
        const y: number = (("0x" + left) * (1 - x) + ("0x" + right) * x) | 0;
        return y.toString(16).padStart(2, "0");
    }

    function style(county: any) {
        const percent = map.get(county.properties.COUNTY_NAME);
        if (percent !== undefined) {
            return {
                fillColor: gradient("#FFFFFF", "#800080", parseFloat(percent) / 100.0),
                fillOpacity: 0.5,
            };
        }
        return {
            fillColor: "#FFFFFF",
            fillOpacity: 0.5,
        };
    }

    const onEachCounty = (county: any, layer: any) => {
        const countyName = county.properties.COUNTY_NAME;
        if (map.get(countyName) === undefined) {
            layer.bindPopup(countyName);
        } else {
            layer.bindPopup(countyName + ' ' + map.get(countyName));
        }
    };

    const [legend, setLegend] = useState(false);

    return (
        <>
            {props.countyRefresh > 0 ? (
                <LayerGroup eventHandlers={{
                    add: (e) => setLegend(true),
                    remove: (e) => setLegend(false),
                }}>
                    <GeoJSON
                        data={countyBorders.features}
                        onEachFeature={onEachCounty}
                        pathOptions={{color: "black", weight: 0.75}}
                        style={style}
                    />
                    <CountyLegend map = {props.map} isOn = {legend}/>
                </LayerGroup>
            ) : (
                <CountyLegend map = {props.map} isOn = {false}/>
            )}
        </>
    );
}

export default CountyBorders;
