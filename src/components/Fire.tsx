import {Circle, Popup} from "react-leaflet";

function Fire(props: any) {
    let date = props.date.substring(0, props.date.indexOf("T"));
    const fillRed = { color: 'red' }
    return (
        <Circle center={props.latLon} radius={props.burnArea} pathOptions={fillRed}>
            <Popup>
                <div>
                    Fire with name: {props.name} burned on date: {date} and was size: {props.burnArea} acres.
                </div>
            </Popup>
        </Circle>
    );
}

export default Fire;