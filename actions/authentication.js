import { AsyncStorage } from 'react-native';
import firebase from '../Firebase';

import { SIGNIN_ATTEMPING, SIGNUP_FAILED, SIGNIN_SUCCESS } from './type';




export const handelSignUp = (image, name, email, password, phone) => {
    
    return async (dispatch) => {
        try{
            dispatch ({ type: SIGNIN_ATTEMPING })
            
        // let downloadURL = await uploadImageAsync(image, name)
        // let address = await getCurrentLocation()
        // const location = { address, latitude, longitude };
        
        firebase.auth().createUserWithEmailAndPassword(email, password).then(resp => {
            
            firebase.database().ref('users/profiles' + resp.user.uid).set({name , email, photo, downloadURL, phone, location, uid: resp.user.uid})
            .then((response) => {
                AsyncStorage.setItem('uid', resp.user.uid);
                
                dispatch({
                    type: SIGNIN_SUCCESS, payload: { name, email, phone, location, photo, downloadURL, uid: resp.user.uid }, payload2: null
                })
            })
        }).catch(error => {
            dispatch({ type: SIGNUP_FAILED, payload: error})
            })
        }catch(err) {
            console.log(err)
        }
    }
    
}