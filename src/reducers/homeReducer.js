import * as types from '../constants/types';

const initialState = {
    PrivateMaps: [],
    PublicMaps: [],
    RecentMaps: [],
    TrashMaps: []    
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