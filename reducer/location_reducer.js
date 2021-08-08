import {
    LOCATION_ATTEMPING,
    LOCATION_SUCCESS,
    LOCATION_FAILED
} from '../actions/type';


const INITAL_STATE = { saving: false, saved: false };


export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_ATTEMPING:
            return { ...INITAL_STATE, saving: true };
        case LOCATION_SUCCESS:
            return { saved: true, saving: false };
        case LOCATION_FAILED:
            return { saved: false, saving: false };
        default:
            return state;
    }
}