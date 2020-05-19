import {combineReducers} from 'redux';

import authReducer from './authReducer';
import homeReducer from './homeReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    userMaps: homeReducer,
    mapData: mapReducer
});

export default rootReducer;