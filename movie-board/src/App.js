import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import MovieList from './components/movielist.js';
import Header from './components/header/header.js';
import Main from './components/main/main.js';
import Movie from "./components/movie/movie.js";
import NotFound from './notfound';

class App extends Component {

  render() {
    return (

      <BrowserRouter>
<div>
  <Header />
  <Switch>
      <Route exact path='/' component={Main} />
      <Route path='/movie/:movieId' component={Movie} />
      <Route component={NotFound} />
  </ Switch>
</div>
</BrowserRouter>

    );
  }
}

export default App;
