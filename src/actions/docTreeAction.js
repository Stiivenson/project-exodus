import * as types from '../constants/types';


export const loadTreeData = (data) => {
    return {
        type: types.docTree.LOAD_DATA,
        payload: data
    }
}

export const updateTreeData = (data) => {
    return {
        type: types.docTree.UPDATE_DATA,
        payload: data
    }
}

export const openningDocTree = () => {
    return {
        type: types.docTree.OPENNING
    }
}

export const addTreeItem = (data) => {
    return {
        type: types.docTree.ADD_ITEM,
        payload: data
    }
}

