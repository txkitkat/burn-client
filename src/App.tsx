import React, {useEffect, useState} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Map from "./components/Map/Map";
import About from "./components/static/About";
import Contact from "./components/static/Contact";
import Filters from "./components/Drawer/Filters";
import StatisticsPane from "./components/StatsPane/StatisticsPane"
import IFire from "./types/fireType";
import {getAllPrescribedFires} from "./service/burnService";

function App() {
    const [fireData, setFireData] = useState<IFire[]>([]);
    const [statistics, setStatistics] = useState("");
    const [seed, setSeed] = useState(1);
    const updateWindow = () => setSeed(seed + 1);

    // Loads all non-escaped fire 12K+ records will be slow on first load/page refresh/Home button click
    useEffect(() => {
        getAllPrescribedFires()
            .then(data => setFireData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <StatisticsPane statistics={statistics}/>
                    <Map fireData={fireData} setFireData={setFireData} seed={seed}/>
                    <Filters setFireData={setFireData} setStatistics={setStatistics} updateWindow={updateWindow}/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/contact">
                    <Contact/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
