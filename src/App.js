import React, { Component } from 'react';
import { Redirect, Link, Route, Switch } from "react-router-dom";

import Navbar from './components/Navbar';

import Home from "./components/Home/Home-Core";
import MapCore from "./components/MindMap/MapCore";

import { Provider } from 'react-redux';
import store from './store/configureStore';
import initialReduxState from './constants/initialState';

import './App.css';

//const store = configureStore(initialReduxState);

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="page-wrapper">

          <Navbar />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/map-editor' component={MapCore} />
          </Switch>

        </div>
      </Provider>
    );
  }  
}

export default App;