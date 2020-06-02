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
            return { 
                ...state, 
                user: action.payload.user,
                privateMaps: action.payload.maps.privateMaps,
                publicMaps: action.payload.maps.publicMaps,
                recentMaps: action.payload.maps.recentMaps,
                trashMaps: action.payload.maps.trashMaps
            };

        case types.user.CREATE_MAP:
            return { 
                ...state,                 
                privateMaps: [action.payload, ...state.privateMaps]                
            }

        case types.user.ADD_RECENT_MAP:
            return { 
                ...state,                 
                recentMaps: action.payload            
            }

            
        case types.user.GET_TRASH_MAPS:
            return { 
                ...state,                 
                trashMaps: action.payload            
            }

        case types.user.ADD_TRASH_MAP:
            return { 
                ...state,
                privateMaps: state.privateMaps.filter(map => map._id !== action.payload)               
            }

        case types.user.DELETE_MAP:
            return { 
                ...state,
                trashMaps: state.trashMaps.filter(map => map._id !== action.payload)                
            }



        default: 
            return state;
    }
}