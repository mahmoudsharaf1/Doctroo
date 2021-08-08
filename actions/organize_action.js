import firebase from '../Firebase';

import { 
    ORGANIZE_ATTEMPING, 
    ORGANIZE_SUCCESS, 
    ORGANIZE_FAILED
} from './type';

export const saveMeeting = ({meetingUser, meetingDoctor, id}) => {
    

    return async(dispatch) => {

        dispatch({ type: ORGANIZE_ATTEMPING });

        try{
            let uid = firebase.auth().currentUser.uid
            await firebase.database().ref('meeting').child(uid).push(meetingUser);
            await firebase.database().ref('meeting').child(id).push(meetingDoctor);

            dispatch({ type: ORGANIZE_SUCCESS });

        } catch(e) {

            dispatch({ type: ORGANIZE_FAILED });

            console.log(e)
        }
    };
};