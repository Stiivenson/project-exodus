//Определение типов действий
export const app = {
    ERROR: 'app/error',
    LOADED: 'app/loaded',
    LOADING: 'app/loading'
};
export const auth = {
    REGISTER_SUCCESS: 'auth/register/success',
    REGISTER_FAIL: 'auth/register/fail',

    LOGIN_SUCCESS: 'auth/login/success',
    LOGIN_FAIL: 'auth/login/fail',
    LOGOUT_SUCCESS: 'auth/logout/success'
};


export const home = {
    GET_MAPS: 'home/maps/get',
    CREATE_MAP: 'home/map/create',
    DELETE_MAP: 'home/map/delete'
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
