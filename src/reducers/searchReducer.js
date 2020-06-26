import * as types from '../constants/types';

const initialState = {
    maps: [],
    docs: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case types.search.FIND_MAPS:
        return { ...state, maps: payload }

    case types.search.DROP_MAPS:
        return { ...state, maps: [] }

    case types.search.FIND_DOCS:
        return { ...state, docs: payload }

    case types.search.DROP_DOCS:
        return { ...state, docs: [] }


    default:
        return state
    }
}
