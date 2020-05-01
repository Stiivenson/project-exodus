import initialState from "../constants/initialState";
import * as types from '../constants/types';

export function map_component(state = initialState.map_component, action){ 
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

