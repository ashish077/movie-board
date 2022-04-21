import React, { Component } from 'react';
import './App.css';
import { HashRouter, BrowserRouter, Switch, Route } from "react-router-dom"

import MovieList from './components/movielist.js';
import Header from './components/header/header.js';
import Main from './components/main/main.js';
import Movie from "./components/movie/movie.js";
import NotFound from './notfound';

class App extends Component {

  render() {
    return (

      <HashRouter>
<div>
  <Header />
  <Switch>
      <Route exact path='/' component={Main} />
      <Route path='/movie/:movieId' component={Movie} />
      <Route component={NotFound} />
  </ Switch>
</div>
</HashRouter>

    );
  }
}

export default App;
