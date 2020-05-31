//Определение типов действий
export const auth = {
    USER_LOADING: 'auth/user/loading',
    USER_LOADED: 'auth/user/loaded',
    USER_LOADING_FAIL: 'auth/loading/fail',

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
    LOAD_MAP_ID: 'map/load/id',
    LOAD_MAP: 'map/load',

    ADD_NODE: 'map/node/add',
    MOVE_NODE: 'map/node/move',
    UPDATE_NODE: 'map/node/update',
    DELETE_NODE: 'map/node/delete',

    ADD_EDGE: 'map/edge/add',
    UPDATE_EDGE: 'map/edge/update',
    DELETE_EDGE: 'map/edge/delete'
}


export const docTree = {
    LOAD_DATA: 'doc_tree/load',
    REMOVE_DATA: 'doc_tree/remove',
    UPDATE_DATA: 'doc_tree/update',
    OPENNING: 'doc_tree/openning',

    ADD_ITEM: 'doc_tree/item/add',

    UPDATE_NODE: 'doc_tree/node/update',
    DELETE_NODE: 'doc_tree/node/delete',

    ADD_NOTE: 'doc_tree/note/add',
    UPDATE_NOTE: 'doc_tree/note/update',
    DELETE_NOTE: 'doc_tree/note/delete',

    ADD_FOLDER: 'doc_tree/folder/add',
    UPDATE_FOLDER: 'doc_tree/folder/update',
    DELETE_FOLDER: 'doc_tree/folder/delete',
};