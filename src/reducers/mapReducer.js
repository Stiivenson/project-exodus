import * as types from '../constants/types';

function map_component(state = initialState.map_component, action){ 
    switch(action.type){
        case types.map_nodes.CREATE:{
            const {data} = action;
            let nextState = Object.assign({}, state);
            // Object.keys(newNodes).map(function(key, index) {
            //     if(!nextState.nodes.includes(newNodes[key]))
            //         nextState.nodes.push(newNodes[key]);
            // });
            nextState.nodes.push(data);
            return nextState;
        }
        default:
            return state;
    }
}

const initialState = {
    Id: null,
    Title: '',
    Nodes: [],
    Edges: [],
    Options: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.home.GET_MAPS:
            return {
                ...state,
                PublicMaps: action.payload.publicMaps,
                PrivateMaps: action.payload.privateMaps
            };

        case types.home.CREATE_MAP:
            return {
                ...state,
                PrivateMaps: [action.payload, ...state.PrivateMaps]
            };

        case types.home.DELETE_MAP:
            return {
                ...state,
                PrivateMaps: state.PrivateMaps.filter(map => map.id !== action.payload)
            };

        default: 
            return state;
    }
}

