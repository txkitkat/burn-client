import {CircleMarker, Popup} from "react-leaflet";
import "./Fire.css"

function Fire(props: any) {

    const fireColors = {
        baseFireColor: {
          rgb: "rgb(255, 128, 0)",
        },
    };

    let date = (props.month+1)+'/'+props.day+'/'+props.year;
    return (
      <CircleMarker
        center={props.latLon} 
        radius = {4}
        color={fireColors['baseFireColor'].rgb}
        fillColor={fireColors['baseFireColor'].rgb}>
            <Popup>
                {(props.name != '') && <h3 className="fire-popup-name"> {props.name} </h3>}
                <div className="fire-popup"> Burned On: {date} </div>
                <div className="fire-popup"> County: {props.county}</div>
                <div className="fire-popup"> Fire Size: {props.burnArea} acres</div>
            </Popup>
        </CircleMarker>
    );
}

export default Fire;