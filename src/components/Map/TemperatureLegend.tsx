import { useEffect } from "react";
import L, { Control } from "leaflet";
import "./Legend.css";

var prevLegend: L.Control;

function TemperatureLegend(props: {map: any, isOn: boolean}) {

//\"http://placehold.it/350x350\" //placeholder image url
var legendUrl = `${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/temperature_legend`; //For png image

  useEffect(() => {
    if (props.map) {
      const legend = new Control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<img src=\"" + legendUrl +"\" width=\"100px\" height=\"457px\">";
        return div;
      };

      if(props.isOn == true){
        legend.addTo(props.map);
        prevLegend = legend; //use global variable to get the current legend for deletion
      }
      else if(props.isOn == false){
        if(prevLegend != null)
        prevLegend.remove();
      }

    }
  }, [props.isOn]);
  return null;
}

export default TemperatureLegend;
