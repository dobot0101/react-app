import React from "react";
import Home from "./Home";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import { Route } from "react-router-dom";
import "./Contents.css";
import NewsList from "./NewsList";
import Todo from "./Todo";

function App() {
  return (
    <div className="contents">
      <Route exact path="/" component={Home}></Route>
      <Route path="/movie" component={Movie}></Route>
      <Route path="/movie-detail" component={MovieDetail}></Route>
      <Route path="/news" component={NewsList}></Route>
      <Route path="/todo" component={Todo}></Route>
    </div>
  );
}

export default App;
