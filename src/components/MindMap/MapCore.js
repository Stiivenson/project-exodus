import React, {ReactDOM, Component } from 'react';
import PropTypes from 'prop-types';

import MapEditor from './MapEditor';
import DndDocTree from '../DndDocTree';

import { connect } from "react-redux";
import { sendCreatedNode } from '../../actions/mapAction';
import { sendNodeDataToTree } from "../../actions/dnd-doc-tree-component";


class MapCore extends Component{
  constructor(props){
    super(props);
    this.state={   
    }
  }

  recieveCreatedNode = (data) => {
    this.props.sendCreatedNode(data);
  }

  recieveNodeForTree = (id) => {
    this.props.sendNodeDataToTree(id);
  }

  handleTreeFileCreation = (id) => {
    // this.props.sendFileToCreate(id);
  }

  render(){
    return(      
      <div className="map-container">
        <div className='vis-react'>
          <MapEditor map_component={this.props.mapComponent} 
                    recieveCreatedNode={this.recieveCreatedNode}
                    recieveNodeForTree={this.recieveNodeForTree}
          />
        </div>
        {/* <DndDocTree nodeId={this.props.docTree_NodeId} title={this.props.docTree_title} treeData={this.props.docTree_treeData}
                    handleTreeFileCreation={this.handleTreeFileCreation}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps - ', state);

  return {
    mapComponent: state.map_component,
    // docTree_NodeId:  state.dnd_doc_tree_component.nodeId,
    // docTree_title:  state.dnd_doc_tree_component.title,
    // docTree_treeData:  state.dnd_doc_tree_component.treeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendCreatedNode: (data) => {
      dispatch(sendCreatedNode(data))
    },
    sendNodeDataToTree: (id) => {
      dispatch(sendNodeDataToTree(id))
    },
    // sendFileToCreate: (id) => {
    //   dispatch(createFile(id))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapCore);