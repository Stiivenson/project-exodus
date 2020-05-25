import * as types from '../constants/types';

import { returnErrors } from "./errorAction";


export const loadTreeData = (data) => {
    return {
        type: types.docTree.LOAD_DATA,
        payload: data
    }
}