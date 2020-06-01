import {combineReducers} from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import docTreeReducer from './docTreeReducer';
import textEditorReducer from './textEditorReducer';
 
const rootReducer = combineReducers({
    auth: authReducer,
    user_data: userReducer,
    map_data: mapReducer,
    doc_tree: docTreeReducer,
    text_editor: textEditorReducer
});

export default rootReducer;