import * as types from '../constants/types';

const initialState = {
    PublicMaps: [],
    PrivateMaps: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.home.GET_MAPS:
            return {
                ...state,
                PublicMaps: action.payload.publicMaps,
                PrivateMaps: action.payload.privateMaps
            };

        default: 
            return state;
    }
}