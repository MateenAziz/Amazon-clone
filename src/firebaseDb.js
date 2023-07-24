// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4QYasAkdfx1rvQT_-ty2RxFfM_sgpJD8",
  authDomain: "clone-8b09f.firebaseapp.com",
  projectId: "clone-8b09f",
  storageBucket: "clone-8b09f.appspot.com",
  messagingSenderId: "1042972581701",
  appId: "1:1042972581701:web:5d0476a53e9c5d8d9c282c",
  measurementId: "G-5HWPRFX2F0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
