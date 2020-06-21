import { combineReducers } from 'redux';

import auth from './auth_reducer';
import authProfile from './profile_reducer';
import authDoctor from './authDoctor_reducer';
import organize from './organize_reducer';
import meetings from './meeting_reducer';
import location from './location_reducer';


export default combineReducers({
    
    auth,
    authProfile,
    authDoctor,
    organize,
    meetings,
    location
})