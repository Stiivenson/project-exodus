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
                publicMaps: action.payload.maps.publicMaps
            };

        case types.user.RECET_USER:    
            return { 
                ...state,
                user: null,
                privateMaps: [],
                publicMaps: [],
                recentMaps: [],
                trashMaps: []
            }



        case types.user.GET_MAPS:
            return { 
                ...state,
                privateMaps: action.payload.privateMaps,
                publicMaps: action.payload.publicMaps      
            }  

        case types.user.CREATE_MAP:
            return { 
                ...state,                 
                privateMaps: [...state.privateMaps, action.payload]                
            }
        
        case types.user.ADD_TRASH_MAP:
            return { 
                ...state,
                privateMaps: state.privateMaps.filter(map => map._id !== action.payload)               
            }
          
        

        case types.user.GET_RECENT_MAPS:
            return { 
                ...state,
                recentMaps: action.payload          
            }

        case types.user.ADD_RECENT_MAP:
            return { 
                ...state          
            }



        case types.user.GET_TRASH_MAPS:
            return { 
                ...state,                 
                trashMaps: action.payload            
            }

        case types.user.REVIVE_MAP:
            return { 
                ...state,
                trashMaps: state.trashMaps.filter(map => map._id !== action.payload)                
            }

        case types.user.DELETE_MAP:
        case types.user.REVIVE_MAP:
            return { 
                ...state,
                trashMaps: state.trashMaps.filter(map => map._id !== action.payload)                
            }



        default: 
            return state;
    }
}