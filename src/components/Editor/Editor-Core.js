import React, {ReactDOM, Component } from 'react';
import { Redirect, Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';

import MapEditor from './MindMap/MapEditor';
import TextEditor from './TextEditor/TextEditor';
import DndDocTree from './DndDocTree';

import { connect } from "react-redux";
import { loadMapData, addNode, updateNode, deleteNode, addEdge, deleteEdge } from '../../actions/mapAction';
import { loadTreeData } from "../../actions/docTreeAction";

import io from "socket.io-client";
let socket;

class EditorCore extends Component{
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

    socket.on('SERVER--MapEditor:GET_DOCTREE_DATA_SUCCESS', (data) => {
      console.log('GET_DOCTREE_DATA_SUCCESS', data);      
      this.props.loadTreeData(data);   
    });


    socket.on('SERVER--DocTree:CREATE_FOLDER_SUCCESS', (data) => {
      console.log('CREATE_FOLDER_SUCCESS', data);      
      //this.props.updateNode(node);   
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
      <div className="editor-container">
        { this.props.mapisLoading ? 

          <h1>LOADING...</h1>

          : 
          <>
          <DndDocTree socket={socket} history={this.props.history}
              isEmpty={this.props.treeIsEmpty} treeData={this.props.docTree} mapId={this.props.map.id}
          />

          <Route path='/map-editor'>
            <div className='map-editor-container'>
              <MapEditor map={this.props.map} socket={socket}
              
                handlerValue={this.state.handlerValue} handlerData={this.state.handlerData} handlerClear={this.handlerClear}
                
                addNode={this.addNode} editNode={this.editNode} addEdge={this.addEdge}
                deleteDataFromMap={this.deleteDataFromMap}
              />           
            </div>     
          </Route>

          <Route path='/text-editor'>
            <TextEditor/>
          </Route>  
          </>
          
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
    mapisLoading: state.map_data.mapisLoading,

    treeIsEmpty: state.doc_tree.treeIsEmpty,
    docTree:  state.doc_tree.tree
  };
};

export default connect(mapStateToProps, { 
  loadMapData, addNode, updateNode, deleteNode, addEdge, deleteEdge,
  loadTreeData 
})(EditorCore);