import axios from 'axios';

import * as types from '../constants/types';
import { tokenConfig } from './authAction';
import { returnErrors } from "./errorAction";


export const createMap = (title) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify({ title });

    axios.post('/api/map/create', body, tokenConfig(getState))
        .then(res => { 
            dispatch({ 
                type:  types.user.CREATE_MAP,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};


export const loadMaps = () => (dispatch, getState) => {
    axios.get('/api/auth/get/maps', tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.GET_MAPS,
            payload: res.data.maps
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const putToTrash = (id) => (dispatch, getState) => {
    axios.delete(`/api/map/private/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.ADD_TRASH_MAP,
            payload: id
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};


export const loadRecentMaps = () => (dispatch, getState) => {
    axios.get('/api/auth/get/recent', tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.GET_RECENT_MAPS,
            payload: res.data.recentMaps
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const addRecentMap = (id) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify({ id });

    axios.post('/api/map/recent/add', body, tokenConfig(getState))
        .then(res => { 
            dispatch({ 
                type:  types.user.ADD_RECENT_MAP,
                payload: res.data.maps
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}


export const loadTrashMaps = () => (dispatch, getState) => {
    axios.get('/api/auth/get/trash', tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.GET_TRASH_MAPS,
            payload: res.data.trashMaps
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const deleteMap = (id) => (dispatch, getState) => {
    axios.delete(`/api/map/trash/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.DELETE_MAP,
            payload: id
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const reviveMap = (id) => (dispatch, getState) => {
    // Request body
    const body = JSON.stringify({ id });
    
    axios.post('/api/map/revive', body, tokenConfig(getState))
        .then(res => { 
            dispatch({ 
                type:  types.user.REVIVE_MAP,
                payload: id
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}
