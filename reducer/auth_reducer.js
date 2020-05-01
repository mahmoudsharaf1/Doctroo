import {
    FB_ATTEMPTING,
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAILED,
    REFRESH_PROFILE,
    
    SIGNIN_ATTEMPING,
    SIGNUP_FAILED,
    SIGNIN_SUCCESS
} from '../actions/type';


const INITIAL_STATE = {loading: false, profiles: null, token: null};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FB_ATTEMPTING:
            return { ...INITIAL_STATE, loading: true } 
        case FB_LOGIN_FAILED:
            return {loading: false, token: null }
        case FB_LOGIN_SUCCESS:
            return {loading: false, token: action.payload.token, profiles: action.payload.profiles }; 
        case REFRESH_PROFILE:
            return { ...state, profiles: action.payload.profiles }
            
        case SIGNIN_ATTEMPING:
            return { ...INITIAL_STATE, loading: true } 
        case SIGNUP_FAILED:
            return {loading: false, token: null }
        case SIGNIN_SUCCESS:
            return {loading: false, token: action.payload.token, profiles: action.payload.profiles };           
        default: return state;
    }
}
