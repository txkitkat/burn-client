import { useEffect } from "react";
import L, { Control } from "leaflet";
import "./Legend.css";
import vegetationLegend from "../../data/WHR13_vegetation_legend.png"

var prevLegend: L.Control;

function VegetationLegend(props: {map: any, isOn: boolean}) {

  useEffect(() => {
    if (props.map) {
      const legend = new Control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<img src='"+vegetationLegend+"' width=\"175px\" height=\"250px\">";
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

export default VegetationLegend;
