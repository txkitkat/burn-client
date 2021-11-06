import React, {useEffect, useState} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Map from "./components/Map/Map";
import Filters from "./components/Drawer/Filters";
import IFire from "./types/fireType";
import {getAllFires, getFiresByRangeOfAcres} from "./service/burnService";

function App() {
    const [fireData, setFireData] = useState<IFire[]>([]);

    // todo this could get all fires instead but doing this for performance. Will be an issue.
    useEffect(() => {
        getAllFires()
            .then(data => setFireData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <Map fireData={fireData} setFireData={setFireData}/>
                </Route>
                <Route path="/about">
                    <Map fireData={fireData} setFireData={setFireData}/>
                </Route>
                <Route path="/contact">
                    <Map fireData={fireData} setFireData={setFireData}/>
                </Route>
                <Route path="/email">
                    <Map fireData={fireData} setFireData={setFireData}/>
                </Route>
                <Route path="/reach">
                    <Map fireData={fireData} setFireData={setFireData}/>
                </Route>
            </Switch>
            <Filters setFireData={setFireData}/>
        </Router>
    );
}

export default App;
