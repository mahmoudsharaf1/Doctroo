import { 
    GET_SPECIALTY_ATTEMPING,
    GET_SPECIALTY_FAILED,
    GET_SPECIALTY_SUCCESS
 } from '../actions/type';


const INITIAL_STATE = { fetching: false, result: [] }


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SPECIALTY_ATTEMPING:
            return { fetching: false, result: action.payload}
        default:
            return state;
    }
}