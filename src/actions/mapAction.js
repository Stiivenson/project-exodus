import * as types from '../constants/types';



export function sendCreatedNode (data) {
    return (dispatch) => {
        const nodeId = data.id,
              nodeLabel = data.label;
        dispatch({
            type: types.map_nodes.CREATE,
            data
        });
        dispatch({
                type: types.doc_tree.CREATE_NODE,
                nodeId,
                nodeLabel
        });
    };  
};