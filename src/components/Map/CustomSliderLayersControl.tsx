import { useEffect,useState } from "react";
import L, { Control } from "leaflet";

const LayerNames = [
        "Vegetation Overlay",
        "Burn Window"
    ];

const CreateCustomLayersControl = (props: {map: any, seed: number, setValue: any}) => {
    const [sliderRendered, setSliderRendered] = useState(false); // Prevent sliders from being rendered multiple times

    useEffect(() => {
        if(props.map && !sliderRendered){
            const controlInstance = new Control({ position: "topright" });
            const div = L.DomUtil.create("div");
            div.style.width = '150px';
            div.style.backgroundColor = 'white'; 
            div.style.borderRadius = '5px';  
            div.style.border = '10px solid rgba(128, 128, 128, 0.6)'; 
            div.style.borderWidth = '2px'; 
            div.style.padding = '3px 10px 0px 10px'; 

          controlInstance.onAdd = () => { 
            const layer1 = document.createElement("div");
            layer1.textContent = LayerNames[0];
            layer1.style.textAlign = "center";
            
            // use Callback function in setValue[] to change the opacity value for a layer
            const slider = createSlider({startingValue: "1", setValue: props.setValue[0]});

            div.appendChild(layer1);
            div.appendChild(slider); 
            return div;
    
            };

            //Add Burn Window Slider
            if(props.seed > 1 && !sliderRendered){
                controlInstance.onAdd = () => {
                    const burnWindowLayer = document.createElement("div");
                    burnWindowLayer.textContent = LayerNames[1];
                    burnWindowLayer.style.textAlign = "center";

                    const slider = createSlider({startingValue: "1", setValue: props.setValue[1]});
          
                    div.appendChild(burnWindowLayer);
                    div.appendChild(slider); // Append the slider to the control div
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

const createSlider = (props: {startingValue: any, setValue: any}) => {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.value = props.startingValue; 
    slider.step = "0.1";
    slider.style.width = "100%";

    const handleSliderChange = (event: Event) => {
        const newValue = (event.target as HTMLInputElement).value;
        const parsedValue = parseFloat(newValue);

        props.setValue(parsedValue); //Callback to setValue function
    };

    const handleSliderMouseDown = (event: PointerEvent) => {
        event.stopPropagation(); 
    };
    
    slider.addEventListener("input", handleSliderChange);
    slider.addEventListener("pointerdown", handleSliderMouseDown); 

    return slider;
}
