import { useEffect } from "react";
import L, { Control } from "leaflet";
import "./Legend.css";

var prevLegend: L.Control;
 
var multiColor = [["#FFFFFF", "#800080"]];
var multiColorLabels = ["0% - 100%"];

function CountyLegend(props: {map: any, isOn: boolean}) {

//\"http://placehold.it/350x350\" //placeholder image url

  useEffect(() => {
    if (props.map) {
      const legend = new Control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info custom-legend");

        const title = document.createElement("div");
        title.className = "legend-title";
        title.innerHTML = "Burn Window Percentage";
        div.appendChild(title);

        const entryContainer = document.createElement("div");
        entryContainer.className = "legend-entry";

        for (let i = 0; i < multiColor.length; i++) {
            const entryContainer = document.createElement("div");
            entryContainer.className = "legend-entry";

            const colorBox = document.createElement("div");
            colorBox.style.background = `linear-gradient(to right, ${multiColor[i][0]}, ${multiColor[i][1]})`;
            colorBox.className = "color-box-gradient";

            const label = document.createElement("span");
            label.innerHTML = multiColorLabels[i];

            entryContainer.appendChild(colorBox);
            entryContainer.appendChild(label);

            div.appendChild(entryContainer);
        }
 
        return div;
    };

        if(props.isOn === true){
            legend.addTo(props.map);
            prevLegend = legend; //use global variable to delete the current legend
        }
        else if(props.isOn === false){
            if(prevLegend != null)
            prevLegend.remove();
        }

    }
    }, [props.isOn]);
  return null;
}

export default CountyLegend;
