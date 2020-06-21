
import {     
    SIGNIN_ATTEMPING,
    SIGNIN_SUCCESS,
    SIGNUP_FAILED,
    LOGIN_SUCCESS,
    REFRESH_USERS
    } from '../actions/type';


    const INITIAL_STATE = {
        loading:false,
        error:'',
        profile:null,
        signup:false,
        login:false
    }

export default (state = INITIAL_STATE, action )=>{

    switch(action.type){

    case SIGNIN_ATTEMPING:
    return { ...state, loading: true }

    case SIGNUP_FAILED:
    return { ...state, loading: false, error: action.payload }

    case SIGNIN_SUCCESS:
    return { ...state, loading: false, signup: true }

    case LOGIN_SUCCESS:
    return { ...state, loading: false, profile: action.payload, error:'', login: action.login }

    case REFRESH_USERS:
    return { ...state, profile: action.payload.profile }

    default:
    return state;

    }


}