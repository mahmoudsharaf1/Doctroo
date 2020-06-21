import firebase from '../Firebase';

import { FETCH_MEETING } from './type';

export const fetchMeeting = () => {
    return (dispatch) => {
        try{
            firebase.database().ref('meeting').on('value', (snap) => {
            const data = snap.val() || [];
            const meetings = [];

            Object.values(data).forEach(meeting => {
                meetings.push(meeting)
            })

            dispatch({ type: FETCH_MEETING, payload: meetings });
        })
    }catch (e) {
        console.log(e)
    }

    }
}