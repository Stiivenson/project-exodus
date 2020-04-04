import React, {ReactDOM, Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

import {sendMapConfig} from './actions/sendMapConfig'
import MindMap from './components/map/mindMap';


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

  //Создаем новый узел на карте
  createBranch = (elem, parentID) => {   
    this.props.sendCreateBranch(elem, parentID);   
  }

  //Дети реагируют на изменение позиции родителя
  dragChange = (deltaPosition, childIDs) => {
    let nextState = this.state.branches;
    childIDs.forEach(id => {
      nextState.map(item => {               
        if(item.id === id){
            item.position.x = item.position.x + deltaPosition.deltaX;
            item.position.y = item.position.y + deltaPosition.deltaY;
            return;
        }
      }); 
    });
    this.setState(() => ({
      branches: nextState
    }));
  }

  onHover = (e) => {
    console.log(e.target);
    const parent = e.target.parentNode.getBoundingClientRect();
    const element = e.target.getBoundingClientRect();
    let newxy = {
      x: element.left - parent.left, 
      y: element.top - parent.top};

      let nextState = this.state.dots;
      nextState.push(newxy);
    this.setState(() => ({
      dots:nextState
    }));
  }

  render(){
    return(
      <div className="App">
        <div className='vis-react'>
          <MindMap map_component={this.state.map_component}/>
        </div>
      </div>
    );
  }
}

function Grid(props) {
  const { show, size } = props.grid
  
  let grid = []
  
  for (let i = 1 ; i < (props.w / size) ; i++) {
      grid.push(
          <line
              x1={ i * size }
              y1={ 0 }
              x2={ i * size }
              y2={ props.h } />
      )
  }

  for (let i = 1 ; i < (props.h / size) ; i++) {
      grid.push(
          <line
              x1={ 0 }
              y1={ i * size }
              x2={ props.w }
              y2={ i * size } />
      )
  }

  return (
      <g className={
          "ad-Grid" +
          ( ! show ? "  is-hidden" : "")
      }>
          { grid }
      </g>
  )
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