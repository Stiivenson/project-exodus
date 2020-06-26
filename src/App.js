import React, { Component } from 'react';

import { Redirect, Route, Switch} from "react-router-dom";

import Auth from './components/Auth/Auth-Core';
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home-Core";
import Editor from "./components/Editor/Editor-Core";
import NotFound from "./components/404";

import { connect } from 'react-redux';
import { loadUser } from "./actions/authAction";


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
                  <ProtectedRoute path='/map-editor' isAuthenticated={this.props.isAuthenticated} component={Editor} />
                  <ProtectedRoute path='/text-editor' isAuthenticated={this.props.isAuthenticated} component={Editor} />
                  <Route exact path='/auth' component={Auth} >
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