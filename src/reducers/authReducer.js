import * as types from '../constants/types';

const initialState = {
    isAuthenticated: false,
    user: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case types.auth.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };

        case types.auth.LOGIN_SUCCESS:
            return {
                ...state           
            };

        case types.auth.LOGOUT_SUCCESS:
            return {
                ...state
            };

        default: 
            return state;
    }
}