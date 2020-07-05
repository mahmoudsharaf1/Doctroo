import { AsyncStorage } from 'react-native';
import firebase from '../Firebase';

import { SIGNIN_ATTEMPING, SIGNUP_FAILED, SIGNIN_SUCCESS, LOGIN_SUCCESS } from './type';


export const handelSignUp = ({ displayName, email, address, password, phone, photoURL }) => {

    return async (dispatch) => {
        try {
            dispatch({ type: SIGNIN_ATTEMPING })



            firebase.auth().createUserWithEmailAndPassword(email, password).then(resp => {


                firebase.database().ref('users/profiles/' + resp.user.uid).set({ displayName, email, address, password, phone, photoURL, uid: resp.user.uid, type: 'user' })
                    .then((resp) => {
                        AsyncStorage.setItem('uid', resp.user.uid);
                        AsyncStorage.setItem('type', 'user');

                        dispatch({
                            type: SIGNIN_SUCCESS, payload: { displayName, email, address, password, phone, photoURL, uid: resp.user.uid, type: 'user' }, payload2: null
                        })
                    })
            }).catch(error => {
                dispatch({ type: SIGNUP_FAILED, error: '' })
            })
        } catch (err) {
            console.log(err)
        }
    }

};





export const signIn = ({ email, password }) => {



    return async (dispatch) => {

        dispatch({ type: SIGNIN_ATTEMPING });

        console.log(SIGNIN_ATTEMPING)
        firebase.auth().signInWithEmailAndPassword(email, password).then(resp => {

            firebase.database().ref('users/profiles').child(resp.user.uid).on('value', (snapshot) => {
                const profile = snapshot.val();
                AsyncStorage.setItem('uid', resp.user.uid);
                // AsyncStorage.setItem('type', 'user');

                dispatch({
                    type: LOGIN_SUCCESS, payload: profile
                });

            })


        }).catch(err => {
            dispatch({ type: SIGNUP_FAILED, payload: err.message });

        })

    }

}
