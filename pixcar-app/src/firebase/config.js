import app from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBIo_klzvlNhr_CDcgpNJtd7z7ck_OTfL0",
  authDomain: "pixcar-fd9f4.firebaseapp.com",
  projectId: "pixcar-fd9f4",
  storageBucket: "pixcar-fd9f4.appspot.com",
  messagingSenderId: "1073899344383",
  appId: "1:1073899344383:web:55f7aba1bdd68ff80517ca"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()