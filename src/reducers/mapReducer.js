import * as types from '../constants/types';

// function map_component(state = initialState.map_component, action){ 
//     switch(action.type){
//         case types.map_nodes.CREATE:{
//             const {data} = action;
//             let nextState = Object.assign({}, state);
//             // Object.keys(newNodes).map(function(key, index) {
//             //     if(!nextState.nodes.includes(newNodes[key]))
//             //         nextState.nodes.push(newNodes[key]);
//             // });
//             nextState.nodes.push(data);
//             return nextState;
//         }
//         default:
//             return state;
//     }
// }

const initialState = {
    mapIsEmpty: true,
    mapisLoading: true,

    map: {
        id: null,
        title: '',
        nodes: [],
        edges: []
    }    
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.map.LOAD_MAP:           
            return {
                ...state,
                mapIsEmpty: false,
                mapisLoading: false,
                map: {
                    id: action.payload._id,
                    title: action.payload.title,
                    nodes: action.payload.nodes,
                    edges: action.payload.edges
                }
            };

        case types.map.LOAD_MAP_ID:
            return {
                ...state,             
                map: { ...state.map,
                    id: action.payload
                }
            };
        
        case types.map.ADD_NODE:
            return {
                ...state,
                map: {...state.map,
                    nodes: [...state.map.nodes, action.payload]
                }
            };

        case types.map.UPDATE_NODE:
            return {
                ...state,
                map: {...state.map,
                    nodes: state.map.nodes.map(node => node.id === action.payload.id ?
                            { ...node, label: action.payload.label } :
                            node)
                }
            };

        case types.map.DELETE_NODE:
            return {
                ...state,
                map: {...state.map,
                    nodes: state.map.nodes.filter(node => node.id !== action.payload)
                }
            };

        case types.map.ADD_EDGE:
            return {
                ...state,
                map: {...state.map,
                    edges: [...state.map.edges, action.payload]
                }
            };

        case types.map.DELETE_EDGE:
            return {
                ...state,
                map: {...state.map,
                    edges: state.map.edges.filter(edge => edge.id !== action.payload)
                }
            };

        default: 
            return state;
    }
}

