import { combineReducers } from 'redux';

import auth from './auth_reducer';
import authProfile from './profile_reducer';
import specialty from './specialty_reducer';
import organize from './organize_reducer';
import meetings from './meeting_reducer';
import location from './location_reducer';
import i18n from './lang_reducer';


export default combineReducers({
    
    auth,
    authProfile,
    specialty,
    organize,
    meetings,
    location,
    i18n
})