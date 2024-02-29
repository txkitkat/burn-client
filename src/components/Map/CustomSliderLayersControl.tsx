import {useEffect, useState} from "react";
import L, {Control} from "leaflet";

const LayerNames = [
    "Vegetation Overlay",
    "Burn Window",
    "Average Temperature",
    "Maximum Temperature",
    "Minimum Humidity"
];

const CreateCustomLayersControl = (props: { map: any, seed: number, setValue: any }) => {
    const [sliderRendered, setSliderRendered] = useState(false); // Prevent sliders from being rendered multiple times

    useEffect(() => {
        if (props.map !== undefined && props.seed !== undefined && !sliderRendered) {
            const controlInstance = new Control({position: "topright"});
            const div = L.DomUtil.create("div");
            div.style.width = '150px';
            div.style.backgroundColor = 'white';
            div.style.borderRadius = '5px';
            div.style.border = '10px solid rgba(128, 128, 128, 0.5)';
            div.style.borderWidth = '2px';
            div.style.padding = '3px 10px 0px 10px';

            controlInstance.onAdd = () => {
                const layer1 = document.createElement("div");
                layer1.textContent = LayerNames[0];
                layer1.style.textAlign = "center";

                // use Callback function in setValue[] to change the opacity value for a layer
                const slider = createSlider({map: props.map, startingValue: "1", setValue: props.setValue[0]});

                div.appendChild(layer1);
                div.appendChild(slider);
                return div;
            };

            //Add Burn Window Slider, Average Temperature Slider, Max Temperature Slider, Min Humidity Slider
            if (props.seed > 1 && !sliderRendered) {
                controlInstance.onAdd = () => {
                    //Burn Window
                    const burnWindowLayerDiv = document.createElement("div");
                    burnWindowLayerDiv.textContent = LayerNames[1];
                    burnWindowLayerDiv.style.textAlign = "center";

                    const burnSlider = createSlider({map: props.map, startingValue: "1", setValue: props.setValue[1]});

                    div.appendChild(burnWindowLayerDiv);
                    div.appendChild(burnSlider); // Append the slider to the control div

                    // Average Temperature
                    const avgTempLayerDiv = document.createElement("div");
                    avgTempLayerDiv.textContent = LayerNames[2];
                    avgTempLayerDiv.style.textAlign = "center";

                    const avgTemperatureSlider = createSlider({
                        map: props.map,
                        startingValue: "1",
                        setValue: props.setValue[2]
                    });

                    div.appendChild(avgTempLayerDiv);
                    div.appendChild(avgTemperatureSlider); 

                    // Maximum Temperature
                    const maxTempLayerDiv = document.createElement("div");
                    maxTempLayerDiv.textContent = LayerNames[3];
                    maxTempLayerDiv.style.textAlign = "center";

                    const maxTemperatureSlider = createSlider({
                        map: props.map,
                        startingValue: "1",
                        setValue: props.setValue[3]
                    });

                    div.appendChild(maxTempLayerDiv);
                    div.appendChild(maxTemperatureSlider); 

                    // Minimum Humidity
                    const minHumidityLayerDiv = document.createElement("div");
                    minHumidityLayerDiv.textContent = LayerNames[4];
                    minHumidityLayerDiv.style.textAlign = "center";

                    const minHumiditySlider = createSlider({
                        map: props.map,
                        startingValue: "1",
                        setValue: props.setValue[4]
                    });

                    div.appendChild(minHumidityLayerDiv);
                    div.appendChild(minHumiditySlider); 
                    
                    return div;
                };

                setSliderRendered(true);
            }

            controlInstance.addTo(props.map);
        }
    }, [props.map, props.seed, sliderRendered]);
    return null;
};

export default CreateCustomLayersControl;

const createSlider = (props: { map: any, startingValue: any, setValue: any }) => {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.value = props.startingValue || "1";
    slider.step = "0.1";
    slider.style.width = "100%";

    let isDragging = false;

    const handleSliderChange = (e: Event) => {
        if (!isDragging) return;

        const newValue = (e.target as HTMLInputElement).value;
        const parsedValue = parseFloat(newValue);

        props.setValue(parsedValue); //Callback to setValue function
    };

    const handleSliderMouseDown = (e: PointerEvent) => {
        e.stopPropagation();
        props.map.dragging.disable(); // Disable map dragging
        isDragging = true;
    };

    const handleSliderMouseUp = () => {
        props.map.dragging.enable(); // Enable map dragging
        isDragging = false;
    };

    slider.addEventListener("input", handleSliderChange);
    slider.addEventListener("pointerdown", handleSliderMouseDown);
    slider.addEventListener("pointerup", handleSliderMouseUp);
    return slider;
}
