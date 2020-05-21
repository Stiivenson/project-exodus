import axios from 'axios';

import * as types from '../constants/types';
import { tokenConfig } from './authAction';


export const createMap = (owner, title) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify({ owner, title });

    axios.post('/api/map/create', body, tokenConfig(getState))
        .then(res => { 
            dispatch({ 
                type:  types.user.CREATE_MAP,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            
            // dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: AUTH_ERROR
            // })
        })

};

export const deleteMap = (id) => (dispatch, getState) => {
    axios.delete(`/api/map/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.DELETE_MAP,
            payload: id
        }))
        .catch(err => {
            console.log(err);
            
            // dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: AUTH_ERROR
            // })
        })
};
