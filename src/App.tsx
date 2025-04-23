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
import { ModelStage } from "./enums/modelStage";
import DateEntry from "./components/DateEntry";
import ModelButton from "./components/ModelButton";

function PredictionBox (props: {confidence: number, predicted_reach: number}) {
    return (
    <div className="dialogue_box"> 
        <strong style={{fontSize: "18px"}}>Escaped Fire Prediction</strong> 
        <p><strong>Model confidence</strong>: {props.confidence*100}%</p>
        <p><strong>Estimated reach:</strong> {props.predicted_reach} acres</p>
    </div>
    )
}

function App() {
    const [fireData, setFireData] = useState<IFire[]>([]);
    const [statistics, setStatistics] = useState("");
    const [seed, setSeed] = useState(1);
    const updateBurnWindow = () => setSeed(seed + 1);
    const resetBurnWindow = () => setSeed(1);
    const [counties, setCounties] = useState<string[]>([]);
    const [countyRefresh, setCountyRefresh] = useState(1);
    const [modelStage, setModelStage] = useState(ModelStage.Standby);
    const [modelLocationLatitude, setModelLocationLatitude] = useState<number | null>(null);
    const [modelLocationLongitude, setModelLocationLongitude] = useState<number | null>(null);
    const [modelDate, setModelDate] = useState<Date | null>(null);


    // Loads all non-escaped fire 12K+ records will be slow on first load/page refresh/Home button click
    useEffect(() => {
        getAllPrescribedFires()
            .then(data => setFireData(data))
            .catch(err => console.error(err));
    }, []);

    const handleStartModel = () => {
        setModelStage(ModelStage.SelectingLocation);
    }

    const handleSelectLocation = (latitude: number, longitude: number) => {
        setModelLocationLatitude(latitude);
        setModelLocationLongitude(longitude);
        setModelStage(ModelStage.SelectingDate);

        // Handling presenting the date
    }
 
    const handleSelectDate = (date: Date) => {
        setModelDate(date);
        setModelStage(ModelStage.Result);
        // API call to model
        console.log("Done!");
    }

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <ModelButton
                        startModel={handleStartModel}
                    />
                    <StatisticsPane statistics={statistics} counties={counties}/>
                    <Map fireData={fireData} setFireData={setFireData} seed={seed} counties={counties} countyRefresh={countyRefresh} modelStage={modelStage} handleSelectLocation={handleSelectLocation}/>
                    <Filters setFireData={setFireData} setStatistics={setStatistics} setCountyRefresh={setCountyRefresh}
                      updateBurnWindow={updateBurnWindow} resetBurnWindow={resetBurnWindow} setCounties={setCounties}/>
                    {modelStage === ModelStage.SelectingDate && <DateEntry selectDate={handleSelectDate} />}
                    {modelStage === ModelStage.Result && <PredictionBox confidence={.55} predicted_reach={65} />}
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
