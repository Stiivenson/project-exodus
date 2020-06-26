import * as types from '../constants/types';
import axios from 'axios';

import { returnErrors } from "./errorAction";


export const register = (name, email, password) =>  (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify(name, email, password);    

    axios.post('/api/auth/register', body, config)
        .then(res => dispatch({
            type: types.auth.REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: types.auth.REGISTER_FAIL});
        });  
};


export const login = (email, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify(email, password);

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: types.auth.LOGIN_SUCCESS,
                payload: res.data
            });                        
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_ERROR'));
            dispatch({ type: types.auth.AUTH_ERROR });
        });
};


export const logout = () => dispatch => {
    dispatch({type: types.auth.LOGOUT_SUCCESS});
    dispatch({type: types.user.RECET_USER});
    dispatch({type: types.map.RECET_MAP});
    dispatch({type: types.docTree.REMOVE_DATA});
    dispatch({type: types.textEditor.REMOVE_DATA});
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
            dispatch(returnErrors(err.response.data, err.response.status, 'USER_LOADING_FAIL'));
            dispatch({ type: types.auth.USER_LOADING_FAIL });
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