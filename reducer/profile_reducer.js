
import {
    SIGNIN_ATTEMPING,
    SIGNIN_SUCCESS,
    SIGNUP_FAILED,

    LOGIN_ATTEMPING,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../actions/type';


const INITIAL_STATE = {
    loading: false,
    profile: null,
    signup: false,
    login: false,
    error: null,
    err: null
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SIGNIN_ATTEMPING:
            return { ...state, loading: true }

        case SIGNUP_FAILED:
            return { ...state, loading: false, error: action.payload }

        case SIGNIN_SUCCESS:
            return { ...state, loading: false, signup: true, profile: action.payload }

        case LOGIN_SUCCESS:
            return { ...state, loading: false, profile: action.payload, error: null, login: action.login }



        case LOGIN_ATTEMPING:
            return { ...state, loading: true }

        case SIGNIN_SUCCESS:
            return { ...state, loading: false, signup: true, profile: action.payload }

        case LOGIN_FAILED:
            return { ...state, loading: false, err: action.payload }

        default:
            return state;

    }


}
