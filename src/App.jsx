import logo from './logo.svg';
import './App.css';
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./component/home/home";
import { MovieDetail } from "./component/moviedetail/MovieDetail";

export function App() {
  return (
  <main>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/movie/:id" component={MovieDetail} />
    </Switch>
  </main>
  );
}

export default App;
