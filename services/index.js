// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';
// import firebase from '../Firebase';
// import Constants from 'expo-constants';



// const registerForPushNotificationsAsync = async () => {

    
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//     return;
//     }

//     try{

//         const token = await Notifications.getExpoPushTokenAsync();
        
//         await firebase.database().ref('users/profiles/' + firebase.auth().currentUser.uid).update({ pushToken: token})

//     } catch (e) {
//         console.log(e)
//     }



//   };


//   const registerForPushNotificationsAsync = async () => {
//       if (Constants.isDevice) {
//           const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//           let finalStatus = existingStatus;
//           if (existingStatus !== 'granted') {
//               const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//               finalStatus = status;
//             }
//             if (finalStatus !== 'granted') {
//                 alert('Failed to get push token for push notification!');
//                 return;
//             }
//             token = await Notifications.getExpoPushTokenAsync();
            
//       await firebase.database().ref('users').update({ pushToken: token})
//     } else {
//       alert('Must use physical device for Push Notifications');
//     }

//   };


//   export {registerForPushNotificationsAsync};



  import {  Notifications } from 'expo';
  import firebase from '../Firebase';
  import * as Permissions from 'expo-permissions';

  const registerForPushNotificationsAsync = async (uid)=> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    const  token = await Notifications.getExpoPushTokenAsync();
    try{
    await firebase.database().ref('users/'+uid).update({pushToken:token});
      console.log(token)
    }catch(e){
      console.log(e);
    }
  };
  export  {registerForPushNotificationsAsync};