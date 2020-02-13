import React from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Components/Menu";
import Contents from "./Components/Contents";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Contents></Contents>
    </BrowserRouter>
  );
}

export default App;
