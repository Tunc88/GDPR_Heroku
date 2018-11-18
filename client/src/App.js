import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Footer />
      </div>
    );
  }
}

export default App;
