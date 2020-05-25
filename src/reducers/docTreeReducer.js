import * as types from '../constants/types';

const initialState = {
    treeIsEmpty: true,
    treeisLoading: false,

    tree: {
        id: null,
        label: '',
        treeData: []
    }    
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.docTree.LOAD_DATA:           
            return {
                ...state,
                treeIsEmpty: false,
                tree: {
                    id: action.payload.id,
                    label: action.payload.label,
                    treeData: action.payload.treeData
                }
            };

        default: 
            return state;
    }
}

