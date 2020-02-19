import React from "react";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import { Route } from "react-router-dom";
import "./Contents.css";
import NewsList from "./NewsList";
import Todo from "./Todo";
import Memo from "./Memo";

function App() {
  return (
    <div className="contents">
      <Route exact path="/" component={Movie}></Route>
      <Route path="/movie" component={Movie}></Route>
      <Route path="/movie-detail" component={MovieDetail}></Route>
      <Route path="/news" component={NewsList}></Route>
      <Route path="/todo" component={Todo}></Route>
      <Route path="/memo" component={Memo}></Route>
    </div>
  );
}

export default App;
