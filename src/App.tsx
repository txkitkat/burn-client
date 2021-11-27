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

    // todo this could get all fires instead but doing this for performance. Will be an issue.
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
                    <Map fireData={fireData} setFireData={setFireData}/>
                    <Filters setFireData={setFireData} setStatistics={setStatistics}/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/contact">
                    <Contact/>
                </Route>
                <Route path="/email">
                    <Contact/>
                </Route>
                <Route path="/reach">
                    <Contact/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
