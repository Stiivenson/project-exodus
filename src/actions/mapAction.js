import * as types from '../constants/types';

import { returnErrors } from "./errorAction";


export const loadMapId = (id) => {
    return {
        type: types.map.LOAD_MAP_ID,
        payload: id
    }
    
}

export const loadMapData = (data) => {
    return {
        type: types.map.LOAD_MAP,
        payload: data
    }
}


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
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: types.auth.REGISTER_FAIL});
        });  
};