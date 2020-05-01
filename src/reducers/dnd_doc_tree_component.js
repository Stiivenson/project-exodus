import initialState from "../constants/initialState";
import * as types from '../constants/types';

export function dnd_doc_tree_component(state = initialState.dnd_doc_tree_component, action){ 
    switch(action.type){
        case types.doc_tree.CREATE_NODE:{
            const {nodeId, nodeLabel} = action;
            let nextState = Object.assign({}, state);
            let newNodeObj = {
                id:nodeId,
                title: nodeLabel,
                treeData: []
            }

            let findNode = nextState.doc_tree_structure.some(node => node.id === nodeId);
            if(!findNode){
                nextState.doc_tree_structure.push(newNodeObj);
            }

            return nextState;
        }
        case types.doc_tree.UPDATE_COMPONENT:{
            const {id, title, treeData} = action;
            let nextState = Object.assign({}, state);

            nextState.nodeId = id;
            nextState.title = title;
            nextState.treeData = treeData; 

            return nextState;
        }
        // case 'CREATE_NODE':{
        //     const {newTreeObj} = action;
        //     let nextState = Object.assign({}, state);
        //     nextState.nodes_data.push(newTreeObj);
        //     return nextState;
        // }
        // case 'SELECT_NODE':{
        //     const {id} = action;
        //     let nextState = Object.assign({}, state);
        //     nextState.selected_node = id;
        //     return nextState;
        // }
        // case 'CREATE_FILE':{
        //     const {id} = action;
        //     const newFile = {
        //         title: 'new-file'
        //     };
        //     let nextState = Object.assign({}, state);
        //     nextState.nodes_data.map(node => {
        //         if(node.id === id){
        //             node.treeData.push(newFile);
        //         }
        //     });
        //     return nextState;
        // }
        default:
            return state;
    }
}