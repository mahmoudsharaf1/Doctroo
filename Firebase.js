import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCng6zTqKFt8yF1CqN6TAtKIaBz9YUNPI8",
  authDomain: "doctro-be0c9.firebaseapp.com",
  databaseURL: "https://doctro-be0c9.firebaseio.com",
  projectId: "doctro-be0c9",
  storageBucket: "doctro-be0c9.appspot.com",
  messagingSenderId: "1080921690473",
  appId: "1:1080921690473:web:79bb1a13e6e60234f8adf8",
  measurementId: "G-L15J2P9XBK"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

 
 export default firebase;