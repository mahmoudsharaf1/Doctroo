import { AsyncStorage } from 'react-native';
import firebase from '../Firebase';

import {
    SIGNIN_ATTEMPING,
    SIGNUP_FAILED,
    SIGNIN_SUCCESS,

    LOGIN_ATTEMPING,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from './type';



export const handelSignUp = ({ displayName, email, address, password, phone, photoURL, location }) => {

    return async (dispatch) => {

        dispatch({ type: SIGNIN_ATTEMPING })

        // const uid = firebase.auth().currentUser.uid;
        // firebase.database().ref('users/profiles/').child(uid).child('photoURL').set(photo)

        firebase.auth().createUserWithEmailAndPassword(email, password).then(resp => {


            firebase.database().ref('users/profiles/' + resp.user.uid).set({ displayName, email, address, password, phone, photoURL, location, uid: resp.user.uid })
                .then((response) => {
                    AsyncStorage.setItem('uid', resp.user.uid);

                    dispatch({
                        type: SIGNIN_SUCCESS, payload: { displayName, email, address, password, phone, photoURL, location, uid: resp.user.uid }, payload2: null
                    })
                })
        }).catch(error => {
            dispatch({ type: SIGNUP_FAILED, payload: error.message })
        })
    }
};





export const signIn = ({ email, password }) => {



    return async (dispatch) => {

        dispatch({ type: LOGIN_ATTEMPING });


        firebase.auth().signInWithEmailAndPassword(email, password).then(resp => {

            firebase.database().ref('users/profiles').child(resp.user.uid).on('value', (snapshot) => {
                const profile = snapshot.val();
                AsyncStorage.setItem('uid', resp.user.uid);

                dispatch({
                    type: LOGIN_SUCCESS, payload: profile
                });

            })
        }).catch(err => {
            dispatch({ type: LOGIN_FAILED, payload: err.message });

        });

    };

};
