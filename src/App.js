import React, { Component, Fragment } from 'react';

import { Redirect, Link, Route, Switch} from "react-router-dom";
import { history } from './history';

import User from './components/User/User-Core';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home-Core";
import MapCore from "./components/MindMap/MapCore";

import { connect } from 'react-redux';

import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false      
    }
  }    

  componentDidMount() {

  }
  
  render() {
    return (
        <div className="page-wrapper">

            {this.state.isAuthenticated ?

              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/auth'>
                    <Redirect to="/" component={Home} /> 
                </Route>
              </Switch>
            
            :
          
               <Switch>
                <Route path='/auth' component={User} />
                <Route path='/'>
                    <Redirect to="/auth" component={User} /> 
                </Route>
              </Switch>
              
            }
        </div>
    );
  }  
}

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, null)(App);