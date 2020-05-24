import React, {ReactDOM, Component } from 'react';
import PropTypes from 'prop-types';

import MapEditor from './MapEditor';
import DndDocTree from '../DndDocTree';

import { connect } from "react-redux";
import { loadMapData, addNode, updateNode, deleteNode, addEdge, deleteEdge } from '../../actions/mapAction';
import { sendNodeDataToTree } from "../../actions/dnd-doc-tree-component";

import io from "socket.io-client";
let socket;

class MapCore extends Component{
  constructor(props){
    super(props);
    this.state = {
      handlerValue: null, //Values to handle node/edge operations
      handlerData: null
    }

    
  }

  componentDidMount() {

    socket = io.connect("http://localhost:5000", {query: {token: this.props.token}});
    socket.on('connect', () => {
      console.log('try to join room');
      socket.emit('JOIN_ROOM', this.props.map.id);
    });

    socket.on('Connected', (room) => {
      console.log('Connected to room', room);
    })


    socket.on('SERVER--MapEditor:CREATE_NODE_SUCCESS', (node) => {
      console.log('CREATE_NODE_SUCCESS', node);      
      this.props.addNode(node);   
    });
    socket.on('SERVER--MapEditor:UPDATE_NODE_SUCCESS', (node) => {
      console.log('UPDATE_NODE_SUCCESS', node);      
      this.props.updateNode(node);   
    });
    socket.on('SERVER--MapEditor:DELETE_NODE_SUCCESS', (nodes) => {
      console.log('DELETE_NODE_SUCCESS', nodes); 
      this.props.deleteNode(nodes);     
    });

    socket.on('SERVER--MapEditor:CREATE_EDGE_SUCCESS', (edge) => {
      console.log('CREATE_EDGE_SUCCESS', edge);      
      this.props.addEdge(edge);   
    });


    socket.on('SERVER:ERROR', () => {
      console.log('SERVER:ERROR');      
    });


    console.log(socket); 
    
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


  handlerClear = () => {
    this.setState({ handlerValue: null, handlerData: null });
  }

  // Add Node to Editor
  addNode = (data) => {
    this.setState({ handlerValue: 'add-node', handlerData: data });
  }

  // Add Edge to Editor
  addEdge = (data) => {
    this.setState({ handlerValue: 'add-edge', handlerData: data });
  }

  // Edit Node and save in Editor
  editNode = (data) => {
    this.setState({ handlerValue: 'edit-node', handlerData: data });
  }

  // Remove nodes & edges from Editor & DB
  deleteDataFromMap = (data) => {
    this.setState({ handlerValue: 'delete', handlerData: data });

    if(data.nodes.length > 0 ) {
      socket.emit('CLIENT--MapEditor:DELETE_NODE', { id: this.props.map.id, nodes: data.nodes});
    }
    if(data.edges.length > 0 ) {
      socket.emit('CLIENT--MapEditor:DELETE_EDGE', { id: this.props.map.id, edges: data.edges});
    }   
  }

  render(){
    return(      
      <div className="map-container">
        { this.props.mapisLoading ? 

          <h1>LOADING...</h1>

          : 

          <div className='vis-react'>
            <MapEditor map={this.props.map} socket={socket}
            
              handlerValue={this.state.handlerValue} handlerData={this.state.handlerData} handlerClear={this.handlerClear}
              
              addNode={this.addNode} editNode={this.editNode} addEdge={this.addEdge}
              deleteDataFromMap={this.deleteDataFromMap}
            />
            {/* <DndDocTree nodeId={this.props.docTree_NodeId} title={this.props.docTree_title} treeData={this.props.docTree_treeData}
                    handleTreeFileCreation={this.handleTreeFileCreation}
            /> */}
          </div>
          
        }
      </div>
    );
  }
}



const mapStateToProps = state => {
  console.log('mapStateToProps: ', state.map_data);
  
  return {
    token: state.auth.token,
    map: state.map_data.map,

    mapIsEmpty: state.map_data.mapIsEmpty,
    mapisLoading: state.map_data.mapisLoading
  };
};

export default connect(mapStateToProps, { loadMapData, addNode, updateNode, deleteNode, addEdge, deleteEdge })(MapCore);