import * as types from '../constants/types';

export function sendNodeDataToTree (id) {
    return (dispatch, getState) => {
        const {dnd_doc_tree_component} = getState();
        let title = '', treeData = [];
        dnd_doc_tree_component.doc_tree_structure.map(node => {
            if(node.id === id){
                title = node.title
                treeData = node.treeData;
            }
        });
        return dispatch({
            type: types.doc_tree.UPDATE_COMPONENT,
            id,
            title,
            treeData
        });
    };  
};

// export function addNodeToTree (id, label) {
//     let newTreeObj = {
//         id: id,
//         label: label,
//         treeData:[]
//     }
//     return {
//         type: 'CREATE_NODE',
//         newTreeObj
//     };   
// }

// export function addSelectedNode (id) {
//     return {
//         type: 'SELECT_NODE',
//         id
//     }; 
// }

// export function createFile (id) {
//     return {
//         type: 'CREATE_FILE',
//         id
//     }; 
// }
