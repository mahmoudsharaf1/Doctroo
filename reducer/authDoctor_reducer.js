
import {
    SIGNIN_ATTEMPING_DOCTOR,
    SIGNUP_FAILED_DOCTOR,
    SIGNIN_SUCCESS_DOCTOR,
} from '../actions/type';

const INITIAL_STATE = {
    loading: false,
    error: '',
    profile: null,
    signup: false,
    login: false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SIGNIN_ATTEMPING_DOCTOR:
            return { ...state, loading: true }

        case SIGNUP_FAILED_DOCTOR:
            return { ...state, loading: false, error: action.payload }

        case SIGNIN_SUCCESS_DOCTOR:
            return { ...state, loading: false, signup: true }


        default:
            return state;

    }


}