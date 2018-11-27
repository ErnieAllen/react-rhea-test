import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RheaTest from "./components/rheaTest";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Send a message to a router.</p>
          <RheaTest />
        </header>
      </div>
    );
  }
}

export default App;
