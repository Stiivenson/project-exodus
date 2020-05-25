import {combineReducers} from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';
import docTreeReducer from './docTreeReducer';
 
const rootReducer = combineReducers({
    auth: authReducer,
    user_data: userReducer,
    map_data: mapReducer,
    doc_tree: docTreeReducer
});

export default rootReducer;