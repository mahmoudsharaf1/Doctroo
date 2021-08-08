import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCRsFqBspZjycEGT2yQqyWnfclLg5YdRf0",
  authDomain: "doctro-fd08d.firebaseapp.com",
  databaseURL: "https://doctro-fd08d-default-rtdb.firebaseio.com",
  projectId: "doctro-fd08d",
  storageBucket: "doctro-fd08d.appspot.com",
  messagingSenderId: "317114724831",
  appId: "1:317114724831:web:0d3e75c1fde21b1018946a",
  measurementId: "G-3SJV9BE38H"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

 
 export default firebase;
