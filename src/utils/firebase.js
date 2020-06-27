import * as firebase from firebase;

var firebaseConfig = {
    apiKey: "AIzaSyC_yt5NbzRawOkRjtcU-ccOx81nE_y7eh0",
    authDomain: "react-application-354d6.firebaseapp.com",
    databaseURL: "https://react-application-354d6.firebaseio.com",
    projectId: "react-application-354d6",
    storageBucket: "react-application-354d6.appspot.com",
    messagingSenderId: "217482129256",
    appId: "1:217482129256:web:0210cbcc9f55a6493470dd",
    measurementId: "G-LZMYRSYHGK"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
