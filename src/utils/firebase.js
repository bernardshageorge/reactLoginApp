import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC_yt5NbzRawOkRjtcU-ccOx81nE_y7eh0",
  authDomain: "react-application-354d6.firebaseapp.com",
  databaseURL: "https://react-application-354d6.firebaseio.com",
  projectId: "react-application-354d6",
  storageBucket: "react-application-354d6.appspot.com",
  messagingSenderId: "217482129256",
  appId: "1:217482129256:web:0210cbcc9f55a6493470dd",
  measurementId: "G-LZMYRSYHGK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const firestore = firebase.firestore();

const firestorage = firebase.storage();

const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const updateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    try {
      await userRef.update({
        ...additionalData,
      });
    } catch (error) {
      console.error("Error updating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export {
  auth,
  generateUserDocument,
  firestorage,
  updateUserDocument,
  getUserDocument,
  firestore,
};
