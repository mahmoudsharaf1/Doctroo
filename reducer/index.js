import { combineReducers } from 'redux';

import auth from './auth_reducer';
import authData from './auth_reducer';


export default combineReducers({
    
    auth,
    authData
})