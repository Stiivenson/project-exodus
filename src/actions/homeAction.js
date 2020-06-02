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

export const updateRecentMap = (id) => (dispatch, getState) => {

    let recentMaps = getState().user_data.recentMaps;
    const length = recentMaps.length;
    let selectedIndex = -1;
    recentMaps.map((map, index) => { map._id == id ? selectedIndex = index : null });    
    if(selectedIndex == 0){
        return;
    }
    else {
        if(selectedIndex > 0) {
            recentMaps.splice(selectedIndex, 1);       
        }
        if(length == 8 && selectedIndex < 0 )
        {  
            recentMaps.pop();
        }    
    }    
    let reqArray = [];
    reqArray.push(id);
    if(length > 0) recentMaps.map(map => { reqArray.push(map._id) });
    

    // Request body
    const body = JSON.stringify({ reqArray });
    axios.post('/api/map/recent/update', body, tokenConfig(getState))
        .then(res => { 
            dispatch({ 
                type:  types.user.ADD_RECENT_MAP,
                payload: res.data.maps
            })
        })
        .catch(err => {
            console.log(err);
            
            // dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: AUTH_ERROR
            // })
        })
}


export const loadTrashMaps = () => (dispatch, getState) => {
    axios.get('/api/auth/get/trash', tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.GET_TRASH_MAPS,
            payload: res.data.trashMaps
        }))
        .catch(err => {
            console.log(err);
            
            // dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: AUTH_ERROR
            // })
        })
};

export const putToTrash = (id) => (dispatch, getState) => {
    axios.delete(`/api/map/private/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: types.user.ADD_TRASH_MAP,
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

export const deleteMap = (id) => (dispatch, getState) => {
    axios.delete(`/api/map/trash/${id}`, tokenConfig(getState))
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
