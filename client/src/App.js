import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import Footer from "./components/Footer";
import Description from "./components/Description";
import Overview from "./components/Overview";
import Search from "./components/layout/Search";
import Register from "./components/layout/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar />
          <Route exact path="/" component={Description} />
          {/* <Route exact path="/register" component={Register} /> */}
          <Route exact path="/overview" component={Overview} />
          <Route exact path="/search" component={Search} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
