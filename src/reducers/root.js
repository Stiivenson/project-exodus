import {combineReducers} from 'redux';

import {dnd_doc_tree_component} from "./dnd_doc_tree_component";
import homeReducer from './homeReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
    userMaps: homeReducer,
    mapData: mapReducer
});

export default rootReducer;