import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from "./components/Navbar";
import Map from "./components/Map/Map";
import MapCalfire from "./components/Map/MapCalfire";


function App() {
    return (
<<<<<<< HEAD
        <main>
<<<<<<< HEAD
         <Map method={"all"} params={[]} />  
=======
            <Map/>
>>>>>>> e619722 (added Layer picker overlay)
        </main>
=======
        <Router>
            <Navbar/>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/" exact component={Map}></Route>
                <Route path="/about" component={Map}></Route>
                <Route path="/contact" exact component={Map}></Route>
                <Route path="/calfire" exact component={MapCalfire}></Route>
                <Route path="/pfirs" exact component={Map}></Route>
                <Route path="/mtbs" exact component={Map}></Route>
            </Switch>
        </Router>
>>>>>>> f814fff (Added Navbar with Filtering Links)
    );
}
/*
            <main>
                <Map/>
            </main>

            */
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
