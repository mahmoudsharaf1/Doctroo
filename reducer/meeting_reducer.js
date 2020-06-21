import { FETCH_MEETING } from '../actions/type';


const INITIAL_STATE = { fetching: false, result: [] }


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MEETING:
            return { fetching: false, result: action.payload}
        default:
            return state;
    }
}