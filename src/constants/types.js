//Определение типов действий
export const auth = {
    USER_LOADING: 'auth/user/loading',
    USER_LOADED: 'auth/user/loaded',

    REGISTER_SUCCESS: 'auth/register/success',
    REGISTER_FAIL: 'auth/register/fail',

    LOGIN_SUCCESS: 'auth/login/success',
    LOGIN_FAIL: 'auth/login/fail',
    LOGOUT_SUCCESS: 'auth/logout/success'
};

export const user = {
    GET_USER: 'user/get',
    CREATE_MAP: 'user/map/create',
    DELETE_MAP: 'user/map/delete'
};

export const error = {
    GET_ERROS: 'error/get',
    CLEAR_ERRORS: 'error/clear'
};


export const map = {
    LOAD_MAP: 'map/load',

    ADD_NODE: 'map/node/add',
    UPDATE_NODE: 'map/node/update',
    DELETE_NODE: 'map/node/delete',

    ADD_EDGE: 'map/edge/add',
    UPDATE_EDGE: 'map/edge/update',
    DELETE_EDGE: 'map/edge/delete'
}


export const doc_tree = {
    CREATE_NODE: 'doc_tree/node/create',
    UPDATE_NODE: 'doc_tree/node/update',
    DELETE_NODE: 'doc_tree/node/delete',
    
    ADD_DATA: 'doc_tree/data/add',
    UPDATE_DATA: 'doc_tree/data/update',
    DELETE_DATA: 'doc_tree/data/delete',

    UPDATE_COMPONENT: 'doc_tree/update_component'
};
