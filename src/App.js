import React, {ReactDOM, Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import {sendMapConfig} from './actions/sendMapConfig'
import MindMap from './components/map-wiki/mind-map';
import Navbar from './components/map-wiki/navbar';


class App extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
    
    this.state={   
      map_component: this.props.map_component
    }
  }

  //При обновлении store - обновялем this.state
  static getDerivedStateFromProps(props, state) {
    if (state.branches !== props.branches) {
      return { branches: props.branches}
    }
    return null
  }

  render(){
    return(
      <div className="map-container">
        <Navbar/>
        <div className='vis-react'>
          <MindMap map_component={this.state.map_component}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps - ', state);
  
  return {
    map_component: state.map_component
  };
};

const mapDispatchToProps = dispatch => ({
  // Sum(){
  //     dispatch(sum());
  // },
  // sendCreateBranch(elem, parentID){
  //   dispatch(createBranch(elem, parentID));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);