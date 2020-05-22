import React, {ReactDOM, Component } from 'react';
import PropTypes from 'prop-types';

import MapEditor from './MapEditor';
import DndDocTree from '../DndDocTree';

import { connect } from "react-redux";
import { loadMapData } from '../../actions/mapAction';
import { sendNodeDataToTree } from "../../actions/dnd-doc-tree-component";

import io from "socket.io-client";
let socket;

class MapCore extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    socket = io.connect("http://localhost:5000", {query: {token: this.props.token}});
    console.log(socket); 
    console.log('componentDidMount');
    
    if(this.props.mapIsEmpty){
      socket.emit('CLIENT:GET_MAP_DATA', this.props.map.id);
      socket.on('SERVER:SEND_MAP_DATA', data => {
        this.props.loadMapData(data);  
      });
    }    
  }

  componentWillUnmount() {
    socket.disconnect();
  }


  // recieveCreatedNode = (data) => {
  //   this.props.sendCreatedNode(data);
  // }

  // recieveNodeForTree = (id) => {
  //   this.props.sendNodeDataToTree(id);
  // }

  // handleTreeFileCreation = (id) => {
  //   this.props.sendFileToCreate(id);
  // }

  render(){
    return(      
      <div className="map-container">
        { this.props.mapisLoading ? 

          <h1>LOADING...</h1>

          : 

          <div className='vis-react'>
            <MapEditor map={this.props.map} socket={socket}
              // recieveCreatedNode={this.recieveCreatedNode}
              // recieveNodeForTree={this.recieveNodeForTree}
            />
          </div>
          
        }
      </div>
    );
  }
}

{/* <DndDocTree nodeId={this.props.docTree_NodeId} title={this.props.docTree_title} treeData={this.props.docTree_treeData}
                    handleTreeFileCreation={this.handleTreeFileCreation}
        /> */}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    map: state.map_data.map,

    mapIsEmpty: state.map_data.mapIsEmpty,
    mapisLoading: state.map_data.mapisLoading
  };
};

export default connect(mapStateToProps, { loadMapData })(MapCore);