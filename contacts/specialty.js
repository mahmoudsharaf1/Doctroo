// import React, {Component} from 'react';
// import { Text, View } from 'react-native';

// import firebase from '../Firebase';


// export const dataDoctors = () => {
//     state = {
//         users: []
//     }

//     firebase.database().ref('users/doctors/').on('child_added', (val) => {
//         let users = val.val();
//         users.uid = val.key;
  
//         this.setState((prevState) => {
//           return {
//             users: [...prevState.users, users]
//           }
//         })
//       })
// }



const categories = [
    
    {
        uid: 'dentist',
        name: 'Dentist',
        count: 147,
        images: require('../images/brain.png')
    },
    {
        uid: 'Respiratory',
        name: 'Respiratory',
        count: 16,
        images: require('../images/lung-cancer.png')
    },
    {
        uid: 'cardiology',
        name: 'Cardiology',
        count: 68,
        images: require('../images/heart.png')
    },
    {
        uid: 'physician',
        name: 'Physician',
        count: 68,
        images: require('../images/stethoscope.png')
    },

    
]; 



export { categories };
