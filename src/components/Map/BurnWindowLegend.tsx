import { useEffect, useState } from "react";
import L, { Control } from "leaflet";
import "./Legend.css";

function BurnWindowLegend(props: {map: any, isOn: boolean}) {
  const [currLegend, setCurrLegend] = useState<L.Control>(); 

  //\"http://placehold.it/350x350\" //placeholder image url
  var legendUrl = `${process.env.REACT_APP_FIRE_WINDOW_BACKEND}/legend`; //For png image

  useEffect(() => {
    if (props.map) {
      const legend = new Control({ position: "topright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<img src=\"" + legendUrl +"\" width=\"100px\" height=\"457px\">";
        return div;
      };

      if(props.isOn === true){
        legend.addTo(props.map);
        setCurrLegend(legend);
      }
      else if(props.isOn === false){
        currLegend?.remove();
      }

    }
  }, [props.isOn]);
  return null;
}

export default BurnWindowLegend;
