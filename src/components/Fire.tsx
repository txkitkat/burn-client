import {Circle, Popup} from "react-leaflet";


function Fire(props: any) {

    const fireColors = {
        baseFireColor: {
          rgb: "rgb(255, 128, 0)",
        },
    };

    let date = (props.month+1)+'/'+props.day+'/'+props.year;
    return (
      <Circle 
        center={props.latLon} 
        radius = {50}
        color={fireColors['baseFireColor'].rgb}
        fillColor={fireColors['baseFireColor'].rgb}>
            <Popup>
                <div>
                    Fire with name: {props.name} burned on date: {date} in County: {props.county} and was size: {props.burnArea} acres.
                </div>
            </Popup>
        </Circle>
    );
}

export default Fire;