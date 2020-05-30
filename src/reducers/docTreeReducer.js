import * as types from '../constants/types';

const initialState = {
    treeIsEmpty: true,
    treeIsOpened: false,
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
                treeIsOpened: true,
                tree: {
                    id: action.payload.id,
                    label: action.payload.label,
                    treeData: action.payload.treeData
                }
            };

        case types.docTree.UPDATE_DATA:
            return{
                ...state,
                tree: {...state.tree,
                    treeData: action.payload
                }
            }

        case types.docTree.OPENNING:
            return{
                ...state,
                treeIsOpened: !state.treeIsOpened
            }

        case types.docTree.ADD_ITEM:
            return{
                ...state,
                tree: {...state.tree,
                    treeData: [...state.tree.treeData, action.payload]
                }
            }

        default: 
            return state;
    }
}

