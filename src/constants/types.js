//Определение типов действий
export const app = {
    ERROR: 'app/error',
    LOADED: 'app/loaded',
    LOADING: 'app/loading'
};
export const auth = {
    LOGIN_SUCCESS: 'auth/login/success',
    LOGOUT_SUCCESS: 'auth/logout/success'
};
export const home = {
    GET_MAPS: 'home/maps/get'
};
export const map_nodes = {
    CREATE: 'map/node/create',
    UPDATE: 'map/node/update',
    DELETE: 'map/node/delete'
};
export const map_edges = {
    CREATE: 'map/edge/create',
    UPDATE: 'map/edge/update',
    DELETE: 'map/edge/delete'
};
export const doc_tree = {
    CREATE_NODE: 'doc_tree/node/create',
    UPDATE_NODE: 'doc_tree/node/update',
    DELETE_NODE: 'doc_tree/node/delete',
    
    ADD_DATA: 'doc_tree/data/add',
    UPDATE_DATA: 'doc_tree/data/update',
    DELETE_DATA: 'doc_tree/data/delete',

    UPDATE_COMPONENT: 'doc_tree/update_component'
};
