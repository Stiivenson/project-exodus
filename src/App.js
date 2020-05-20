import React, { Component, Fragment } from 'react';

import { Redirect, Link, Route, Switch} from "react-router-dom";
import { history } from './history';

import User from './components/User/User-Core';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home-Core";
import MapCore from "./components/MindMap/MapCore";

import { connect } from 'react-redux';
import { loadUser } from "./actions/authAction";

import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {     
    }
  }    

  componentDidMount() {
    this.props.loadUser();
  }
  
  render() {
    return (
        <div className="page-wrapper">
            
            {this.props.isAuthenticated ?
              
              <Fragment>
                <Navbar/>

                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/auth'>
                      <Redirect to="/" component={Home} /> 
                  </Route>
                </Switch>
              </Fragment>
              
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loadUser })(App);