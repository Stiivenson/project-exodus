import * as types from '../constants/types';
import DB from '../constants/ImitationDB';

export const register = ({ name, email, password }) => {
    return {
        type: types.auth.REGISTER_SUCCESS,
        payload: {
            name: name,
            email: email,
            password: password
        }
    }    
};

export const login = ({ email, password }) => getState => {
    console.log(getState);
    
    // return {
    //     type: types.auth.LOGIN_SUCCESS,
    //     payload: {
    //         email: email,
    //         password: password
    //     }
    // }    
};

export const logout = () => {
    return {
        type: types.auth.LOGOUT_SUCCESS
    }
};



