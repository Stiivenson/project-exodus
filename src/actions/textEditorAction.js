import * as types from '../constants/types';

import { returnErrors } from "./errorAction";


export const loadDocumentData = (data) => {
    return {
        type: types.textEditor.LOAD_DATA,
        payload: data
    }
}

export const removeDocumentData = () => {
    return {
        type: types.textEditor.REMOVE_DATA
    }
}

export const saveNewData = (data) => {
    return {
        type: types.textEditor.SAVE_DATA,
        payload: data
    }
}