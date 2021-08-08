import {
    ORGANIZE_ATTEMPING,
    ORGANIZE_SUCCESS,
    ORGANIZE_FAILED
} from '../actions/type';


const INITAL_STATE = { saving: false, saved: false };


export default (state = INITAL_STATE, action) => {

    switch (action.type) {
        
        case ORGANIZE_ATTEMPING:
            return { ...INITAL_STATE, saving: true };

        case ORGANIZE_SUCCESS:
            return { saved: true, saving: false };

        case ORGANIZE_FAILED:
            return { saved: false, saving: false };

        default:
            return state
    }
}