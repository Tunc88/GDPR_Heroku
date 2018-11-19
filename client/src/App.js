import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import Footer from "./components/Footer";
import Description from "./components/Description";
import Overview from "./components/Overview";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Overview />
        {//<Description />
        }
        <Footer />
      </div>
    );
  }
}

export default App;
