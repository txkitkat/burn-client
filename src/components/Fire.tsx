import { CircleMarker, Popup } from "react-leaflet";
import { useState } from "react"; 
import "./Fire.css";

function Fire(props: any) {
    const [hovered, setHovered] = useState(false);  

    const fireColors = {
        baseFireColor: {
            rgb: "rgb(0, 76, 153)",
        },
        hoveredFireColor: {
            rgb: "rgb(255, 255, 255)",
        },
    };

    const date = props.month + 1 + "/" + props.day + "/" + props.year;

    const handleMouseOver = () => {
        setHovered(true);
    };

    const handleMouseOut = () => {
        setHovered(false);
    };

    return (
        <CircleMarker
        center={[props.latitude, props.longitude]}
        radius={4}
        pathOptions={{
            color: hovered
            ? fireColors["hoveredFireColor"].rgb //hovered color
            : fireColors["baseFireColor"].rgb, //not hovered
            fillColor: hovered
            ? fireColors["hoveredFireColor"].rgb
            : fireColors["baseFireColor"].rgb,        
        }}
        eventHandlers={{
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,    
        }}
        >
        <Popup>
            {props.name !== "" && <h3 className="fire-popup-name"> {props.name} </h3>}
            <div className="fire-popup"> Fire Type: {props.fireType} </div>
            <div className="fire-popup"> Burned On: {date || "N/A"} </div>
            <div className="fire-popup"> Fire Size: {props.acres || "N/A"} acres</div>
            <div className="fire-popup"> County: {props.county || "N/A"}</div>
        </Popup>
        </CircleMarker>
    );
}

export default Fire;
