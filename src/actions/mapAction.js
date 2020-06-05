import * as types from '../constants/types';

import { returnErrors } from "./errorAction";


export const loadMapId = (id) => (dispatch) => {
    dispatch({ type: types.map.RECET_MAP });  
    dispatch({
        type: types.map.LOAD_MAP_ID,
        payload: id
    });
     
}

export const loadMapData = (data) => {
    return {
        type: types.map.LOAD_MAP,
        payload: data
    }
}

export const addNode = (data) => {
    return {
        type: types.map.ADD_NODE,
        payload: data
    }
}

export const moveNode = (data) => {
    return dispatch => {
        dispatch({
            type: types.map.MOVE_NODE,
            payload: data
        });
    }
}

export const updateNode = (data) => {
    return {
        type: types.map.UPDATE_NODE,
        payload: data
    }
}

export const deleteNode = (data) => (dispatch, getState) => {
    let treeId = getState().doc_tree.tree.id;
    data.map(id => { 
        if(treeId === id) {
            dispatch({ type: types.docTree.REMOVE_DATA })
        }          
        dispatch({
            type: types.map.DELETE_NODE,
            payload: id
        });
    });
}

export const addEdge = (data) => {
    return {
        type: types.map.ADD_EDGE,
        payload: data
    }
}

export const deleteEdge = (data) => {
    return dispatch => {
        data.map(id => {           
            dispatch({
                type: types.map.DELETE_EDGE,
                payload: id
            });
        });        
    }
}