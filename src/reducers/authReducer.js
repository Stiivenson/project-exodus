import * as types from '../constants/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.auth.USER_LOADING:
            return { 
                ...state, 
                isLoading: true 
            };

        case types.auth.USER_LOADED:            
            return { 
                ...state, 
                isLoading: false,
                isAuthenticated: true
            };

        case types.auth.REGISTER_SUCCESS:
        case types.auth.LOGIN_SUCCESS:            
            localStorage.setItem('token', action.payload.token)
            return { 
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            };

        default: 
            return state;
    }
}