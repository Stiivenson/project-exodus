import axios from 'axios';

import * as types from '../constants/types';

// Return Errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: types.error.GET_ERROS,
        payload: { msg, status, id }
    }    
};

// Clear Errors
export const clearErrors = () => {
    return {
        type:  types.error.CLEAR_ERRORS
    }    
};
