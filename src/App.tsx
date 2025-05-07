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
import PredictionBox from "./components/PredictionBox";
import { getModelPrediction, IPrediction } from "./service/mlService";
import SelectLocationPromptBox from "./components/SelectLocationPromptBox";
import FeaturesDisplay from "./components/FeaturesDisplay";
import IFeatureType from "./types/featureType";
import ExitModelButton from "./components/ExitModelButton";

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
    const [predictionAcreage, setPredictionAcreage] = useState<number | null>(null);
    const [predictionConfidence, setPredictionConfidence] = useState<number | null>(null);
    const [predictionFeatures, setPredictionFeatures] = useState<IFeatureType | undefined>(undefined);

    // Loads all non-escaped fire 12K+ records will be slow on first load/page refresh/Home button click
    useEffect(() => {
        getAllPrescribedFires()
            .then(data => setFireData(data))
            .catch(err => console.error(err));
    }, []);

    const handleStartModel = () => {
        setModelStage(ModelStage.SelectingLocation);
    }

    const handleExitModel = () => {
        setModelStage(ModelStage.Standby);
    }

    const handleSelectLocation = (latitude: number, longitude: number) => {
        setModelLocationLatitude(latitude);
        setModelLocationLongitude(longitude);
        setModelStage(ModelStage.SelectingDate);
    }
 
    const handleSelectDate = async (date: Date) => {
        setModelDate(date);
        setModelStage(ModelStage.Loading);
        await getModelPrediction(modelLocationLatitude!, modelLocationLongitude!, date, true).then((prediction: IPrediction) => {
            setPredictionAcreage(prediction.acreage);
            setPredictionConfidence(prediction.confidence);
            setPredictionFeatures(prediction.features!);
            setModelStage(ModelStage.Result); // Display result
        });
    }

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <span className="model-container">
                        {modelStage === ModelStage.SelectingLocation && <SelectLocationPromptBox />}
                        {modelStage === ModelStage.Result && <PredictionBox confidence={predictionConfidence!} predicted_reach={predictionAcreage!} />}
                        {modelStage === ModelStage.Result && <FeaturesDisplay features={predictionFeatures}/>}
                        <span>
                            <ModelButton startModel={handleStartModel} currentStage={modelStage} />
                            {modelStage !== ModelStage.Standby && <ExitModelButton onExit={handleExitModel}/>}
                        </span>
                    </span>
                    <StatisticsPane statistics={statistics} counties={counties}/>
                    <Map fireData={fireData} setFireData={setFireData} seed={seed} counties={counties} countyRefresh={countyRefresh} modelStage={modelStage} handleSelectLocation={handleSelectLocation}/>
                    <Filters setFireData={setFireData} setStatistics={setStatistics} setCountyRefresh={setCountyRefresh}
                      updateBurnWindow={updateBurnWindow} resetBurnWindow={resetBurnWindow} setCounties={setCounties}/>
                    {modelStage === ModelStage.SelectingDate && <DateEntry selectDate={handleSelectDate} /> /* Keeping this one separate for its screen-spanning */}
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
