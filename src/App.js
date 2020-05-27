import React, { Component, Fragment } from 'react';

import { Redirect, Route, Switch} from "react-router-dom";

import User from './components/User/User-Core';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home-Core";
import EditorCore from "./components/Editor/Editor-Core";
import NotFound from "./components/404";

import { connect } from 'react-redux';
import { loadUser } from "./actions/authAction";

import './App.css';


const ProtectedRoute = ({ component: Comp, isAuthenticated, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }    

  componentDidMount() {
    // Try to load User data
    this.props.loadUser();
  }

  
  render() {
    return (
        <div className="page-wrapper">
                {this.props.isAuthenticated ? <Navbar/> : null }              
                
                <Switch>

                  <ProtectedRoute exact path='/' isAuthenticated={this.props.isAuthenticated} component={Home} />
                  <ProtectedRoute path='/map-editor' isAuthenticated={this.props.isAuthenticated} component={EditorCore} />
                  <ProtectedRoute path='/text-editor' isAuthenticated={this.props.isAuthenticated} component={EditorCore} />
                  <Route exact path='/auth' component={User} >
                    {this.props.isAuthenticated ? <Redirect to='/' /> : null }
                  </Route>      
                  <Route path='*' component={NotFound}/>           

                </Switch>  
        </div>
    );
  }  
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loadUser })(App);