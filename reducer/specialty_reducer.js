import { FETCH_SPECIALTY } from '../actions/type';


const INITIAL_STATE = { fetching: false, result: [] }


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SPECIALTY:
            return { fetching: false, result: action.payload }
        default:
            return state;
    }
}