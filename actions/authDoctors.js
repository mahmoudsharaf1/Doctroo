import { AsyncStorage } from 'react-native';
import firebase from '../Firebase';

import {
    SIGNIN_ATTEMPING,
    SIGNIN_SUCCESS,
    SIGNUP_FAILED,
} from './type';



export const handelSignUpDoctor = ({
    displayName,
    email,
    password,
    phone,
    photoURL,
    medicalSchool,
    education,
    specialty,
    hourlyRate,
    address,
    experience,
    addressSchool,
    awards,
    location
}) => {

    return async (dispatch) => {
        try {
            dispatch({ type: SIGNIN_ATTEMPING })

            firebase.auth().createUserWithEmailAndPassword(email, password).then(resp => {


                firebase.database().ref('users/profiles/' + resp.user.uid).set({
                    displayName,
                    email,
                    password,
                    phone,
                    photoURL,
                    medicalSchool,
                    education,
                    specialty,
                    hourlyRate,
                    address,
                    experience,
                    addressSchool,
                    awards,
                    location,
                    uid: resp.user.uid,
                    type: 'vendor'
                })
                    .then((response) => {
                        AsyncStorage.setItem('uid', resp.user.uid);
                        // AsyncStorage.setItem('type', 'vendor');

                        dispatch({
                            type: SIGNIN_SUCCESS, payload: {
                                displayName,
                                email,
                                password,
                                phone,
                                photoURL,
                                medicalSchool,
                                education,
                                specialty,
                                hourlyRate,
                                address,
                                experience,
                                addressSchool,
                                awards,
                                location,
                                uid: resp.user.uid,
                                type: 'vendor'
                            }, payload2: null
                        })
                    })


                firebase.database().ref('specialty/' + specialty + '/' + resp.user.uid).set({
                    displayName,
                    email,
                    password,
                    phone,
                    photoURL,
                    medicalSchool,
                    education,
                    specialty,
                    hourlyRate,
                    address,
                    experience,
                    addressSchool,
                    awards,
                    location,
                    uid: resp.user.uid
                })

            }).catch(error => {
                dispatch({ type: SIGNUP_FAILED, payload: error.message })
            })
        } catch (err) {
            console.log(err)
        }
    }

};
