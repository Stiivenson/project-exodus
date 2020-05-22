import axios from 'axios';

import * as types from '../constants/types';
import DB from '../constants/ImitationDB';

export const register = ({ name, email, password }) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => dispatch({
            type: types.auth.REGISTER_SUCCESS,
            payload: res.data
        }))  
};

export const login = (email, password) => (dispatch, getState) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: types.auth.LOGIN_SUCCESS,
                payload: res.data
            });                        
        })
        .catch(err => {
            console.log(err);
            
            // dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: AUTH_ERROR
            // })
        });
};

const check = (getState) => {
    console.log('token in LS: ', localStorage.getItem('token'));
    console.log('token in State: ', getState);
}

export const logout = () => {
    return {
        type: types.auth.LOGOUT_SUCCESS
    }
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    
    // User loading
    dispatch({ type: types.auth.USER_LOADING });
    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => { 
            dispatch({  type:  types.auth.USER_LOADED });
            dispatch({ 
                type:  types.user.GET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            
            // dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: AUTH_ERROR
            // })
        });
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from LocalStorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}