import {combineReducers} from 'redux';
import {map_component} from './map_component';
import {dnd_doc_tree_component} from "./dnd_doc_tree_component";
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    userMaps: homeReducer
});

export default rootReducer;