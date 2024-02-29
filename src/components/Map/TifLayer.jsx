import proj4 from "proj4";
import { useEffect, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

window.proj4 = proj4;

const TifLayer = ({ url }) => {
    const map = useMap();
    const geoTiffLayerRef = useRef();
    const context = useLeafletContext();

    useEffect(() => {
        const container = context.layerContainer || context.map;
        
        fetch(url, { mode: "no-cors" })
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
            parseGeoraster(arrayBuffer).then((georaster) => {
                const options = {
                    resolution: 256,
                    opacity: 1
                }
                options.georaster = georaster;
                geoTiffLayerRef.current = new GeoRasterLayer(options);
                container.addLayer(geoTiffLayerRef.current);
                console.log(geoTiffLayerRef.current)
            })
        })
        return () => {};
    }, [context, map]);
    
    return null;
};

export default TifLayer;