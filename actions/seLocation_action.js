import firebase from '../Firebase';

import { 
    LOCATION_ATTEMPING, 
    LOCATION_SUCCESS, 
    LOCATION_FAILED
} from './type';

export const savelocation = (location) => {
    

    return async(dispatch) => {

        dispatch({ type: LOCATION_ATTEMPING });

        try{

            let uid = firebase.auth().currentUser.uid

            await firebase.database().ref('users/doctors/' + uid).push(location)

            dispatch({ type: LOCATION_SUCCESS });

        } catch(e) {

            dispatch({ type: LOCATION_FAILED });

            console.log(e)
        }
    };
};