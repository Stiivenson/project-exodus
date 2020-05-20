import axios from 'axios';

import * as types from '../constants/types';
import DB from '../constants/ImitationDB';

import { v1 as uuid } from 'uuid';


export const createMap = (title) => {
    let newId = uuid();
    return {
        type: types.home.CREATE_MAP,
        payload: {
            id: newId,
            title: title
        }
    };
};

export const deleteMap = (id) => {
    return {
        type: types.home.DELETE_MAP,
        payload: id
    };
};