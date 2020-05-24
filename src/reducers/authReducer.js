import * as types from '../constants/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    dataLoaded: false
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
                isAuthenticated: true,
                dataLoaded: true
            };

        case types.auth.REGISTER_SUCCESS:
        case types.auth.LOGIN_SUCCESS:            
            localStorage.setItem('token', action.payload.token)
            return { 
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            };

        case types.auth.USER_LOADING_FAIL:
        case types.auth.LOGIN_FAIL:
        case types.auth.LOGOUT_SUCCESS:   
        case types.auth.REGISTER_FAIL:
            localStorage.removeItem('token');
            return { 
                ...state, 
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                dataLoaded: false            
            };

        default: 
            return state;
    }
}