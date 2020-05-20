import * as types from '../constants/types';

const initialState = {
    user: null,
    privateMaps: [],
    publicMaps: [],
    recentMaps: [],
    trashMaps: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.user.GET_USER:    
        console.log(action.payload.maps.PublicMaps);
        
            return { 
                ...state, 
                user: action.payload.user,
                privateMaps: action.payload.maps.privateMaps,
                publicMaps: action.payload.maps.publicMaps,
                recentMaps: action.payload.maps.recentMaps,
                trashMaps: action.payload.maps.trashMaps
            };

        default: 
            return state;
    }
}