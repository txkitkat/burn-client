import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Map from "./components/Map/Map";
import TemporaryDrawer from "./components/Drawer/TemporaryDrawer";

function App() {
    return (
        <Router>
            <Navbar/>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/" exact component={Map}></Route>
                <Route path="/about" component={Map}></Route>
                <Route path="/contact" exact component={Map}></Route>
                <Route path="/email" exact component={Map}></Route>
                <Route path="/reach" exact component={Map}></Route>
            </Switch>
            <TemporaryDrawer/>
        </Router>
    );
}

function About() {
    return <h2>About</h2>
}

function Contact() {
    return <h2>Contact Us</h2>
}

function Home() {
    return <h2>Home</h2>
}

export default App;
