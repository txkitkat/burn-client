import { GeoJSON } from 'react-leaflet'
import borderData from "../data/California_County_Boundaries.json"


function CountyBorders() {

    const countyBorders: any = borderData;
   // console.log(countyBorders)

    const onEachCounty = (county: any, layer: any) => {
        layer.bindPopup(county.properties.COUNTY_NAME)
    };

    return (
        <GeoJSON data={countyBorders.features} onEachFeature={onEachCounty} pathOptions={{ fillOpacity: 0, color: 'black', weight: 0.75 }} />
    );

}

export default CountyBorders;