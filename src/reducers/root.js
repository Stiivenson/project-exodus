import {combineReducers} from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user_data: userReducer,
    map_data: mapReducer
});

export default rootReducer;