import firebase from '../Firebase';
import { isObject } from 'lodash';

import { FETCH_SPECIALTY } from './type';


export const fetchSpecialty = () => {

    return (dispatch) => {

        firebase.database().ref('specialty').on('child_added', (val) => {
            let specialty = val.val();
                specialty.id = val.key;
            

            dispatch({ type: FETCH_SPECIALTY, payload: specialty });
        })

    }
}