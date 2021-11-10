import {Circle, Popup} from "react-leaflet";

function Fire(props: any) {
    let date = (props.month+1)+'/'+props.day+'/'+props.year;
    return (
      //  <Circle center={props.latLon} radius={props.burnArea} > check if sponsors prefer the dots
      <Circle center={props.latLon}>
            <Popup>
                <div>
                    Fire with name: {props.name} burned on date: {date} in County: {props.county} and was size: {props.burnArea} acres.
                </div>
            </Popup>
        </Circle>
    );
}

export default Fire;