import { AsyncStorage } from 'react-native';
import firebase from '../Firebase';

import { SIGNIN_ATTEMPING_DOCTOR, SIGNUP_FAILED_DOCTOR, SIGNIN_SUCCESS_DOCTOR } from './type';


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
    awards
}) => {

    return async (dispatch) => {
        try {
            dispatch({ type: SIGNIN_ATTEMPING_DOCTOR })


            firebase.auth().createUserWithEmailAndPassword(email, password).then(resp => {


                firebase.database().ref('users/doctors/' + resp.user.uid).set({
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
                    uid: resp.user.uid
                })
                    .then((resp) => {
                        AsyncStorage.setItem('uid', resp.user.uid);

                        dispatch({
                            type: SIGNIN_SUCCESS_DOCTOR, payload: {
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
                                uid: resp.user.uid
                            }, payload2: null
                        })
                    })

                firebase.database().ref('specialty/' + resp.user.uid).set({
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
                    uid: resp.user.uid
                })
                    .then((resp) => {
                        AsyncStorage.setItem('uid', resp.user.uid);

                        dispatch({
                            type: SIGNIN_SUCCESS_DOCTOR, payload: {
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
                                uid: resp.user.uid
                            }, payload2: null
                        })
                    })
            }).catch(error => {
                dispatch({ type: SIGNUP_FAILED_DOCTOR, error: '' })
            })
        } catch (err) {
            console.log(err)
        }
    }

};
