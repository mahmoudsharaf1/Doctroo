import { AsyncStorage } from 'react-native';
import firebase from '../Firebase';
import FbConfig from '../FbConfig'
import * as Facebook from 'expo-facebook'; 

import {
    FB_ATTEMPTING,
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAILED,
} from './type';



export const facebooklogin =  () => {
    return async (dispatch) => {
        dispatch ({type: FB_ATTEMPTING});

            await Facebook.initializeAsync(FbConfig.appId)       
            const {
                type,
                token
                } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
                });

            if (type === 'success') {
                finishlogin(dispatch, token);

            } else if ( type === 'cancel') {
                return dispatch ({ type: FB_LOGIN_FAILED});
            }
        }
    }
    
    const finishlogin = async ( dispatch, token ) => {
        try {
        
            const credential = await firebase.auth.FacebookAuthProvider.credential(token);
            
            const { user: {displayName, photoURL, uid} } = 
                await firebase.auth().signInAndRetrieveDataWithCredential(credential); 

        
            let profiles = { displayName, photoURL, uid };
            await firebase.database().ref(`users/${uid}`).update(profiles);
            
            const snap = await firebase.database().ref(`users/${uid}`).once('value');
            profiles = snap.val();
            

        await AsyncStorage.setItem('fb_token', token)

            return dispatch({ type: FB_LOGIN_SUCCESS, payload: {token, profiles } })
            } catch (e) {
                console.log(e);
                return dispatch ({ type: FB_LOGIN_FAILED});
            }
    };



