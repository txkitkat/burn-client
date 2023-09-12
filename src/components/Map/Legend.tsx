import {useEffect, useState} from "react";
import L, {Control} from "leaflet";
import "./Legend.css";

interface LegendProps {
    map: any,
    isOn: boolean,
    colors: string[],
    labels: string[],
    legendTitle: string,
    multiColor?: string[][],
    multiColorLabels?: string[]
}

function Legend(props: LegendProps) {
    const [currLegend, setCurrLegend] = useState<L.Control>();

    useEffect(() => {
        if (props.map) {
            const legend = new Control({position: "bottomleft"});

            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "info custom-legend");

                const title = document.createElement("div");
                title.className = "legend-title";
                title.innerHTML = props.legendTitle;
                div.appendChild(title);

                for (let i = 0; i < props.colors.length; i++) {
                    const entryContainer = document.createElement("div");
                    entryContainer.className = "legend-entry";

                    const colorBox = document.createElement("div");
                    colorBox.style.backgroundColor = props.colors[i];
                    colorBox.className = "color-box";

                    const label = document.createElement("span");
                    label.innerHTML = props.labels[i];

                    entryContainer.appendChild(colorBox);
                    entryContainer.appendChild(label);

                    div.appendChild(entryContainer);
                }

                if (typeof props.multiColor !== 'undefined' && typeof props.multiColorLabels !== 'undefined') {

                    for (let i = 0; i < props.multiColor.length; i++) {
                        const entryContainer = document.createElement("div");
                        entryContainer.className = "legend-entry";

                        const colorBox = document.createElement("div");
                        colorBox.style.background = `linear-gradient(to right, ${props.multiColor[i][0]}, ${props.multiColor[i][1]})`;
                        colorBox.className = "color-box-gradient";

                        const label = document.createElement("span");
                        label.innerHTML = props.multiColorLabels[i];

                        entryContainer.appendChild(colorBox);
                        entryContainer.appendChild(label);

                        div.appendChild(entryContainer);
                    }
                }

                div.addEventListener("wheel", (e) => handleMouseScrollOnLegend(e, div));

                return div;
            };

            if (props.isOn === true) {
                legend.addTo(props.map);
                setCurrLegend(legend);
            } else if (props.isOn === false) {
                currLegend?.remove();
            }

        }
    }, [props.isOn]);
    return null;
}

const handleMouseScrollOnLegend = (e: Event, legend: HTMLElement) => {
    e.stopPropagation();
    if (legend) {
        if (e instanceof WheelEvent) {
            const deltaY = (e as WheelEvent).deltaY;
            const scrollSpeed = deltaY > 0 ? 100 : -100;
            legend.scrollTo({
                top: legend.scrollTop + scrollSpeed,
                behavior: 'smooth'
            });

            e.preventDefault();
        }
    }

};

export default Legend;