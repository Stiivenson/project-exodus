import {combineReducers} from 'redux';
import {map_component} from './map_component';
import {dnd_doc_tree_component} from "./dnd_doc_tree_component";

const rootReducer = combineReducers({
    map_component,
    dnd_doc_tree_component
});

export default rootReducer;