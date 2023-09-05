import {CircleMarker, Popup} from "react-leaflet";
import "./Fire.css"

function Fire(props: any) {

    const fireColors = {
        baseFireColor: {
          rgb: "rgb(0, 76, 153)",
        },
    };

    let date = (props.month+1)+'/'+props.day+'/'+props.year;
    return (
      <CircleMarker
        center={[props.latitude, props.longitude]}  
        radius = {4}
        color={fireColors['baseFireColor'].rgb}
        fillColor={fireColors['baseFireColor'].rgb}>
            <Popup>
                {(props.name != '') && <h3 className="fire-popup-name"> {props.name} </h3>}
                <div className="fire-popup"> Fire Type: {props.fireType} </div>
                <div className="fire-popup"> Burned On: {date || "N/A"} </div>
                <div className="fire-popup"> Fire Size: {props.acres || "N/A"} acres</div>
                <div className="fire-popup"> County: {props.county || "N/A"}</div>
            </Popup>
        </CircleMarker>
    );
}

export default Fire;