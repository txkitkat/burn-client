import React from "react";
import "./App.css";

import Map from "./components/Map/Map";
import putDropDownMenu from "./components/Map/Map"

function App() {
    return (
        <main>
         <Map method={"all"} params={[]} />  
        </main>
    );
}

export default App;
