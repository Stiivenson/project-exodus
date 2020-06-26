import * as types from '../constants/types';
import axios from 'axios';

import { returnErrors } from "./errorAction";

// Finding User maps from input
export const findMaps = (value) => (dispatch, getState) => {
    axios.get('/api/search/maps', { params: { text: value }, headers: { 'x-auth-token': getState().auth.token } })
        .then(res => {
            dispatch({ 
                type:  types.search.FIND_MAPS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'FIND_MAPS_FAILED'));
        });
};

// Clear maps list from Store
export const dropMaps = () => ({
    type: types.search.DROP_MAPS
});


// Finding all User docs from input
export const findDocsGlobal = (value) => (dispatch, getState) => {
    axios.get('/api/search/docs/g', { params: { text: value }, headers: { 'x-auth-token': getState().auth.token } })
        .then(res => {
            dispatch({ 
                type:  types.search.FIND_DOCS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'FIND_DOCS_FAILED'));
        });
};

// Load selected Document and related Map
export const loadDocData = (id) => (dispatch, getState) => {
    axios.get('/api/search/doc/data', { params: { id: id }, headers: { 'x-auth-token': getState().auth.token } })
        .then(res => {
            dispatch({ 
                type:  types.map.LOAD_MAP_ID,
                payload: res.data.mapReference
            });
            dispatch({ 
                type:  types.textEditor.LOAD_DATA,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOAD_DOC_FAILED'));
        });
};
