import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import docTreeReducer from './docTreeReducer';
import textEditorReducer from './textEditorReducer';
 
const rootReducer = combineReducers({
    auth: authReducer,
    user_data: userReducer,
    map_data: mapReducer,
    doc_tree: docTreeReducer,
    text_editor: textEditorReducer,
    error: errorReducer
});

export default rootReducer;